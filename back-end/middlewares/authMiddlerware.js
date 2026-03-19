const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Token mancante'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Token non valido o scaduto'
            });
        }
        req.user = decoded; // ← aggiunge l'utente alla request
        next();
    });
}

module.exports = {authMiddleware};

// **Come testare su Postman:**

// **Registrazione:**
// ```
// POST http://localhost:3000/auth/register
// Body: { "email": "nicola@gmail.com", "password": "12345", "plan": "basic" }
// ```

// **Login:**
// ```
// POST http://localhost:3000/auth/login
// Body: { "email": "nicola@gmail.com", "password": "12345" }
// ```

// **Rotta protetta:**
// ```
// GET http://localhost:3000/users
// Headers: Authorization: Bearer IL_TUO_TOKEN