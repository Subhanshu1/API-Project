const mongoose = require("mongoose");

//BOOK SCHEMA

const BOOKSchema = mongoose.Schema({
    ISBN : String,
    title : String,
    pubDate : String,
    language : String,
    numPage : Number,
    authors : [Number],
    publication : Number,
    category : [String]
});


//
const BookModel= mongoose.model("books",BOOKSchema);

module.exports=BookModel;