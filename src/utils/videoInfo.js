const ytdl = require("ytdl-core");
const { convertHMS } = require("./timeConverter");
const videoInfo = async (url) => {
    const videoInfo = await ytdl.getBasicInfo(url);
    const thumbnails = videoInfo.videoDetails.thumbnails;
    return {
        title: videoInfo.videoDetails.title,
        duration: convertHMS(videoInfo.videoDetails.lengthSeconds),
        channel: videoInfo.videoDetails.ownerProfileUrl,
        channelName: videoInfo.videoDetails.ownerChannelName,
        views: videoInfo.videoDetails.viewCount,
        date: videoInfo.videoDetails.uploadDate,
        likes: videoInfo.videoDetails.likes,
        thumbnail: thumbnails[thumbnails.length - 1].url,
    };
};

const result = async () => {
    console.log(
        await videoInfo(
            "https://www.youtube.com/watch?v=e3Zzb_IWd0g&ab_channel=Vaske1234amv"
        )
    );
};

result();
