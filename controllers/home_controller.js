const Post = require('../models/post');

module.exports.home = (req ,res)=>{
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    
    // populate the user of each post ?
   Post.find({}).populate('user') // populate the `user` field with the corresponding user document
   .then((posts)=>{
    return res.render('home',{
        title: 'Codeail | Home',
        posts: posts
    })
   })
}

// this is the old version
//    Post.find({},(err,posts)=>{
//     return res.render('home',{
//         title: 'Codeail | Home',
//         posts: posts
//     })


// module.exports.actionName = function(req,res){}