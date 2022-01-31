const ytdl = require("ytdl-core");
const { convertHMS } = require("./timeConverter");
const Downloader = require("nodejs-file-downloader");

exports.videoInfo = async (url) => {
    try {
        const videoInfo = await ytdl.getBasicInfo(url);
        const thumbnails = videoInfo.videoDetails.thumbnails;
        const videoFormats = videoInfo.formats.filter(
            (e, index) => e.mimeType.startsWith("video/mp4") && index > 1
        );
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
            formats: videoFormats.map((e) => {
                return {
                    quality: e.qualityLabel,
                    videoUrl: e.url,
                };
            }),
        };
    } catch (error) {
        return {
            code: 400,
            status: "Fail",
            message: "Video linkini to'g'ri kiriting",
        };
    }
};

exports.videoDownload = async (url, ctx) => {
    const downloader = new Downloader({
        url,
        directory: "./downloads",
        fileName: "video.mp4",
        onProgress: function (percentage) {
            ctx.editMessageText(`${percentage} %`);
        },
    });
    try {
        return await downloader.download();
    } catch (error) {
        console.log(error);
    }
};
