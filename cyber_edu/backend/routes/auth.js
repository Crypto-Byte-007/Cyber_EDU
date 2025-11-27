const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

// register simple (admin only via admin CSV in prod)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing' });
  const hashed = bcrypt.hashSync(password, 8);
  try {
    const r = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, email, name, role',
      [name || '', email, hashed, role || 'student']
    );
    res.json(r.rows[0]);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const r = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  const user = r.rows[0];
  if (!user) return res.status(401).json({ error: 'Invalid' });
  if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: 'Invalid' });
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

module.exports = router;
