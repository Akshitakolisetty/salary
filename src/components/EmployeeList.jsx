


import React, { useState } from 'react';
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from '../api/employee';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    EmployeeID: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Position: '',
    DepartmentID: '',
    DateOfJoining: '',
  });

  const fetchAllEmployees = async () => {
    try {
      const res = await fetchEmployees();
      setEmployees(res.data);
    } catch (err) {
      alert('Failed to fetch employees');
    }
  };

  const handleAdd = async () => {
    try {
      await addEmployee(form);
      alert('Employee added');
      setForm({ ...form, EmployeeID: '' }); // clear ID
      fetchAllEmployees();
    } catch (err) {
      alert(err.response?.data?.error || 'Error adding employee');
    }
  };

  const handleUpdate = async () => {
    try {
      await updateEmployee(form.EmployeeID, form);
      alert('Employee updated');
      fetchAllEmployees();
    } catch (err) {
      alert('Error updating employee');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(form.EmployeeID);
      alert('Deleted employee');
      setForm({
        EmployeeID: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        Position: '',
        DepartmentID: '',
        DateOfJoining: '',
      });
      fetchAllEmployees();
    } catch (err) {
      alert('Error deleting employee');
    }
  };

  const handleSelect = (emp) => {
    setForm({
      EmployeeID: emp.EmployeeID,
      FirstName: emp.FirstName,
      LastName: emp.LastName,
      Email: emp.Email,
      Phone: emp.Phone,
      Position: emp.Position,
      DepartmentID: emp.DepartmentID,
      DateOfJoining: emp.DateOfJoining?.slice(0, 10),
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Employee Manager</h2>

      <button
        onClick={fetchAllEmployees}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Fetch All Employees
      </button>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <input
          type="text"
          placeholder="First Name"
          value={form.FirstName}
          onChange={(e) => setForm({ ...form, FirstName: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={form.LastName}
          onChange={(e) => setForm({ ...form, LastName: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.Email}
          onChange={(e) => setForm({ ...form, Email: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.Phone}
          onChange={(e) => setForm({ ...form, Phone: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Position"
          value={form.Position}
          onChange={(e) => setForm({ ...form, Position: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Department ID"
          value={form.DepartmentID}
          onChange={(e) => setForm({ ...form, DepartmentID: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          placeholder="Date of Joining"
          value={form.DateOfJoining}
          onChange={(e) => setForm({ ...form, DateOfJoining: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
        <button
          onClick={handleUpdate}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          disabled={!form.EmployeeID}
        >
          Update
        </button>
        {/* <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
          disabled={!form.EmployeeID}
        >
          Delete
        </button> */}
      </div>

      {/* List of Employees */}
      {employees.length > 0 && (
        <table className="min-w-full mt-6 bg-white border rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Position</th>
              <th className="border px-4 py-2">Dept</th>
              <th className="border px-4 py-2">Joined</th>
              <th className="border px-4 py-2">Select</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.EmployeeID} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{emp.EmployeeID}</td>
                <td className="border px-4 py-2">
                  {emp.FirstName} {emp.LastName}
                </td>
                <td className="border px-4 py-2">{emp.Email}</td>
                <td className="border px-4 py-2">{emp.Phone}</td>
                <td className="border px-4 py-2">{emp.Position}</td>
                <td className="border px-4 py-2">{emp.DepartmentID}</td>
                <td className="border px-4 py-2">{emp.DateOfJoining?.slice(0, 10)}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleSelect(emp)}
                    className="text-blue-500 underline"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
