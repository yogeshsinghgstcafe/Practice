const Listing = require('../models/listing');
exports.allListing= async (req, res) => {
    const allData = await Listing.find();
    
    res.render("listings/airbnb.ejs", { allData });
    // console.log(allData);
  }
exports.createNew = (req, res) => {
    // set flash
    res.render("listings/new.ejs");
  }
exports.showListing = async (req, res, next) => {
    const { id } = req.params;
    const chat = await Listing.findById(id).populate({path : "reviews",
      populate :{
        path: 'author'
      },
    }).populate('owner');
   
    if (!chat) {
      // next(new ExpressError(500, "chat not found"));
      req.flash("error","Listing you requested for does not exist!");
      return res.redirect('/listing');
    } else res.render("listings/show.ejs", { chat });
  }
exports.createListingPost = async (req, res) => {
    if (!req.body) {
      throw new ExpressError(400, "send valid data to listing");
    }
    // console.log(req.file);
    // console.log(req.body.title)
    const url= req.file.path;
    const filename= req.file.filename;
    const data = req.body;
    const obj = new Listing({...data,owner : req.user._id});
    obj.image["url"] = url ||'https://images.unsplash.com/photo-1732645023408-6e99df42f09e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8';
    obj.image["filename"] = filename;
    // console.log(obj);
    await obj.save();
    // console.log(req.user.email)
    req.flash("message", "New Listing Created!");
    res.redirect("/listing");
  }
exports.editListing = async (req, res) => {
    const { id } = req.params;
    const obj = await Listing.findById(id);
  if(!obj){
    req.flash("error","Listing you requested for does not exist!");
    return res.redirect('/listings');
  }
    // console.log(obj);;;
    res.render("listings/form.ejs", { obj });
  }


  exports.updateListingPost = async (req, res) => {
    const { id } = req.params;
   const list =await  Listing.findById(id);
  //  console.log(list);
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body});
    
    if(!req.file){
      listing.image.url = list.image.url;
      listing.image.filename =  list.image.filename ||'https://images.unsplash.com/photo-1732645023408-6e99df42f09e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8';
      await listing.save()
    }
    else{
      listing.image.url = req.file.path
      listing.image.filename =  req.file.filename
      await listing.save()
    }
    req.flash("message", "Listing edited succesfully");
    res.redirect(`/listing/${id}`);
  }

  exports.deleteListingDelete = async (req, res) => {
    const { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    req.flash("message", "Listing deleted succesfully");
    console.log(deleteListing);
    res.redirect("/listing");
  }