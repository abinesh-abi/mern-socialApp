const chatModel = require("../models/chatModel")
const messageModel = require("../models/messageModel")

module.exports = {
    newChat:(members)=>{
        return new Promise((resolve, reject) => {
            new chatModel({members}).save()
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    getChat:(_id)=>{
        return new Promise((resolve, reject) => {
            chatModel.find({members: { $in: [_id] }})
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    newMessage:(value)=>{
        return new Promise((resolve, reject) => {
            new messageModel(value).save()
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    },
    getMessage:(chatId)=>{
        return new Promise((resolve, reject) => {
            messageModel.find({chatId})
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    }
}