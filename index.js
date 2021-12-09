require("dotenv").config();
const express=require('express');
const mongoose = require("mongoose");
var bodyParser=require('body-parser');
//Database
const Database= require('./database');

//Models
const BookModel=require("./databases/book");
const AuthorModel=require("./databases/author");
const PublicationModel=require("./databases/publication");

//Intialisation
const booky=express();
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

//Establish Database Connection

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => console.log("Connection is established!!!"));

//Get All Books
/* 
Route           /
Description     get all books
Access          Public
Parameters      None
Method          Get Method
*/

booky.get("/",async(req,res) => {
    const getAllBooks=await BookModel.find();
    return res.json(getAllBooks);
});

//Get Specific Books
/* 
Route           /is
Description     get specific books
Access          Public
Parameters      isbn
Method          Get Method
*/
booky.get("/is/:isbn", async(req,res) =>{
    const getSpecificBook= await BookModel.findOne({ISBN : req.params.isbn});

if(!getSpecificBook){
    return res.json({
        error : `No book with ${req.params.isbn} is not present.`
    });
}
return res.json({books : getSpecificBook});
});

//Get Books on Specific Category
/* 
Route           /c
Description     get category
Access          Public
Parameters      category
Method          Get Method
*/

booky.get("/c/:category",async(req,res) => {
    const getSpecificBook=await BookModel.findOne({category : req.params.category});

    if(!getSpecificBook){
        return res.json({
            error : `No book with ${req.params.category} category is present.`
        });
    }
    return res.json({books : getSpecificBook});
});

//Get Books on Specific Language
/* 
Route           /l
Description     get category
Access          Public
Parameters      lang
Method          Get Method
*/

booky.get("/l/:lang",async(req,res) => {
    const getSpecificBook = await BookModel.findOne({lang : req.params.lang});

    if(!getSpecificBook){
        return res.json({
            error : `No book with ${req.params.lang} language is present.`
        });
    }
    return res.json({books : getSpecificBook});
});

//Get All Authors
/* 
Route           /author
Description     get category
Access          Public
Parameters      none
Method          Get Method
*/

booky.get("/author",async(req,res) => {
    const getauthor=await AuthorModel.find();
    return res.json(getauthor);
});

//Get All Authors Based on their ids
/* 
Route           /author
Description     get category
Access          Public
Parameters      id
Method          Get Method
*/

booky.get("/author/:id",async(req,res) =>{
    const getSpecificAuthor=await AuthorModel.findOne({id :req.params.id});

    if(!getSpecificAuthor){
        return res.json({
            error : `No book with ${req.params.id} author id is present.`
        });
    }
    return res.json(getSpecificAuthor);
});

//Get All Authors Based on books
/* 
Route           /author/book
Description     get category
Access          Public
Parameters      none
Method          Get Method
*/

booky.get("/author/book/:isbn",async(req,res) => {
    const getSpecificAuthor= await AuthorModel.findOne({books :req.params.isbn});

    if(!getSpecificAuthor){
        return res.json({
            error : `No book with ${req.params.isbn} isbn is present.`
        });
    }
    return res.json(getSpecificAuthor);

});

//Get All publication
/* 
Route           /publication
Description     get category
Access          Public
Parameters      none
Method          Get Method
*/

booky.get("/publication",async(req,res) => {
    const getPublication = await PublicationModel.find();
    return res.json(getPublication);
});

//Get All Publication Based on their ids
/* 
Route           /publication
Description     get category
Access          Public
Parameters      id
Method          Get Method
*/

booky.get("/publication/:id",async(req,res) =>{
    const getSpecificpublication= await PublicationModel.findOne({id : req.params.id});

    if(!getSpecificpublication){
        return res.json({
            error : `No book with ${req.params.id} author id is present.`
        });
    }
    return res.json(getSpecificpublication);
});

//Get All publication Based on books
/* 
Route           /publication/book
Description     get category
Access          Public
Parameters      none
Method          Get Method
*/

booky.get("/publication/book/:isbn",async(req,res) => {
    const getSpecificpublication= await PublicationModel.findOne({books : req.params.isbn});

    if(!getSpecificpublication){
        return res.json({
            error : `No book with ${req.params.isbn} isbn is present.`
        });
    }
    return res.json(getSpecificpublication);

});

//Add New Books
/* 
Route           /author/new
Description     get category
Access          Public
Parameters      None
Method          Post Method
*/

booky.post("/book/new",(req,res) => {
    const newBook=req.body;
    Database.books.push(newBook);
    return res.json({updatedBooks : Database.books});
});

//Add New Authors
/* 
Route           /author/new
Description     get category
Access          Public
Parameters      None
Method          Post Method
*/

booky.post("/author/new",(req,res) => {
    const newAuthor=req.body;
    Database.authors.push(newAuthor);
    return res.json({updatedAuthors : Database.authors});
});

//Add New Authors
/* 
Route           /author/new
Description     get category
Access          Public
Parameters      None
Method          Post Method
*/

booky.post("/publication/new",(req,res) => {
    const newPublication=req.body;
    Database.publication.push(newPublication);
    return res.json({updatedpublication : Database.publication});
});

//Update the pub and book id 
/* 
Route           /publication/update/book
Description     Update the pub and book id 
Access          Public
Parameters      isbn
Method          Put Method
*/

booky.put("/publication/update/book/:isbn",(req,res) => {
    //Update the pub DB
    Database.publication.forEach((pub) => {
        if(pub.id===req.body.PubId){
            return pub.books.push(req.params.isbn);
        }
    });

    Database.books.forEach((book) => {
        if(book.ISBN==req.params.isbn){
            return book.publication=req.body.PubId;
            return;
        }
    })

    return res.json(
        {
            books : "Database.books",
            publication : "Database.publication",
            message : "Sucessfully Updated!!!"
        }
    )
});

//Delete a Book
/* 
Route           /delete/book
Description     delete a book
Access          Public
Parameters      isbn
Method          delete Method
*/

booky.delete("/delete/book/:isbn",(req,res) => {
    const updatedBookDatabase=Database.books.filter((body)  => body.ISBN !== req.params.isbn);
    
    Database.books=updatedBookDatabase;

    return res.json({books : Database.books});
});

booky.listen(3000,() => console.log("Server is up and running"));
