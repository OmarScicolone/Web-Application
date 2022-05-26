import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import FilmForm from "./FilmForm";
import MyTable from "./Components/Table.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//qui sopra, generici import
//nota di ricordare use state, i componenti di react, dayjs, le funzioni dalle componenti

/*qui inizia App... una cosa importante che abbiamo dovuto notare
è che abbbiamo dovuto scegliere questo componente per definire lo stato
filter perchè serviva sia per la sidebar che per la tabella, quindi serve 
definirlo in un componente che le comprenda entrambe*/

function App() {
  const [films, setFilms] = useState([]);

  function addFilm(film) {
    setFilms((oldFilms) => [...oldFilms, film]);
  }

  function deleteFilm(id) {
    // setExams(...)   // remove exam
    setFilms(films.filter((fi) => fi.id !== id));
  }

  function updateFilm(film) {
    setFilms((oldFilms) =>
      // eslint-disable-next-line
      oldFilms.map((fi) => (fi.id == film.id ? Object.assign({}, film) : fi))
    );
  }

  //const newSetFilms = (films) => setFilms(films);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MyTable
                films={films}
                setFilms={setFilms}
                addFilm={addFilm}
                deleteFilm={deleteFilm}
              />
            }
          />
          <Route
            path="/filter/:activeFilter"
            element={
              <MyTable
                films={films}
                setFilms={setFilms}
                addFilm={addFilm}
                deleteFilm={deleteFilm}
              />
            }
          />
          <Route
            path="/add"
            element={<FilmForm films={films} addFilm={addFilm} />}
          />
          <Route
            path="/edit/:filmId"
            element={<FilmForm films={films} addFilm={updateFilm} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
