const express = require('express');
 // Express create onces on main index.js file , it just fetch the existing instace

const router = express.Router();
const likesController = require('../controllers/likes_controller');


router.post('/toggle', likesController.toggleLike);



module.exports = router;