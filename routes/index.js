// const express = require('express');
import express from 'express';
 // Express create onces on main index.js file , it just fetch the existing instace

const router = express.Router();
// const homeController = require('../controllers/home_controller');
import homeController from '../controllers/home_controller';

console.log('router loaded');

import users from './users';
import posts from './posts';
import comments from './comments';
import likes from './likes';
import api from './api'


router.get('/',homeController.home);
router.use('/users',users); // any request come from "/users" it requires
router.use('/posts',posts);
router.use('/comments',comments);
router.use('/likes', likes);

router.use('/api' , api);

// for any further routes , access from here
// router.use('/routerName',require('./routerFile'));

module.exports = router;