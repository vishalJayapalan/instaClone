const Router = require('express').Router();
const auth = require('../middleware/auth');

const { addLike, getLikes } = require('./controller');


Router.post('/add-like',auth , addLike);

Router.get('/get-likes/:feedId', auth, getLikes);

module.exports = Router;