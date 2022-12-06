
const multer = require("multer")
const postService = require("../services/postService")
const fs = require('fs')
const { getPostById } = require("../services/postService")
const postControll ={
    getPosts:async(req,res)=>{
        const user = req.user
        let data = await postService.getPosts(user._id,user.following)
        res.json({stauts:true,data})
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
    createPost:async(req,res)=>{
        try {
            let {body} =req
            let user = req.user._id
            let content =body.content 
            let data = await postService.createPost(user,content)
            res.json({status:true,data})
        } catch (error) {
         return res.json({message:err.message})
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
            res.json({stauts:true,data:val})
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
}

module.exports = postControll