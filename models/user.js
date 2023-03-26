const mongoose = require('mongoose');
const multer = require('multer');
const { join } = require('path');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
        },
    avatar:{
        type: String
    },
    name : {
        type: String,
        required: true
    }
},{
    timestamps: true // track the time duration of an operation.
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {  // cb = call back
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()); // avatar-dateInMilisecond
    }
  })

  // static method (oops)
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;