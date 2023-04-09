// const mongoose = require('mongoose');
import mongoose from "mongoose";
// const multer = require('multer');
import multer from "multer";
const { join } = require('path');
// const path = require('path');
import path from 'path';
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
    },
    accessToken: {
        type: String,
        default: 'abc'
    },
    isTokenValid: {
        type: Boolean,
        default: false
    },
    friendships: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship'
        }
    ]
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