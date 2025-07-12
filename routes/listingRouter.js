const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateSchema, reviewSchema } = require("../middleware/schema.js");
const { isLogin, isOwner } = require("../middleware/auth.js");
const multer  = require('multer');
const {cloudinary } = require('../config/cloudinary.js')

const {storage} = require('../config/cloudinary.js');
const upload = multer({storage});
const {
  allListing,
  createNew,
  showListing,
  createListingPost,
  editListing,
  updateListingPost,
  deleteListingDelete,
} = require("../controllers/listingController.js");

// combine '/' route
// ,
router
  .route("/")
  .get(wrapAsync(allListing))
  .post(isLogin,upload.single('image'),validateSchema, wrapAsync(createListingPost)
);

  //create a new listing route   
router.get("/new",isLogin,  createNew);
// isLogin,
router.get('/service',(req,res)=>{
  res.render('listings/service.ejs');
})
// combine '/:id' route
router
  .route("/:id")
  .get(wrapAsync(showListing))
  .put(isLogin, isOwner,upload.single('image'), validateSchema, wrapAsync(updateListingPost))
  .delete(isLogin, isOwner, wrapAsync(deleteListingDelete));



//edit route ==> to edit a particular listing
router.get("/:id/edit", isLogin, isOwner, wrapAsync(editListing));



//index route ==> all listing

// router.get(
//   "/",wrapAsync(allListing)
// );



//show route ==> all data of particular id
// router.get("/:id", wrapAsync(showListing));

// router.post(
//   "/",isLogin,
//   validateSchema,
//   wrapAsync(createListingPost)
// );



//update route ==> to update a particular listing

// router.put(
//   "/:id",
//   isLogin,
//   isOwner,
//   validateSchema,
//   wrapAsync(updateListingPost)
// );

//delete route
// router.delete("/:id", isLogin, isOwner, wrapAsync(deleteListingDelete));

module.exports = router;
