const postModel = require("../models/postModel")
const reportModel = require("../models/reportModel")
const userModel = require("../models/userModel")

module.exports = {
    userCount:()=>{
        return new Promise((resolve, reject) => {
            userModel.countDocuments({})
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    getPaginatedUsers:(limit,current)=>{
        return new Promise((resolve, reject) => {
            userModel.find({}).limit(limit).skip(current).select('-password')
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    searchUsers:(limit,name)=>{
        return new Promise((resolve, reject) => {
            userModel.find({username:{$regex: name}}).limit(limit).select('-password')
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    banUser:(_id)=>{
        return new Promise((resolve, reject) => {
            userModel.updateOne({_id},
                {
                   $set:{isBanned:true}
                })
                .then(data=>resolve(data))
                .catch(error=>reject(error))
        })
    },
    unBanUser:(_id)=>{
        return new Promise((resolve, reject) => {
            userModel.updateOne({_id},
                {
                   $set:{isBanned:false}
                })
                .then(data=>resolve(data))
                .catch(error=>reject(error))
        })
    },
    // posts
    postCount:()=>{
        return new Promise((resolve, reject) => {
            postModel.countDocuments({})
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    getPaginatedPosts:(limit,current)=>{
        return new Promise((resolve, reject) => {
            postModel.aggregate([
                {
                    $skip:current
                },
                {
                    $limit:limit
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
                    $unwind:'$userDetail'
                },
            ])
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    searchPosts:(limit,name)=>{
        return new Promise((resolve, reject) => {
            postModel.aggregate([
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
                    $unwind:'$userDetail'
                },
                { 
                    $match:{
                        'userDetail.username':{$regex:name}
                    }
                 },
                {
                    $limit:limit
                },
            ])
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    
    },
    banPost:(_id)=>{
        return new Promise((resolve, reject) => {
            postModel.updateOne({_id},
                {
                   $set:{isBanned:true}
                })
                .then(data=>resolve(data))
                .catch(error=>reject(error))
        })
    },
    unBanPost:(_id)=>{
        return new Promise((resolve, reject) => {
            postModel.updateOne({_id},
                {
                   $set:{isBanned:false}
                })
                .then(data=>resolve(data))
                .catch(error=>reject(error))
        })
    },
    // reports
    reportCount:()=>{
        return new Promise((resolve, reject) => {
            reportModel.aggregate([
                {
                    $group:{
                        _id:'$postId',
                        // "val":{$push:{message:'$message'}}
                    }
                 },
                 {
                    $count:'count'
                 },
            ])
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    },
    getReports:(limit,current)=>{
        return new Promise((resolve, reject) => {
            reportModel.aggregate([
                {
                    $group:{
                        _id:'$postId',
                        "reports":{$push:{message:'$message'}}
                    }
                 },
                 {
                    $skip:current
                 },
                 {
                    $limit:limit
                 },
                 {
                    $lookup:{
                        from : "posts",
                        localField:'_id',
                        foreignField:'_id',
                        pipeline:[
                            {
                                $project:{
                                    user:1,
                                    content:1,
                                    isBanned:1
                                }
                            }
                        ],
                        as:'postDetails'
                    }
                 },
                 {
                    $unwind:'$postDetails'
                 },
                 {
                    $lookup:{
                        from : "users",
                        localField:'postDetails.user',
                        foreignField:'_id',
                        pipeline:[
                            {
                                $project:{
                                    fullname:1,
                                    username:1,
                                    email:1,
                                }
                            }
                        ],
                        as:'userDetails'
                    },
                 },
                 {
                    $unwind:'$userDetails'
                 },
                 {
                    $project:{
                        reports:1,
                        noOfReports:{$size:'$reports'},
                        postDetails:1,
                        userDetails:1

                    }
                 },
                 {
                    $sort:{noOfReports:-1}
                 },
            ])
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    }
}