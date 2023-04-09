// const express = require('express'); 
import express from 'express';
// Express create onces on main index.js file , it just fetch the existing instace
const router = express.Router();
// const passport = require('passport');
import passport from 'passport';

// const commentsController = require('../controllers/comments_controller');
import commentsController from '../controllers/comments_controller';
// const { route } = require('./users');

router.post('/create',passport.ckeckAuthentication ,commentsController.create);
router.get('/destroy/:id',passport.ckeckAuthentication ,commentsController.destroy);


module.exports = router;