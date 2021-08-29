require('dotenv').config()

const {
  addLikeInDb,
  getLikesFromDb,
  deleteLikeInDb
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
  try {
    const { likes, error } = await getLikesFromDb(feedId)
    if (error) throw error
    const likesResult = likes.rows.map(like=> parseInt(like.user_id))
    return res.status(200).json(likesResult)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Database error" })
  }
}

const deleteLike = async (req, res, next) => {
  const {id} = req.user
  const {feedId} = req.body
    try {
      const { deletedLike, error } = await deleteLikeInDb(id,feedId)
      if (error) throw error
    return res.status(200).json(deletedLike)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Couldnt like a  post" })
    }
  }

module.exports = { addLike,getLikes,deleteLike }
