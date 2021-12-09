const mongoose = require("mongoose");

const AUTHORSchema = mongoose.Schema({
    id : Number,
    name : String,
    books: [String]
})

const AuthorModel= mongoose.model("authors",AUTHORSchema);

module.exports = AuthorModel;