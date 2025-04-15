import React, { useState } from 'react';
import {
  addSalary,
  getSalaryByEmployeeId,
  updateSalary,
  deleteSalary
} from '../api/salary';

export default function SalaryManager() {
  const [employeeId, setEmployeeId] = useState('');
  const [salaryData, setSalaryData] = useState(null);
  const [form, setForm] = useState({
    BasicSalary: '',
    Allowances: '',
    EffectiveFrom: '',
    EffectiveTo: ''
  });

  const fetchSalary = async () => {
    try {
      const res = await getSalaryByEmployeeId(employeeId);
      setSalaryData(res.data.salary);
    } catch (err) {
      setSalaryData(null);
      alert('Salary not found!');
    }
  };

  const handleSubmit = async () => {
    try {
      await addSalary({ EmployeeID: employeeId, ...form });
      alert('Salary added!');
      fetchSalary();
    } catch (err) {
      alert('Error adding salary');
    }
  };

  const handleUpdate = async () => {
    try {
      await updateSalary(salaryData.SalaryStructureID, form);
      alert('Salary updated!');
      fetchSalary();
    } catch (err) {
      alert('Error updating salary');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSalary(salaryData.SalaryStructureID);
      alert('Deleted!');
      setSalaryData(null);
    } catch (err) {
      alert('Error deleting');
    }
  };

  return (
    <div className="hover:rotate-[0.3deg] hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <div className="space-y-6 p-6 max-w-2xl mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl transform transition duration-500 hover:scale-[1.02]">
        <h2 className="text-3xl font-bold text-center drop-shadow-lg">💼 Salary Manager</h2>

        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Employee ID"
            value={employeeId}
            onChange={e => setEmployeeId(e.target.value)}
            className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 p-3 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            onClick={fetchSalary}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-bold px-5 py-3 rounded-lg shadow-md transform hover:scale-105 active:scale-95 transition-all"
          >
            🚀 Fetch
          </button>
        </div>

        {salaryData && (
          <div className="p-4 bg-gray-800 border border-gray-700 rounded-xl shadow-lg space-y-2">
            <p><strong>🪙 Basic:</strong> ₹{salaryData.BasicSalary}</p>
            <p><strong>🎁 Allowances:</strong> ₹{salaryData.Allowances}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Basic Salary"
            value={form.BasicSalary}
            onChange={e => setForm({ ...form, BasicSalary: e.target.value })}
            className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 p-3 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="number"
            placeholder="Allowances"
            value={form.Allowances}
            onChange={e => setForm({ ...form, Allowances: e.target.value })}
            className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 p-3 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="date"
            value={form.EffectiveFrom}
            onChange={e => setForm({ ...form, EffectiveFrom: e.target.value })}
            className="bg-gray-800 border border-gray-700 text-white p-3 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="date"
            value={form.EffectiveTo}
            onChange={e => setForm({ ...form, EffectiveTo: e.target.value })}
            className="bg-gray-800 border border-gray-700 text-white p-3 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white font-bold px-5 py-3 rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-all"
          >
            ➕ Add
          </button>
          <button
            onClick={handleUpdate}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-white font-bold px-5 py-3 rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-all"
          >
            🔄 Update
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-pink-600 hover:to-red-500 text-white font-bold px-5 py-3 rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-all"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}
