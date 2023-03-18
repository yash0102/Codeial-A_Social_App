const express = require('express'); 
// Express create onces on main index.js file , it just fetch the existing instace
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');
const { route } = require('./users');

router.post('/create',passport.ckeckAuthentication ,commentsController.create);

module.exports = router;