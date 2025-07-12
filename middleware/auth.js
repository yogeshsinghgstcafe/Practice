const Listing = require('../models/listing');
const Review = require('../models/review')
const isLogin = (req,res,next)=>{
    //  console.log(req.originalUrl);
    // console.log(req.url);
    console.log(req.user);
    if(!req.isAuthenticated()){
    // store original url in session
    req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in first!");
        return res.redirect('/login');
      }
     
        next();
      
}

const saveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

const isOwner = async(req,res,next)=>{
  const { id } = req.params;
  let listing = await Listing.findById(id).populate('owner');
  // console.log("listing",listing.owner);
  // console.log("current user : ",res.locals.currentUser);
  if(!listing.owner._id.equals(res.locals.currentUser._id)){
    req.flash("error", "You are not the owner of this listing");
    return res.redirect(`/listing/${id}`)
  }next();
}

const isReviewAuthor = async(req,res,next)=>{
  const {id, reviewId } = req.params;
  let review= await Review.findById(reviewId);

  if(!review.author._id.equals(res.locals.currentUser._id)){
    req.flash("error", "You are not author of this review");
    return res.redirect(`/listing/${id}`)
  }next();
}
module.exports = {isLogin,saveRedirectUrl,isOwner,isReviewAuthor};