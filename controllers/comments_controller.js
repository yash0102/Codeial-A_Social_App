const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (req ,res)=>{
    Post.findById(req.body.post).then ((post)=>{

        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then ((comment)=>{
                post.comments.push(comment);
                post.save().then(() =>{
                    res.redirect('/');
                  })
            });
        }
    });
}


/* OLD version 

module.exports.create = function(req ,res){
    Post.findById(req.body.post, function(err ,post){

        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, (err,comment)=>{
                // handle error

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    });
}
*/

