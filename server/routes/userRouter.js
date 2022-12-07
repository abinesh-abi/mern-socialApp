const router = require('express').Router()
const auth = require('../middleware/auth')
const userControl = require('../controllers/userControl')
const postControll = require('../controllers/postControll')
const commentController = require('../controllers/commentController')

router.get('/user/:id',auth,userControl.getUser)
router.post('/user/search',auth,userControl.searchUser)
router.post('/user/edit',auth,userControl.editUser)
router.post('/user/editPassword',auth,userControl.editPassword)
router.post('/user/editImage',auth,userControl.editImage)

// follow and unfollow
router.patch('/user/:id/follow',auth,userControl.follow)
router.patch('/user/:id/unFollow',auth,userControl.unFollow)
router.post('/user/followers',auth,userControl.getFollowers)

// posts
router.post('/user/posts',auth,postControll.getPosts)
router.post('/user/post/:id',auth,postControll.getSinglePost)
router.post('/user/addPost',auth,postControll.createPost)
router.post('/user/post/editImage/:id',auth,postControll.editImage)
router.patch('/user/post/editContent',auth,postControll.editContent)
router.delete('/user/post/delete/:id',auth,postControll.deletePost)
router.patch('/user/post/like',auth,postControll.likePost)
router.patch('/user/post/unLike',auth,postControll.unLikePost)

// save posts
router.post('/user/post/savePost/add',auth,postControll.savedPosts)
router.get('/user/post/savePost/get',auth,postControll.getSavedPosts)
router.patch('/user/post/savePost/remove',auth,postControll.removeFromSaved)

// comment
router.patch('/user/post/newComment',auth,commentController.addComment)
router.patch('/user/post/coment/like',auth,commentController.likeComment)
router.patch('/user/post/coment/unLike',auth,commentController.unlikeComment)
router.patch('/user/post/coment/delete',auth,commentController.deleteComment)



// /user/post/editContent/
module.exports = router