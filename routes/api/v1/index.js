// const express = require('express');
import express from 'express';
import postRouter from './posts'
import userRouter from './users'
const router = express.Router();

router.use('/posts' , postRouter );
router.use('/users' , userRouter );

module.exports = router;