<script lang="ts">
    export let title: string;
    export let videoId: string;
    export let realeasedDatetime: string;
    export let channelInfo: any; // Contains channel data for the video uploader

    const thumbnail = `https://i.ytimg.com/vi/${videoId}/default.jpg`;
    const { channelCustomName, channelName } = channelInfo;

    function trimText(text: string, maxLength: number) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    }
</script>

<div>
    <img src={thumbnail} alt="{title} thumbnail" /><br />
    <a href="https://youtu.be/{videoId}">{trimText(title, 50)}</a> <br />
    <a href="https://www.youtube.com/{channelCustomName}">{channelName}</a>
    <br />
    <!-- <p>realeasedDatetime</p> -->
</div>

<style>
    div {
        border-style: solid;
        margin: 1em;
    }
    img {
        width: 5em;
    }
</style>
