const { pool } = require('../util/database')

const createFeedPostinDb = async (userId, caption, postPhotoUrl) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO feeds (user_id,caption,post_photo_url) VALUES ($1,$2,$3) RETURNING *`,
      [userId, caption, postPhotoUrl]
    )

    return { newFeed: rows }
  } catch (error) {
    return { error }
  }
}

const getFeedsFromDb = async userId => {
  try {
          // const feeds = await pool.query(
          //   `SELECT f.*,c.comment,fu.user_name as feed_user_name, cu.user_name as comment_user_name
          //   FROM 
          //   feeds f 
          //   LEFT JOIN comments AS c
          //    ON c.post_id = f.id 
          //    LEFT JOIN users AS fu
          //     ON f.user_id = fu.id 
          //     LEFT JOIN users cu 
          //      ON c.user_id = cu.id`)
          const feeds = await pool.query(
            `SELECT f.*,u.user_name as feed_user_name
            FROM 
            feeds f 
             LEFT JOIN users AS u
              ON f.user_id = u.id ORDER BY f.id DESC`)
    return { feeds }
  } catch (error) {
    return { error }
  }
}

module.exports = {  createFeedPostinDb,getFeedsFromDb }

