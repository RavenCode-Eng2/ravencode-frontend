export interface Leccion {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  orden: number;
  moduloId: number;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  avatar?: string;
  progreso?: {
    leccionesCompletadas: number[];
    xpTotal: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
} 