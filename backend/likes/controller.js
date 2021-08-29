require('dotenv').config()

const {
  addLikeInDb,
  getLikesFromDb
} = require('./model')

const addLike = async (req, res, next) => {
const {id} = req.user
const {feedId} = req.body
  try {
    const { newLike, error } = await addLikeInDb(id,feedId)
    if (error) throw error
  return res.status(200).json(newLike)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Couldnt like a  post" })
  }
}

const getLikes = async (req, res) => {
  const {feedId} = req.params
  console.log(feedId)
  try {
    const { likes, error } = await getLikesFromDb(feedId)
    if (error) throw error
    const likesResult = likes.row.map(like=> like.user_id)
    return res.status(200).json(likesResult)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Database error" })
  }
}

module.exports = { addLike,getLikes }
