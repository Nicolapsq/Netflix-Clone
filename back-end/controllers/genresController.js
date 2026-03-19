const db = require("../data/netflix-clone_db");


function index(req, res) {
  const query = `SELECT * FROM genres`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante il recupero dei generi",
      });
    }
  res.json(results);
});
}

function show(req, res) {
  const genreId = parseInt(req.params.id);
  const query =`
        SELECT movies.* 
        FROM movies
        JOIN movie_genres ON movies.id = movie_genres.movie_id
        WHERE movie_genres.genre_id = ?`;
  db.query(query, [genreId], (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante il recupero del genere",
      });
    }
  const genre = results;
  if (genre.length === 0) {
    return res.status(404).json({
      error: "Not found",
      message: `Nessun genere trovato con ID ${genreId}`,
    });
  }
  res.json(genre);
});
}

function store(req, res) {
  const query = `INSERT INTO genres (name) VALUES (?)`;
  const value = [req.body.name];
  db.query(query, value, (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante l'inserimento del genere",
      });
    }
    const newGenre = {
      id: results.insertId,
      name: req.body.name,
    };
    res.status(201).json(newGenre);
  });
}

function update(req, res) {
  const genreId = parseInt(req.params.id);
  const query = `SELECT * FROM genres WHERE id = ?`;
  db.query(query, [genreId], (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante il recupero del genere",
      });
    }
  const genre = results[0];
  if (!genre) {
    return res.status(404).json({
      error: "Not found",
      message: "Genere non trovato",
    });
  }
  // Aggiorna i campi del genere
  const updateQuery = `UPDATE genres SET name = ? WHERE id = ?`;
  const updateValues = [req.body.name || genre.name, genreId];
  db.query(updateQuery, updateValues, (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante l'aggiornamento del genere",
      });
    }
    const updatedGenre = {
      id: genreId,
      name: req.body.name || genre.name,
    };
    res.json(updatedGenre);
  });
  });
}

function destroy(req, res) {
    const genreId = parseInt(req.params.id);
    const query = `SELECT * FROM genres WHERE id = ?`;
    db.query(query, [genreId], (err, results) => {
      if (err) {
        console.error("Errore durante l'esecuzione della query:", err);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Si è verificato un errore durante la cancellazione del genere",
        });
      }
      const genre = results[0];
      if (!genre) {
        return res.status(404).json({
            error: 'Not found',
            message: 'Genere non trovato'
        });
    }
    const deleteQuery = `DELETE FROM genres WHERE id = ?`;
    db.query(deleteQuery, [genreId], (err, results) => {
      if (err) {
        console.error("Errore durante l'esecuzione della query:", err);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Si è verificato un errore durante la cancellazione del genere",
        });
      }
      res.sendStatus(204);
    });
});
}

module.exports = { index, show, store, update, destroy };
