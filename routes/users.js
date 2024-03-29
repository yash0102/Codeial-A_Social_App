const express = require('express'); 
// Express create onces on main index.js file , it just fetch the existing instace
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controllers');

router.get('/profile/:id', passport.ckeckAuthentication , usersController.profile);
router.post('/update/:id', passport.ckeckAuthentication , usersController.update);


router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);


router.post('/create' , usersController.create); 

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) , usersController.createSession);

router.get('/sign-out',usersController.destroySession);


router.get('/auth/google', passport.authenticate('google',{scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in'}), usersController.createSession);
 
router.get('/reset-password', usersController.resetPassword);
router.post('/send-reset-pass-mail', usersController.resetPassMail);

router.get('/reset-password/:accessToken', usersController.setPassword);
router.post('/update-password/:accessToken', usersController.updatePassword);

module.exports = router;