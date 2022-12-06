const { default: mongoose } = require("mongoose")
const postModel = require("../models/postModel")

module.exports = {
    createPost:(user,content)=>{
        return new Promise((resolve, reject) => {
            new postModel({user,content}).save()
               .then(data=>resolve(data))
               .catch(err=>reject(err))
        })
    },
    getPostById:(_id)=>{
        return new Promise((resolve, reject) => {
            postModel.aggregate([
                {
                    $match:{_id:mongoose.Types.ObjectId(_id)}
                },
                {
                    $project:{
                        comments:{$reverseArray:'$comments'},
                        commentDetails:1,
                        content:1,
                        likes:1,
                        user:1,
                        userDetail:1,
                    }
                },
                {$unwind:'$comments'},
                {
                    $lookup:{
                        from:'users',
                        foreignField:'_id',
                        localField:'user',
                        pipeline:[
                            {
                                $project:{
                                    username:1,
                                    fullname:1,
                                    avatar:1,
                                }
                            }
                        ],
                        as:"userDetail"
                        
                    }
                },
                {
                    $lookup:{
                        from:'users',
                        localField:'comments.user',
                        foreignField:'_id',
                        pipeline:[
                            {
                                $project:{
                                    username:1,
                                    fullname:1,
                                    avatar:1,
                                }
                            }
                        ],
                        as:"commentDetails"
                        
                    }
                },
                {$unwind:'$userDetail'},
                {$unwind:'$commentDetails'},
                {
                    $sort:{createdAt:-1}
                },
            ])
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    getPosts:(userId,following)=>{
        return new Promise((resolve, reject) => {
            // postModel.find({user:[...following,userId]}).sort({createdAt:-1})
            postModel.aggregate([
                {
                    $match:{user:{
                        $in:[...following,userId]
                    }
                }
                },
                {
                    $lookup:{
                        from:'users',
                        foreignField:'_id',
                        localField:'user',
                        pipeline:[
                            {
                                $project:{
                                    username:1,
                                    fullname:1,
                                    avatar:1,
                                }
                            }
                        ],
                        as:"userDetail"
                        
                    }
                },
                {
                    $lookup:{
                        from:'users',
                        foreignField:'_id',
                        localField:'comments.user',
                        pipeline:[
                            {
                                $project:{
                                    username:1,
                                    fullname:1,
                                    avatar:1,
                                }
                            }
                        ],
                        as:"commentDetails"
                        
                    }
                },
                {$unwind:'$userDetail'},
                {
                    $sort:{createdAt:-1}
                },
                {
                    $project:{
                        comments:{$reverseArray:'$comments'},
                        commentDetails:1,
                        content:1,
                        likes:1,
                        user:1,
                        userDetail:1,
                    }
                }
            ])
               .then(data=>resolve(data) )
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
    likePost:(postId,userId)=>{
        return new Promise((resolve, reject) => {
             postModel.findOneAndUpdate({_id:postId},{
                $addToSet:{likes: userId}
            })
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    unLikePost:(postId,userId)=>{
        return new Promise((resolve, reject) => {
             postModel.findOneAndUpdate({_id:postId},{
                $pull:{likes: userId}
            })
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    deletePost:(_id)=>{
        return new Promise((resolve, reject) => {
            postModel.findOneAndRemove({_id})
            .then(data =>resolve(data))
            .catch(error=> reject(error))
        })
    },
    addComment:(_id,message,user)=>{
        return new Promise((resolve, reject) => {
            postModel.updateOne({_id},{$push:{ comments:{message,user}}})
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    }
}