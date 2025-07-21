import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { diplomaService } from '../services/diplomaService';
import { SolicitudDiploma, PlantillaDiploma } from '../types';

// Query key factory for diplomas
const diplomaKeys = {
  all: ['diplomas'] as const,
  configuracion: () => [...diplomaKeys.all, 'configuracion'] as const,
  elegibilidad: (email: string, idCurso: string, tipoDiploma?: string) => 
    [...diplomaKeys.all, 'elegibilidad', email, idCurso, tipoDiploma] as const,
  estudiante: (email: string) => [...diplomaKeys.all, 'estudiante', email] as const,
  verificacion: (codigo: string) => [...diplomaKeys.all, 'verificacion', codigo] as const,
  estadisticas: () => [...diplomaKeys.all, 'estadisticas'] as const,
  conversion: (porcentaje: number) => [...diplomaKeys.all, 'conversion', porcentaje] as const,
};

// Hook to get diploma system configuration
export const useDiplomaConfiguracion = () => {
  return useQuery({
    queryKey: diplomaKeys.configuracion(),
    queryFn: () => diplomaService.getConfiguracion(),
    staleTime: 30 * 60 * 1000, // 30 minutes - configuration doesn't change often
    select: (response) => response.data,
  });
};

// Hook to check diploma eligibility
export const useDiplomaElegibilidad = (
  email: string, 
  idCurso: string, 
  tipoDiploma?: string,
  enabled = true
) => {
  return useQuery({
    queryKey: diplomaKeys.elegibilidad(email, idCurso, tipoDiploma),
    queryFn: () => diplomaService.verificarElegibilidad(email, idCurso, tipoDiploma),
    enabled: enabled && !!email && !!idCurso,
    select: (response) => response.data,
  });
};

// Hook to get student's diplomas
export const useEstudianteDiplomas = (email: string, enabled = true) => {
  return useQuery({
    queryKey: diplomaKeys.estudiante(email),
    queryFn: () => diplomaService.obtenerDiplomasEstudiante(email),
    enabled: enabled && !!email,
    select: (response) => response.data,
  });
};

// Hook to verify diploma authenticity
export const useDiplomaVerificacion = (codigoVerificacion: string, enabled = true) => {
  return useQuery({
    queryKey: diplomaKeys.verificacion(codigoVerificacion),
    queryFn: () => diplomaService.verificarDiploma(codigoVerificacion),
    enabled: enabled && !!codigoVerificacion,
    select: (response) => response.data,
  });
};

// Hook to get diploma statistics
export const useDiplomaEstadisticas = () => {
  return useQuery({
    queryKey: diplomaKeys.estadisticas(),
    queryFn: () => diplomaService.obtenerEstadisticas(),
    select: (response) => response.data,
  });
};

// Hook to convert percentage to Colombian grade
export const useConversionNota = (porcentaje: number, enabled = true) => {
  return useQuery({
    queryKey: diplomaKeys.conversion(porcentaje),
    queryFn: () => diplomaService.convertirNota(porcentaje),
    enabled: enabled && porcentaje >= 0 && porcentaje <= 100,
    select: (response) => response.data,
  });
};

// Mutation hook to generate diploma
export const useGenerarDiploma = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (solicitud: SolicitudDiploma) => diplomaService.generarDiploma(solicitud),
    onSuccess: (data, variables) => {
      // Invalidate and refetch student's diplomas
      queryClient.invalidateQueries({
        queryKey: diplomaKeys.estudiante(variables.email),
      });
      
      // Invalidate statistics
      queryClient.invalidateQueries({
        queryKey: diplomaKeys.estadisticas(),
      });

      // Optionally update eligibility cache
      queryClient.invalidateQueries({
        queryKey: diplomaKeys.elegibilidad(variables.email, variables.id_curso, variables.tipo_diploma),
      });
    },
    onError: (error) => {
      console.error('Error generating diploma:', error);
    },
  });
};

// Mutation hook to create diploma template
export const useCrearPlantillaDiploma = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (plantilla: PlantillaDiploma) => diplomaService.crearPlantilla(plantilla),
    onSuccess: () => {
      // Invalidate configuration cache since new templates might affect available diploma types
      queryClient.invalidateQueries({
        queryKey: diplomaKeys.configuracion(),
      });
    },
    onError: (error) => {
      console.error('Error creating diploma template:', error);
    },
  });
};

// Mutation hook to delete diploma
export const useEliminarDiploma = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, diplomaId }: { email: string; diplomaId: string }) => 
      diplomaService.eliminarDiploma(email, diplomaId),
    onSuccess: (data, variables) => {
      // Invalidate and refetch student's diplomas
      queryClient.invalidateQueries({
        queryKey: diplomaKeys.estudiante(variables.email),
      });
      
      // Invalidate statistics
      queryClient.invalidateQueries({
        queryKey: diplomaKeys.estadisticas(),
      });
    },
    onError: (error) => {
      console.error('Error deleting diploma:', error);
    },
  });
}; 