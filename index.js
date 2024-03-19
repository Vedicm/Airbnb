const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require("../Models/listing.js")
const Mongo_URL = "mongodb://127.0.0.1:27017/vaidik";

main()
  .then((res) => console.log("Connection Successful"))
  .catch((e) => console.log(e));

async function main() {
  await mongoose.connect(Mongo_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData);
    console.log("Data Was Initialized")
}

initDB();