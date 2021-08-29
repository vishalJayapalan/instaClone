require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const path = require('path')

app.use(express.json())
app.use(cors())

const userRoutes = require('./users/router');
const feedRoutes = require('./feeds/router');
const commentRoutes = require('./comments/router');
const likeRoutes = require('./likes/router');

if (process.env.NODE_ENV === 'production') {
  // serve static content
  app.use(express.static(path.join(__dirname, '..', 'myapp', 'build')))
  app.get('*', (req, res) => {
    const index = path.join(__dirname, '..', 'myapp', 'build', 'index.html')
    res.sendFile(index)
  })
}

app.use('/api/user', userRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/like', likeRoutes);

app.listen(PORT, () => console.log('listening on PORT: ', PORT))