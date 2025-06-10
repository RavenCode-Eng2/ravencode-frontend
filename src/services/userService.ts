import axios from 'axios';
import { ApiResponse, Usuario } from '../types';

const API = 'http://localhost:8001/api';
 
export const getUsuarios = (): Promise<ApiResponse<Usuario[]>> => 
  axios.get(`${API}/usuarios`); 