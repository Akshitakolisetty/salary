import axios from './axios';

export const fetchEmployees = () => axios.get('/employees');
export const addEmployee = (data) => axios.post('/add-employee', data);
export const updateEmployee = (id, data) => axios.put(`/employee/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`/employee/${id}`);