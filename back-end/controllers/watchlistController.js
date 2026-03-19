const db = require("../data/netflix-clone_db");

function index(req, res) {
  const profileId = parseInt(req.params.id);
  const query =
        `SELECT watchlist.*, movies.title, movies.thumbnail, movies.type
        FROM watchlist
        JOIN movies ON watchlist.movie_id = movies.id
        WHERE watchlist.profile_id = ?`;
  db.query(query, [profileId], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante la query al database",
      });
    }
    res.json(results);
  });
}

function store(req, res) {
  const profileId = parseInt(req.params.id);
  const movieId = parseInt(req.body.movie_id);
  console.log(profileId);
  console.log(movieId);

  // Controlla se il film è già nella watchlist
  const query = `SELECT * FROM watchlist WHERE profile_id = ? AND movie_id = ?`;

  const insertValues = [profileId, movieId];

  db.query(query, insertValues, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante il controllo della watchlist",
      });
    }
    const episode = results[0];
    if (episode) {
      return res.status(409).json({
        error: "Conflict",
        message: "Il film è già nella watchlist",
      });
    }

    const insertQuery = `INSERT INTO watchlist (profile_id, movie_id, added_at) VALUES (?, ?, ?)`;
    const Values = [profileId, movieId, new Date()];

    db.query(insertQuery, Values, (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Errore durante l`inserimento nella watchlist",
        });
      }
      const newMovie = {
        id: results.insertId,
        profile_id: profileId,
        movie_id: movieId,
        added_at: new Date(),
      };
      res.status(201).json(newMovie);
    });
  });
}

function destroy(req, res) {
  const profileId = parseInt(req.params.id);
  const movieId = parseInt(req.params.movieId);

  const query = `SELECT * FROM watchlist WHERE profile_id = ? AND movie_id = ?`;

  db.query(query, [profileId, movieId], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante la selezione dalla watchlist",
      });
    }
    const movie = results[0];
    if (!movie) {
      return res.status(404).json({
        error: "Not found",
        message: "Film non trovato nella watchlist",
      });
    }
    const deleteQuery = `DELETE FROM watchlist WHERE id = ?`;
    db.query(deleteQuery, [movie.id], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Errore durante l`eliminazione dalla watchlist",
        });
      }
      res.sendStatus(204);
    });
  });
}

module.exports = { index, store, destroy };
