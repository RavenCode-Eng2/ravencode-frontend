export interface Leccion {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  orden: number;
  moduloId: number;
}

export interface Usuario {
  _id: string;
  Nombre: string;
  Correo_electronico: string;
  Fecha_de_nacimiento: string;
  Foto_de_perfil: string | null;
  Institucion_educativa: string;
  Grado_academico: string;
  avatar?: string;
  progreso?: {
    leccionesCompletadas: number[];
    xpTotal: number;
  };
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ErrorResponse {
  detail: string;
  status_code: number;
} 