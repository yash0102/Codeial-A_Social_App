const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require('../models/like');

module.exports.create = async (req, res) => {
  try {
   let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if(req.xhr){
      // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it! (To display the user's name with the post added dynamically)
      post = await post.populate('user', 'name');
      return res.status(200).json({
        data: {
          post:post
        },
        message: "Post Created!"
      }); 
    }

    req.flash('success','Post published!');
    return res.redirect("back");
    
  } catch (err) {
    req.flash('error',err);
    // added this to view the error on console as well
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    // .id means converting the object id into string
    if (post.user == req.user.id) {
      // console.log(post);
      await Like.deleteMany({likeable: post._id, onModel: 'Post'});
      await Like.deleteMany({_id: {$in: post.comments}});
      post.remove();
      await Comment.deleteMany({ post: req.params.id });


      if(req.xhr){
        return res.status(200).json({
          data: {
            post_id: req.params.id
          },
          message: "Post Deleted !"
        }); 
      }

      req.flash('success','Post and associated comments deleted!');

      return res.redirect("back");
    } else {
      req.flash('error','You can not delete this post!');
      return res.redirect("back");
    }
  } catch (err) {
    req.flash('error',err);
    return res.redirect("back");
  }
};
