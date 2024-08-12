"""
Scrapes video and channel data from YouTube using the YouTube API.
"""

import argparse
import os
import yaml
import json
from pathlib import Path
from typing import List
import datetime as dt
import aiohttp
import asyncio

from loguru import logger
from tqdm import tqdm
from dotenv import load_dotenv
from googleapiclient.discovery import build
from dataclasses import dataclass
import dataclasses

YOUTUBE_CHANNEL_IDS = Path("data") / "youtube_channel_ids.yml"
VIDEO_DATA = Path("data") / "video_data.json"
CHANNEL_DATA = Path("data") / "channel_data.json"

NUMBER_OF_VIDEOS = 200
VIDEOS_PER_CHANNEL = 5


# Mirror of the YouTube interfaces defined in `src/lib/interfaces.ts`
@dataclass
class YoutubeChannel:
    channelId: str
    channelCustomName: str
    channelName: str
    channelPic: str
    channelPicH: int
    channelPicW: int
    channelSubCount: int


@dataclass
class YoutubeVideo:
    channelId: str
    publishedAt: str
    videoId: str
    title: str

    @property
    def published_dt(self):
        return dt.datetime.strptime(self.publishedAt, "%Y-%m-%dT%H:%M:%SZ")


class EnhancedJSONEncoder(json.JSONEncoder):
    # https://stackoverflow.com/a/51286749
    def default(self, o):
        if dataclasses.is_dataclass(o):
            return dataclasses.asdict(o)
        return super().default(o)


async def is_youtube_short(video_id: str) -> bool:
    url = f"https://www.youtube.com/shorts/{video_id}"
    async with aiohttp.ClientSession() as session:
        async with session.head(url) as response:
            is_short = True if response.status == 200 else False
            logger.info(f"Checking if {video_id} is a short: {is_short}")
            return is_short


async def get_videos_from_channels(channel_ids: List[str], youtube: build):
    videos: List[YoutubeVideo] = []

    pbar = tqdm(channel_ids, desc="Getting videos from channels")
    for channel_id in channel_ids:
        pbar.set_description(f"Getting videos from {channel_id=}")
        response = get_videos_from_channel(channel_id, youtube)

        channel_videos = []
        for item in response["items"]:
            video = YoutubeVideo(
                publishedAt=item["snippet"]["publishedAt"],
                videoId=item["id"]["videoId"],
                channelId=item["snippet"]["channelId"],
                title=item["snippet"]["title"],
            )
            channel_videos.append(video)

        # Remove shorts from videos list and trim number of videos per channel
        channel_videos.sort(
            key=lambda x: x.published_dt,
            reverse=True,
        )
        logger.debug(f"Youtube videos for channel {channel_id}:\n{channel_videos!r}")
        shorts_bools = await asyncio.gather(
            *[is_youtube_short(video.videoId) for video in channel_videos]
        )
        channel_videos = [
            v for v, is_short in zip(channel_videos, shorts_bools) if not is_short
        ]

        videos.extend(channel_videos[:VIDEOS_PER_CHANNEL])

    return videos


def get_videos_from_channel(channel_id: str, service: build):
    """
    Get a list of video IDs from the specified channel using the YouTube data API.

    https://developers.google.com/youtube/v3/docs/search/list
    """
    request = service.search().list(
        part="id,snippet", channelId=channel_id, type="video", maxResults=50
    )
    response = request.execute()
    return response


def save_channel_data(channel_ids: List[str], youtube: build):
    """
    Uses YouTube API to find the channels, and record data in a JSON file.
    """
    channels: List[YoutubeChannel] = []
    pbar = tqdm(channel_ids, desc="Getting videos from channels")
    for channel_id in pbar:
        request = youtube.channels().list(part="snippet,statistics", id=channel_id)
        response = request.execute()

        assert len(response["items"]) == 1, "More than one channel returned"

        item = response["items"][0]
        youtube_channel = YoutubeChannel(
            channelId=item["id"],
            channelCustomName=item["snippet"]["customUrl"],
            channelName=item["snippet"]["title"],
            channelPic=item["snippet"]["thumbnails"]["medium"]["url"].split("=")[
                0
            ],  # Can set ?s= on the end to get a custom resolution
            channelPicH=item["snippet"]["thumbnails"]["medium"]["height"],
            channelPicW=item["snippet"]["thumbnails"]["medium"]["width"],
            channelSubCount=int(item["statistics"]["subscriberCount"]),
        )
        channels.append(youtube_channel)

    logger.debug(f"Youtube channels:\n{channels!r}")
    logger.success(f"Retrieved {len(channels)} channels from YouTube API")

    with open(CHANNEL_DATA, "w") as f:
        json.dump(channels, f, indent=4, cls=EnhancedJSONEncoder)

    logger.success(f"Saved video data to {VIDEO_DATA}")
    return


async def save_video_data(channel_ids: List[str], youtube: build):
    """
    Uses the API to find the videos from the channels, and records the data in a JSON file.
    """
    logger.info("Getting videos from YouTube API...")
    videos = await get_videos_from_channels(channel_ids, youtube)
    logger.success(f"Retrieved {len(videos)} videos from YouTube API")

    videos.sort(
        key=lambda x: x.published_dt,
        reverse=True,
    )
    videos = videos[:NUMBER_OF_VIDEOS]

    with open(VIDEO_DATA, "w") as f:
        json.dump(videos, f, indent=4, cls=EnhancedJSONEncoder)

    logger.success(f"Saved video data to {VIDEO_DATA}")
    return


async def main():
    logger.info("Starting YouTube Python script")
    parser = argparse.ArgumentParser()
    parser.add_argument("--api-key", help="Your YouTube Data API key")
    args = parser.parse_args()
    api_key = args.api_key

    if api_key is None:
        if not Path(".env").exists():
            raise Exception("API key not provided, and not in env file")

        logger.info("Loading in API key from .env file...")

        load_dotenv()
        api_key = os.getenv("YOUTUBE_API_KEY")
    else:
        logger.info("API key parsed from command line.")

    assert type(api_key) == str, "API key must be a string"

    logger.success("YouTube API key successfully retrieved")

    youtube = build("youtube", "v3", developerKey=api_key)
    logger.success("YouTube API instance created")

    with open(YOUTUBE_CHANNEL_IDS, "r") as f:
        channel_ids = yaml.safe_load(f)

    logger.success(f"Retrieved channel IDs from {YOUTUBE_CHANNEL_IDS}")
    logger.debug(f"Channel IDs: {channel_ids}")

    await save_video_data(channel_ids, youtube)
    save_channel_data(channel_ids, youtube)

    return


if __name__ == "__main__":
    asyncio.run(main())
