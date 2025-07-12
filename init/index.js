const mongoose = require('mongoose')
const {listings} = require('./data.js')
const Listing = require('../models/listing.js')
const url = "mongodb://127.0.0.1:27017/wanderlust"
main().then(()=>{
    console.log("mongoose is running")
}).catch(err => console.log(err));
async function main(){
   await mongoose.connect(url)
}
const initDB = async ()=>{
    await Listing.deleteMany({});
    
  const data =  listings.map((listing)=>{
    return {...listing,owner :'67d69529abc7435a7de2d9dc' }
  });
  
  await Listing.insertMany(data);
    // for(let listing of listings){
    //     listing.owner = '67d69529abc7435a7de2d9dc'
    //     await Listing.create(listing);
    // }
    console.log('data was initalized')
}
initDB();