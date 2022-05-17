import { Table, Button, Form, Container, Col, Row } from "react-bootstrap";
import MyNavBar from "./Navbar.js";
import MySideBar from "./Sidebar.js";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate, useParams } from "react-router-dom";

function MyTable(props) {
  const { activeFilter } = useParams();

  return (
    <>
      <MyNavBar />
      <Container fluid>
        <Row>
          <Col xs={3} className="bg-light">
            <MySideBar />
          </Col>

          <Col xs={9}>
            <main className="m-3">
              <h2>
                Filter:{" "}
                {activeFilter ? activeFilter.replace("%20", " ") : "All"}
              </h2>
              <FilmTable
                films={props.films}
                setFilms={props.setFilms}
                deleteFilm={props.deleteFilm}
                addFilm={props.addFilm}
              ></FilmTable>
            </main>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function FilmTable(props) {
  const navigate = useNavigate();
  const { activeFilter } = useParams();

  function modifyPreference(id) {
    props.setFilms((oldFilms) => {
      const list = oldFilms.map((fi) => {
        if (fi.id === id) {
          if (fi.favorite === false) {
            return {
              id: fi.id,
              favorite: true,
              name: fi.name,
              date: fi.date,
              rating: fi.rating,
            };
          } else {
            return {
              id: fi.id,
              favorite: false,
              name: fi.name,
              date: fi.date,
              rating: fi.rating,
            };
          }
        } else {
          return fi;
        }
      });
      return list;
    });
  }

  function modifyRating(id, newRating) {
    props.setFilms((oldFilms) => {
      const list = oldFilms.map((fi) => {
        if (fi.id === id) {
          return {
            id: fi.id,
            favorite: fi.favorite,
            name: fi.name,
            date: fi.date,
            rating: newRating,
          };
        } else {
          return fi;
        }
      });
      return list;
    });
  }

  let filteredFilms = [];
  let currentFilter = activeFilter ? activeFilter.replace("%20", " ") : "All";
  switch (currentFilter) {
    case "All":
      filteredFilms = props.films;
      break;
    case "Favorites":
      filteredFilms = props.films.filter((film) => film.favorite !== false);
      break;
    case "Best Rated":
      filteredFilms = props.films.filter((film) => film.rating === 5);
      break;
    case "Seen Last Month":
      filteredFilms = props.films.filter(
        (film) =>
          film.date !== undefined && dayjs().diff(film.date, "day") <= 30
      );
      break;
    case "Unseen":
      filteredFilms = props.films.filter((film) => film.date === undefined);
      break;
    default:
      filteredFilms = props.films;
  }

  return (
    <>
      <Table>
        <tbody>
          {filteredFilms.map((f) => (
            <FilmRow
              key={f.id}
              film={f}
              deleteFilm={props.deleteFilm}
              modifyPreference={modifyPreference}
              modifyRating={modifyRating}
            />
          ))}
        </tbody>
      </Table>
      <Button
        onClick={() => navigate("/add")}
        className="btn btn-primary rounded-circle float-end m-5 mt-2"
      >
        +
      </Button>
    </>
  );
}

function FilmRow(props) {
  return (
    <tr>
      <FilmData
        film={props.film}
        deleteFilm={props.deleteFilm}
        modifyPreference={props.modifyPreference}
        modifyRating={props.modifyRating}
      />
      <FilmActions
        id={props.film.id}
        film={props.film}
        deleteFilm={props.deleteFilm}
        showForm={props.showForm}
        setShowForm={props.setShowForm}
      />
    </tr>
  );
}

function FilmData(props) {
  return (
    <>
      {props.film.favorite ? (
        <td style={{ color: "red" }}>{props.film.name}</td>
      ) : (
        <td>{props.film.name}</td>
      )}

      <td>
        <Form>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Favorite"
              defaultChecked={props.film.favorite}
              onChange={() => props.modifyPreference(props.film.id)}
            />
          </Form.Group>
        </Form>
      </td>

      {props.film.date !== undefined ? (
        <td>{props.film.date.format("YYYY-MM-DD")}</td>
      ) : (
        <td> </td>
      )}
      <td>
        {[...Array(5)].map((s, index) =>
          index < props.film.rating ? (
            <i
              key={index}
              className="bi bi-star-fill"
              onClick={() => props.modifyRating(props.film.id, index + 1)}
            ></i>
          ) : (
            <i
              key={index}
              className="bi bi-star"
              onClick={() => props.modifyRating(props.film.id, index + 1)}
            ></i>
          )
        )}
      </td>
    </>
  );
}

function FilmActions(props) {
  const navigate = useNavigate();
  return (
    <>
      <td>
        <Button
          variant="danger"
          onClick={() => {
            props.deleteFilm(props.id);
          }}
        >
          <i className="bi bi-trash3"></i>
        </Button>
      </td>
      <td>
        <Button onClick={() => navigate(`/edit/${props.film.id}`)}>
          <i className="bi bi-pencil-fill"></i>
        </Button>
      </td>
    </>
  );
}

export default MyTable;
