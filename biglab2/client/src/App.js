import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import FilmForm from "./FilmForm";
import MyTable from "./Components/Table.js";
import { LoginForm, LogoutButton } from "./Components/LoginComponents";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import API from "./API";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

//qui sopra, generici import
//nota di ricordare use state, i componenti di react, dayjs, le funzioni dalle componenti
function App() {
  return (
    <Router>
      <App2 />
    </Router>
  );
}
/*qui inizia App... una cosa importante che abbiamo dovuto notare
è che abbbiamo dovuto scegliere questo componente per definire lo stato
filter perchè serviva sia per la sidebar che per la tabella, quindi serve 
definirlo in un componente che le comprenda entrambe*/

function App2() {
  const [films, setFilms] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user);
      } catch (err) {
        console.log(err);
      }
    };
    checkAuth();
  }, []);

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

  const doLogIn = (credentials) => {
    API.logIn(credentials).then((user) => {
      setLoggedIn(true);
      setUser(user);
      navigate("/");
    });
  };

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser({});
    setFilms([]);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            {loggedIn ? <LogoutButton logout={doLogOut} user={user} /> : false}
          </Col>
        </Row>
      </Container>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <MyTable
                films={films}
                setFilms={setFilms}
                addFilm={addFilm}
                deleteFilm={deleteFilm}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/filter/:activeFilter"
          element={
            loggedIn ? (
              <MyTable
                films={films}
                setFilms={setFilms}
                addFilm={addFilm}
                deleteFilm={deleteFilm}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            loggedIn ? <Navigate to="/" /> : <LoginForm login={doLogIn} />
          }
        />
        <Route
          path="/add"
          element={
            loggedIn ? (
              <FilmForm films={films} addFilm={addFilm} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/edit/:filmId"
          element={
            loggedIn ? (
              <FilmForm films={films} addFilm={updateFilm} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
