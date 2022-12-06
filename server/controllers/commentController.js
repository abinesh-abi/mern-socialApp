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

    }
}