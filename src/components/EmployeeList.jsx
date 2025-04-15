import React, { useState } from 'react';
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from '../api/employee';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

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
      setForm({ ...form, EmployeeID: '' });
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

  const departmentCounts = employees.reduce((acc, emp) => {
    const deptId = emp.DepartmentID;
    acc[deptId] = (acc[deptId] || 0) + 1;
    return acc;
  }, {});

  const histogramData = Object.entries(departmentCounts).map(([deptId, count]) => ({
    DepartmentID: deptId,
    EmployeeCount: count,
  }));

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Employee Manager</h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={fetchAllEmployees}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition"
        >
          Fetch All Employees
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { name: 'First Name', key: 'FirstName', type: 'text' },
          { name: 'Last Name', key: 'LastName', type: 'text' },
          { name: 'Email', key: 'Email', type: 'email' },
          { name: 'Phone', key: 'Phone', type: 'text' },
          { name: 'Position', key: 'Position', type: 'text' },
          { name: 'Department ID', key: 'DepartmentID', type: 'number' },
          { name: 'Date of Joining', key: 'DateOfJoining', type: 'date' },
        ].map(({ name, key, type }) => (
          <input
            key={key}
            type={type}
            placeholder={name}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
        >
          Add
        </button>
        <button
          onClick={handleUpdate}
          className={`${
            form.EmployeeID ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-yellow-300 cursor-not-allowed'
          } text-white px-6 py-2 rounded transition`}
          disabled={!form.EmployeeID}
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition"
          disabled={!form.EmployeeID}
        >
          Delete
        </button>
      </div>

      {histogramData.length > 0 && (
        <div className="mb-10 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Employees per Department
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={histogramData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="DepartmentID" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="EmployeeCount" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {employees.length > 0 && (
        <div className="overflow-x-auto bg-white p-6 rounded shadow">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Position</th>
                <th className="px-4 py-2 border">Dept</th>
                <th className="px-4 py-2 border">Joined</th>
                <th className="px-4 py-2 border">Select</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.EmployeeID} className="hover:bg-gray-50 transition">
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
                      className="text-blue-500 hover:text-blue-700 underline transition"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
