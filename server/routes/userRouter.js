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
router.get('/users/followersPaginated/:pageNumber',auth,userControl.getFollowersPaginated)
router.get('/users/followingsPaginated/:pageNumber',auth,userControl.getFollowingsPaginated)
router.post('/user/followings',auth,userControl.getFollowings)
router.post('/user/followRequest',auth,userControl.getFollowRequests)
router.get('/user/followRequestPaginated/:pageNumber',auth,userControl.getFollowRequestPaginated)
router.patch('/user/:id/acceptRequest',auth,userControl.acceptRequest)
router.patch('/user/:id/rejectRequest',auth,userControl.rejectRequest)
router.patch('/user/followings/remove',auth,userControl.removeFollowings)

// Block And Unblock
router.patch('/user/block',auth,userControl.blockUser)
router.patch('/user/unBlock',auth,userControl.unBlockUser)


// posts
router.post('/user/posts/:pageNumber',auth,postControll.getPosts)
router.post('/user/post/:id',auth,postControll.getSinglePost)
router.post('/user/addPost',auth,postControll.createPost)
router.post('/user/post/editImage/:id',auth,postControll.editImage)
router.patch('/user/post/editContent',auth,postControll.editContent)
router.delete('/user/post/delete/:id',auth,postControll.deletePost)
router.patch('/user/post/like',auth,postControll.likePost)
router.patch('/user/post/unLike',auth,postControll.unLikePost)
// user's post
router.get('/user/userPosts/:userId/:pageNumber',auth,postControll.getUserPosts)
// report
router.post('/user/report/post',auth,postControll.reportPost)


// notification
router.get('/user/notification/get',auth,userControl.getNotificatins)
router.delete('/user/notification/delete/:id',auth,userControl.deleteNotification)

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
