const express = require('express');
const router = express.Router();
const fs = require('fs');
const { parse } = require('csv-parse');
const { pool } = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

// simple admin auth middleware (production: improve)
function requireAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No auth' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ error: 'Not admin' });
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// CSV upload endpoint: expects raw csv in body or file data (for simplicity, accept CSV text)
router.post('/import-csv', requireAdmin, express.text({ type: '*/*', limit: '10mb' }), async (req, res) => {
  const csvText = req.body;
  const records = [];
  parse(csvText, { columns: true, trim: true }, async (err, out) => {
    if (err) return res.status(400).json({ error: err.message });
    try {
      for (const row of out) {
        const name = row.name || row.Name || row.student_name || row.StudentName || '';
        const email = row.email || row.Email || row.student_email;
        const password = (row.password || 'changeme123').trim();
        if (!email) continue;
        const bcrypt = require('bcryptjs');
        const hashed = bcrypt.hashSync(password, 8);
        await pool.query(
          'INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) ON CONFLICT (email) DO NOTHING',
          [name, email, hashed, 'student']
        );
      }
      res.json({ ok: true, imported: out.length });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
});

// assign lab to list of students by emails or user_ids
router.post('/assign', requireAdmin, async (req, res) => {
  const { emails, lab_key } = req.body;
  if (!lab_key) return res.status(400).json({ error: 'lab_key required' });
  try {
    const labRes = await pool.query('SELECT id FROM labs WHERE key_name=$1', [lab_key]);
    if (!labRes.rowCount) return res.status(400).json({ error: 'lab not found' });
    const labId = labRes.rows[0].id;
    for (const email of emails) {
      const userRes = await pool.query('SELECT id FROM users WHERE email=$1', [email]);
      if (!userRes.rowCount) continue;
      const userId = userRes.rows[0].id;
      await pool.query(
        `INSERT INTO assignments (user_id, lab_id) VALUES ($1,$2)
         ON CONFLICT DO NOTHING`,
        [userId, labId]
      );
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// simple list students
router.get('/students', requireAdmin, async (req, res) => {
  const r = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY id DESC LIMIT 500');
  res.json(r.rows);
});

module.exports = router;
