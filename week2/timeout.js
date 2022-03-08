"use strict"

const ciao = () => {
   console.log("Ciao Omar");
}

setTimeout(ciao, 3000);

const id = setInterval(()=> {console.log("Ciao x2");}, 2000);
console.log(id);

setTimeout(()=>{clearInterval(id)}, 5000);

let x = 0;
x = x + 1;

console.log(x);