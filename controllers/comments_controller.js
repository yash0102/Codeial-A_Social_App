const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      post.save();
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
        $pull: { comments: req.params.id },
      });
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error in deleting a Comment", error);
    return;
  }
};
