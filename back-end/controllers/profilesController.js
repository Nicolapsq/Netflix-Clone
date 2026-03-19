const db = require("../data/netflix-clone_db");

function index(req, res) {
  console.log('params:', req.params);
  console.log('userId:', req.params.user_id);
  const userId = parseInt(req.params.userId);
  const query = `SELECT * FROM profiles WHERE user_id = ?`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante l'esecuzione della query al database",
      });
    }
    res.json(results);
  });
}

function show(req, res) {
  const profileId = parseInt(req.params.id);
  const query = `SELECT * FROM profiles WHERE id = ?`;
  db.query(query, [profileId], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante l'esecuzione della query al database",
      });
    }
    const profile = results[0];
    if (!profile) {
      return res.status(404).json({
        error: "Not found",
        message: `Nessun profilo trovato con ID ${profileId}`,
      });
    }
    res.json(profile);
  });
}

function store(req, res) {
  console.log(req.params);
  console.log(req.body);
  const userId = parseInt(req.params.userId);
  const name = req.body.name;
  const avatar = req.body.avatar;
  const isKids = Boolean(req.body.is_Kids) || false;
  const query = `INSERT INTO profiles (user_id, name, avatar, is_Kids) VALUES (?, ?, ?, ?)`;
  db.query(query, [userId, name, avatar, isKids], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante l'esecuzione della query al database",
      });
    }
    const newProfile = {
      id: results.insertId,
      userId: userId,
      name: name,
      avatar: avatar,
      is_Kids: isKids,
    };
    res.status(201).json(newProfile);
  });
}

function update(req, res) {
  const profileId = parseInt(req.params.id);
  const query = `SELECT * FROM profiles WHERE id = ?`;
  db.query(query, [profileId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante l'esecuzione della query al database",
      });
    }
  const profile = results[0];
  if (!profile) {
    return res.status(404).json({
      error: "Not found",
      message: "Profilo non trovato",
    });
  }
  // Aggiorna i campi del profilo
  const updatedProfile = {
    name: req.body.name || profile.name,
    avatar: req.body.avatar || profile.avatar,
    is_Kids: req.body.is_Kids !== undefined ? Boolean(req.body.is_Kids) : profile.is_Kids,
  };
  const updateQuery = `UPDATE profiles SET name = ?, avatar = ?, is_Kids = ? WHERE id = ?`;
  db.query(updateQuery, [updatedProfile.name, updatedProfile.avatar, updatedProfile.is_Kids, profileId], (updateErr) => {
    if (updateErr) {
      console.log(updateErr);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante l'aggiornamento del profilo nel database",
      });
    }
    res.json(updatedProfile);
  });
});
}

function modify(req, res) {
    const profileId = parseInt(req.params.id);
    const query = `SELECT * FROM profiles WHERE id = ?`;
    db.query(query, [profileId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: "Internal Server Error",
                message: "Errore durante l'esecuzione della query al database",
            });
        }
    const profile = results[0];
    if (!profile) {
        return res.status(404).json({
            error: 'Not found',
            message: 'Profilo non trovato'
        });
    }
    // Aggiorna i campi del profilo
    const updatedProfile = {
    name: req.body.name || profile.name,
    avatar: req.body.avatar || profile.avatar,
    is_Kids: req.body.is_Kids !== undefined ? Boolean(req.body.is_Kids) : profile.is_Kids,
  };
  const updateQuery = `UPDATE profiles SET name = ?, avatar = ?, is_Kids = ? WHERE id = ?`;
  db.query(updateQuery, [updatedProfile.name, updatedProfile.avatar, updatedProfile.is_Kids, profileId], (updateErr) => {
    if (updateErr) {
      console.log(updateErr);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante l'aggiornamento del profilo nel database",
      });
    }
    res.json(updatedProfile);
  });
});
}

function destroy(req, res) {
    const profileId = parseInt(req.params.id);
    const query = `SELECT * FROM profiles WHERE id = ?`;
    db.query(query, [profileId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: "Internal Server Error",
                message: "Errore durante l'esecuzione della query al database",
            });
        }
    const profile = results[0];
    if (!profile) {
        return res.status(404).json({
            error: 'Not found',
            message: 'Profilo non trovato'
        });
    }
    const deleteQuery = `DELETE FROM profiles WHERE id = ?`;
    db.query(deleteQuery, [profileId], (deleteErr) => {
        if (deleteErr) {
            console.log(deleteErr);
            return res.status(500).json({
                error: "Internal Server Error",
                message: "Errore durante l'eliminazione del profilo dal database",
            });
        }
        res.sendStatus(204);
    });
});
}

module.exports = { index, show, store, update, modify, destroy };
