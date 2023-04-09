// const express = require('express');
import express from 'express';
// const passport = require('passport');
import passport from 'passport';

const router = express.Router();
// const postApi = require('../../../controllers/api/v1/posts_api');
import postApi from '../../../controllers/api/v1/posts_api';

router.get('/',postApi.index);
router.delete('/:id', passport.authenticate('jwt', { session : false}),postApi.destroy);

module.exports = router;