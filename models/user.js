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
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const User = mongoose.model('User', userSchema);

module.exports = User;