const db = require("../data/netflix-clone_db");
const bcrypt = require('bcrypt');

function index(req, res) {
  const queryEmail = req.query.email;
  const query = `SELECT * FROM users`;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante l'esecuzione della query al database",
      });
    }
    // Filtro per email
    if (queryEmail) {
      const filteredUsers = results.filter((user) =>
        user.email.includes(queryEmail),
      );
      return res.json(filteredUsers);
    }
    res.json(results);
  });
}

function show(req, res) {
  const userId = parseInt(req.params.id);
  const query = `SELECT * FROM users WHERE id = ?`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante l'esecuzione della query al database",
      });
    }
    const user = results[0];
    if (!user) {
      return res.status(404).json({
        error: "Not found",
        message: `Nessun utente trovato con ID ${userId}`,
      });
    }
    res.json(user);
  });
}

function store(req, res) {
  // Validazione input
  if (!req.body.email || !req.body.password || !req.body.plan) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Email, password e plan sono obbligatori",
    });
  }

  // Hash della password
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante l'hashing della password",
      });
    }

    const query = `INSERT INTO users (email, password, plan) VALUES (?, ?, ?)`;
    const email = req.body.email;
    const password = hashedPassword;
    const plan = req.body.plan;
    db.query(query, [email, password, plan], (err, results) => {
      if (err) {
        // Controlla se è un errore di email duplicata
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({
            error: "Conflict",
            message: "Questa email è già registrata",
          });
        }
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Errore durante l'esecuzione della query al database",
        });
      }
      const newUser = {
        id: results.insertId,
        email: email,
        plan: plan,
      };
      res.status(201).json({
        user: newUser,
        message: "Utente creato con successo",
      });
    });
  });
}

function update(req, res) {
  // PUT: sostituzione completa - tutti i campi sono obbligatori
  if (!req.body.email || !req.body.password || !req.body.plan) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Email, password e plan sono obbligatori per l'aggiornamento completo",
    });
  }

  const userId = parseInt(req.params.id);
  
  // Hash della password
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante l'hashing della password",
      });
    }

    const updateQuery = `UPDATE users SET email = ?, password = ?, plan = ? WHERE id = ?`;
    db.query(
      updateQuery,
      [req.body.email, hashedPassword, req.body.plan, userId],
      (err, results) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
              error: "Conflict",
              message: "Questa email è già utilizzata",
            });
          }
          return res.status(500).json({
            error: "Internal Server Error",
            message: "Errore durante l'aggiornamento dell'utente nel database",
          });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({
            error: "Not found",
            message: `Nessun utente trovato con ID ${userId}`,
          });
        }
        res.json({
          message: "Utente aggiornato con successo",
        });
      },
    );
  });
}

function modify(req, res) {
  // PATCH: aggiornamento parziale - solo i campi forniti
  const userId = parseInt(req.params.id);
  const query = `SELECT * FROM users WHERE id = ?`;
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante l'esecuzione della query al database",
      });
    }
    
    const user = results[0];
    if (!user) {
      return res.status(404).json({
        error: "Not found",
        message: "Utente non trovato",
      });
    }

    // Prepara i dati da aggiornare (solo quelli forniti)
    const updates = {};
    let needsHashing = false;

    if (req.body.email) updates.email = req.body.email;
    if (req.body.password) {
      needsHashing = true;
    }
    if (req.body.plan) updates.plan = req.body.plan;

    // Se non ci sono campi da aggiornare
    if (Object.keys(updates).length === 0 && !needsHashing) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Nessun campo da aggiornare fornito",
      });
    }

    // Se deve hashare la password
    if (needsHashing) {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        updates.password = hashedPassword;
        executeUpdate(updates);
      });
    } else {
      executeUpdate(updates);
    }

    function executeUpdate(updateData) {
      const setClause = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
      const values = Object.values(updateData);
      values.push(userId);

      const updateQuery = `UPDATE users SET ${setClause} WHERE id = ?`;
      db.query(updateQuery, values, (err, results) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
              error: "Conflict",
              message: "Questa email è già utilizzata",
            });
          }
          return res.status(500).json({
            error: "Internal Server Error",
            message: "Errore durante l'aggiornamento dell'utente nel database",
          });
        }
        res.json({
          message: "Utente aggiornato con successo",
        });
      });
    }
  });
}

function destroy(req, res) {
  const userId = parseInt(req.params.id);
  const query = `DELETE FROM users WHERE id = ?`;
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante l'esecuzione della query al database",
      });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({
        error: "Not found",
        message: `Nessun utente trovato con ID ${userId}`,
      });
    }
    
    res.status(200).json({
      message: "Utente eliminato con successo",
    });
  });
}

module.exports = { index, show, store, update, modify, destroy };
