const Post = require('../models/post')
const Comment = require('../models/comment');

module.exports.create =(req, res) => {
    Post.create({
        content: req.body.content,
        user: req.user._id
      });
      return res.redirect('back');
  };
  
//   module.exports.create = (req ,res)=>{
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     },(err,post)=>{
//         if(err){console.log('error in creating a post'); return;}

//         return res.redirect('back');
//     });
// }

 module.exports.destroy =async (req, res)=>{
 let post = await Post.findById(req.params.id) 
  // .id means converting the object id into string
  if(post.user == req.user.id){
    console.log(post);
      post.remove();
        Comment.deleteMany({post: req.params.id}).then(function(err){
          return res.redirect('back');
        })
      }else {
      return res.redirect('back');
    }

}