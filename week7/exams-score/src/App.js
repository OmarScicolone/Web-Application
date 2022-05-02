import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';
import { ExamScores } from './ExamComponents';

const fakeExams = [
  { code: '01TYMOV', name: 'Information systems security', score: 30, date: dayjs('2022-02-01') },
  { code: '01SQJOV', name: 'Data Science and Database Technology', score: 21, date: dayjs('2021-06-15') },
  { code: '04GSPOV', name: 'Software Engineering', score: 26, date: dayjs('2022-06-04') }
];

function App() {
  return (
    <Container> {/* un contenitore... */}
      <Row>     {/* ...che contiene 2 righe... (l'altra è giù)... */}
        <Col>   {/* ...ognuna di una colonna... */}
          <h1>My Exams</h1> {/* ...dove la prima riga ha il titolo... */}
        </Col>
      </Row>    
      <Row>     {/* ...e la seconda (quindi sotto il titolo)... */}
        <Col>
          <ExamScores exams={fakeExams}></ExamScores> {/* ...ha un componente CREATO DA ME (vedi giù) */}
        </Col>
      </Row>
    </Container>
  );
}
/* Quel componente prende una proprietà (che ho deciso che si chiama "exams" a cui passo un array di oggetti (fakeExams) che ho creato io. È in ExamComponents.js   */

export default App;