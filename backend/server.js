const express = require('express')
const app = express();
const cors = require('cors');
const port = 5000;

app.use(express.json())
app.use(cors())

const userRoutes = require('./users/router');
const feedRoutes = require('./feeds/router');
const commentRoutes = require('./comments/router');

app.use('/api/user', userRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/comment', commentRoutes);

app.listen(port, () => console.log('listening on port: ', port))