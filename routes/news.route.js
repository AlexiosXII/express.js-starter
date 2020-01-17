const express = require('express')
const router = express.Router()
const NewsController = require('../controller/news.controller')

router.post('/', NewsController.create)
router.put('/', NewsController.update)
router.delete('/:id', NewsController.deleteByID)
router.get('/', NewsController.getAll)
router.get('/:id', NewsController.getByID)

module.exports = router
