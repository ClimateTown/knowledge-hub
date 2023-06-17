"""
Scrapes video and channel data from YouTube using the YouTube API.
"""

import argparse
import os
import yaml
import json
from pathlib import Path
from typing import List
import time

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
    channelSubCount: int


@dataclass
class YoutubeVideo:
    channelId: str
    publishedAt: str
    videoId: str
    title: str


class EnhancedJSONEncoder(json.JSONEncoder):
    # https://stackoverflow.com/a/51286749
    def default(self, o):
        if dataclasses.is_dataclass(o):
            return dataclasses.asdict(o)
        return super().default(o)


def get_videos_from_channels(channel_ids: List[str], youtube: build):
    # Create a service object to make API requests

    # Initialize an empty list to store the videos
    videos: List[YoutubeVideo] = []

    # Loop through the list of channel IDs
    pbar = tqdm(channel_ids, desc="Getting videos from channels")
    for channel_id in channel_ids:
        pbar.set_description(f"Getting videos from {channel_id=}")
        response = get_videos_from_channel(channel_id, youtube)

        # Append to list of videos
        for item in response["items"][:VIDEOS_PER_CHANNEL]:
            video = YoutubeVideo(
                publishedAt=item["snippet"]["publishedAt"],
                videoId=item["id"]["videoId"],
                channelId=item["snippet"]["channelId"],
                title=item["snippet"]["title"],
            )
            videos.append(video)

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
            channelPic=item["snippet"]["thumbnails"]["default"]["url"].split("=")[
                0
            ],  # Can set ?s= on the end to get a custom resolution
            channelSubCount=int(item["statistics"]["subscriberCount"]),
        )
        channels.append(youtube_channel)

    # Return the list of channels
    logger.success(f"Retrieved {len(channels)} channels from YouTube API")

    channels.sort(key=lambda x: x.channelSubCount, reverse=True)

    with open(CHANNEL_DATA, "w") as f:
        json.dump(channels, f, indent=4, cls=EnhancedJSONEncoder)

    logger.success(f"Saved video data to {VIDEO_DATA}")
    return


def save_video_data(channel_ids: List[str], youtube: build):
    """
    Uses the API to find the videos from the channels, and records the data in a JSON file.
    """

    # Call the get_videos_from_channels function to get a list of videos from the specified channels
    logger.info("Getting videos from YouTube API...")
    videos = get_videos_from_channels(channel_ids, youtube)
    logger.success(f"Retrieved {len(videos)} videos from YouTube API")

    # Sort on timestamp reverse chronological
    videos.sort(
        key=lambda x: time.mktime(time.strptime(x.publishedAt, "%Y-%m-%dT%H:%M:%SZ")),
        reverse=True,
    )
    videos = videos[:NUMBER_OF_VIDEOS]

    with open(VIDEO_DATA, "w") as f:
        json.dump(videos, f, indent=4, cls=EnhancedJSONEncoder)

    logger.success(f"Saved video data to {VIDEO_DATA}")
    return


def main():
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

    # Read yaml file with YouTube channel IDs
    with open(YOUTUBE_CHANNEL_IDS, "r") as f:
        channel_ids = yaml.safe_load(f)

    logger.success(f"Retrieved channel IDs from {YOUTUBE_CHANNEL_IDS}")
    logger.debug(f"Channel IDs: {channel_ids}")

    save_video_data(channel_ids, youtube)
    save_channel_data(channel_ids, youtube)

    return


if __name__ == "__main__":
    main()
