const router = require('express').Router()
const auth = require('../middleware/auth')
const userControl = require('../controllers/userControl')

router.get('/user/:id',auth,userControl.getUser)
router.post('/user/edit',auth,userControl.editUser)
router.post('/user/editPassword',auth,userControl.editPassword)
router.post('/user/editImage',auth,userControl.editImage)

module.exports = router