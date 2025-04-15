import React, { useEffect, useState } from 'react';
import {
    addDepartment,
    getAllDepartments,
    updateDepartment,
    deleteDepartment
} from '../api/department';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6384', '#36A2EB', '#FFCE56'
];

const DepartmentManager = () => {
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({
        DepartmentName: '',
        ManagerID: ''
    });
    const [selectedDeptId, setSelectedDeptId] = useState(null);
    const [isAdding, setIsAdding] = useState(true);

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

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        try {
            await addDepartment({
                DepartmentName: form.DepartmentName,
                ManagerID: form.ManagerID || null
            });
            alert('Department added successfully!');
            setForm({ DepartmentName: '', ManagerID: '' });
            fetchDepartments();
            setIsAdding(true);
            setSelectedDeptId(null);
        } catch (err) {
            alert('Error adding department');
        }
    };

    const handleUpdate = async () => {
        if (!selectedDeptId) return;
        try {
            await updateDepartment(selectedDeptId, form);
            alert('Department updated successfully!');
            setForm({ DepartmentName: '', ManagerID: '' });
            setSelectedDeptId(null);
            setIsAdding(true);
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
        setIsAdding(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            try {
                await deleteDepartment(id);
                alert('Department deleted successfully!');
                fetchDepartments();
                setForm({ DepartmentName: '', ManagerID: '' });
                setSelectedDeptId(null);
                setIsAdding(true);
            } catch (err) {
                alert('Error deleting department');
            }
        }
    };

    // Generate Pie Chart Data
    const chartData = Object.entries(
        departments.reduce((acc, dept) => {
            const key = dept.ManagerID || 'Unassigned';
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {})
    ).map(([key, value]) => ({
        name: `Manager ${key}`,
        value
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">
                        {isAdding ? 'Create New Department' : 'Edit Department Details'}
                    </h2>

                    {/* Form Fields */}
                    <div className="mb-6">
                        <label htmlFor="DepartmentName" className="block text-gray-700 text-sm font-bold mb-2">
                            Department Name:
                        </label>
                        <input
                            type="text"
                            id="DepartmentName"
                            name="DepartmentName"
                            placeholder="Enter department name"
                            value={form.DepartmentName}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg transition duration-200"
                        />
                    </div>

                    <div className="mb-8">
                        <label htmlFor="ManagerID" className="block text-gray-700 text-sm font-bold mb-2">
                            Manager ID (Optional):
                        </label>
                        <input
                            type="number"
                            id="ManagerID"
                            name="ManagerID"
                            placeholder="Enter manager ID"
                            value={form.ManagerID}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg transition duration-200"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4 mb-8">
                        {isAdding ? (
                            <button
                                onClick={handleAdd}
                                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md transition duration-200 transform hover:scale-105 active:scale-95"
                            >
                                <span className="material-symbols-outlined align-middle mr-2">add</span>
                                Add Department
                            </button>
                        ) : (
                            <button
                                onClick={handleUpdate}
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md transition duration-200 transform hover:scale-105 active:scale-95"
                            >
                                <span className="material-symbols-outlined align-middle mr-2">save</span>
                                Update Department
                            </button>
                        )}
                        {!isAdding && (
                            <button
                                onClick={() => {
                                    setForm({ DepartmentName: '', ManagerID: '' });
                                    setSelectedDeptId(null);
                                    setIsAdding(true);
                                }}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md transition duration-200 transform hover:scale-105 active:scale-95"
                            >
                                <span className="material-symbols-outlined align-middle mr-2">cancel</span>
                                Cancel
                            </button>
                        )}
                    </div>

                    {/* Table */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">Existing Departments</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full leading-normal shadow-md rounded-md">
                                <thead className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700">
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                            Manager ID
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departments.map((dept) => (
                                        <tr key={dept.DepartmentID} className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-5 py-5 border-b border-gray-200 text-sm">{dept.DepartmentID}</td>
                                            <td className="px-5 py-5 border-b border-gray-200 text-sm">{dept.DepartmentName}</td>
                                            <td className="px-5 py-5 border-b border-gray-200 text-sm">{dept.ManagerID || '—'}</td>
                                            <td className="px-5 py-5 border-b border-gray-200 text-sm space-x-2">
                                                <button
                                                    onClick={() => handleEdit(dept)}
                                                    className="bg-gradient-to-br from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-2 px-3 rounded text-xs focus:outline-none focus:shadow-outline shadow-md transition duration-200 transform hover:scale-105 active:scale-95"
                                                >
                                                    <span className="material-symbols-outlined align-middle">edit</span>
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(dept.DepartmentID)}
                                                    className="bg-gradient-to-br from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-bold py-2 px-3 rounded text-xs focus:outline-none focus:shadow-outline shadow-md transition duration-200 transform hover:scale-105 active:scale-95"
                                                >
                                                    <span className="material-symbols-outlined align-middle">delete</span>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {departments.length === 0 && (
                            <p className="text-gray-600 mt-4 text-center">No departments available.</p>
                        )}
                    </div>

                    {/* Pie Chart Section */}
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">Department Distribution by Manager</h3>
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-gray-500">No chart data to display.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepartmentManager;
