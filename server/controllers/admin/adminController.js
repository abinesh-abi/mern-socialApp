const adminServies = require("../../services/adminServies");

module.exports = {
    getUsers:async(req,res)=>{
        const { pageNumber } = req.params;
        const listSize = 5;
        const userCount = await adminServies.userCount()
        const currUsers = listSize * (pageNumber - 1)
        const pageCount = Math.ceil(userCount / listSize);

        const users= await adminServies.getPaginatedUsers(listSize,currUsers)
        
        res.json({status:true , data:{pageCount,users}})
    },
    searchUser:async (req,res)=>{
        const {value} = req.params
        const pageSize = 5
        const users = await adminServies.searchUsers(pageSize,value)
        res.json({status:true,data:users})
    },

    // post management
    getPosts:async(req,res)=>{
        const { pageNumber } = req.params;
        const listSize = 5;
        const userCount = await adminServies.postCount()
        const currPosts = listSize * (pageNumber - 1)
        const pageCount = Math.ceil(userCount / listSize);

        const posts= await adminServies.getPaginatedPosts(listSize,currPosts)
        res.json({status:true , data:{pageCount,posts}})
    },
    searchPosts:async (req,res)=>{
        const {value} = req.params
        const pageSize = 5
        const posts = await adminServies.searchPosts(pageSize,value)
        res.json({status:true,data:posts})
    },
}