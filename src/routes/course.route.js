const express = require('express')
const router = express.Router()

const courseController = require('../app/controllers/courseController')

router.get('/create', courseController.create)
router.post('/store', courseController.store)
router.get('/:slug', courseController.show)
router.get('/:id/update', courseController.update)
router.post('/handle-form-actions', courseController.handleFormAction)
router.put('/:id', courseController.edit)
router.patch('/:id/restore', courseController.restore)
router.delete('/:id', courseController.delete)
router.delete('/:id/distroy', courseController.distroy)
router.get('/', courseController.index)

module.exports = router