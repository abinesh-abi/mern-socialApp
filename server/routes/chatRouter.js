const chatController = require('../controllers/chatController')
const auth = require('../middleware/auth')
const { io } = require('../server')
const userService = require('../services/userService')

const router = require('express').Router()

let users =[]
const addUser = (userId, socketId) => {
  if(userId === null) return
  if(!socketId === null) return
  const user = users.find((user) => user.userId === userId) 
  if(user) removeUser(user.socketId)
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  let user = users.filter((value)=>value.socketId == socketId)
  users = users.filter((user) => user.socketId !== socketId);
  user[0]?.userId && userService.setLastSeen(user[0].userId)
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection',socket=>{
    console.log('socket connected',socket.id)

    // take userid and socketId from user
    socket.on("addUser",(userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send and get message
   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId)
    if (!user) return
    io.to(user.socketId).emit('getMessage',{
      senderId,
      text
    })
   })


// video call
socket.on("sendCall",({othterUserId,ownId})=>{
  const user = getUser(othterUserId)
  if(user) socket.to(user.socketId).emit('callNotify',{peerId:ownId})
})

// send call accepted
socket.on('callAccepted',({otherUserId})=>{
  const user = getUser(otherUserId)
  if(user) socket.to(user.socketId).emit('callAcepeddddd',{val:'Call Accepted'})
})

socket.on('endCall',({otherUser})=>{
  const user = getUser(otherUser)
  if(user) socket.to(user.socketId).emit('callEnded',{val:'Call Ended'})
})

socket.on('rejectCall',({otherUser})=>{
  const user = getUser(otherUser)
  if(user) socket.to(user.socketId).emit('callRejected',{val:'Call Rejected'})
})


//  disconnect
  socket.on("disconnect",async()=>{
    io.emit("getUsers", users);
    console.log('a user disconnected')
    removeUser(socket.id)
  })
})



// Chat
router.post('/new',auth,chatController.newChat)
router.get('/get',auth,chatController.getChats)
router.get('/searchChat/:userId',auth,chatController.searchChat)

// messages
router.post('/message/new',auth,chatController.newMessage)
router.get('/message/getChat/:id',auth,chatController.getMessage)


module.exports = router