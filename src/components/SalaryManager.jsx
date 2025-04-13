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
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Salary Manager</h2>

      <input
        type="number"
        placeholder="Employee ID"
        value={employeeId}
        onChange={e => setEmployeeId(e.target.value)}
        className="border p-2 rounded"
      />
      <button onClick={fetchSalary} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
        Fetch
      </button>

      {salaryData && (
        <div className="p-4 border mt-4">
          <p><strong>Basic:</strong> {salaryData.BasicSalary}</p>
          <p><strong>Allowances:</strong> {salaryData.Allowances}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-4">
        <input
          type="number"
          placeholder="Basic Salary"
          value={form.BasicSalary}
          onChange={e => setForm({ ...form, BasicSalary: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Allowances"
          value={form.Allowances}
          onChange={e => setForm({ ...form, Allowances: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={form.EffectiveFrom}
          onChange={e => setForm({ ...form, EffectiveFrom: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={form.EffectiveTo}
          onChange={e => setForm({ ...form, EffectiveTo: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
          Add
        </button>
        <button onClick={handleUpdate} className="bg-yellow-600 text-white px-4 py-2 rounded">
          Update
        </button>
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}