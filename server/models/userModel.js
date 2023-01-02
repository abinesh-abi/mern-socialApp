const { default: mongoose } = require("mongoose");


const schema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: 'avatar'
    },
    dob:Date,
    role: {type: String, default: 'user'},
    gender: {type: String, default: 'male'},
    mobile: {type: String, default: ''},
    address: {type: String, default: ''},
    story: {
        type: String, 
        default: '',
        maxlength: 200
    },
    isBanned:{
        type:Boolean,
        default:false
    },
    lastSeen:{type:Date,default:Date.now()},
    website: {type: String, default: ''},
    followRequest: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    followers: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    following: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    blockedUsers: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    saved: [{type: mongoose.Types.ObjectId, ref: 'posts'}]

},{
    timestamps:true
})

module.exports = mongoose.model('user', schema)