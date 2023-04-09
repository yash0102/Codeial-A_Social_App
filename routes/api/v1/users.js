// const express = require('express');
import express from 'express';


const router = express.Router();
// const usersApi = require('../../../controllers/api/v1/users_api');
import usersApi from '../../../controllers/api/v1/users_api';

router.post('/create-session',usersApi.createSession);

module.exports = router;