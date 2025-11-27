const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'cyberedu',
  password: process.env.DB_PASSWORD || 'cyberedu_pass',
  database: process.env.DB_DATABASE || 'cyberedu',
});

// Simple init: create tables if not exist
async function init() {
  const sql = fs.readFileSync(path.join(__dirname, 'init.sql')).toString();
  await pool.query(sql);
  console.log('DB initialized');
}

module.exports = { pool, init };
