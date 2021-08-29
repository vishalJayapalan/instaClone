require('dotenv').config()
const { uploadFile, getFileStream } = require('../s3')

const {
  createFeedPostinDb,
  getFeedsFromDb
} = require('./model')

const createFeedPost = async (req, res, next) => {
  const {file} = req;
  const {caption} = req.body
const {id} = req.user
  try {
    const result = await uploadFile(file);
    const photoPostUrl = 'api/feed/image/'+result.key;
    const { newFeed, error } = await createFeedPostinDb(id,caption,photoPostUrl)
    if (error) throw error
  return res.status(200).json(newFeed)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Couldnt create a feed post" })
  }
}

const getFeeds = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not Logged in' })

  const userId = req.user.id
  try {
    const { feeds, error } = await getFeedsFromDb(userId)
    if (error) throw error
    for(feed of feeds.rows){
      feed.comments=[];
      feed.liked_by=[];
    }
    return res.status(200).json(feeds.rows)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Database error" })
  }
}

const getFeedImage = async (req, res) => {
  const key = req.params.key;
  const readStream = await getFileStream(key);
  readStream.pipe(res);
}

module.exports = { createFeedPost,getFeedImage,getFeeds }
