const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    content: String,
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
        ],
    isBanned:{
        type:Boolean,
        default:false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('post', schema)