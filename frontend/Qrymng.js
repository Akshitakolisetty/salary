// Qrymng.js
import axios from './axios';

export const executeQuery = (queryObject) => {
  return axios.post('/query', queryObject); // Send the object directly
};