const chatController = require('../controllers/chatController')
const { newChat } = require('../controllers/chatController')
const auth = require('../middleware/auth')
const { io } = require('../server')

const router = require('express').Router()

let users =[]
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection',socket=>{
    console.log('socket connected')


    socket.on("addUser",(userId) => {
    console.log(userId,socket.id)
    addUser(userId._id, socket.id);
    io.emit("connected", users);
  });


})



// io.on('connection',(socket)=>{
//     console.log('socket connected')
//     socket.on('setup',userData =>{
//         socket.join(userData._id)
//         socket.emit('connected')
//     })
//     socket.on('join chat',room => {
//         socket.join(room,);
//     })
//     socket.on('new message',(newMessagesRecived)=>{
//         var chat = newMessagesRecived

//         if(!chat.chat.members) return console.log('chat.users not defined')

//         chat.chat.members.forEach(user => {
//             // if (user._id == newMessagesRecived.sender._id) return
//            socket.emit('message recieved',newMessagesRecived.message)
//         });
//     })
// })

// Chat
router.post('/new',auth,chatController.newChat)
router.get('/get',auth,chatController.getChats)

// messages
router.post('/message/new',auth,chatController.newMessage)
router.get('/message/getChat/:id',auth,chatController.getMessage)


module.exports = router