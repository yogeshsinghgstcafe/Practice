const User = require('../models/user');
exports.createUserPost = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await User.findOne({email});
      if(user){
        req.flash("error", "A user with the given email is already registered");
      return res.redirect("/signup");
      }
      const newUser = new User({ username, email });

      const registeredUser = await User.register(newUser, password);
      // after signup directly login
      req.login(registeredUser,(err)=>{
        if(err){
          next(err);
        }
        req.flash("message", "Welcome to Login Page!");
      res.redirect("/listing");
      })
      
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  }
  
  exports.loginUserPost = async(req, res) => {
    // console.log(req.body)
    const redirectUrl = res.locals.redirectUrl || '/listing';
    req.flash("message", "Welcome back to Wanderlust!");
    // console.log(req.user);;
    res.redirect(redirectUrl);
    
  }

  exports.logoutUser = (req,res)=>{
    req.logout((err)=>{
      if(err){
        return next(err);
      }
      req.flash('message',"you are logged out!");
      res.redirect('/listing');
    })
  }