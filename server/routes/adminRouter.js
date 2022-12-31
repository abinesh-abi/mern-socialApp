
const router = require('express').Router()
const adminAuthController = require('../controllers/admin/adminAuthController')
const adminController = require('../controllers/admin/adminController')
const authControll = require('../controllers/authControl')


router.post('/admin/login',adminAuthController.login)
// router.post('/logout',authControll.logout)
router.post('/admin/refresh_token',adminAuthController.generateAdminAccessTocken)

// User management
router.get('/admin/users/:pageNumber',adminController.getUsers)
router.get('/admin/searchUsers/:value',adminController.searchUser)

// post management
router.get('/admin/posts/:pageNumber',adminController.getPosts)
router.get('/admin/searchPosts/:value',adminController.searchPosts)

module.exports = router