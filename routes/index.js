var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.use('/news', require('./news.route'))
router.use('/category', require('./category.route'))
router.use('/tag', require('./tag.route'))

module.exports = router
