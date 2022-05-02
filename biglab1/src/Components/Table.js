import { Table, Button } from "react-bootstrap";
import dayjs from 'dayjs';


function MyTable(props) {

   let newFilms = props.films;

   switch (props.filter) {
      case "All":
         newFilms = props.films;
         break;
      case "Favorites":
         newFilms = props.films.filter((film) => film.favorite !== false);
         break;
      case "Best Rated":
         newFilms = props.films.filter((film) => film.rating === 5);
         break;
      case "Seen Last Month":
         newFilms = props.films.filter((film) => film.date !== undefined && dayjs().diff(film.date, 'day') <= 30);
         break;
      case "Unseen":
         newFilms = props.films.filter((film) => film.date === undefined);
         break;
      default:
         newFilms = props.films;
   }

   return (
      <FilmTable films={newFilms}></FilmTable>
   );
}

function FilmTable(props) {

   return (
      <>
         <Table>
            <thead>
               <tr>
                  <th>Film</th>
                  <th>Favourite</th>
                  <th>Date</th>
                  <th>Rating</th>
               </tr>
            </thead>
            <tbody>
               {
                  props.films.map((fi) => <FilmRow film={fi} key={fi.id}></FilmRow>)
               }
            </tbody>
         </Table>
         <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-primary rounded-circle">+</button>
         </div>
      </>
   )
}

function FilmRow(props) {
   return (
      <tr><FilmData film={props.film} />{/*<ExamActions code={props.film.id} deleteExam={props.deleteExam} />*/}</tr>
   );
}

function FilmData(props) {
   return (
      <>
         <td>{props.film.name}</td>
         {
            props.film.favorite ?
               <td>
                  <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked></input>
                     <label class="form-check-label" for="flexCheckChecked">
                        Favorite
                     </label>
                  </div>
               </td> :
               <td>
                  <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                     </input>
                     <label class="form-check-label" for="flexCheckDefault">
                        Favorite
                     </label>
                  </div>
               </td>
         }
         {
            props.film.date !== undefined ?
               <td>{props.film.date.format('YYYY-MM-DD')}</td> : <td> </td>
         }
         <td>
            {
               [...Array(5)].map((s, index) => index < props.film.rating ?
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                     <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                     <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                  </svg>
               )
            }
         </td>
      </>
   );
}




export default MyTable;
