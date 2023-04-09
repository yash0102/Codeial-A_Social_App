// const express = require('express'); 
import express from 'express';
// Express create onces on main index.js file , it just fetch the existing instace
const router = express.Router();
// const passport = require('passport');
import passport from 'passport';

// const postsController = require('../controllers/posts_controller');
import postsController from '../controllers/posts_controller'
const { route } = require('./users');

router.post('/create',passport.ckeckAuthentication ,postsController.create);
router.get('/destroy/:id', passport.ckeckAuthentication, postsController.destroy);

module.exports = router;