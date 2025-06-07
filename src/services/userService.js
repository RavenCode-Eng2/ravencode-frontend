import axios from 'axios';
const API = 'http://localhost:8001/api';
export const getUsuarios = () => axios.get(`${API}/usuarios`);
