const MeStoreController = require('../app/controllers/MeStoreController')
const express = require('express')
const router = express.Router()

router.get('/trash/course', MeStoreController.trash)
router.get('/store/course', MeStoreController.store)
module.exports = router