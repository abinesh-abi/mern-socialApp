
const router = require('express').Router()
const adminAuthController = require('../controllers/admin/adminAuthController')
const adminController = require('../controllers/admin/adminController')


router.post('/admin/login',adminAuthController.login)
router.post('/admin/logout',adminAuthController.admnLogout)
router.post('/admin/refresh_token',adminAuthController.generateAdminAccessTocken)

// User management
router.get('/admin/users/:pageNumber',adminController.getUsers)
router.get('/admin/searchUsers/:value',adminController.searchUser)
router.patch('/admin/banUser',adminController.banUser)
router.patch('/admin/unBanUser',adminController.unBanUser)

// post management
router.get('/admin/posts/:pageNumber',adminController.getPosts)
router.get('/admin/searchPosts/:value',adminController.searchPosts)
router.patch('/admin/banPost',adminController.banPost)
router.patch('/admin/unBanPost',adminController.unBanPost)

// report management
router.get('/admin/reports/:pageNumber',adminController.getReports)

module.exports = router