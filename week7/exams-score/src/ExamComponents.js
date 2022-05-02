import { Table, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs from 'dayjs';
import { useState } from 'react';

function ExamScores(props) { //questo componente è sostanzialmente un wrapper che chiama ExamTable, un componente che crea la tabella con gli esami 
  return (
    <ExamTable exams={props.exams}></ExamTable>
  );
}

function ExamTable(props) {
  const [exams, setExams] = useState(props.exams);
  const [showForm, setShowForm] = useState(false);

  function deleteExam(code) {
    // setExams(...)   // remove exam
    setExams(exams.filter((e) => e.code !== code));
  }

  function addExam(exam){
    setExams( oldExams => [...oldExams, exam] )
    setShowForm(false);
  }

  return (
    <>
      <Table> {/* tabella creata con il componente Table di react bootstrap */}
        <thead>
          <tr>
            <th>Exam</th>
            <th>Score</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            exams.map((ex) => <ExamRow exam={ex} key={ex.code} deleteExam={deleteExam} />)

            /* ExamRow prende come parametro exam (che abbiamo deciso noi che si chiama exam)  CHE CI RITROVEREMO NELLE PROPS.
            Nelle props non ci ritroveremo key perchè è un cosa privata di react  */
          }
        </tbody>
      </Table>
      {(!showForm) ? <Button onClick={() => setShowForm(true)}>Add</Button> :
        <ExamForm cancel={() => setShowForm(false)} addExam= {addExam} />}
    </>
  );
}

function ExamRow(props) {
  return (
    <tr><ExamData exam={props.exam} /><ExamActions code={props.exam.code} deleteExam={props.deleteExam} /></tr>
  );
}

function ExamData(props) {
  return (
    <>
      <td>{props.exam.name}</td>
      <td>{props.exam.score}</td>
      <td>{props.exam.date.format('YYYY-MM-DD')}</td>
    </>
  );
}

function ExamActions(props) {
  return <td><Button variant='danger'
    onClick={() => { props.deleteExam(props.code) }}
  ><i className='bi bi-trash3'></i></Button></td>
}

function ExamForm(props) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [score, setScore] = useState('0');
  const [date, setDate] = useState(dayjs());
  //quattro stati, uno per campo da inserire nel form

  const [errorMsg, setErrorMsg] = useState(''); //stringa vuota = non c'è l'errore

  const handleSubmit = (event) => {
    //validation
    if (score >= 18){ //dove lo prendo il valore del form? è lo stato
      //add l'esame alla lista degli esami
      //dove sta la lista degli esami? in examTable
      //come visto nelle slide, per modificare lo stato in un componente figlio del componentne a cui appartiene lo stato
      //passiamo come parametro una funzione che chiama la setStato
      const newExam = {code: code, name: name, score: score, date: date}
      props.addExam(newExam);

    }
    else{
      {/* console.log("Errore voto: " + score) */}
      setErrorMsg("Errore voto: " + score);
    }

  }

  const handleScore = (event) => {
    const val = event.target.value;
    setScore(val);
    /* Careful with validation: either validate at the end in handleSubmit, or when focus is lost,
       or consider that partial input may be invalid (difficult)
       IL PROBLEMA SI RISOLVE CON IL CONTROLLO CHE VA FATTO ALLA FINE, QUANDO FACCIAMO SUBMIT
        if (val<18)
          setScore(18);
        else if (val>31)
          setScore(31);
        else
          setScore(val);
    */
  }

  return (
    <>
    { errorMsg ?  <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}
      <Form> {/*un form che contiene quattro campi*/}
      {/* ogni campo con la sua label e con il valore predefinito (quello dello stato) */}
        <Form.Group>
          <Form.Label>Code</Form.Label>
          <Form.Control value={code} onChange={ev => setCode(ev.target.value)}></Form.Control>
          {/* RICORDA: (anche per le altre label), alla onChange (alla onClick, etc...) viene passato un "evento" (il parametro ev), che contiene una serie di proprietà, tra cui target che è l'emlemento su cio si è verificato l'evento. In .value ci sarà sempre il valore*/}
        </Form.Group>
        <Form.Group>
          <Form.Label>Course name</Form.Label>
          <Form.Control value={name} onChange={ev => setName(ev.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Score</Form.Label>
          <Form.Control type='number' min={18} max={31} value={score} onChange={ev => handleScore(ev)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control type='date' value={date.format('YYYY-MM-DD')} onChange={ev => setDate(dayjs(ev.target.value))} />
        </Form.Group>
      </Form>

      <Button onClick={props.cancel} variant='secondary'>Cancel</Button>
      <Button onClick={handleSubmit}>Save</Button>
    </>
  );
}

export { ExamScores };