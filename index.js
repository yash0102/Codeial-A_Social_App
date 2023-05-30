// 1)Setting Up express server
const express = require("express");
const app = express();
const env = require("./config/environment");

// 2)Defining port no.
const port = 8000;

// 6)Installing and acquiring express-ejs-layouts
const expressLayouts = require("express-ejs-layouts");

// 9)Setting configuration for mongoose in config folder and requiring here (Connecting to database)
const db = require("./config/mongoose");

// 11)Using cookies
const cookieParser = require("cookie-parser");

// 12)Using passport for authentication and express session for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

// 15)Using Passport JWT
const passportJWT = require("./config/passport-jwt-strategy");

// 16)Google OAuth SignIn/SignUp
const passportGoogle = require("./config/passport-google-oauth2-strategy");

// 13)Connect Mongo is a popular middleware designed to manage MongoDB sessions with ExpressJS
const MongoStore = require("connect-mongo");

// 14)Using sass
const sassMiddleware = require("node-sass-middleware");

const flash = require("connect-flash");
const customMware = require("./config/middleware");

// Setting up another server for chat engine and passing our app to it
const chatServer = require("http").Server(app);

// setting up configuation for setting sockets on the chat server
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);

//For logging purppose
const logger = require("morgan");
const path = require("path");

chatServer.listen(5000, function (error) {
  if (error) {
    console.log("Error in setting up Chat Server");
  } else {
    console.log("Chat Server is listening on port 5000");
  }
});

// setting config for using sass(it has to be written before the server starts so that it can compile all the sass files into css)
if ( env.name == "development") {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, "scss"),
      dest: path.join(__dirname, env.asset_path, "css"),
      debug: true,
      outputStyle: "extended",
      prefix: "/css",
    })
  );
}

// Middleware to use during development

// setup logger
app.use(logger(env.morgan.mode, env.morgan.options));

// parsed request's body with urlencoded payload format (for reading input as key value pair)
// from the incoming requests and made it accessible to req.body object of the response object.
// It is using Express inbuilt middleware for it.

// 10)Setting middleware for decoding the post request
app.use(express.urlencoded({ extended: true })); // added a parser,

// After requiring cookies we have to use this middleware for using cookies
app.use(cookieParser());

// 7) Linking static files
app.use(express.static(env.asset_path));
// app.use(express.static("./assets"));

app.use("/uploads", express.static(__dirname + "/uploads"));


app.use(expressLayouts); // to use a default layout

// 8) Extract style and script from sub pages into layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// 5) Setting up the view engine
app.set("view engine", "ejs"); // EJS templating engine used to render HTML templates
app.set("views", "./views");

//using express session to encrypt user data and stores in the cookie (This cookie is then stored in database)
app.use(
  session({
    name: "codeial",
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, // cookie expiry set in milliseconds.
    },
    store: MongoStore.create(
      {
        // mongooseConnection: db,
        mongoUrl: `mongodb://127.0.0.1/codeial_development`,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

// Passport Initialize middleware starts for authentication
app.use(passport.initialize()); 

 // Creates a login session for users using Passport Middlware.
app.use(passport.session());

// Calling setAuthenticatedUser on every request allwos only authenticated users to access certain routes/routes that require authentication
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// 4) Acquiring Router Middleware
app.use("/", require("./routes"));

// 3) Running the server on defined port
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
