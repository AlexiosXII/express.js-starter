const express = require('express')
const router = express.Router()
const TagController = require('../controller/tag.controller')

router.get('/', TagController.getAll)

module.exports = router
