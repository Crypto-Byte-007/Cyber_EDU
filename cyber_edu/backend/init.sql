CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT DEFAULT 'student',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS labs (
  id SERIAL PRIMARY KEY,
  key_name TEXT UNIQUE,
  title TEXT,
  description TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS assignments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  lab_id INTEGER REFERENCES labs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started',
  hints_used INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reports (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  lab_id INTEGER REFERENCES labs(id),
  content TEXT,
  evidence_path TEXT,
  created_at TIMESTAMP DEFAULT now()
);

/* Seed minimal labs if not present */
INSERT INTO labs (key_name, title, description, difficulty)
SELECT 'phishing', 'Phishing Simulation', 'Identify phishing email and analyze headers', 'beginner'
WHERE NOT EXISTS (SELECT 1 FROM labs WHERE key_name = 'phishing');

INSERT INTO labs (key_name, title, description, difficulty)
SELECT 'unauth-server', 'Unauthorized Server Access', 'Investigate suspicious login events on a server', 'intermediate'
WHERE NOT EXISTS (SELECT 1 FROM labs WHERE key_name = 'unauth-server');

INSERT INTO labs (key_name, title, description, difficulty)
SELECT 'ransomware', 'Ransomware Mock', 'Mock ransomware event, practice containment and recovery', 'intermediate'
WHERE NOT EXISTS (SELECT 1 FROM labs WHERE key_name = 'ransomware');
