const postModel = require("../models/postModel")
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
                // {
                //     $skip:current
                // },
                // {
                //     $limit:limit
                // },
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
                        'userDetail.username':'abinesh'
                    }
                 }
            ])
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    
    },
}