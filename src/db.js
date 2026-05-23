const mysql = require('mysql2/promise');

const useSsl = process.env.DB_SSL === 'true';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  database: process.env.DB_NAME || 'pokemon_db',
  user: process.env.DB_USER || 'pokemon_user',
  password: process.env.DB_PASSWORD || 'pokemon_pass',
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;