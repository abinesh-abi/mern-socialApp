require('dotenv').config()

module.exports = {
    PORT : process.env.PORT || 5000,
    MONGODB_URL:process.env.MONGO_DATABASE,
    ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
    CLIENT_URL : process.env.CLIENT_URL
}