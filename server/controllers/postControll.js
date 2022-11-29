
const multer = require("multer")
const postService = require("../services/postService")

const postControll ={
    getPosts:async(req,res)=>{
        const user = req.user
        let data = await postService.getPosts(user._id,user.following)
        res.json({stauts:true,data})
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
         return res.json({message:err.message})
        }
    },deletePost:(req,res)=>{
        try {
        let {id} = req.params
        const val = postService.deletePost(id)
        res.json({stauts:true,data:val})
        } catch (error) {
         return res.json({status:false, message:err.message})
        }
    }
}

module.exports = postControll