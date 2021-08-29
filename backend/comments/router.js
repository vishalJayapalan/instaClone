const Router = require('express').Router();
const auth = require('../middleware/auth');

const { addComment, getComments } = require('./controller');

Router.get('/' , (req,res)=>res.send('WTF'));


Router.post('/add-comment',auth , addComment);

Router.get('/get-comments/:feedId', auth, getComments);

module.exports = Router;