const { pool } = require('../util/database')

const addCommentInDb = async (userId, feedId, comment) => {
  try {
    await pool.query(
      `UPDATE feeds SET comment_count = comment_count-1 WHERE feed_id = $1 RETURNING *`,
     [  feedId]
    )

    const { rows } = await pool.query(
      `INSERT INTO comments (user_id,feed_id,comment) VALUES ($1,$2,$3) RETURNING *`,
     [ userId, feedId, comment]
    )
    return { newUser: rows }
  } catch (error) {
    return { error }
  }
}

const getCommentsFromDb = async feedId => {
  try {
    const comments = await pool.query(
      `SELECT * FROM comments WHERE feed_id = $1`,
      [feedId]
    )
    return { comments }
  } catch (error) {
    return { error }
  }
}

module.exports = { addCommentInDb, getCommentsFromDb }
