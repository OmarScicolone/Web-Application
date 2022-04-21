import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './Components/Navbar.js';
import MySideBar from './Components/Sidebar.js';
import { Col, Container, Row } from 'react-bootstrap';
import MyTable from './Components/Table.js';

function App() {
  return (
    <>
      <MyNavBar/>

      <Container fluid>
        <Row className='row mt-2'>
          <Col className='col-3'>
            <MySideBar/>
          </Col>
          <Col className='col-9'>
          <MyTable/>
          </Col>
        </Row>
      </Container>

      
    </>
  );
}

export default App;
