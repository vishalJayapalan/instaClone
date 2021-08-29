const express = require('express')
const app = express();
const cors = require('cors');
const port = 5000;

app.use(express.json())
app.use(cors())

const imageRoutes = require('./image/router');
const userRoutes = require('./users/router');

app.use('/api/image', imageRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => console.log('listening on port: ', port))