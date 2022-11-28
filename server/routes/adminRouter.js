
const router = require('express').Router()
const adminController = require('../controllers/adminController')
const authControll = require('../controllers/authControl')


router.post('/admin/login',adminController.login)
// router.post('/logout',authControll.logout)
router.post('/admin/refresh_token',adminController.generateAdminAccessTocken)

module.exports = router