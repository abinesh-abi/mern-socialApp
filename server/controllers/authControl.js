let bcrypt = require('bcrypt')
const userService = require("../services/userService")


module.exports ={
    register:async (req,res)=>{
        try {
            let {fullname,username,email,password} =  req.body
            console.log(fullname,username,email,password) ////////////
            let isUserexists = await userService.getUserByUserEmail(email)
            if(isUserexists) return res.status(400).json({status:false,message:"This Email Already taken"})
            
            const hashePassWord = await bcrypt.hash(password,10)

            res.json({hashePassWord})
        } catch (error) {
            return res.status(500).json({status:false,message:error.message})
        }
    },
    login:async (req,res)=>{
        try {
            
        } catch (error) {
            return res.status(500).json({status:false,message:error.message})
        }
    },
    logout:async (req,res)=>{
        try {
            
        } catch (error) {
            return res.status(500).json({status:false,message:error.message})
        }
    },
    generateAccessTocken:async (req,res)=>{
        try {
            
        } catch (error) {
            return res.status(500).json({status:false,message:error.message})
        }
    },
}