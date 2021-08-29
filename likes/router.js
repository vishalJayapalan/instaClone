const Router = require('express').Router();
const auth = require('../middleware/auth');

const { addLike, getLikes,deleteLike } = require('./controller');


Router.post('/add-like',auth , addLike);

Router.delete('/delete-like',auth , deleteLike);

Router.get('/get-likes/:feedId', auth, getLikes);

module.exports = Router;