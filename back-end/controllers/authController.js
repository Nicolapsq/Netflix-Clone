const db = require("../data/netflix-clone_db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registrazione
function register(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const plan = req.body.plan;

  // Controllo dei dati di input
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Email non valida",
    });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Password non valida",
    });
  }

  const validPlans = ["basic", "standard", "premium"];
  if (plan && !validPlans.includes(plan)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Piano non valido",
    });
  }

  const emailLower = email.toLowerCase();

  const query = `SELECT * FROM users WHERE email = ?`;

  db.query(query, [emailLower], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante la registrazione",
      });
    }

    if (results.length > 0) {
      return res.status(409).json({
        error: "Conflict",
        message: "Email già registrata",
      });
    }

    // Cripta la password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Errore durante la crittografia",
        });
      }

      // Inserisce l'utente
      const insertQuery = `INSERT INTO users (email, password, plan) VALUES (?, ?, ?)`;
      db.query(
        insertQuery,
        [emailLower, hashedPassword, plan || "basic"],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              error: "Internal Server Error",
              message: "Errore durante la registrazione",
            });
          }

          res.status(201).json({
            message: "Utente registrato con successo",
            id: result.insertId,
            email: email,
          });
        },
      );
    });
  });
}

// Login
function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // Cerca l'utente nel database
  const query = `SELECT * FROM users WHERE email = ?`;
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Errore durante il login",
      });
    }

    const user = results[0];
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Email o password errati",
      });
    }

    // Confronta la password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({
          error: "Unauthorized",
          message: "Email o password errati",
        });
      }

      // ← Prende il primo profilo dell'utente
      const query = `SELECT * FROM profiles WHERE user_id = ? LIMIT 1`;
      db.query( query, [user.id], (err, profiles) => {
          if (err) {
            return res.status(500).json({
              error: "Internal Server Error",
              message: "Errore durante il recupero del profilo",
            });
          }

          const profile = profiles[0] || null;

          // Genera il token JWT
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" },
          );

          res.json({
            message: "Login effettuato con successo",
            token: token,
            user: {
              id: user.id,
              email: user.email,
              plan: user.plan,
              profile_id: profile?.id || null,
            },
          });
        },
      );
    });
  });
}

module.exports = { register, login };
