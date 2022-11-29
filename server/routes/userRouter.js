const router = require('express').Router()
const auth = require('../middleware/auth')
const userControl = require('../controllers/userControl')
const postControll = require('../controllers/postControll')

router.get('/user/:id',auth,userControl.getUser)
router.post('/user/search',auth,userControl.searchUser)
router.post('/user/edit',auth,userControl.editUser)
router.post('/user/editPassword',auth,userControl.editPassword)
router.post('/user/editImage',auth,userControl.editImage)

// posts
router.post('/user/posts',auth,postControll.getPosts)
router.post('/user/addPost',auth,postControll.createPost)
router.post('/user/post/editImage/:id',auth,postControll.editImage)
router.delete('/user/post/delete/:id',auth,postControll.deletePost)


module.exports = router