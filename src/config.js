require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN,
    PORT: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    secretPath: process.env.SECRET_PATH,
};
