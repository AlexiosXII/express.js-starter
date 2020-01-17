const createError = require('http-errors')
const express = require('express')
const path = require('path')
// const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const chalk = require('chalk')
global.Promise = require("bluebird");
global.chalk = chalk;

require('./util/env.checker').envChecker()

const router = require('./routes/index')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

if (process.env.NODE_ENV == 'production') {
  const whitelist = process.env.WHITELIST_DOMAIN.split('|') || []
  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
  app.use(cors(corsOptions))
} else {
  app.use(cors())
}

app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    error_code: err.status || 500,
    error_result: err.result || {},
    error_message: err.message,
  });
});

module.exports = app
