const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { pool } = require('../db');
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No auth' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// list all labs metadata
router.get('/', requireAuth, async (req, res) => {
  const r = await pool.query('SELECT id,key_name,title,description,difficulty FROM labs');
  res.json(r.rows);
});

// list assigned labs for student with status
router.get('/assigned', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const r = await pool.query(
    `SELECT a.id as assign_id, l.id as lab_id, l.key_name, l.title, l.description, a.status, a.hints_used
     FROM assignments a
     JOIN labs l ON l.id = a.lab_id
     WHERE a.user_id = $1`,
    [userId]
  );
  res.json(r.rows);
});

// mark start or update status
router.post('/status', requireAuth, async (req, res) => {
  const { assign_id, status } = req.body;
  await pool.query('UPDATE assignments SET status=$1 WHERE id=$2', [status, assign_id]);
  res.json({ ok: true });
});

// submit report
router.post('/report', requireAuth, async (req, res) => {
  const { lab_id, content, evidence_path } = req.body;
  await pool.query(
    'INSERT INTO reports (user_id, lab_id, content, evidence_path) VALUES ($1,$2,$3,$4)',
    [req.user.id, lab_id, content || '', evidence_path || null]
  );
  res.json({ ok: true });
});

module.exports = router;
