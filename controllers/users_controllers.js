const User = require("../models/user");
const crypto = require('crypto');
const queue = require('../config/kue');
const userEmailWorker = require('../workers/user_email_worker');

module.exports.profile = function (req, res) {
  User.findById(req.params.id).then((user)=>{
    return res.render("user_profile", {
      title: "Profile Page",
      profile_user: user
    });

  });
 
};

module.exports.update = async (req, res)=>{
  // if(req.user.id == req.params.id){
  //   User.findByIdAndUpdate(req.params.id , req.body , function(err, post){
  //     return res.redirect('back');
  //   });
  // }else{
  //   return res.status(401).send('Unauthorized');
  // }

  if(req.user.id == req.params.id){
   try{

      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req , res , function(err){
        if(err){ console.log('*****Multer Error: ',err);}

        user.name = req.body.name;   // req is from multer because body parser don't work on multipart
        user.email = req.body.email;

        console.log(req.file);
        if(req.file){
          // this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + '/' + req.file.filename; 
        }
        user.save();
        return res.redirect('back');
      })

   }catch(err){
      req.flash('error',err);
      return res.redirect('back');
   }
  }else{
    req.flash('error','Unauthorized');
    return res.status(401).send('Unauthorized');
  }
}


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
  req.flash('success','Logged in Successfully');
  return res.redirect('/');
};


module.exports.destroySession = function(req , res){
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success','Logged out Successfully');
    res.redirect('/');
  });

    // req.logout(); this shows error

    // return res.redirect('/');
}

module.exports.resetPassword = function(req, res){
  return res.render('reset_password',{
      title: 'Codeial | Reset Password',
      access: false
  });
}

module.exports.resetPassMail = function(req, res){
  User.findOne({email: req.body.email}, function(err, user){
    if(err){
      console.log('Error in finding user', err);
      return;
    }
    
    if(user){
      
      if(user.isTokenValid == false){
        user.accessToken = crypto.randomBytes(30).toString('hex');
        user.isTokenValid = true;
        user.save();
      }

      let job = queue.create('user-emails', user).save(function(err){
          if(err){
            console.log('Error in sending to the queue', err);
            return;
          }
          // console.log('Job enqueued', job.id);
      });

      req.flash('success', 'Password reset link sent. Please check your mail');
      return res.redirect('/');
    }else {
        req.flash('error', 'User not found. Try again!');
        return res.redirect('back');
    }
  });
}

module.exports.setPassword = function(req, res){
    User.findOne({accessToken: req.params.accessToken},function(err, user){
        if(err){
          console.log('Error in finding user', err);
          return;
        }
        
        if(user.isTokenValid){
          return res.render('reset_password',{
            title: 'Codeial | Reset Password',
            access: true,
            accessToken: req.params.accessToken
          });
        }else {
            req.flash('error','Link expired');
            return res.redirect('/users/reset-password');
        }
    });
}

module.exports.updatePassword = function(req, res){
  User.findOne({ accessToken: req.params.accessToken},function(err, user){
      if(err){
        console.log(('Error in finding user', err));
        return;
      }

      if(user.isTokenValid){
          if(req.body.newPass == req.body.confirmPass){
            user.password = req.body.newPass;
            user.isTokenValid = false;
            user.save();
            req.flash('success', 'Password updated. Login now!');
            return res.redirect('/users/sign-in');
          }else {
            req.flash('error', "Password don't match");
            return res.redirect('back');
          }
      }else {
        req.flash('error', 'Link expired');
        return res.redirect('/users/reset-password');
      }

  });
}