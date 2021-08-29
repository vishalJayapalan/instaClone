const Router = require('express').Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const fs = require('fs')
const { createFeedPost, getFeedImage,getFeeds } = require('./controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg'
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

Router.post('/upload', upload.single('image'),auth, createFeedPost );

Router.get('/image/:key', getFeedImage)

Router.get('/get-feeds', auth, getFeeds);

module.exports = Router;