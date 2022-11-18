require('dotenv').config()

module.exports = {
    PORT : process.env.PORT || 5000,
    MONGODB_URL:process.env.MONGO_DATABASE
}