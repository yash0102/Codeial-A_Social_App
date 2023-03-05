const express = require('express');
const app = express();
const port = 18000;


// use express router
app.use('/', require('./routes'));// any request comes, it requires

// set up the view engine
app.set('view engine','ejs');
app.set('view','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})