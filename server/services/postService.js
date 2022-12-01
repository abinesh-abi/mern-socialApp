const postModel = require("../models/postModel")

module.exports = {
    createPost:(user,content)=>{
        return new Promise((resolve, reject) => {
            new postModel({user,content}).save()
               .then(data=>resolve(data))
               .catch(err=>reject(err))
        })
    },
    getPosts:(userId,following)=>{
        return new Promise((resolve, reject) => {
            postModel.find({user:[...following,userId]}).sort({updatedAt:-1})
               .then(data=>resolve(data))
               .catch(err=>reject(err))
        })
    },
    editContent:(_id,content)=>{
        return new Promise((resolve, reject) => {
            postModel.findOneAndUpdate({_id},{$set:{content}})
            .then(data =>resolve(data))
            .catch(error=> reject(error))
        })
    },
    deletePost:(_id)=>{
        return new Promise((resolve, reject) => {
            postModel.findOneAndRemove({_id})
            .then(data =>resolve(data))
            .catch(error=> reject(error))
        })
    }
}