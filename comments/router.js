const Router = require('express').Router();
const auth = require('../middleware/auth');

const { addComment, getComments } = require('./controller');


Router.post('/add-comment',auth , addComment);

Router.get('/get-comments/:feedId', auth, getComments);

module.exports = Router;