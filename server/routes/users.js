const router = require('express').Router()
const userController = require('../controller/userController')
const googleController = require('../controller/googleController')
const access = require('../middlewares/access')
const images = require('../helpers/images')


router.post('/', userController.create)

router.post('/login', userController.findOne)

router.post('/login/google', googleController.signin)

router.post('/verification', googleController.tokenVerification)

router.patch('/:id', access,images.multer.single('image'), 
images.sendUploadToGCS, userController.update)

module.exports = router