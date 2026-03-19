const db = require("../data/netflix-clone_db");

function index(req, res) {
  const query = "SELECT * FROM movies";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante il recupero dei film",
      });
    }
    res.json(results);
  });
}

function show(req, res) {
  const movieId = parseInt(req.params.id);
  const query = "SELECT * FROM movies WHERE id = ?";
  db.query(query, [movieId], (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante il recupero del film",
      });
    }
    const movie = results[0];
    if (!movie) {
      return res.status(404).json({
        error: "Not found",
        message: `Nessun film trovato con ID ${movieId}`,
      });
    }
    res.json(movie);
  });
}

function store(req, res) {
  const query =
    "INSERT INTO movies (title, description, release_year, type, rating, thumbnail, banner, video_url, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.release_year,
    req.body.type,
    req.body.rating,
    req.body.thumbnail,
    req.body.banner,
    req.body.video_url,
    req.body.is_featured,
  ];
  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante l'inserimento del film",
      });
    }
    const newMovie = {
      id: results.insertId,
      title: req.body.title,
      description: req.body.description,
      release_year: req.body.release_year,
      type: req.body.type,
      rating: req.body.rating,
      thumbnail: req.body.thumbnail,
      banner: req.body.banner,
      video_url: req.body.video_url,
      is_featured: req.body.is_featured,
    };
    res.status(201).json(newMovie);
  });
}

function update(req, res) {
  const movieId = parseInt(req.params.id);
  const query = "SELECT * FROM movies WHERE id = ?";
  db.query(query, [movieId], (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante il recupero del film",
      });
    }
    const movie = results[0];
    if (!movie) {
      return res.status(404).json({
        error: "Not found",
        message: `Nessun film trovato con ID ${movieId}`,
      });
    }

    // Aggiorna i campi del film
    const updateQuery =
      "UPDATE movies SET title = ?, description = ?, release_year = ?, type = ?, rating = ?, thumbnail = ?, banner = ?, video_url = ?, is_featured = ? WHERE id = ?";
    const updateValues = [
      req.body.title || movie.title,
      req.body.description || movie.description,
      req.body.release_year || movie.release_year,
      req.body.type || movie.type,
      req.body.rating || movie.rating,
      req.body.thumbnail || movie.thumbnail,
      req.body.banner || movie.banner,
      req.body.video_url || movie.video_url,
      req.body.is_featured !== undefined
        ? req.body.is_featured
        : movie.is_featured,
      movieId,
    ];
    db.query(updateQuery, updateValues, (err, results) => {
      if (err) {
        console.error("Errore durante l'esecuzione della query:", err);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Si è verificato un errore durante l'aggiornamento del film",
        });
      }
      const updatedMovie = {
        id: movieId,
        title: req.body.title || movie.title,
        description: req.body.description || movie.description,
        release_year: req.body.release_year || movie.release_year,
        type: req.body.type || movie.type,
        rating: req.body.rating || movie.rating,
        thumbnail: req.body.thumbnail || movie.thumbnail,
        banner: req.body.banner || movie.banner,
        video_url: req.body.video_url || movie.video_url,
        is_featured:
          req.body.is_featured !== undefined
            ? req.body.is_featured
            : movie.is_featured,
      };
      res.json({
        movie: updatedMovie,
        message: "Film aggiornato con successo",
      });
    });
  });
}

function modify(req, res) {
  const movieId = parseInt(req.params.id);
  const query = "SELECT * FROM movies WHERE id = ?";
  db.query(query, [movieId], (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante il recupero del film",
      });
    }
  const movie = results[0];
  if (!movie) {
    return res.status(404).json({
      error: "Not found",
      message: "Film non trovato",
    });
  }
  // Aggiorna i campi del film
  const updateQuery = "UPDATE movies SET title = ?, description = ?, release_year = ?, type = ?, rating = ?, thumbnail = ?, banner = ?, video_url = ?, is_featured = ? WHERE id = ?";
  const updateValues = [
    req.body.title || movie.title,
      req.body.description || movie.description,
      req.body.release_year || movie.release_year,
      req.body.type || movie.type,
      req.body.rating || movie.rating,
      req.body.thumbnail || movie.thumbnail,
      req.body.banner || movie.banner,
      req.body.video_url || movie.video_url,
      req.body.is_featured !== undefined
        ? req.body.is_featured
        : movie.is_featured,
      movieId,
  ];
  db.query(updateQuery, updateValues, (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante l'aggiornamento del film",
      });
    }
    const updatedMovie = {
      id: movieId,
      title: req.body.title || movie.title,
      description: req.body.description || movie.description,
      release_year: req.body.release_year || movie.release_year,
      type: req.body.type || movie.type,
      rating: req.body.rating || movie.rating,
      thumbnail: req.body.thumbnail || movie.thumbnail,
      banner: req.body.banner || movie.banner,
      video_url: req.body.video_url || movie.video_url,
      is_featured:
        req.body.is_featured !== undefined
          ? req.body.is_featured
          : movie.is_featured,
    };
    res.json({
      movie: updatedMovie,
      message: "Film aggiornato con successo",
    });
  });
});
}

function destroy(req, res) {
  const movieId = parseInt(req.params.id);
  const query = "SELECT * FROM movies WHERE id = ?";
  db.query(query, [movieId], (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante il recupero del film",
      });
    }
  const movie = results[0];
  if (!movie) {
    return res.status(404).json({
      error: "Not found",
      message: "Film non trovato",
    });
  }
  const deleteQuery = "DELETE FROM movies WHERE id = ?";
  db.query(deleteQuery, [movieId], (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante la cancellazione del film",
      });
    }
    res.sendStatus(204);
  });
});
}

module.exports = { index, show, store, update, modify, destroy };
