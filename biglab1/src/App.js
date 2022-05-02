import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './Components/Navbar.js';
import MySideBar from './Components/Sidebar.js';
import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';
import MyTable from './Components/Table.js';
//qui sopra, generici import
//nota di ricordare use state, i componenti di react, dayjs, le funzioni dalle componenti

//vabe qua generica lista di film
const filmList = [
  { id: '1', name: 'Pulp Fiction', favorite: true, date: dayjs('2022-02-01'), rating: 5 },
  { id: '2', name: '21 Grams', favorite: true, date: dayjs('2022-04-01'), rating: 4 },
  { id: '3', name: 'Star Wars', favorite: false, rating: 0 },
  { id: '4', name: 'Matrix', favorite: false, rating: 0 },
  { id: '5', name: 'Fast And Furious', favorite: false, date: dayjs('2022-03-21'), rating: 3 },
  { id: '6', name: 'Shrek', favorite: false, date: dayjs('2022-03-11'), rating: 2 },
  { id: '6', name: 'Shrek', favorite: false, date: dayjs('2022-03-11'), rating: 2 }
];

/*qui inizia App... una cosa importante che abbiamo dovuto notare
è che abbbiamo dovuto scegliere questo componente per definire lo stato
filter perchè serviva sia per la sidebar che per la tabella, quindi serve 
definirlo in un componente che le comprenda entrambe*/

function App() {

  const [filter, setFilter] = useState("All"); //creato uno stato con VALORE DI DEFAULT di "all"

  const chosenFilter = (filter) => {setFilter(filter);console.log(filter);}; 
  /* la cosa sopra è una cosa importante...
  ...praticamente noi non possiamo fare modificare uno stato da un proprio figlio, quindi...
  facciamo quanto segue, ovvero creiamo una funzione (chosenFilter), che verrà passata come proprietà per
  modificare lo stato */

  return (
    <>
      <MyNavBar/>   {/* qui semplicemnte chiamiamo la funzione(che è un componente) MyNavBar */}

      <Container fluid>   {/* contenitore che contiene la tabella e la sidebar */}
        <Row className='row mt-2'>
          <Col className='col-3'>
            <MySideBar setNewFilter={chosenFilter} ></MySideBar>   {/* Allorw, qui si presuppone che sidebar modifichera lo stato,
            quindi discorso di sopra */}
          </Col>
          <Col className='col-9'>
          <MyTable films={filmList} filter={filter}></MyTable>
          <plusButton/>
          </Col>
        </Row>
      </Container>
      
    </>
  );
}

export default App;
