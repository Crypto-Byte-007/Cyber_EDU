import React, { useEffect, useState } from 'react';
import { adminStudents, adminAssign } from '../api';

export default function AdminDashboard() {
  const [token] = useState(localStorage.getItem('token') || '');
  const [students, setStudents] = useState([]);
  const [emails, setEmails] = useState('');
  const [labKey, setLabKey] = useState('phishing');

  useEffect(() => {
    if (!token) return;
    adminStudents(token).then(setStudents).catch(e=>console.error(e));
  }, [token]);

  const doAssign = async () => {
    const list = emails.split(',').map(s => s.trim()).filter(Boolean);
    if (!list.length) return alert('Add emails comma separated');
    try {
      await adminAssign(token, list, labKey);
      alert('Assigned');
    } catch (e) { alert('Error'); }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-cyber">Admin Dashboard</h2>
      <div className="mt-4 grid grid-cols-2 gap-6">
        <div className="p-4 bg-slate-900 rounded">
          <h3 className="font-semibold">Import / Assign</h3>
          <textarea value={emails} onChange={e=>setEmails(e.target.value)} placeholder="emails,comma,separated" className="w-full mt-2 p-2 bg-slate-800 rounded text-sm" rows={4}/>
          <div className="mt-2 flex items-center gap-2">
            <select value={labKey} onChange={e=>setLabKey(e.target.value)} className="p-2 bg-slate-800 rounded">
              <option value="phishing">Phishing</option>
              <option value="unauth-server">Unauthorized Server</option>
              <option value="ransomware">Ransomware</option>
            </select>
            <button onClick={doAssign} className="px-3 py-2 bg-cyber rounded text-black">Assign</button>
          </div>
        </div>

        <div className="p-4 bg-slate-900 rounded">
          <h3 className="font-semibold">Students</h3>
          <div className="mt-2 space-y-2 max-h-48 overflow-auto">
            {students.map(s => (
              <div key={s.id} className="flex justify-between p-2 bg-slate-800 rounded">
                <div>
                  <div className="font-medium">{s.name || '—'}</div>
                  <div className="text-xs text-slate-400">{s.email}</div>
                </div>
                <div className="text-xs text-slate-400">{new Date(s.created_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
