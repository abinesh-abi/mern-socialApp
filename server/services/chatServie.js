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
            chatModel.aggregate([
                {
                    $match:{
                        members:{ $in: [_id] }
                    },
                },
            ])
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    isChatExitst : (ids)=>{
        return new Promise((resolve, reject) => {
            chatModel.findOne({members:{$all:ids}})
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
    getMessage:(ChatId)=>{
        return new Promise((resolve, reject) => {
            messageModel.find({ChatId})
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    }
}