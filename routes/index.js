const express = require('express'); // Express create onces on main index.js file , it just fetch the existing instace

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homeController.home);

module.exports = router;