const express = require('express'); 
// Express create onces on main index.js file , it just fetch the existing instace
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');
const { route } = require('./users');

router.post('/create',passport.ckeckAuthentication ,postsController.create);

module.exports = router;