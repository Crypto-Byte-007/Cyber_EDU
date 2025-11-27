import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Nav from './components/Nav';

export default function App() {
  // quick fake auth toggle for demo (real: login page)
  const [role, setRole] = useState(localStorage.getItem('role') || 'student');

  return (
    <div className="min-h-screen bg-[#071025] text-slate-100">
      <Nav role={role} setRole={setRole} />
      <div className="p-6">
        <Routes>
          <Route path="/" element={role === 'admin' ? <AdminDashboard /> : <StudentDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
        </Routes>
      </div>
    </div>
  );
}
