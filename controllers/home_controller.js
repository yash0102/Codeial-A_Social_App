const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async (req, res) => {
  // console.log(req.cookies);
  // res.cookie('user_id',25);

  try {
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

    let users = await User.find({});

    return res.render("home", {
      title: "Codeail | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
