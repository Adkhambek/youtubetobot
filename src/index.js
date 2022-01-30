const { Telegraf, session } = require("telegraf");
const { TOKEN } = require("./config");
const bot = new Telegraf(TOKEN);
const locale = require("./locale");
const stage = require("./stage");

bot.use(session());
bot.use(stage.middleware());

// Error Handling
bot.catch((err, ctx) => {
    console.log(err);
    ctx.reply("Something wrong");
});

// Public
bot.start((ctx) => ctx.scene.enter("START"));

module.exports = bot;
