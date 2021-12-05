const express=require('express');

//Database
const Database= require('./database');

const booky=express();

//Get All Books
/* 
Route           /
Description     get all books
Access          Public
Parameters      None
Method          Get Method
*/

booky.get("/",(req,res) => {
    return res.json({books : Database.books});
});

//Get Specific Books
/* 
Route           /is
Description     get specific books
Access          Public
Parameters      isbn
Method          Get Method
*/
booky.get("/is/:isbn",(req,res) =>{
    const getSpecificBook= Database.books.filter((book) => book.ISBN===req.params.isbn);

if(getSpecificBook.length === 0){
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

booky.get("/c/:category",(req,res) => {
    const getSpecificBook=Database.books.filter((book) => book.category.includes(req.params.category));

    if(getSpecificBook.length === 0){
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

booky.get("/l/:lang",(req,res) => {
    const getSpecificBook = Database.books.filter( (book) => book.language.includes(req.params.lang));

    if(getSpecificBook.length === 0){
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

booky.get("/author",(req,res) => {
    return res.json({author : Database.authors});
});

//Get All Authors Based on their ids
/* 
Route           /author
Description     get category
Access          Public
Parameters      id
Method          Get Method
*/

booky.get("/author/:id",(req,res) =>{
    const getSpecificAuthor=Database.authors.filter((author) => author.id===parseInt(req.params.id));

    if(getSpecificAuthor.length === 0){
        return res.json({
            error : `No book with ${req.params.id} author id is present.`
        });
    }
    return res.json({authors : getSpecificAuthor});
});

//Get All Authors Based on books
/* 
Route           /author/book
Description     get category
Access          Public
Parameters      none
Method          Get Method
*/

booky.get("/author/book/:isbn",(req,res) => {
    const getSpecificAuthor= Database.authors.filter((author) => author.books.includes(req.params.isbn));

    if(getSpecificAuthor.length === 0){
        return res.json({
            error : `No book with ${req.params.isbn} isbn is present.`
        });
    }
    return res.json({authors : getSpecificAuthor});

});

//Get All publication
/* 
Route           /publication
Description     get category
Access          Public
Parameters      none
Method          Get Method
*/

booky.get("/publication",(req,res) => {
    return res.json({author : Database.publication});
});

//Get All Publication Based on their ids
/* 
Route           /publication
Description     get category
Access          Public
Parameters      id
Method          Get Method
*/

booky.get("/publication/:id",(req,res) =>{
    const getSpecificpublication=Database.publication.filter((publication) => publication.id===parseInt(req.params.id));

    if(getSpecificpublication.length === 0){
        return res.json({
            error : `No book with ${req.params.id} author id is present.`
        });
    }
    return res.json({publication : getSpecificpublication});
});

//Get All publication Based on books
/* 
Route           /publication/book
Description     get category
Access          Public
Parameters      none
Method          Get Method
*/

booky.get("/publication/book/:isbn",(req,res) => {
    const getSpecificpublication= Database.publication.filter((publication) => publication.books.includes(req.params.isbn));

    if(getSpecificpublication.length === 0){
        return res.json({
            error : `No book with ${req.params.isbn} isbn is present.`
        });
    }
    return res.json({authors : getSpecificpublication});

});

booky.listen(3000,() => console.log("Server is up and running"));
