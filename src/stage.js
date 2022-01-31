const { Markup, Scenes } = require("telegraf");
const locale = require("./locale");
const ytdl = require("./utils/ytdl");
const load = require("./utils/load");

const Start = new Scenes.WizardScene(
    "START",
    async (ctx) => {
        const firstName = ctx.message.chat.first_name;
        ctx.reply(locale.start.text(firstName), {
            parse_mode: "HTML",
            disable_web_page_preview: true,
        });
        return ctx.wizard.next();
    },
    async (ctx) => {
        const text = ctx.message.text;
        const messageId = ctx.message.message_id + 1;
        const chatId = ctx.message.chat.id;

        await load(() => {
            ctx.reply("🔍 Tekshirilmoqda...");
        }, 500);
        const videoInfo = await ytdl.videoInfo(text);
        if (videoInfo.code === 400) {
            await load(() => {
                ctx.deleteMessage(messageId);
                ctx.reply(videoInfo.message);
                return;
            }, 2000);
        } else {
            await load(() => {
                ctx.deleteMessage(messageId);
                ctx.replyWithPhoto(
                    { url: videoInfo.thumbnail },
                    {
                        parse_mode: "HTML",
                        disable_web_page_preview: true,
                        caption: `<b>${videoInfo.title}</b>\n\n👁 ${videoInfo.views} 👍 ${videoInfo.likes}\n📥 ${videoInfo.date}\n👤 <a href="${videoInfo.channel}">${videoInfo.channelName}</a>\n🕒 ${videoInfo.duration}\n\nQaysi formatda ko'chirmoqchisiz:`,
                    }
                );
                return;
            }, 500);
        }
    }
);

module.exports = new Scenes.Stage([Start]);
