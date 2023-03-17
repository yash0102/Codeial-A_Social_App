const mongoose = require('mongoose');

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
    }
},{
    timestamps: true // it shows a created and updated time
});

const comment = mongoose.model('Comment',commentSchema);
module.exports = comment;