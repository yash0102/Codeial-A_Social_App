const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = (req ,res)=>{
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    
    // populate the user of each post ?
   Post.find({})
   .populate('user') // populate the `user` field with the corresponding user document
   .populate({
    path: 'comments',
    populate: {
        path: 'user',
    }
   })
   .exec((err,posts)=>{

    User.find({}, (err,users)=>{
        console.log(users);
        return res.render('home',{
            title: 'Codeail | Home',
            posts: posts,
            all_users: users 
        })
    });
   
   })
}

// this is the old version
//    Post.find({},(err,posts)=>{
//     return res.render('home',{
//         title: 'Codeail | Home',
//         posts: posts
//     })


// module.exports.actionName = function(req,res){}