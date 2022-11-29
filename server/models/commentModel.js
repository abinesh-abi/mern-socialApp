const mongoose = require('mongoose')

const schema = new mongoose.Schema({

}, {
    timestamps: true
})

module.exports = mongoose.model('comment', schema)