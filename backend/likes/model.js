const { pool } = require('../util/database')

const addLikeInDb = async (userId, feedId,) => {
  try {
    await pool.query(
      `UPDATE feeds SET like_count = like_count+1 WHERE id = $1 RETURNING *`,
     [  feedId]
    )

    const { rows } = await pool.query(
      `INSERT INTO likes (user_id,feed_id) VALUES ($1,$2) RETURNING *`,
     [ userId, feedId]
    )
    return { newUser: rows }
  } catch (error) {
    return { error }
  }
}

const getLikesFromDb = async feedId => {
  try {
    const likes = await pool.query(
      `SELECT user_id FROM likes WHERE feed_id = $1 `,
      [feedId]
    )
    return { likes }
  } catch (error) {
    return { error }
  }
}

module.exports = { addLikeInDb, getLikesFromDb }
