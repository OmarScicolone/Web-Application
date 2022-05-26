import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import API from "./API";

function FilmForm(props) {
  const { filmId } = useParams(); //potrebe anche essere vuoto perchè FilmForm lo chiamiamo sia da /ad...
  //...che da /edit/:filmId

  // eslint-disable-next-line
  const filmToEdit = props.films.find((f) => f.id == filmId); //anche qui, se filmId non è nulla...
  //...non troverà nessun "filmToEdit"

  const [title, setTitle] = useState(filmToEdit ? filmToEdit.title : "");
  const [favorite, setFavorite] = useState(
    filmToEdit ? filmToEdit.favorite : 0
  );
  const [date, setDate] = useState(filmToEdit ? filmToEdit.date : dayjs());
  const [rating, setRating] = useState(filmToEdit ? filmToEdit.rating : 0);
  const [unseen, setUnseen] = useState(false);

  const [errorMsg, setErrorMsg] = useState(""); // stringa vuota '' = non c'e' errore

  const navigate = useNavigate();
  const nextId = filmToEdit
    ? Number(filmId) // se siamo nel caso di un film da editare, usa il suo id
    : Number(props.films.map((f) => f.id).sort((a, b) => b - a)[0]) + 1; //se siamo nel caso di un film da aggiungere...
  //...trova l'id più grande e aggiungi 1
  //Ricorda che filmForm è usato contemporaneamente sia per aggiungere che per editare

  const handleSubmit = (event) => {
    event.preventDefault();
    //validation
    if (title === "") {
      setErrorMsg("Errore titolo");
    } else if (rating < 0 || rating > 5) {
      setErrorMsg("Errore rating (da 0 a 5)");
    } else {
      //add
      const newFilm = {
        id: nextId,
        title: title,
        favorite: favorite,
        date: date,
        rating: rating,
      };
      console.log(newFilm);
      if (filmToEdit) API.updateFilm(newFilm);
      else API.addFilm(newFilm);
      props.addFilm(newFilm);
      navigate("/"); //torniamo alla home
    }
  };

  const setUnseenFilm = (event) => {
    setUnseen(event.target.checked);
    setDate(undefined);
  };

  let titoloSchermata = filmToEdit
    ? `Edit film ${filmToEdit.id}`
    : "Add new film";

  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }} align="center">
            <main className="m-3">
              <h3>{titoloSchermata}</h3>
            </main>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <Col md={{ span: 6, offset: 3 }}>
              {errorMsg ? (
                <Alert
                  variant="danger"
                  onClose={() => setErrorMsg("")}
                  dismissible
                >
                  {errorMsg}
                </Alert>
              ) : (
                false
              )}
            </Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Col}>
                <Row className="mb-2">
                  <Col md={{ span: 1, offset: 3 }}>
                    <Form.Label>
                      <strong>Title</strong>
                    </Form.Label>
                  </Col>
                  <Col md={{ span: 5, offset: 0 }}>
                    <Form.Control
                      value={title}
                      onChange={(ev) => setTitle(ev.target.value)}
                    ></Form.Control>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group as={Col}>
                <Row className="mb-2">
                  <Col md={{ span: 1, offset: 3 }}>
                    <Form.Check.Label>
                      <strong>Favorite</strong>
                    </Form.Check.Label>
                  </Col>
                  <Col md={{ span: 5, offset: 0 }}>
                    <Form.Check
                      type="checkbox"
                      defaultChecked={favorite}
                      onChange={(ev) => setFavorite(ev.target.checked)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group as={Col}>
                <Row className="mb-2">
                  <Col md={{ span: 1, offset: 3 }}>
                    <Form.Label>
                      <strong>Date</strong>
                    </Form.Label>
                  </Col>
                  <Col md={{ span: 3, offset: 0 }}>
                    <Form.Control
                      type="date"
                      disabled={unseen}
                      value={date ? date.format("YYYY-MM-DD") : ""}
                      onChange={(ev) => setDate(dayjs(ev.target.value))}
                    />
                  </Col>
                  <Col md={{ span: 2, offset: 0 }}>
                    <Form.Check
                      type="checkbox"
                      defaultChecked={unseen}
                      onChange={setUnseenFilm}
                      label="Not seen yet"
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group as={Col}>
                <Row className="mb-2">
                  <Col md={{ span: 1, offset: 3 }}>
                    <Form.Label>
                      <strong>Rating</strong>
                    </Form.Label>
                  </Col>
                  <Col md={{ span: 5, offset: 0 }}>
                    <Form.Control
                      type="number"
                      min={0}
                      max={5}
                      value={rating}
                      onChange={(ev) => setRating(ev.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
            <div align="center">
              <Button
                type="submit"
                className="ms-10"
                size="md"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button
                className="m-2"
                size="md"
                variant="secondary"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FilmForm;
