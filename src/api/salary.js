import axios from './axios';

export const getSalaryByEmployeeId = (id) => axios.get(`/salary/${id}`);
export const addSalary = (salary) => axios.post('/salary', salary);
export const updateSalary = (id, data) => axios.put(`/salary/${id}`, data);
export const deleteSalary = (id) => axios.delete(`/salary/${id}`);
