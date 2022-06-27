"use strict";
const dayjs = require("dayjs");

const express = require("express");
const { check, validationResult, param, body } = require("express-validator");
const cors = require("cors");
const dao = require("./dao");
const userDao = require("./user-dao"); // module for accessing the users in the DB
const passport = require("passport"); // auth middleware
const LocalStrategy = require("passport-local").Strategy; // username and password for login
const session = require("express-session"); // enable sessions

const app = new express();
const PORT = 3001;

/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(
  new LocalStrategy(function (username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, {
          message: "Incorrect username and/or password.",
        });

      return done(null, user);
    });
  })
);

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao
    .getUserById(id)
    .then((user) => {
      done(null, user); // this will be available in req.user
    })
    .catch((err) => {
      done(err, null);
    });
});

app.use(express.json());

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOption));

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  //da mettere in tutte le API
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "not authenticated" });
};

// set up the session
app.use(
  session({
    // by default, Passport uses a MemoryStore to keep track of the sessions
    secret:
      "a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);

//GET - Retrieve the list of all the available films
app.get("/api/films", isLoggedIn, async (req, res) => {
  try {
    const filmList = await dao.getFilms(req.user.id);
    res.status(200).json(filmList);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

//GET - Retrieve a film, given its “id”.
app.get(
  "/api/films/:id",
  isLoggedIn,
  [check("id").isInt()],
  async (req, res) => {
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
  }
);

//GET - Retrieve films, given a filter.
app.get(
  "/api/films/filter/:filter",
  isLoggedIn,
  [check("filter").isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      res.status(422).json({
        errors: errors.array(),
      });

    try {
      let film = await dao.getFilms(req.user.id);

      let filteredFilms = [];
      switch (req.params.filter) {
        case "all":
          filteredFilms = film;
          break;
        case "favorites":
          filteredFilms = film.filter((film) => film.favorite != 0);
          break;
        case "best rated":
          filteredFilms = film.filter((film) => film.rating === 5);
          break;

        case "seen last month":
          filteredFilms = film.filter(
            (film) =>
              film.watchdate != undefined &&
              dayjs().diff(film.watchdate, "day") <= 30
          );
          break;
        case "unseen":
          filteredFilms = film.filter((film) => film.watchdate == undefined);
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
  "/api/add",
  isLoggedIn,
  [
    check("title").isString().notEmpty(),
    check("favorite").isBoolean(),
    check("watchdate")
      .if(body("watchdate").exists())
      .isDate({ format: "YYYY-MM-DD", strictMode: true }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      res.status(422).json({
        errors: errors.array(),
      });

    const film = {
      title: req.body.title,
      favorite: req.body.favorite,
      watchdate: req.body.watchdate,
      rating: req.body.rating,
      user: req.user.id,
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
  isLoggedIn,
  [
    check("id").isInt(),
    check("title").isString(),
    check("favorite").isBoolean(),
    //check("newUser").isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      res.status(422).json({
        errors: errors.array(),
      });

    const film = {
      id: req.params.id,
      title: req.body.title,
      favorite: req.body.favorite,
      watchdate: req.body.date,
      rating: req.body.rating,
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
  "/api/films/:id/:favorite",
  isLoggedIn,
  [check("id").isInt(), check("favorite").isBoolean()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      res.status(422).json({
        errors: errors.array(),
      });

    const film = {
      id: req.params.id,
      favorite: req.params.favorite,
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

// PUT - update star
app.put(
  "/api/films/:id/rating/:rating",
  isLoggedIn,
  [check("id").isInt(), check("rating").isInt()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      res.status(422).json({
        errors: errors.array(),
      });

    const film = {
      id: req.params.id,
      rating: req.params.rating,
    };
    try {
      await dao.updateRating_byID(film);
      res.status(201).end();
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  }
);

//DELETE - Delete an existing film, given its “id”.
app.delete(
  "/api/films/:id",
  isLoggedIn,
  [check("id").isInt()],
  async (req, res) => {
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
  }
);

/*** Users APIs ***/

// POST /sessions
// login
app.post("/api/sessions", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

// DELETE /sessions/current
// logout
app.delete("/api/sessions/current", (req, res) => {
  req.logout(() => {
    res.end();
  });
});

app.get("/api/sessions/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else res.status(401).json({ error: "Unauthenticated user!" });
});
