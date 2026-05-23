const mysql = require('mysql2/promise');

const useSsl = process.env.DB_SSL === 'true';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'kodama.proxy.rlwy.net',
  port: Number(process.env.DB_PORT || 32314),
  database: process.env.DB_NAME || 'railway',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'pQAAGmYplrOrbbsfbieiicIdMSeiyrHV',
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 10000
});

module.exports = pool;