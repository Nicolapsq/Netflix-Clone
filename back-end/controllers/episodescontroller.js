const db = require("../data/netflix-clone_db");

function index(req, res) {
  const movieId = parseInt(req.params.movieId);
  const query = `SELECT * FROM episodes WHERE movie_id = ?`;
  const params = [movieId];
  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante il recupero degli episodi",
      });
    }
    res.json(results);
  });
}

function show(req, res) {
  const movieId = parseInt(req.params.movieId);
  const episodeNumber = parseInt(req.params.episode);
  const query = `SELECT * FROM episodes WHERE movie_id = ? AND episode_number = ?`;
  const params = [movieId, episodeNumber];
  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore durante il recupero dell'episodio",
      });
    }
    const episode = results[0];
    if (!episode) {
      return res.status(404).json({
        error: "Not found",
        message: "Episodio non trovato",
      });
    }
    res.json(episode);
  });
}

function store(req, res) {
  const movieId = parseInt(req.params.movieId);
  const query = `INSERT INTO episodes (
    movie_id, season, episode_number, title, description, duration, video_url, thumbnail
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    movieId,
    req.body.season,
    req.body.episode_number,
    req.body.title,
    req.body.description,
    req.body.duration,
    req.body.video_url,
    req.body.thumbnail,
  ];
  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message:
          "Si è verificato un errore durante l'inserimento dell'episodio",
      });
    }
    const newEpisode = {
      id: results.insertId,
      movie_id: movieId,
      season: req.body.season,
      episode_number: req.body.episode_number,
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      video_url: req.body.video_url || null,
      thumbnail: req.body.thumbnail || null,
    };
    res.status(201).json(newEpisode);
  });
}

function update(req, res) {
  const movieId = parseInt(req.params.movieId);
  const episodeNumber = parseInt(req.params.episode);

  const Query = `SELECT * FROM episodes WHERE episode_number = ? AND movie_id = ?`;
  db.query(Query, [episodeNumber, movieId], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante il recupero dell'episodio",
      });
    }

    const episode = results[0];
    if (!episode) {
      return res.status(404).json({
        error: "Not found",
        message: "Episodio non trovato",
      });
    }

    const updateQuery = `UPDATE episodes SET
            movie_id = ?,
            season = ?,
            episode_number = ?,
            title = ?,
            description = ?,
            duration = ?,
            video_url = ?,
            thumbnail = ?
            WHERE episode_number = ? AND movie_id = ?`;

    const values = [
      req.body.movie_id || episode.movie_id,
      req.body.season || episode.season,
      req.body.episode_number || episode.episode_number,
      req.body.title || episode.title,
      req.body.description || episode.description,
      req.body.duration || episode.duration,
      req.body.video_url || episode.video_url,
      req.body.thumbnail || episode.thumbnail,
      episodeNumber,
      movieId,
    ];

    db.query(updateQuery, values, (err) => {
      if (err) {
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Errore durante l'aggiornamento",
        });
      }

      const updatedEpisode = {
        movie_id: req.body.movie_id || episode.movie_id,
        season: req.body.season || episode.season,
        episode_number: req.body.episode_number || episode.episode_number,
        title: req.body.title || episode.title,
        description: req.body.description || episode.description,
        duration: req.body.duration || episode.duration,
        video_url: req.body.video_url || episode.video_url,
        thumbnail: req.body.thumbnail || episode.thumbnail,
      };

      res.json(updatedEpisode);
    });
  });
}

function modify(req, res) {
  const movieId = parseInt(req.params.movieId);
  const episodeNumber = parseInt(req.params.episode);
  const Query = `SELECT * FROM episodes WHERE episode_number = ? AND movie_id = ?`;

  db.query(Query, [episodeNumber, movieId], (err, results) => {
    if (err) {
      console.log("Errore durante l'esecuzione della query:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante il recupero dell'episodio",
      });
    }

    const episode = results[0];
    if (!episode) {
      return res.status(404).json({
        error: "Not found",
        message: "Episodio non trovato",
      });
    }

    const updateQuery = `UPDATE episodes SET
            movie_id = ?,
            season = ?,
            episode_number = ?,
            title = ?,
            description = ?,
            duration = ?,
            video_url = ?,
            thumbnail = ?
            WHERE episode_number = ? AND movie_id = ?`;

    const values = [
      req.body.movie_id || episode.movie_id,
      req.body.season || episode.season,
      req.body.episode_number || episode.episode_number,
      req.body.title || episode.title,
      req.body.description || episode.description,
      req.body.duration || episode.duration,
      req.body.video_url || episode.video_url,
      req.body.thumbnail || episode.thumbnail,
      episodeNumber,
      movieId,
    ];

    db.query(updateQuery, values, (err) => {
      if (err) {
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Errore durante l'aggiornamento",
        });
      }
      const updatedEpisode = {
        movie_id: req.body.movie_id || episode.movie_id,
        season: req.body.season || episode.season,
        episode_number: req.body.episode_number || episode.episode_number,
        title: req.body.title || episode.title,
        description: req.body.description || episode.description,
        duration: req.body.duration || episode.duration,
        video_url: req.body.video_url || episode.video_url,
        thumbnail: req.body.thumbnail || episode.thumbnail,
      };

      res.json(updatedEpisode);
    });
  });
}

function destroy(req, res) {
  const movieId = parseInt(req.params.movieId);
  const episodeNumber = parseInt(req.params.episode);
  const query = `SELECT * FROM episodes WHERE movie_id = ? AND episode_number = ?`;

  db.query(query, [movieId, episodeNumber], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante l'esecuzione della query al database",
      });
    }

    const episode = results[0];
    if (!episode) {
      return res.status(404).json({
        error: "Not found",
        message: "Episodio non trovato",
      });
    }

    const deleteQuery = `DELETE FROM episodes WHERE movie_id = ? AND episode_number = ?`;
    db.query(deleteQuery, [movieId, episodeNumber], (err) => {
      if (err) {
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Errore durante l'eliminazione dell'episodio",
        });
      }

      res.sendStatus(204);
    });
  });
}

module.exports = { index, show, store, update, modify, destroy };
