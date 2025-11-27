import React from 'react';
export default function LabCard({ lab }) {
  return (
    <div className="p-4 bg-slate-900 rounded-lg shadow-sm border border-slate-700">
      <div className="font-semibold text-lg text-cyber">{lab.title}</div>
      <div className="text-sm text-slate-300 mt-1">{lab.description}</div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs px-2 py-1 bg-slate-800 rounded">{lab.difficulty}</span>
        <button className="px-3 py-1 bg-cyber text-black rounded">Start Lab</button>
      </div>
    </div>
  );
}
