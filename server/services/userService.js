const { default: mongoose } = require("mongoose");
const notificationModel = require("../models/notificationModel");
const userModel = require("../models/userModel");

module.exports = {
  saveUser: (data) => {
    return new Promise((resolve, reject) => {
      new userModel({...data}).save()
      .then(val=>resolve(val))
      .catch(error=>reject(error))
    });
  },
  getUserByUserEmail: (email) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({email})
        .then(data=>resolve(data))
        .catch(error=>reject(error))
    });
  },
  getUserByUserUserName: (username) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({username})
        .then(data=>resolve(data))
        .catch(error=>reject(error))
    });
  },
  getUserByUserId: (_id) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({_id}).select('-password')
        .then(data=>resolve(data))
        .catch(error=>reject(error))
    });
  },
  useridAndEmailExists:(id,email)=>{
    return new Promise((resolve, reject) => {
      userModel.findOne({ _id:{$ne:id},email})
      .then((data)=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  useridAndUserNameExists:(id,username)=>{
    return new Promise((resolve, reject) => {
      userModel.findOne({ _id:{$ne:id},username})
      .then((data)=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  serchUser:(name)=>{
    return new Promise((resolve, reject) => {
      userModel.find({username: {$regex: name}}).limit(5).select("-password")
      .then((data)=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  updateUser:(_id,values)=>{
    return new Promise((resolve, reject) => {
      userModel.updateOne({_id},{$set:values})
      .then(data=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  editPassword:(_id,password)=>{
    return new Promise((resolve, reject) => {
      userModel.updateOne({_id},{$set:{password}})
      .then(data=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  blockUser:(userId,blocUsr)=>{
    return new Promise((resolve, reject) => {
      userModel.updateOne({_id:userId},{
        $addToSet:{blockedUsers:blocUsr} 
      })
      .then(data=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  unBlockUser:(userId,blocUsr)=>{
    return new Promise((resolve, reject) => {
      userModel.updateOne({_id:userId},{
        $pull:{blockedUsers:blocUsr} 
      })
      .then(data=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  followRequest:(userId,folloId)=>{
    return new Promise(async(resolve, reject) => {
      let addToFollowings = await userModel.findOneAndUpdate({_id:folloId},{
        $addToSet:{followRequest: userId}
      }).then(data=>resolve(data))
      .catch(error=>reject(error))
      // let addToFollowers = await userModel.findOneAndUpdate({_id:folloId},{
      //   $addToSet:{followers:userId}
      // })
    })
  },
  acceptRequest:(userId,folloId)=>{
    return new Promise(async(resolve, reject) => {
      let addToFollowings = await userModel.findOneAndUpdate({_id:userId},{
        $addToSet:{followers: folloId}
      })
      let addToFollowers = await userModel.findOneAndUpdate({_id:folloId},{
        $addToSet:{following:userId}
      })
      let removeRequest= await userModel.findOneAndUpdate({_id:userId},{
        $pull:{followRequest:folloId}
      })
      if (addToFollowings || addToFollowers) {
        resolve(true)
      }else{
        reject(false)
      }

    })
  },
  rejectRequest:(userId,folloId)=>{
    return new Promise(async(resolve, reject) => {
      let addToFollowings = await userModel.findOneAndUpdate({_id:userId},{
        $pull:{followRequest: folloId}
      }).then(data=>resolve(data))
      .catch(error=>reject(error))
      // let addToFollowers = await userModel.findOneAndUpdate({_id:folloId},{
      //   $addToSet:{followers:userId}
      // })
    })
  },
  followUser:(userId,folloId)=>{
    return new Promise(async(resolve, reject) => {
      let addToFollowings = await userModel.findOneAndUpdate({_id:userId},{
        $addToSet:{following: folloId}
      })
      let addToFollowers = await userModel.findOneAndUpdate({_id:folloId},{
        $addToSet:{followers:userId}
      })
      let removeRequest= await userModel.findOneAndUpdate({_id:userId},{
        $pull:{followRequest:folloId}
      })
      if (addToFollowings || addToFollowers) {
        resolve(true)
      }else{
        reject(false)
      }

    })
  },
  unFollowUser:(userId,folloId)=>{
    return new Promise(async(resolve, reject) => {
      let removeFromFollowings = await userModel.findOneAndUpdate({_id:userId},{
        $pull:{following: folloId}
      })
      let removeFromFollowers = await userModel.findOneAndUpdate({_id:folloId},{
        $pull:{followers:userId}
      })
      if (removeFromFollowings || removeFromFollowers) {
        resolve(true)
      }else{
        reject(false)
      }

    })
  },
  getFollowRequest:(userId)=>{
    return new Promise((resolve, reject) => {
      userModel.aggregate([
        {
          $match:{
            "_id":mongoose.Types.ObjectId(userId)
          }
        },

        {
          $lookup:{
            from:'users',
            localField:'followRequest',
            foreignField:"_id",
            as:'values'
          }
        },
        {
          $project:{
            values:1,
            _id:0
          }
        },
        { $limit : 5 },
        {
          $unwind:'$values'
        },
        {
          $project:{
            fullname:1,
            username:1,
            values:1,
            avatar:1,
            _id:0
          }
        },
      ])
      .then(data=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  getFollowers:(userId)=>{
    return new Promise((resolve, reject) => {
      userModel.aggregate([
        {
          $match:{
            "_id":mongoose.Types.ObjectId(userId)
          }
        },

        {
          $lookup:{
            from:'users',
            localField:'followers',
            foreignField:"_id",
            as:'values'
          }
        },
        {
          $project:{
            values:1,
            _id:0
          }
        },
        { $limit : 5 },
        {
          $unwind:'$values'
        },
        {
          $project:{
            fullname:1,
            username:1,
            values:1,
            avatar:1,
            _id:0
          }
        },
      ])
      .then(data=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  getFollowersPaginated:(userId,limit,skip)=>{
    return new Promise((resolve, reject) => {
      userModel.aggregate([
        {
          $match:{
            "_id":mongoose.Types.ObjectId(userId)
          }
        },

        {
          $lookup:{
            from:'users',
            localField:'followers',
            foreignField:"_id",
            as:'userDetails'
          }
        },
        {
          $project:{
            userDetails:1,
            _id:0
          }
        },
        {
          $unwind:'$userDetails'
        },
        {$skip:skip},
        { $limit : limit },
        {
          $project:{
            fullname:1,
            username:1,
            userDetails:1,
            avatar:1,
            _id:0
          }
        },
      ])
      .then(data=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  getFollowingsPaginated:(userId,limit,skip)=>{
    return new Promise((resolve, reject) => {
      userModel.aggregate([
        {
          $match:{
            "_id":mongoose.Types.ObjectId(userId)
          }
        },

        {
          $lookup:{
            from:'users',
            localField:'following',
            foreignField:"_id",
            as:'userDetails'
          }
        },
        {
          $project:{
            userDetails:1,
            _id:0
          }
        },
        {
          $unwind:'$userDetails'
        },
        {$skip:skip},
        { $limit : limit },
        {
          $project:{
            fullname:1,
            username:1,
            userDetails:1,
            avatar:1,
            _id:0
          }
        },
      ])
      .then(data=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  getFollowRequestsPaginated:(userId,limit,skip)=>{
    return new Promise((resolve, reject) => {
      userModel.aggregate([
        {
          $match:{
            "_id":mongoose.Types.ObjectId(userId)
          }
        },

        {
          $lookup:{
            from:'users',
            localField:'followRequest',
            foreignField:"_id",
            as:'userDetails'
          }
        },
        {
          $project:{
            userDetails:1,
            _id:0
          }
        },
        {
          $unwind:'$userDetails'
        },
        {$skip:skip},
        { $limit : limit },
        {
          $project:{
            fullname:1,
            username:1,
            userDetails:1,
            avatar:1,
            _id:0
          }
        },
      ])
      .then(data=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  getFollowings:(userId)=>{
    return new Promise((resolve, reject) => {
      userModel.aggregate([
        {
          $match:{
            "_id":mongoose.Types.ObjectId(userId)
          }
        },

        {
          $lookup:{
            from:'users',
            localField:'following',
            foreignField:"_id",
            as:'values'
          }
        },
        {
          $project:{
            values:1,
            _id:0
          }
        },
        { $limit : 5 },
        {
          $unwind:'$values'
        },
        {
          $project:{
            fullname:1,
            username:1,
            values:1,
            avatar:1,
            _id:0
          }
        },
      ])
      .then(data=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  retmoveFollowing:(userId,removeId)=>{
    return new Promise(async(resolve, reject) => {
      let removeFromFollowings = await userModel.findOneAndUpdate({_id:userId},{
        $pull:{following: removeId}
      })
      let removeFromFollowers = await userModel.findOneAndUpdate({_id:removeId},{
        $pull:{followers:userId}
      })
      if (removeFromFollowings || removeFromFollowers) {
        resolve(true)
      }else{
        reject(false)
      }

    })
    
  },
  getNotifications:(id)=>{
    return new Promise((resolve, reject) => {
    notificationModel.aggregate([
      {
        $addFields:{
          elementExists:{
            $cond:[{$in:[id,'$recipients']},true,false]
          }
        }
      },
      {
        $match:{elementExists:true}
      },
      {
        $lookup:{
          from:"users",
          localField:'userId',
          foreignField:"_id",
          as:'userDetail',
          pipeline:[
            {
              $project:{
                fullname:1,
                avatar:1
              }
            }
          ]
        }
      },
      {
        $sort:{createdAt:-1}
      }
    ]).then(data=>resolve(data))
    .catch(error=>reject(error))
    })
  },
  deleteNotification:(userId,notificationId)=>{
    return new Promise((resolve, reject) => {
      notificationModel.updateOne({_id:notificationId},{
        $pull:{
          recipients:userId
        }
      })
      .then(data=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  setLastSeen:(_id)=>{
    return new Promise((resolve, reject) => {
      const lastSeen =  userModel.updateOne({_id},{
        lastSeen:Date.now()
      })
      .then(data=>resolve(lastSeen))
      .catch(error=>reject(error))
    })
  },
};
