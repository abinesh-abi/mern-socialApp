const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    userId: {type: mongoose.Types.ObjectId, ref: 'user'},
    recipients: [mongoose.Types.ObjectId],
    type: String,
    content: String,
    viewId:mongoose.Types.ObjectId,
    isRead: {type: Boolean, default: false},
    expireAt:{
        type:Date,
        default:Date.now(),
        index:{expires:'10d'}
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('notification', schema)