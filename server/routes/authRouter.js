const router = require('express').Router()
const authControll = require('../controllers/authControl')
const auth = require('../middleware/auth')


router.post('/reqestOtp',authControll.reqestOtp)
router.post('/register',authControll.register)
router.post('/login',authControll.login)
router.post('/logout',authControll.logout)
router.post('/refresh_token',authControll.generateAccessTocken)

module.exports = router