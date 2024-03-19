const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = Schema({
    title : {
        type : String , 
        required : true
    } , 
    description : String , 
    image : {
        type : String , 
        set : (c) => c === '' ? 'https://images.unsplash.com/photo-1707343843344-011332037abb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' : c ,
        default : 'https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , 
        required : true
    } , 
    price : Number ,
    location : String , 
    country : String
});

const Listing = mongoose.model("List" , listingSchema);

module.exports = Listing;
