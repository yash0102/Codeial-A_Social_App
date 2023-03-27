const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req ,res){
     // populate the user of each post ?
     let posts = await Post.find({})
     .sort('-createdAt') // this will sort a/q to time , if 1, 2, 3 --> 3 2 1 1st created 1 so it's last
     .populate("user") // populate the `user` field with the corresponding user document
     .populate({
       path: "comments",
       populate: {
         path: "user",
       },
     });



    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}



module.exports.destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    // .id means converting the object id into string
    if (post.user == req.user.id) {
      console.log(post);
      post.remove();
      await Comment.deleteMany({ post: req.params.id });



      return res.json(200,{
        message: "Post and associated comments deleted successfully"
      });
    } else {
        return res.json(401, {
          message: "You can not delete this post! " 
        })
    }
  } catch (err) {
    console.log('*********',err);
    return res.json(500,{
        message: "Internal Server Error"
    });
  }
};
