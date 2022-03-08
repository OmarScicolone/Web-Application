"use strict";

const dayjs = require('dayjs');

let now = dayjs();

console.log(now.format());

let libretto = [];

let esame = {nome: "AW1", voto:30, data: dayjs('2022-03-03')};
console.log(esame);

function Exam(code, nome, CFU, voto, lode, data){
   this.nome = nome;
   this.voto = voto;
   this.code = code;
   this.CFU = CFU;
   this.data = data;
   this.lode = lode;
   this.str = function(){return `${this.nome} ${this.voto} ${this.data.format()}`}
}

function ExamList(){
   this.list = [];

   this.add = (e) => {
      this.list.push(e);
   }

   this.average = () => {
      let avg = 0;
      for (const val of this.list)
         avg += val.voto;
      avg = avg / this.list.length;
      return avg;
   }

   
}

const exams = new ExamList();

const WA1 = new Exam('01abc', 'WA1', '6', '30', true, dayjs('2022-03-04'))
const ps = new Exam('09sbc', 'ps', '6', '30', false, dayjs('2022-04-04'))

exams.add(WA1);
exams.add(ps);
console.log(exams.average() );