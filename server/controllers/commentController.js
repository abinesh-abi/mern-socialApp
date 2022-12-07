const postService = require("../services/postService")

module.exports ={
    addComment: async(req,res)=>{
        try {
            let {postUser,comment,postId} = req.body
            let newComment = await postService.addComment(postId ,comment,postUser)
            res.json({status:true,message:'comment added'})
            
        } catch (error) {
         return res.status(500).json({ status: false, message: error.message });
        }
    },
    getComments:(req,res)=>{

    },
    likeComment:async(req,res)=>{
        try {
            let {postId,commentId} =req.body
            let userId = req.user._id
            let liked = await postService.likeComment(postId,userId,commentId)
            res.json({status:'true',data:liked})
        } catch (error) {
         return res.status(500).json({ status: false, message: error.message });
        }
    },
    unlikeComment:async(req,res)=>{
        try {
            let {postId,commentId} =req.body
            let userId = req.user._id
            let unLiked = await postService.unLikeComment(postId,userId,commentId)
            res.json({status:'true',data:unLiked})
        } catch (error) {
         return res.status(500).json({ status: false, message: error.message });
        }
    },
    deleteComment:async (req,res)=>{
        try {
            const {postId,commentId} = req.body
            const deleted = await postService.deleteComment(postId,commentId)
            res.json({status:'true',message:'Comment Deleted'})
        } catch (error) {
         return res.status(500).json({ status: false, message: error.message });
        }
    }
}