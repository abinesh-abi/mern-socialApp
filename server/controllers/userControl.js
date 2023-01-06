const bcrypt = require('bcrypt')
const multer = require('multer')
const { setNotification } = require('../services/notificationService')
const userService = require('../services/userService')
const { getUserByUserId, useridAndEmailExists, updateUser, editPassword, useridAndUserNameExists, serchName, serchUser, followUser, unFollowUser, getFollowers, getNotifications, deleteNotification, followRequest, getFollowRequest, acceptRequest, blockUser, unBlockUser, getFollowings, retmoveFollowing, rejectRequest } = require("../services/userService")

const postControll ={
    searchUser: async(req,res)=>{
        try {
            const {name} = req.body
            const users = await serchUser(name)
            res.json({users})
        } catch (error) {
            return res.json({message:err.message})
        }
        
    },
    getUser: async (req, res) => {
        try {
            const user = await getUserByUserId(req.params.id)
            if(!user) return res.json({status:false, message: "User does not exist."})
            res.json({user})
        } catch (err) {
            return res.json({message: err.message})
        }
    },
    editUser:async (req,res)=>{
        try {
            let id = req.user._id
            let {body} = req
            const user = await useridAndEmailExists(id,body.email)
            let userNameExitsts = await useridAndUserNameExists(id,body.username)

            
            if(user) return res.json({message: "This Email is already Taken"})
            if(userNameExitsts) return res.json({message: "This User Name is already Taken"})

            let update = await updateUser(id,body)
            res.json({status:true,message:"User Detail Updated"})
        } catch (err) {
            return res.json({message: err.message})
        }
        
    },
    editPassword: async (req,res)=>{
        const {oldPassword,newPassword} = req.body

        const id = req.user._id
        const {password} = await getUserByUserId(id)
        let passwordMatch = await bcrypt.compare(oldPassword, password);
        if (!passwordMatch)return res.json({status:false,message:'Invalied Old Password'}) 

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        let changedPassword = await editPassword(id,hashedPassword)
        res.json({status:true,data:changedPassword})
    },
    editImage:(req,res)=>{
        let id = req.user._id

          // multer configaration
        const upload = multer({
            storage: multer.diskStorage({
            destination: "./uploads/profile",
            filename: function (req, file, cb) {
                cb(null, req.imageName);
            },
            }),
        }).single("image");

        req.imageName = `${id}.jpg`;
        upload(req, res, async(err) => {
            if(err) return console.log(err)
            let update = await updateUser(id,{avatar:id})
            res.json({status:true,message:'Image Updated'});
        });
            //     /* image upload multer end*/
    },
    follow:async(req,res)=>{
        try {
            let id = req.user.id
            let folloUserId = req.params.id
            let followed = await  followRequest(id,folloUserId)

            // set notificatins
            const type = 'followRequest'
            const content = 'This user sent a follow reqrest'
            let setNotify = await  setNotification(id,req.user.followers,type,content,id)

            if (followed) {
                res.json({status:true,message:'followed'});
            }
        } catch (error) {
            res.json({status:false,message:error.message});
        }
    },
    unFollow:async(req,res)=>{
        try {
            let id = req.user.id
            let folloUserId = req.params.id

            let unFollowed = await  unFollowUser(id,folloUserId)
            if (unFollowed) {
                res.json({status:true,message:'unfollowed'});
            }
        } catch (error) {
            res.json({status:false,message:error.message});
        }
    },
    getFollowers:async(req,res)=>{
        try {
            let user= req.user.id
            let followers = await getFollowers(user)
            res.json({status:true,data:followers})

        } catch (error) {
           res.json({status:false,message:error.message});
        }
    },
    getFollowersPaginated:async(req,res)=>{
        try {
            const id = req.user._id
            let {pageNumber} = req.params
            const listSize = 8;
            const currPosts = listSize * (pageNumber - 1)
            let count = req.user.followers.length
            const pageCount = Math.ceil(count / listSize);
            let followers = await userService.getFollowersPaginated(id,listSize,currPosts)
            res.json({stauts:true,data:{followers,pageCount}})
        } catch (error) {
            return res.json({status:false, message:error.message})
        }
    },
    getFollowingsPaginated:async(req,res)=>{
        try {
            const id = req.user._id
            let {pageNumber} = req.params
            const listSize = 8;
            const currPosts = listSize * (pageNumber - 1)
            let count = req.user.following.length
            const pageCount = Math.ceil(count / listSize);
            let followings = await userService.getFollowingsPaginated(id,listSize,currPosts)
            res.json({stauts:true,data:{followings,pageCount}})
        } catch (error) {
            return res.json({status:false, message:error.message})
        }
    },
    getFollowings:async(req,res)=>{
        try {
            let user= req.user.id
            let followings = await getFollowings(user)
            res.json({status:true,data:followings})

        } catch (error) {
           res.json({status:false,message:error.message});
        }
    },
    removeFollowings:async(req,res)=>{
        try {
            let {removeId} = req.body
            let id = req.user._id
            let removed = await retmoveFollowing(id,removeId)
            res.json({status:true,message:"removed"})
        } catch (error) {
           res.json({status:false,message:error.message});
        }
    },
    getFollowRequests:async(req,res)=>{
        try {
            let user= req.user.id

            let reqrests = await getFollowRequest(user)
            res.json({status:true,data:reqrests})

        } catch (error) {
           res.json({status:false,message:error.message});
        }
    },
    getFollowRequestPaginated:async(req,res)=>{
        try {
            const id = req.user._id
            let {pageNumber} = req.params
            const listSize = 8;
            const currPosts = listSize * (pageNumber - 1)
            let count = req.user.followRequest.length
            const pageCount = Math.ceil(count / listSize);
            let requests = await userService.getFollowRequestsPaginated(id,listSize,currPosts)
            res.json({stauts:true,data:{requests,pageCount}})
        } catch (error) {
            return res.json({status:false, message:error.message})
        }
    },
    acceptRequest:async(req,res)=>{
        try {
            let id = req.user.id
            let folloUserId = req.params.id


            let followed = await  acceptRequest(id,folloUserId)

                res.json({status:true,message:'followed'});
            
        } catch (error) {
           res.json({status:false,message:error.message});
        }
    },
    rejectRequest:async(req,res)=>{
        try {
            let id = req.user.id
            let folloUserId = req.params.id
            let followed = await  rejectRequest(id,folloUserId)
            res.json({status:true,message:'reqest rejected'});
        } catch (error) {
           res.json({status:false,message:error.message});
        }
    },
    blockUser:async(req,res)=>{
        try {
            let {user} = req.body
            let id = req.user._id
            let data = await blockUser(id,user)
            res.json({status:true,data})
            
        } catch (error) {
           res.json({status:false,message:error.message});
        }
        
    },
    unBlockUser:async(req,res)=>{
        try {
            let {user} = req.body
            let id = req.user._id
            let data = await unBlockUser(id,user)
            res.json({status:true,data})
            
        } catch (error) {
           res.json({status:false,message:error.message});
        }
        
    },
    getNotificatins:async(req,res)=>{
        try {
            let userId = req.user._id
            let notifications = await getNotifications(userId)
            res.json({status:true,data:notifications})
        } catch (error) {
           res.json({status:false,message:error.message});
        }
    },
    deleteNotification:async(req,res)=>{
        try {
            let userId = req.user._id
            let notificationId = req.params.id
            let data = await deleteNotification(userId,notificationId)
            res.json({status:true,data})
        } catch (error) {
           res.json({status:false,message:error.message});
        }
    }
}

module.exports = postControll