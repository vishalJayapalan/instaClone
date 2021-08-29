const express = require('express')
const app = express();
const cors = require('cors');
const port = 5000;

app.use(express.json())
app.use(cors())

const imageRoutes = require('./image/router');

app.use('/api/image', imageRoutes)

app.listen(port, () => console.log('listening on port: ', port))