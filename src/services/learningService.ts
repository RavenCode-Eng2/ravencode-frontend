import axios from 'axios';
import { ApiResponse, Leccion } from '../types';

const API = 'http://localhost:8002/api';
 
export const getLecciones = (): Promise<ApiResponse<Leccion[]>> => 
  axios.get(`${API}/lecciones`); 