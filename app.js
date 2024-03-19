const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Mongo_URL = "mongodb://127.0.0.1:27017/vaidik";
const Listing = require("./Models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");

main()
  .then((res) => console.log("Connection Successful"))
  .catch((e) => console.log(e));

async function main() {
  await mongoose.connect(Mongo_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);

// Home Route
app.get('/' , (req , res)=>{
  res.render("listings/home.ejs")
});

// Index Route
app.get("/listings", async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
});

// New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Create Route
app.post("/listings", async (req, res) => {
  let listing = req.body.listing;
  const list = new Listing(listing);
  await list.save();
  res.redirect("/listings");
});

// Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/info.ejs", { listing });
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs" , {listing});
});

// Update Route
app.put('/listings/:id' , async (req , res)=>{
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id , req.body);
  res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete('/listings/:id' , async (req , res)=>{
  let { id } = req.params;
  await Listing.findByIdAndDelete(id)
  res.redirect('/listings')
});

app.listen(2222, () => {
  console.log("server is running on port");
});
