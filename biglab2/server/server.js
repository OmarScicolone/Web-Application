"use strict";
const express = require("express");
const { check, validationResult, param } = require("express-validator");

const app = new express();
const PORT = 3001;
app.use(express.json());
const dao = require("./dao");

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);

//GET - Retrieve the list of all the available films
app.get("/api/films", async (req, res) => {
  try {
    const filmList = await dao.getFilms();
    res.status(200).json(filmList);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

//GET - Retrieve a film, given its “id”.
app.get("/api/films/:id", [check("id").isInt()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.status(422).json({
      errors: errors.array(),
    });

  try {
    const film = await dao.getFilm_byID(req.params.id);
    if (film == "") {
      return res.status(404).json({
        error: `Error 404: No film with id=${req.params.id}`,
      });
    }
    res.json(film);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

//GET - Retrieve films, given a filter.
app.get(
  "/api/films/filter/:filter",
  [check("filter").isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      res.status(422).json({
        errors: errors.array(),
      });

    try {
      let film = await dao.getFilms();

      let filteredFilms = [];
      switch (req.params.filter) {
        case "all":
          filteredFilms = film;
          break;
        case "favorites":
          filteredFilms = film.filter((film) => film.favorite != 0);
          console.log(filteredFilms);
          break;
        case "best rated":
          filteredFilms = film.filter((film) => film.rating === 5);
          break;
        case "seen last month":
          filteredFilms = film.filter(
            (film) =>
              film.date !== undefined && dayjs().diff(film.date, "day") <= 30
          );
          break;
        case "unseen":
          filteredFilms = film.filter((film) => film.date === undefined);
          break;
        default:
          filteredFilms = film;
      }
      res.json(filteredFilms);
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  }
);

//POST - Create a new film, by providing all relevant information – except the “id” that will be automatically assigned by the back-end.
app.post(
  "/api/films",
  [
    check("title").isString().notEmpty(),
    check("favorite").isBoolean(),
    check("user").isInt(),
  ],
  async (req, res) => {
    const film = {
      title: req.body.title,
      favorite: req.body.favorite,
      watchdate: req.body.watchdate,
      rating: req.body.rating,
      user: req.body.user,
    };

    try {
      await dao.addFilm(film);
      res.status(201).end();
    } catch (err) {
      console.log(err);
      res.status(503).end();
    }
  }
);

//PUT - Update an existing film, by providing all the relevant information, i.e., all the properties except the “id” will overwrite the current properties of the existing film. The “id” will not change after the update.
app.put(
  "/api/films/:id",
  [
    check("id").isInt(),
    check("newTitle").isString(),
    check("newFavorite").isBoolean(),
    check("newUser").isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      res.status(422).json({
        errors: errors.array(),
      });

    const film = {
      id: req.params.id,
      title: req.body.newTitle,
      favorite: req.body.newFavorite,
      watchdate: req.body.newWatchdate,
      rating: req.body.newRating,
      user: req.body.newUser,
    };
    try {
      await dao.updateFilm_byID(film);
      res.status(201).end();
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  }
);

//PUT - Mark an existing film as favorite/unfavorite.
app.put(
  "/api/films/:id/:fav",
  [check("id").isInt(), check("fav").isBoolean()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      res.status(422).json({
        errors: errors.array(),
      });

    const film = {
      id: req.params.id,
      favorite: req.params.fav,
    };
    try {
      await dao.updateFavorite_byID(film);
      res.status(201).end();
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  }
);

//DELETE - Delete an existing film, given its “id”.
app.delete("/api/films/:id", [check("id").isInt()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.status(422).json({
      errors: errors.array(),
    });
  try {
    await dao.deleteFilm_byID(req.params.id);
    res.status(201).end();
  } catch (err) {
    res.status(503).end();
  }
});
