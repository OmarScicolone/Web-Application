"use strict"

function Film(id, title, favorites, date, rating) {
   this.id = id;
   this.title = title;
   this.favorites = favorites;
   this.date = date; //this.date = date || ;
   this.rating = rating;
}

const FilmLibrary = [
   new Film(1, "Pulp Fiction", true, "March 10, 2022", 5),
   new Film(2, "21 Grams", true, "March 17, 2022", 4),
   new Film(5, "Shrek", false, "March 21, 2022", 3),
   new Film(3, "Star Wars", false, "03/21/2022", 0),
   new Film(4, "Matrix", false, "03/21/2022", 0),
   new Film(4, "Lol", false, "03/21/2022", 0),
];

function createFilmElement(film) {
   const newTr = document.createElement("tr");

   const tdTitle = document.createElement('td');
   tdTitle.innerText = film.title;

   // const cb = document.createElement('input');
   // cb.type = "checkbox";
   // cb.checked = film.favorites;
   // const tdcd = document.createElement('td');
   // tdcd.appendChild(cb);

   // <div class="form-check">
   //                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
   //                      <label class="form-check-label" for="flexCheckDefault">
   //                         Favorite
   //                      </label>
   //                   </div>


   const tdCb = document.createElement('td');
   const cb = document.createElement('input');
   cb.type = "checkbox";
   cb.checked = film.favorites;
   const labelCb = document.createElement('label');
   labelCb.innerText = "Favorite";
   tdCb.appendChild(cb);
   tdCb.appendChild(labelCb);


   let stars = "";
   for (let i = 0; i < 5; i++) {
      stars += i >= film.rating ? `<i class="bi bi-star"></i>` : `<i class="bi bi-star-fill"></i>`;
   }
   const tdRating = document.createElement('td');
   tdRating.innerHTML = stars;

   const tdDate = document.createElement('td');
   tdDate.innerText = film.date;

   newTr.appendChild(tdTitle);
   newTr.appendChild(tdCb);
   newTr.appendChild(tdDate);
   newTr.appendChild(tdRating);

   return newTr;
}

function createCheckbox(favorite) {
   const cb = document.createElement('input')
   cb.type = 'checkbox'
   cb.checked = favorite
   return cb.innerHTML
}

const tableBody = document.querySelector('tbody');

for (let film of FilmLibrary) {
   const newRow = createFilmElement(film);
   tableBody.appendChild(newRow);
}