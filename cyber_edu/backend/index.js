require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const { init, pool } = require('./db');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const labsRoutes = require('./routes/labs');

const app = express();
app.use(express.json());

const upload = multer({ dest: path.join(__dirname, 'uploads/') });

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/labs', labsRoutes);

// upload evidence
app.post('/api/upload', upload.single('evidence'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ path: `/uploads/${req.file.filename}`, originalname: req.file.originalname });
});

app.get('/', (req, res) => res.send('CyberEdu Backend running'));

async function start() {
  try {
    await init();
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Backend listening on ${port}`));
  } catch (err) {
    console.error('Startup error', err);
    process.exit(1);
  }
}

start();
