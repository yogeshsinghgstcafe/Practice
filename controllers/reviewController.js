const Listing = require('../models/listing');
const Review = require('../models/review')
exports.createReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    console.log(req.body);
    let newReview = new Review(req.body);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new review Saved");
    res.redirect(`/listing/${req.params.id}`);
  }

  exports.deleteReview = async(req,res)=>{
    const {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listing/${id}`);
  }