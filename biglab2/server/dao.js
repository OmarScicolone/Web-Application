"use strict";

const sqlite = require("sqlite3");
const db = new sqlite.Database("films.db", (err) => {
  if (err) throw err;
});

// get all films
exports.getFilms = (userId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT id, title, favorite, watchdate, rating FROM films WHERE user=?";
    db.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const films = rows.map((f) => ({
        id: f.id,
        title: f.title,
        favorite: f.favorite,
        watchdate: f.watchdate,
        rating: f.rating,
      }));
      resolve(films);
    });
  });
};

exports.getFilm_byID = (filmid) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT id, title, favorite, watchdate, rating FROM films WHERE id=?";
    db.all(sql, [filmid], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const film = rows.map((f) => ({
        title: f.title,
        favorite: f.favorite,
        watchdate: f.watchdate,
        rating: f.rating,
      }));
      resolve(film);
    });
  });
};

exports.addFilm = (film) => {
  return new Promise(async (resolve, reject) => {
    const sql =
      "INSERT INTO films (title, favorite, watchdate, rating, user) VALUES(?,?,?,?,?)";
    db.run(
      sql,
      [film.title, film.favorite, film.watchdate, film.rating, film.user],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(null);
      }
    );
  });
};

exports.updateFilm_byID = (film) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE films SET title = ?, favorite = ?, watchdate = ?, rating = ? WHERE id=?";
    db.all(
      sql,
      [film.title, film.favorite, film.watchdate, film.rating, film.id],
      (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(null);
      }
    );
  });
};

exports.updateFavorite_byID = (film) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE films SET favorite = ? WHERE id=?";
    db.all(sql, [film.favorite, film.id], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

exports.updateRating_byID = (film) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE films SET rating = ? WHERE id=?";
    db.all(sql, [film.rating, film.id], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

//delete item by id
exports.deleteFilm_byID = (filmid) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM films WHERE id=?";
    db.all(sql, [filmid], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};
