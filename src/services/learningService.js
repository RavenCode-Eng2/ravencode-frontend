import axios from 'axios';
const API = 'http://localhost:8002/api';
export const getLecciones = () => axios.get(`${API}/lecciones`);
