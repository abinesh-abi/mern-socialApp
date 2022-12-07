
const jwt = require('jsonwebtoken')
const basicConfig = require('../config/basicConfig')
const { getUserByUserId } = require('../services/userService')

const auth = async (req,res,next)=>{
    try {
       const token =  req.header("Authorization")
       if(!token) return res.json({message: "Invalid Authentication. no tocken"})
       const decoded = jwt.verify(token,basicConfig.ACCESS_TOKEN_SECRET)
       if(!decoded) return res.json({message: "Invalid Authentication. invalied tocken"})
        const user = await getUserByUserId(decoded.id)
        req.user = user
       next()
    } catch (err) {
        return res.json({status:false,message:err.message})
    }
}
module.exports = auth