"use strict"
"use strict"
const dayjs = require('dayjs');


//construttore per creare l'oggetto FILM
function Film(id, title, favorites, date, rating){
   this.id = id;
   this.title = title;
   this.favorites = favorites;
   this.date = date; //this.date = date || ;
   this.rating = rating;
}

//costruttore per creare l'oggetto LIBRERIA FILM
//che contiene un array di FILM 
function FilmLibrary(){
   this.Films = [];

   this.addNewFilm = (f) => {
      this.Films.push(f);
   }

   //this.show = () => {
   // for(let y of this.Films){
   //      if (y.date != undefined)
   //         console.log(y.id + " " + y.title + " " + y.favorites + " " + y.rating + " " + y.date.format("YYYY-MM-DD"));
   //      else
   //      console.log(y.id + " " + y.title + " " + y.favorites + " " + y.rating + " " + y.date);
   //   }
   //}

   this.show = () => { this.Films.forEach(f => {
         if (f.date != undefined) {
            console.log(f.id + " " + f.title + " " + f.favorites + " " + f.rating + " " + f.date.format("YYYY-MM-DD"));
         }
         else {
            console.log(f.id + " " + f.title + " " + f.favorites + " " + f.rating + " ");
         }
      }
      )
   }


   this.sortByDate = () => {
      this.Films = this.Films.filter(f => f.date != undefined).sort((a,b)=>a.date.diff(b.date)).concat(this.Films.filter(f => f.date == undefined));
   }

   this.deleteFilm = (id) => {
      this.Films = this.Films.filter(f => f.id != id);
   }

   this.resetWatchedFilms = () => {
      this.Films.forEach(f => f.date = undefined);
   }
   this.getRated = () => {
      this.Films = this.Films.filter(f => f.rating != undefined)
   }
   this.provaFilter = () => {
      this.Films.filter(f => f.title == "Shrek")
   }
}

let filmsList = new FilmLibrary();

let PF  = new Film(1, "Pulp Fiction", true, dayjs('2022-03-10'), 5); 
let TOG = new Film(2, "21 Grams", true, dayjs('2022-03-17'), 4); 
let SW  = new Film(3, "Star Wars", false); 
let Mat = new Film(4, "Matrix", false);
let Shr = new Film(5, "Shrek", false, dayjs('2022-03-21'), 3);

filmsList.addNewFilm(PF);
filmsList.addNewFilm(TOG);
filmsList.addNewFilm(SW);
filmsList.addNewFilm(Mat);
filmsList.addNewFilm(Shr);

filmsList.show();
console.log("********************\nnow sort:\n");

filmsList.sortByDate();
filmsList.show();
console.log("********************\nnow delete 4:\n");

filmsList.deleteFilm(4);
filmsList.show();
console.log("********************\nnow reset:\n");

filmsList.resetWatchedFilms();
filmsList.show();
console.log("********************\nnow get rated:\n");

filmsList.getRated();
filmsList.show();
console.log("********************");

filmsList.provaFilter();
filmsList.show();
console.log("********************");
