import React, { useEffect, useState } from 'react';
import { getLabs, getAssigned } from '../api';
import LabCard from '../components/LabCard';

export default function StudentDashboard() {
  const [token] = useState(localStorage.getItem('token') || '');
  const [labs, setLabs] = useState([]);
  const [assigned, setAssigned] = useState([]);

  useEffect(() => {
    getLabs(token).then(setLabs).catch(()=>{});
    getAssigned(token).then(setAssigned).catch(()=>{});
  }, [token]);

  return (
    <div>
      <h2 className="text-xl font-bold text-cyber">Student Dashboard</h2>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {labs.map(l => <LabCard key={l.id} lab={l} />)}
      </div>

      <h3 className="mt-6 text-cyber font-semibold">Assigned Labs</h3>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {assigned.map(a => (
          <div key={a.assign_id} className="p-4 bg-slate-900 rounded">
            <div className="font-semibold text-cyber">{a.title}</div>
            <div className="text-sm text-slate-300">{a.description}</div>
            <div className="mt-3 flex justify-between">
              <div className="text-xs bg-slate-800 px-2 py-1 rounded">{a.status}</div>
              <button className="px-3 py-1 bg-cyber rounded text-black">Open</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
