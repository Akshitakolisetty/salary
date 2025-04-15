import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // replace with your actual API URL if different
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
