import { config } from '../config/env';
import { ApiResponse, PlantillaDiploma, SolicitudDiploma, DiplomaConfiguracion, ElegibilidadDiploma, DiplomaGenerado, EstadisticasDiploma, VerificacionDiploma } from '../types';
import { TokenManager } from '../utils/tokenManager';

const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = await TokenManager.getValidAccessToken();
  if (!token) {
    throw new Error('No token found');
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // If we get a 401, try to refresh the token and retry once
  if (response.status === 401) {
    console.log('[diplomaService] Got 401, attempting token refresh...');
    const newToken = await TokenManager.refreshAccessToken();
    
    if (newToken) {
      console.log('[diplomaService] Token refreshed, retrying request...');
      // Retry the request with the new token
      const retryHeaders = {
        'Authorization': `Bearer ${newToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      };
      
      return fetch(url, {
        ...options,
        headers: retryHeaders,
      });
    } else {
      // Refresh failed, return the original response
      return response;
    }
  }

  return response;
};

export const diplomaService = {
  // Get Colombian diploma system configuration
  getConfiguracion: async (): Promise<ApiResponse<DiplomaConfiguracion>> => {
    const response = await makeAuthenticatedRequest(`${config.achievementsApiUrl}/diplomas/configuracion`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener configuración de diplomas');
    }

    const data = await response.json();
    return { data };
  },

  // Check student eligibility for a diploma
  verificarElegibilidad: async (
    email: string, 
    idCurso: string, 
    tipoDiploma?: string
  ): Promise<ApiResponse<ElegibilidadDiploma>> => {
    const params = new URLSearchParams({
      id_curso: idCurso,
      ...(tipoDiploma && { tipo_diploma: tipoDiploma }),
    });

    const response = await makeAuthenticatedRequest(
      `${config.achievementsApiUrl}/diplomas/verificar-elegibilidad/${encodeURIComponent(email)}?${params}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al verificar elegibilidad para diploma');
    }

    const data = await response.json();
    return { data };
  },

  // Generate a diploma for an eligible student
  generarDiploma: async (solicitud: SolicitudDiploma): Promise<ApiResponse<DiplomaGenerado>> => {
    const response = await makeAuthenticatedRequest(`${config.achievementsApiUrl}/diplomas/generar`, {
      method: 'POST',
      body: JSON.stringify(solicitud),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al generar diploma');
    }

    const data = await response.json();
    return { data };
  },

  // Get all diplomas for a student
  obtenerDiplomasEstudiante: async (email: string): Promise<ApiResponse<DiplomaGenerado[]>> => {
    const response = await makeAuthenticatedRequest(
      `${config.achievementsApiUrl}/diplomas/estudiante/${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener diplomas del estudiante');
    }

    const data = await response.json();
    return { data };
  },

  // Verify diploma authenticity
  verificarDiploma: async (codigoVerificacion: string): Promise<ApiResponse<VerificacionDiploma>> => {
    const response = await makeAuthenticatedRequest(
      `${config.achievementsApiUrl}/diplomas/verificar/${encodeURIComponent(codigoVerificacion)}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al verificar diploma');
    }

    const data = await response.json();
    return { data };
  },

  // Create diploma template
  crearPlantilla: async (plantilla: PlantillaDiploma): Promise<ApiResponse<PlantillaDiploma>> => {
    const response = await makeAuthenticatedRequest(`${config.achievementsApiUrl}/diplomas/plantillas`, {
      method: 'POST',
      body: JSON.stringify(plantilla),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear plantilla de diploma');
    }

    const data = await response.json();
    return { data };
  },

  // Get diploma statistics
  obtenerEstadisticas: async (): Promise<ApiResponse<EstadisticasDiploma>> => {
    const response = await makeAuthenticatedRequest(`${config.achievementsApiUrl}/diplomas/estadisticas`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener estadísticas de diplomas');
    }

    const data = await response.json();
    return { data };
  },

  // Delete a specific diploma
  eliminarDiploma: async (email: string, diplomaId: string): Promise<ApiResponse<{ deleted: boolean }>> => {
    const response = await makeAuthenticatedRequest(
      `${config.achievementsApiUrl}/diplomas/estudiante/${encodeURIComponent(email)}/${encodeURIComponent(diplomaId)}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar diploma');
    }

    const data = await response.json();
    return { data };
  },

  // Convert percentage to Colombian grade scale
  convertirNota: async (porcentaje: number): Promise<ApiResponse<{ nota_colombiana: number; descripcion: string }>> => {
    const params = new URLSearchParams({
      porcentaje: porcentaje.toString(),
    });

    const response = await makeAuthenticatedRequest(
      `${config.achievementsApiUrl}/diplomas/convertir-nota?${params}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al convertir nota');
    }

    const data = await response.json();
    return { data };
  },
}; 