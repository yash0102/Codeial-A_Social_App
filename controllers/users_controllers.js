module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "Profile Page",
  });
};


// render the sign up page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codeial | Sign In"
  });
};

// render the sign up page
module.exports.signUp = function (req, res) {
    return res.render("user_sign_Up", {
      title: "Codeial | Sign Up"
    });
  };

  // get the sign up data
module.exports.create = function(req ,res){
    // TODO later
}

// sign in and create a session for a user
module.exports.createSession = function(req , res){
    // TODO later
}