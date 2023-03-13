const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "Profile Page",
  });
};

// render the sign up page
module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    } 

  return res.render("user_sign_Up", {
    title: "Codeial | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  if(req.isAuthenticated()){
     return res.redirect('/users/profile');
  }

  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }).then ( (user) => {
    // if (err) {
    //   console.log("error in finding user in signing up");
    //   return;
    // }

    if (!user) {
      User.create(req.body).then((user) => {  
        // if (err) {
        //   console.log("error in creating user while signing up");
        //   return;
        // }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// sign in and create a session for a user
module.exports.createSession = function (req, res) {
  return res.redirect('/');
};


module.exports.destroySession = function(req , res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });

    // req.logout();

    // return res.redirect('/');
}