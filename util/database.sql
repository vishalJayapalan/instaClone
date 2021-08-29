-- USERS --

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(150) NOT NULL,
  user_name VARCHAR(150) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_photo_url VARCHAR(255)
);

-- INSERT INTO users (email,user_name,password) VALUES ('','','')

-- FEEDS --

CREATE TABLE IF NOT EXISTS feeds (
  id BIGSERIAL PRIMARY KEY,
  creation_time TIMESTAMP default current_timestamp,
  caption VARCHAR(255),
  user_id BIGINT NOT NULL,
  post_photo_url VARCHAR(255),
  like_count BIGINT default 0,
  comment_count BIGINT default 0
);

-- COMMENTS -- 

CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  creation_time TIMESTAMP default current_timestamp,
  user_id BIGINT NOT NULL,
  feed_id BIGINT NOT NULL,
  comment VARCHAR(255)
);

-- LIKES

CREATE TABLE IF NOT EXISTS likes (
  user_id BIGINT NOT NULL,
  feed_id BIGINT NOT NULL
);