/**
 * All the API calls
 */

/* tutte le chiamate al server messe in un file apposta */

const dayjs = require("dayjs");
const URL = "http://localhost:3001/api";

async function getAllExams() {
  //async perchè c'è la await
  // call  /api/exams
  const response = await fetch(URL + "/exams"); //dalla fetch esce sempre un oggetto tipo Response, in questo caso lo abbiamo chiamato response
  const examsJson = await response.json(); // await perchè .json() torna una promise, dobbiamo aspettare che sia processata
  if (response.ok) {
    return examsJson.map((ex) => ({
      code: ex.code,
      name: ex.name,
      score: ex.score,
      date: dayjs(ex.date),
    }));
  } else {
    throw examsJson; // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

const API = { getAllExams };
export default API;
