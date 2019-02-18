const router = require('express').Router()
const postingController = require('../controller/postingController')
const tagController = require('../controller/tagController')
const images = require('../helpers/images')
const access = require('../middlewares/access')
const isAuthor = require('../middlewares/isAuthor')
// const tag = require('../controller/tagController')

// const Storage = require('@google-cloud/storage')


router.get('/posting',access, postingController.findAll)

router.patch('/posting/:id', access, isAuthor,  images.multer.single('image'), 
images.sendUploadToGCS, postingController.update)

router.post('/posting/',access,images.multer.single('image'), 
images.sendUploadToGCS, postingController.create)

router.get('/posting/user', access, postingController.findByAuthor)

router.delete('/posting/:id',access,isAuthor, postingController.delete)

router.get('/tags',tagController.allTag )



// router.post('/tag',tag.create )

module.exports = router