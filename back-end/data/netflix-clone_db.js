const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, // Attende che le connessioni siano disponibili prima di restituire un errore
  connectionLimit: 10, // Limite massimo di connessioni nel pool
  queueLimit: 0, // Limite massimo di query in coda (0 = illimitato)
});

pool.on('error', (err) => {
  console.error('Database pool error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.');
  }
  if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
    console.error('Database had a fatal error.');
  }
  if (err.code === 'PROTOCOL_ENQUEUE_AFTER_DESTROY') {
    console.error('Database connection was destroyed.');
  }
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  if (connection) {
    connection.release();
    console.log('Connesso al database del clone di Netflix!');
  }
});

module.exports = pool;