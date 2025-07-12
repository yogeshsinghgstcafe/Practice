const express = require('express');
const router= express.Router();
const Listing = require("../models/listing.js");
const Review = require('../models/review.js');
const wrapAsync = require("../utils/wrapAsync.js");
const {validateSchema,reviewSchema} = require('../middleware/schema.js')
const {saveRedirectUrl,isLogin, isReviewAuthor} = require('../middleware/auth.js');
const { createReview, deleteReview } = require('../controllers/reviewController.js');
// review create
router.post('/:id/reviews',isLogin,reviewSchema,wrapAsync(createReview
)
)
// delete review
router.delete('/:id/reviews/:reviewId',isLogin,isReviewAuthor,wrapAsync(deleteReview))

module.exports=router;
