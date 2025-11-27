import React from 'react';
export default function Nav({ role, setRole }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
      <div className="text-2xl font-bold text-cyber">CyberEdu MVP</div>
      <div className="space-x-4">
        <button className="px-3 py-1 bg-slate-800 rounded" onClick={() => { setRole('student'); localStorage.setItem('role','student')}}>Student</button>
        <button className="px-3 py-1 bg-slate-800 rounded" onClick={() => { setRole('admin'); localStorage.setItem('role','admin')}}>Admin</button>
      </div>
    </div>
  );
}
