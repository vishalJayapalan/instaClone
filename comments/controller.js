require('dotenv').config()

const {
  addCommentInDb,
  getCommentsFromDb
} = require('./model')

const addComment = async (req, res, next) => {
const {id} = req.user
const {feedId,comment} = req.body
  try {
    const { newComment, error } = await addCommentInDb(id,feedId,comment)
    if (error) throw error
  return res.status(200).json(newComment)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Couldnt create a comment post" })
  }
}

const getComments = async (req, res) => {
  const {feedId} = req.params
  try {
    const { comments, error } = await getCommentsFromDb(feedId)
    if (error) throw error
    return res.status(200).json(comments)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Database error" })
  }
}

module.exports = { addComment,getComments }
