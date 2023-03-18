// Required modules are imported and an instance of express server created.
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 18000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
// Passport is a JS library used to manage user authentication related concerns
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// Connect Mongo is a popular middleware designed to manage MongoDB sessions with ExpressJS
const MongoStore = require('connect-mongo');


// in version middleware were not in use

// const sassMiddleware = require('node-sass-middleware'); 

// app.use(sassMiddleware({
//     src: '/assets/scss',
//     dest: '/assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));




// Middleware to use during development

// parsed request's body with urlencoded payload format (for reading input as key value pair)
// from the incoming requests and made it accessible to req.body object of the response object. 
// It is using Express inbuilt middleware for it.
app.use(express.urlencoded()); // added a parser,
app.use(cookieParser());

// to serve static files stored in the ./assets directory 
app.use(express.static('./assets'));

app.use(expressLayouts); // to use a default layout

//extract style and script from sub pages into layout 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// set up the view engine
app.set('view engine','ejs'); // EJS templating engine used to render HTML templates
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) // cookie expiry set in milliseconds. 
    },
    store: MongoStore.create(
        {    
           // mongooseConnection: db,
            mongoUrl: `mongodb://127.0.0.1/codeial_development`,
            autoRemove: 'disabled'
        },
        function(err) {
            console.log(err || "connect-mongodb setup ok");
        }
    )
}))

 
app.use(passport.initialize()); // Passport Initialize middleware starts for authentication
app.use(passport.session());  // Creates a login session for users using Passport Middlware.

// Calling setAuthenticatedUser on every request allwos only authenticated users to access certain routes/routes that require authentication
app.use(passport.setAuthenticatedUser);

// use express router , to rendere various routes
app.use('/', require('./routes'));// any request comes, it requires


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})