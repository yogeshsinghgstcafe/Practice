const express = require("express");
const app = express();
const path = require("path");
const listingRouter = require('./routes/listingRouter.js')
const reviewRouter= require('./routes/reviewRouter.js');
const userRouter = require('./routes/userRouter.js')
const connection = require('./config/connection.js')();
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const dotenv = require('dotenv').config();
const LocalStrategy = require('passport-local')
const User = require('./models/user.js');



const sessionOption = {
  secret : "my super secret",
  resave  :false,
  saveUninitialized : true
}
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(session(sessionOption));
app.use(flash());
// passport initialize middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
  res.locals.success = req.flash('message'); 
  res.locals.failure = req.flash('error');
  res.locals.currentUser = req.user;
   next();
}
)

// app.get('/demouser',async(req,res)=>{
//   let fakeUser = new User({
//     email: 'student@gmail.com',
//     username  :'delta-student'
//   })
//   let registerdUser = await User.register(fakeUser,"helloworld");
//   res.send(registerdUser);
// })

app.use('/listing',listingRouter);

app.use('/listing',reviewRouter);
app.use('/',userRouter)
app.use('/',(req,res)=>{
  res.redirect('/listing');
})
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});
app.use((err, req, res, next) => {
  let { status = 500, message = "some error" } = err;

  res.render('error.ejs',{message})
  console.log(message);
});

app.listen(8080, () => console.log("server listening on port 8080"));
