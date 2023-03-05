const express = require('express'); 
// Express create onces on main index.js file , it just fetch the existing instace

const router = express.Router();
const usersController = require('../controllers/users_controllers');

router.get('/profile',usersController.profile);

module.exports = router;