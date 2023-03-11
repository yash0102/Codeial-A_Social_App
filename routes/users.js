const express = require('express'); 
// Express create onces on main index.js file , it just fetch the existing instace

const router = express.Router();
const usersController = require('../controllers/users_controllers');

router.get('/profile',usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

module.exports = router;