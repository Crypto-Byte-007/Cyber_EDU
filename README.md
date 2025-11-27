README.md
CyberEdu MVP — Incident Response Learning Platform

CyberEdu MVP is a lightweight, Dockerized cybersecurity learning platform designed for schools, colleges, and entry-level training.
It provides three beginner-friendly Incident Response labs (Phishing, Unauthorized Access, Ransomware) with an admin dashboard, student dashboard, and auto report submission system.

This repository contains:

Backend — Node.js + Express + PostgreSQL

Frontend — React + Vite + Tailwind CSS

Dockerized full-stack environment

Basic IR lab assignment + tracking

CSV student import system

## 🚀 Features (MVP)
For Students

Login and access assigned labs

Three labs pre-seeded:

Phishing Attack Simulation

Unauthorized Server Access

Ransomware Mock Incident

Track lab status

Submit IR report + upload evidence

For Admin

Login as admin

Import students via CSV

Assign labs to multiple students

View student list and progress

## 📦 Tech Stack
Layer	Technology
Backend	Node.js, Express, PostgreSQL
Frontend	React, Vite, Tailwind
Auth	JWT-based
Containerization	Docker + Docker Compose
Storage	Local filesystem for uploads
PDF Reports (Optional upcoming)	Puppeteer / wkhtmltopdf
## 📁 Project Structure
cyberedu-mvp/
│── docker-compose.yml
│── .env
│── backend/
│   ├── Dockerfile
│   ├── index.js
│   ├── db.js
│   ├── init.sql
│   ├── routes/
│   └── uploads/
│
└── frontend/
    ├── Dockerfile
    ├── index.html
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── api.js
    │   ├── pages/
    │   └── components/
    └── tailwind.config.cjs

## ⚙️ Installation
1. Install dependencies

You only need Docker and Docker Compose installed.

Windows: Docker Desktop

Linux: sudo apt install docker.io docker-compose-plugin

Mac: Docker Desktop

## 🔧 Environment Variables

Create a .env file in the root directory:

PORT=4000
DB_HOST=db
DB_PORT=5432
DB_USER=cyberedu
DB_PASSWORD=cyberedu_pass
DB_DATABASE=cyberedu
JWT_SECRET=change_this_secret


Or copy from .env.example:

cp .env.example .env

## ▶️ Running the Project

From root folder:

docker-compose up --build


This will start:

Service	URL
Backend	http://localhost:4000

Frontend	http://localhost:3000

PostgreSQL	localhost:5432
## 🧪 First-Time Usage
1. Create an Admin Account

Use Postman or cURL:

curl -X POST http://localhost:4000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Admin","email":"admin@school.edu","password":"admin123","role":"admin"}'

2. Login to get token
curl -X POST http://localhost:4000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"admin@school.edu","password":"admin123"}'


Copy the "token" from the response.

3. Add Admin Token in Browser

Open browser console on frontend (http://localhost:3000) and paste:

localStorage.setItem('token', '<PASTE_TOKEN_HERE>');
localStorage.setItem('role', 'admin');


Reload page → Admin Dashboard is active.

## 📥 CSV Import Example

Admin → Import students:

CSV Example:

Name,Email,Password
John Doe,john@example.com,student123
Jane Smith,jane@example.com,student123


Use Admin Dashboard → paste CSV into import box.

## 📚 API Overview
Auth
Method	Endpoint	Description
POST	/api/auth/register	Create user
POST	/api/auth/login	Login
Admin
Method	Endpoint	Description
POST	/api/admin/import-csv	Bulk import students
POST	/api/admin/assign	Assign lab to students
GET	/api/admin/students	List students
Labs
Method	Endpoint	Description
GET	/api/labs	List all labs
GET	/api/labs/assigned	Get assigned labs for student
POST	/api/labs/status	Update status
POST	/api/labs/report	Submit report
## 🛠 Troubleshooting
❗ Missing .env file

Error:

env file .env not found


Solution:

cp .env.example .env

❗ npm ci error

Use npm install instead of npm ci in Dockerfiles.
Already fixed in this repo.

❗ OneDrive issues

Move project outside OneDrive:

C:\Projects\cyberedu-mvp

## 📦 Production Build (Optional)

Use:

docker-compose -f docker-compose.yml up --build -d


For Nginx + SSL reverse proxy, ask:
“Generate production deployment” — and I will create the full stack config.

## 🎯 Roadmap (Next 3–5 Days)

Lab 1 (Phishing) complete UI + logs

Lab 2 server access simulation

Lab 3 ransomware mock

Full IR workflow UI

Auto PDF report generation

Nginx deployment

## 🤝 Contributing

All contributions, improvements, and bug fixes are welcome.