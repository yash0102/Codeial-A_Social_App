// const mongoose = require('mongoose');
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    // comments belongs to user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like' 
        }
    ]
},{
    timestamps: true // it shows a created and updated time
});


const comment = mongoose.model('Comment',commentSchema);
module.exports = comment;