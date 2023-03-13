const express = require('express'); 
// Express create onces on main index.js file , it just fetch the existing instace
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controllers');

router.get('/profile', passport.ckeckAuthentication , usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);


router.post('/create' , usersController.create); 

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) , usersController.createSession);

router.get('/sign-out',usersController.destroySession);
 
module.exports = router;