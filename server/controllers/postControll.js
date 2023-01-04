
const multer = require("multer")
const postService = require("../services/postService")
const fs = require('fs')
const { getPostById } = require("../services/postService")
const { setNotification } = require("../services/notificationService")
const postControll ={
    getPosts:async(req,res)=>{
        try {
            const user = req.user
            let {pageNumber} = req.params
            const listSize = 10;
            const currPosts = listSize * (pageNumber - 1)
            const postCount = await postService.getPostCount(user._id,user.following)
            const pageCount = Math.ceil(postCount / listSize);
            let posts = await postService.getPosts(user._id,user.following,listSize,currPosts)
            res.json({stauts:true,data:{posts,pageCount}})
        } catch (error) {
            return res.json({status:false, message:error.message})
        }
    },
    getSinglePost:async(req,res)=>{
        let {id}= req.params
        try {
             let data = await getPostById(id)
            res.json({status:true,data:data})
            
        } catch (error) {
         return res.json({message:error.message})
            
        }
    },
    getUserPosts:async(req,res)=>{
        try {
            let {userId,pageNumber} = req.params
            const listSize = 5;
            const currPosts = listSize * (pageNumber - 1)
            const postCount = await postService.userPostCount(userId)
            const pageCount = Math.ceil(postCount / listSize);
            let posts = await postService.getUserPosts(userId,listSize,currPosts)
            res.json({status:true,data:{posts,pageCount}})
        } catch (error) {
            return res.json({message:error.message})
        }

    },
    createPost:async(req,res)=>{
        try {
            let {body} =req
            let user = req.user._id
            let content =body.content 

            let data = await postService.createPost(user,content)

            // set notificatins
            const type = 'post'
            const notfiContent = 'This user liked your post'
            let setNotify = await  setNotification(user,req.user.followers,type,notfiContent,data._id)

            res.json({status:true,data})
        } catch (error) {
         return res.json({message:error.message})
        }
    },
    editImage:async (req,res)=>{
        try {
             //     /* image upload multer start*/
          // multer configaration
        const upload = multer({
            storage: multer.diskStorage({
            destination: "./uploads/posts",
            filename: function (req, file, cb) {
                cb(null, req.imageName);
            },
            }),
        }).single("image");

        req.imageName = `${req.params.id}.jpg`;
        upload(req, res, async(err) => {
            if(err) return res.json({status:false,message:'There is an erron in image uploading'})
            res.json({status:true,message:'Image Updated'});
        });
        } catch (error) {
         return res.json({status:false, message:err.message})
        }
    },
    editContent:async(req,res)=>{
        try {
            const {postId,content} = req.body
            const val = await postService.editContent(postId,content)
            res.json({status:true,data:val})
        } catch (error) {
         return res.json({status:false, message:err.message})
        }
    },
    deletePost:async(req,res)=>{
        try {
        let {id} = req.params
        const val = await postService.deletePost(id)
          if (val) {
            fs.unlink(`uploads/posts/${val._id}.jpg`,(err => {
            if (err) {
                console.log('imgage edit error')
            }
            else {
                res.json({stauts:true,data:val})
            }
            }))
          }
        } catch (error) {
         return res.json({status:false, message:error.message})
        }
    },
    likePost:async(req,res)=>{
        try {
            let {body}= req
            let id = req.user._id
            let data = await postService.likePost(body.postId,id)
            res.json({stauts:true,message:"Liked"})
        } catch (error) {
         return res.json({status:false, message:error.message})
        }
    },
    unLikePost:async(req,res)=>{
        try {
            let {body}= req
            let id = req.user._id
            let data = await postService.unLikePost(body.postId,id)
            res.json({stauts:true,message:"Uniked"})
        } catch (error) {
         return res.json({status:false, message:error.message})
        }
    },
    savedPosts:async(req,res)=>{
        try {
            const {postId}= req.body
            const userId= req.user._id
            let save = await postService.savedPost(userId,postId)
            res.json({status:true,data:save})
        } catch (error) {
         return res.json({status:false, message:error.message})
        }
    },
    getSavedPosts:async(req,res)=>{
        try {
            const userId = req.user._id
            let posts = await postService.getSavedPost(userId)
            res.json({status:true,data:posts})
            
        } catch (error) {
         return res.json({status:false, message:error.message})
        }

    },
    removeFromSaved:async(req,res)=>{
        try {
            let userId= req.user._id
            let {postId} = req.body
            const data = await postService.removeFromSaved(userId,postId)
            
            res.json({status:true,data})
        } catch (error) {
         return res.json({status:false, message:error.message})
        }
    },
    reportPost:async(req,res)=>{
        try {
            const {postId,message} = req.body
            const report = await postService.sendReport(postId,message)
            res.json({stauts:true,data:report})
        } catch (error) {
         return res.json({status:false, message:error.message})
        }
    }
}

module.exports = postControll