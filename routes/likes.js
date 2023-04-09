// const express = require('express');
import express from 'express';
 // Express create onces on main index.js file , it just fetch the existing instace

const router = express.Router();
// const likesController = require('../controllers/likes_controller');
import likesController from '../controllers/likes_controller'


router.post('/toggle', likesController.toggleLike);



module.exports = router;