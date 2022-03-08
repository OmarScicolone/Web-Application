"use strict";

const myScores = [18, 30, 25, 28, 24, 30, 27];

const modifiedScores = [...myScores];

modifiedScores.sort( (a,b) => (a-b) );


console.log(myScores);
console.log(modifiedScores);

modifiedScores.shift();
modifiedScores.shift();

console.log(modifiedScores);

let avg = 0;
for(const val of modifiedScores)
   avg += val;
avg = avg / modifiedScores.length;
avg = Math.round(avg);
console.log(avg);