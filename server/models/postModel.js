const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    content: String,
    // image: {
    //     type: String,
    //     required: true
    // },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [
        {
            commentId:{
                type: mongoose.Types.ObjectId,
                default:mongoose.Types.ObjectId()
            },
            message:String,
            user: mongoose.Types.ObjectId,
            like:[{ type: mongoose.Types.ObjectId, ref: 'user' }]
        }
        ]
}, {
    timestamps: true
})

module.exports = mongoose.model('post', schema)