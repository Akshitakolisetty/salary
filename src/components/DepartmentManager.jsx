

import React, { useEffect, useState } from 'react';
import {
  addDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment
} from '../api/department';

export default function DepartmentManager() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    DepartmentName: '',
    ManagerID: ''
  });
  const [selectedDeptId, setSelectedDeptId] = useState(null);

  const fetchDepartments = async () => {
    try {
      const res = await getAllDepartments();
      setDepartments(res.data);
    } catch (err) {
      alert('Error fetching departments');
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAdd = async () => {
    try {
      await addDepartment({
        DepartmentName: form.DepartmentName,
        ManagerID: form.ManagerID || null
      });
      alert('Department added!');
      setForm({ DepartmentName: '', ManagerID: '' });
      fetchDepartments();
    } catch (err) {
      alert('Error adding department');
    }
  };

  const handleUpdate = async () => {
    try {
      await updateDepartment(selectedDeptId, form);
      alert('Department updated!');
      setForm({ DepartmentName: '', ManagerID: '' });
      setSelectedDeptId(null);
      fetchDepartments();
    } catch (err) {
      alert('Error updating department');
    }
  };

  const handleEdit = (dept) => {
    setForm({
      DepartmentName: dept.DepartmentName,
      ManagerID: dept.ManagerID || ''
    });
    setSelectedDeptId(dept.DepartmentID);
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await deleteDepartment(id);
  //     alert('Department deleted!');
  //     fetchDepartments();
  //   } catch (err) {
  //     alert('Error deleting department');
  //   }
  // };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Departments</h2>

      <input
        type="text"
        placeholder="Department Name"
        value={form.DepartmentName}
        onChange={e => setForm({ ...form, DepartmentName: e.target.value })}
        className="border p-2 rounded w-full"
      />
      <input
        type="number"
        placeholder="Manager ID (optional)"
        value={form.ManagerID}
        onChange={e => setForm({ ...form, ManagerID: e.target.value })}
        className="border p-2 rounded w-full"
      />

      <div className="flex gap-4">
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">
          Add
        </button>
        <button onClick={handleUpdate} disabled={!selectedDeptId} className="bg-yellow-600 text-white px-4 py-2 rounded disabled:opacity-50">
          Update
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-medium mb-2">All Departments</h3>
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Manager ID</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.DepartmentID}>
                <td className="border px-4 py-2">{dept.DepartmentID}</td>
                <td className="border px-4 py-2">{dept.DepartmentName}</td>
                <td className="border px-4 py-2">{dept.ManagerID || '—'}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(dept)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                  {/* <button onClick={() => handleDelete(dept.DepartmentID)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
