import React from 'react';
import { useEstudianteDiplomas, useEliminarDiploma } from '../hooks/useDiplomas';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import Button from './Button';
import { DiplomaGenerado } from '../types';

interface DiplomaManagerProps {
  email?: string;
  className?: string;
}

const DiplomaManager: React.FC<DiplomaManagerProps> = ({ 
  email,
  className = '' 
}) => {
  const { user } = useAuth();
  const studentEmail = email || user?.correo_electronico || '';
  const deleteDiplomaMutation = useEliminarDiploma();

  const { data: diplomas, isLoading, error } = useEstudianteDiplomas(
    studentEmail,
    !!studentEmail
  );

  const handleDeleteDiploma = async (diploma: DiplomaGenerado) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el diploma de ${diploma.id_curso}?`)) {
      try {
        await deleteDiplomaMutation.mutateAsync({
          email: diploma.email,
          diplomaId: diploma.id,
        });
      } catch (error) {
        console.error('Error deleting diploma:', error);
      }
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'emitido':
      case 'activo':
        return 'text-green-400 bg-green-900/30 border-green-500/30';
      case 'pendiente':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/30';
      case 'revocado':
      case 'cancelado':
        return 'text-red-400 bg-red-900/30 border-red-500/30';
      default:
        return 'text-[#90abcb] bg-[#314b68] border-[#4a6791]';
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-[#223449] rounded-xl p-6 ${className}`}>
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0c77f2]"></div>
          <span className="text-[#90abcb]">Cargando diplomas...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-[#223449] rounded-xl p-6 ${className}`}>
        <div className="text-center">
          <div className="text-red-400 text-xl mb-2">⚠️</div>
          <h3 className="text-red-400 font-semibold mb-2">Error al Cargar Diplomas</h3>
          <p className="text-red-300 text-sm">
            {error instanceof Error ? error.message : 'Error al obtener diplomas'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-[#223449] rounded-xl p-6 ${className}`}
      style={{ fontFamily: theme.typography.fontFamily }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-xl font-bold">
          Mis Diplomas
        </h3>
        {diplomas && Array.isArray(diplomas) && diplomas.length > 0 && (
          <span className="text-[#90abcb] text-sm">
            {diplomas.length} diploma{diplomas.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {!diplomas || !Array.isArray(diplomas) || diplomas.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🎓</div>
          <h4 className="text-white text-lg font-semibold mb-2">
            Sin Diplomas Aún
          </h4>
          <p className="text-[#90abcb] text-sm">
            Completa los cursos para obtener tus diplomas
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {diplomas.map((diploma) => (
            <div key={diploma.id} className="bg-[#314b68] rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-semibold">
                      {diploma.id_curso}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(diploma.estado)}`}>
                      {diploma.estado}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-[#90abcb]">Tipo:</span>
                      <span className="text-white ml-2">{diploma.tipo_diploma}</span>
                    </div>
                    <div>
                      <span className="text-[#90abcb]">Fecha:</span>
                      <span className="text-white ml-2">
                        {new Date(diploma.fecha_emision).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-[#90abcb] mb-3">
                    Código: {diploma.codigo_verificacion}
                  </div>

                  <div className="flex items-center space-x-2">
                    {diploma.url_descarga && (
                      <a
                        href={diploma.url_descarga}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[#0c77f2] hover:text-[#0a66d1] text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Descargar</span>
                      </a>
                    )}
                    
                    <button
                      onClick={() => navigator.clipboard.writeText(diploma.codigo_verificacion)}
                      className="inline-flex items-center space-x-1 text-[#90abcb] hover:text-white text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copiar Código</span>
                    </button>
                  </div>
                </div>

                {/* Delete button for admins or own diplomas */}
                {(user?.nivel_acceso === 'admin' || email === user?.correo_electronico) && (
                  <Button
                    onClick={() => handleDeleteDiploma(diploma)}
                    disabled={deleteDiplomaMutation.isPending}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm ml-4"
                  >
                    {deleteDiplomaMutation.isPending ? '...' : 'Eliminar'}
                  </Button>
                )}
              </div>

              {/* Show metadata if available */}
              {diploma.metadata && Object.keys(diploma.metadata).length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#4a6791]">
                  <details className="text-sm">
                    <summary className="text-[#90abcb] cursor-pointer hover:text-white">
                      Información Adicional
                    </summary>
                    <div className="mt-2 space-y-1">
                      {Object.entries(diploma.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-[#90abcb] capitalize">{key.replace(/_/g, ' ')}:</span>
                          <span className="text-white">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiplomaManager; 