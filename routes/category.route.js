const express = require('express')
const router = express.Router()
const CategoryController = require('../controller/category.controller')

router.post('/', CategoryController.create)
router.put('/', CategoryController.update)
router.delete('/:id', CategoryController.deleteByID)
router.get('/', CategoryController.getAll)
router.get('/:id', CategoryController.getByID)

module.exports = router
