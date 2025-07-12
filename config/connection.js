const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/wanderlust";

async function connection() {
  await mongoose.connect(url).then(()=>console.log("database is connected"));
}
module.exports = connection;