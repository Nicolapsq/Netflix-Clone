const db = require("../data/netflix-clone_db");

function index(req, res) {
  const profileId = parseInt(req.params.id);
  const query = `SELECT * FROM watch_history WHERE profile_id = ?`;
  db.query(query, [profileId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
}

function store(req, res) {
  const profileId = parseInt(req.params.id);
  const movieId = parseInt(req.body.movie_id);
  const episodeId = req.body.episode_id ? parseInt(req.body.episode_id) : null;
  const progress = req.body.progress ? parseInt(req.body.progress) : 0;

  // Se il film esiste già nello storico aggiorna il progresso
  const query = `SELECT * FROM watch_history WHERE profile_id = ? AND movie_id = ?`;

  db.query(query, [profileId, movieId], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante il controllo dello storico",
      });
    }

    const history = results[0];

    if (history) {
      const updateHistoryQuery = `UPDATE watch_history SET progress = ?, watched_at = ? WHERE id = ?`;

      const updateHistoryValues = [progress, new Date(), history.id];

      db.query(updateHistoryQuery, updateHistoryValues, (err, results) => {
        if (err) {
          return res.status(500).json({
            error: "Internal Server Error",
            message: "Errore durante l'aggiornamento dello storico",
          });
        }

        const updatedHistory = {
          id: history.id,
          profile_id: profileId,
          movie_id: movieId,
          episode_id: episodeId,
          progress: progress,
          watched_at: new Date(),
        };

        res.json(updatedHistory);
      });
    } else {
      const insertQuery = `INSERT INTO watch_history (profile_id, movie_id, episode_id, progress, watched_at) VALUES (?, ?, ?, ?, ?)`;

      const insertValues = [
        profileId,
        movieId,
        episodeId || null,
        progress,
        new Date(),
      ];

      db.query(insertQuery, insertValues, (err, results) => {
        if (err) {
          return res.status(500).json({
            error: "Internal Server Error",
            message: "Errore durante l'aggiunta allo storico",
          });
        }

        const newHistory = {
          id: results.insertId,
          profile_id: profileId,
          movie_id: movieId,
          episode_id: episodeId,
          progress: progress,
          watched_at: new Date(),
        };

        res.status(201).json(newHistory);
      });
    }
  });
}

function destroy(req, res) {
  const profileId = parseInt(req.params.id);
  const movieId = parseInt(req.params.movieId);

  const query = `SELECT * FROM watch_history WHERE profile_id = ? AND movie_id = ?`;

  db.query(query, [profileId, movieId], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante l'eliminazione dallo storico",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Nessuno storico trovato per questo profilo e film",
      });
    }
    const deleteQuery = `DELETE FROM watch_history WHERE profile_id = ?`;

    db.query(deleteQuery, [profileId], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Errore durante l'eliminazione dallo storico",
        });
      }
    res.sendStatus(204);
  });
});
}

module.exports = { index, store, destroy };
