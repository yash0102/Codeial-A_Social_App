const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require('../mailers/comments_mailer');


module.exports.create = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
    });

    post.comments.push(comment);
    post.save();
    
    comment = await comment.populate('user', 'name email');
    commentsMailer.newComment(comment);

      if (req.xhr)
      {
           // Similar for comments to fetch the user's id!
          // comment = await comment.populate('user', 'name').execPopulate();

          return res.status(200).json
          ({
              data: 
              {
                  comment: comment
              },
              message: "Comment created"
          });
      }
      req.flash('success', 'Comment Added');
      return res.redirect("/");
    }
  } catch (error) {
    console.log("Error in creating a comment", error);
    return;
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);
    // console.log(req.user);
    // .id means converting the object id into string
    if (comment.user == req.user.id) {
      let postId = comment.post;

       comment.remove();
       await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id }
      });

       // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment deleted"
                });
            }

            req.flash('success', 'Comment Removed');
            return res.redirect('back');
        }
        else
        {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
  } catch (error) {
    req.flash('error', err);
    return;
  }
};
