const ytdl = require("ytdl-core");
const { convertHMS } = require("./timeConverter");

exports.videoInfo = async (url) => {
    try {
        const videoInfo = await ytdl.getBasicInfo(url);
        const thumbnails = videoInfo.videoDetails.thumbnails;
        return {
            code: 200,
            status: "OK",
            title: videoInfo.videoDetails.title,
            duration: convertHMS(videoInfo.videoDetails.lengthSeconds),
            channel: videoInfo.videoDetails.ownerProfileUrl,
            channelName: videoInfo.videoDetails.ownerChannelName,
            views: videoInfo.videoDetails.viewCount,
            date: videoInfo.videoDetails.uploadDate,
            likes: videoInfo.videoDetails.likes,
            thumbnail: thumbnails[thumbnails.length - 1].url,
        };
    } catch (error) {
        return {
            code: 400,
            status: "Fail",
            message: "Video linkini to'g'ri kiriting",
        };
    }
};
