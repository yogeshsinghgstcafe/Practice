const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require('../middleware/auth');
const { createUserPost, loginUserPost, logoutUser } = require("../controllers/userController");


// signup
router.route('/signup')
.get((req, res) => {
  res.render("user/signup.ejs");
})
.post(
  wrapAsync(createUserPost)
)

// login
router.route('/login')
.get((req, res) => {
  res.render("user/login.ejs");
})
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash : true
  }),
  loginUserPost
);

// logout
router.get('/logout',logoutUser)


// signup
// router.get("/signup", (req, res) => {
//   res.render("user/signup.ejs");
// });
// sigup data request
// router.post(
//   "/signup",
//   wrapAsync(createUserPost)
// );
// router.get("/login", (req, res) => {
//   res.render("user/login.ejs");
// });
// "/login",

// router.post(
//   "/login",saveRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash : true
//   }),
//   loginUserPost
// );


module.exports = router;
