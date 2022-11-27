const bcrypt = require('bcrypt')
const multer = require('multer')
const { getUserByUserId, useridAndEmailExists, updateUser, editPassword, useridAndUserNameExists } = require("../services/userService")

const userControl ={
    searchUser:(req,res)=>{},
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
    }
}

module.exports = userControl