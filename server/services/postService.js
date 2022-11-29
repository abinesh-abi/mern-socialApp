const postModel = require("../models/postModel")

module.exports = {
    getPosts:(userId,following)=>{
        return new Promise((resolve, reject) => {
            postModel.find({user:[...following,userId]})
               .then(data=>resolve(data))
               .catch(err=>reject(err))
        })
    },
    createPost:(user,content)=>{
        return new Promise((resolve, reject) => {
            new postModel({user,content}).save()
               .then(data=>resolve(data))
               .catch(err=>reject(err))
        })
    },
}