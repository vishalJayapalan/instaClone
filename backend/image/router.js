const router = require('express').Router()
const multer = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg'
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const { uploadFile, getFileStream } = require('../s3')

const upload = multer({ storage: storage })

router.post('/upload', upload.single('image'), async (req, res, next) => {

  const { file, body: { caption } } = req;

  const result = await uploadFile(file);
  res.send({ imagePath: `/image/uploads/${result.key}` })
  console.log(result)
});

router.get('/insta-posts/:key', async (req, res) => {
  console.log(req.params)
  const key = req.params.key;
  console.log('KEY', key)
  const readStream = await getFileStream(key);
  readStream.pipe(res);

})

module.exports = router