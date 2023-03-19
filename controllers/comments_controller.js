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

module.exports.destroy =async (req, res)=>{
  let comment = await Comment.findById(req.params.id);
  // console.log(req.user);
   // .id means converting the object id into string
   if(comment.user == req.user.id){

          let postId = comment.post; 
          
          comment.remove();
          Post.findByIdAndUpdate(postId, { $pull : {comments: req.params.id}}, (err)=>{
              return res.redirect('back');
          })
     } else {
           return res.redirect('back');
        }
 
 }

// module.exports.destroy = (req, res)=>{
//   Post.findById(req.params.id, function(err,comment){
//   // .id means converting the object id into string
//   if(comment.user == req.user.id){

//       let postId = comment.post; 
      
//       comment.remove();
//       Post.findByIdAndUpdate(postId, { $pull : {comments: req.params.id}}, (err, post)=>{
//           return res.redirect('back');
//       })
//  } else {
//        return res.redirect('back');
//     }
// })
// }
  