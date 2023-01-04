const { default: mongoose } = require("mongoose")
const postModel = require("../models/postModel")
const ReportModel = require("../models/reportModel")
const userModel = require("../models/userModel")

module.exports = {
    createPost:(user,content)=>{
        return new Promise((resolve, reject) => {
            new postModel({user,content}).save()
               .then(data=>resolve(data))
               .catch(err=>reject(err))
        })
    },
    getPostById:(_id)=>{
        return new Promise(async(resolve, reject) => {
            let {comments} =await postModel.findOne({_id})
            if (comments.length) {
            
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
            }else{
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
                {$unwind:'$userDetail'},
                {
                    $sort:{createdAt:-1}
                },
            ])
            .then(data=>resolve(data))
            .catch(error=>reject(error))
            }
        })
    },
    getPostCount:(userId,following)=>{
        return new Promise((resolve, reject) => {
            postModel.find({user:[...following,userId],}).countDocuments()
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    getPosts:(userId,following,limit,skip)=>{
        return new Promise((resolve, reject) => {
            // postModel.find({user:[...following,userId]}).sort({createdAt:-1})
            postModel.aggregate([
                {
                    $match:{user:{
                        $in:[...following,userId]
                    },
                    isBanned:false
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
                        // comments:1,
                        // commentDetails:{$reverseArray:'$commentDetails'},
                        commentDetails:1,
                        content:1,
                        likes:1,
                        user:1,
                        userDetail:1,
                    }
                },
                {
                    $skip:skip
                },
                {
                    $limit:limit
                }
            ])
               .then(data=>resolve(data) )
               .catch(err=>reject(err))
        })
    },
    userPostCount:(user)=>{
        return new Promise((resolve, reject) => {
            postModel.countDocuments({user})
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    getUserPosts:(userId,limit,skip)=>{
        return new Promise((resolve, reject) => {
            // postModel.find({user:userId})
            postModel.aggregate([
                {
                    $match:{user:mongoose.Types.ObjectId(userId),
                    isBanned:false
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
                        // comments:1,
                        // commentDetails:{$reverseArray:'$commentDetails'},
                        commentDetails:1,
                        content:1,
                        likes:1,
                        user:1,
                        userDetail:1,
                    }
                },
                {
                    $skip:skip
                },
                {
                    $limit:limit
                }
            ])
            .then(data=>resolve(data))
            .catch(error=> reject(error))
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
            let commentId = mongoose.Types.ObjectId()
            postModel.updateOne({_id},{$push:{ comments:{message,user,commentId}}})
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    likeComment:(_id,userid,commentId)=>{
        return new Promise((resolve, reject) => {
            postModel.findOneAndUpdate({_id,'comments.commentId':commentId},{$addToSet:{"comments.$.like":userid}})
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    unLikeComment:(_id,userid,commentId)=>{
        return new Promise((resolve, reject) => {
            postModel.updateOne({_id,'comments.commentId':commentId},{$pull:{"comments.$.like":userid}})
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    deleteComment:(_id,commentId)=>{
        return new Promise((resolve, reject) => {
            postModel.updateOne({_id,'comments.commentId':commentId},{$pull:{comments:{commentId}}})
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    savedPost:(userId,postId)=>{
        return new Promise((resolve, reject) => {
            userModel.updateOne({_id:userId},{$addToSet:{saved:postId}})
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    getSavedPost:(userId)=>{
        return new Promise((resolve, reject) => {
            userModel.aggregate([
                {
                    $match:{_id:userId}
                },
                {
                    $unwind:"$saved"
                },
                {
                    $lookup:{
                        from:'posts',
                        localField:'saved',
                        foreignField:"_id",
                        as:"postDetails"
                    }
                },
                {
                    $unwind:'$postDetails'
                },

                {
                    $lookup:{
                        from:'users',
                        localField:'postDetails.user',
                        foreignField:"_id",
                        as:"userDetail"
                    }
                },
                {
                    $unwind:'$userDetail'
                },
            ])
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    removeFromSaved:(userId,postId)=>{
        return new Promise((resolve, reject) => {
            
            userModel.updateOne({_id:userId},{$pull:{saved:postId}})
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    sendReport:(postId,message)=>{
        return new Promise((resolve, reject) => {
            const report = new ReportModel({postId,message}).save()
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    }

}