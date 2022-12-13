const chatServie = require("../services/chatServie");

module.exports ={
    newChat:async(req,res)=>{
        try {
            let {senderId,receiverId} = req.body
            const savedChat = await chatServie.newChat([senderId,receiverId])
            res.status(200).json({status:true,data:savedChat});
        } catch (error) {
            res.json({status:false,message:error.message});
        }
    },
    getChats:async(req,res)=>{
        let id = req.user._id
        try {
            let Chat = await chatServie.getChat(id)
            res.status(200).json({status:true,data:Chat});
        } catch (error) {
            res.json({status:false,message:error.message});
        }
    },newMessage:async(req,res)=>{
        try {
            let message = await chatServie.newMessage(req.body)
            res.status(200).json({status:true,data:message});
        } catch (error) {
            res.json({status:false,message:error.message});
        }
    },getMessage:async(req,res)=>{
        try {
            let id = req.params.id
            let message = await chatServie.getMessage(id)
            res.status(200).json({status:true,data:message});
        } catch (error) {
            res.json({status:false,message:error.message});
        }
    }
}