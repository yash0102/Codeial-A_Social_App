const passport = require("passport");
const User = require("../models/user");

const LocalStrategy = require("passport-local").Strategy;

const user = require("../models/user");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    function (req, email, password, done) {
      // find user and establish the identity
      User.findOne({ email: email }).then((user) =>{
        // if(err){
        //     console.log('Error in finding user --> Passport');
        //     return done(err);
        // }

        if(!user || user.password != password){
            req.flash('error','Invalid Username/Password');
            return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    user.findById(id).then((user)=> {
        // if(err){
        //     console.log('Error in finding user --> Passport');
        //     return done(err);
        // }
        done(null, user);
    });
});


// check if the user is authenticated
passport.ckeckAuthentication = function(req, res , next){
    // if the user is signed in , then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;