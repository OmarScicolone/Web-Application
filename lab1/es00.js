"use strict"

let array = ["Milan", "Inter", "Napoli", "J", "Atalanta", "Ro", "Laz"]; 

const fn = (array) => {
   for (let str of array){
      if(str.length < 2){
         console.log("");
      }
      else{
         console.log( str.slice(0,2) + str.slice(str.length-2, str.length) );
      }
   }
}

fn(array);