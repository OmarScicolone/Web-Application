"use strict"   

let book = {}; //oggetto vuoto
console.log(book);

let books = {
   author : "Enrico",
   title : "Learning JS",
   for: "students",
   psges: 340,
   "chapter pages": [30,50,60,100]
};
console.log(books);

const persona = books.author;
books.title = "Advanced JS";
books.editor = "Polito";
console.log(books);

let surname = books && books.author && books.author.surname;
console.log(surname);   //undefined

const books2 = Object.assign({}, books);
console.log(books2);

const books3 = {...books};
console.log(books3);

const{title, ...rest} = books;
console.log(title);