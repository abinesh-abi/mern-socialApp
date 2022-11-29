const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    content: String,
    // image: {
    //     type: String,
    //     required: true
    // },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
}, {
    timestamps: true
})

module.exports = mongoose.model('post', schema)