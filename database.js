const books =[
    {
        ISBN : "12345Book",
        title : "Getting Started with MERN",
        pubDate : "2021-11-25",
        language : "en",
        numPage : 250,
        authors : [1,2],
        publication :[1],
        category : ["tech","programming","education"]
    }
]

const authors= [
    {
        id : 1,
        name : "Subhanshu",
        books: ["12345Book"]

    },
    {
        id : 2,
        name : "Aradhana",
        books : ["12345Book"]
    }
]

const publication = [
    {
        id : 1,
        name : "Writex",
        books : ["12345Book"]
    },
    {
        id : 2,
        name : "Writex",
        books : [ ]
    }
]

module.exports = {books,authors,publication};