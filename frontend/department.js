import axios from './axios';

export const addDepartment = (data) => {
  return axios.post('/department', data);
};

export const getAllDepartments = () => {
  return axios.get('/departments');
};

export const updateDepartment = (id, data) => {
  return axios.put(`/department/${id}`, data);
};

export const deleteDepartment = (id) => {
  return axios.delete(`/department/${id}`);
};
