import React from 'react';
import { useDiplomaElegibilidad, useGenerarDiploma } from '../hooks/useDiplomas';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import Button from './Button';

interface DiplomaEligibilityProps {
  courseId: string;
  tipoDiploma?: string;
  className?: string;
}

const DiplomaEligibility: React.FC<DiplomaEligibilityProps> = ({ 
  courseId, 
  tipoDiploma = 'curso',
  className = '' 
}) => {
  const { user } = useAuth();
  const generateDiplomaMutation = useGenerarDiploma();

  const { data: eligibility, isLoading, error } = useDiplomaElegibilidad(
    user?.correo_electronico || '',
    courseId,
    tipoDiploma,
    !!user?.correo_electronico
  );

  const handleGenerateDiploma = async () => {
    if (!user?.correo_electronico) return;

    try {
      await generateDiplomaMutation.mutateAsync({
        email: user.correo_electronico,
        id_curso: courseId,
        tipo_diploma: tipoDiploma,
      });
    } catch (error) {
      console.error('Error generating diploma:', error);
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-[#223449] rounded-xl p-6 ${className}`}>
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0c77f2]"></div>
          <span className="text-[#90abcb]">Verificando elegibilidad...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-[#223449] rounded-xl p-6 ${className}`}>
        <div className="text-center">
          <div className="text-red-400 text-xl mb-2">⚠️</div>
          <h3 className="text-red-400 font-semibold mb-2">Error de Verificación</h3>
          <p className="text-red-300 text-sm">
            {error instanceof Error ? error.message : 'Error al verificar elegibilidad'}
          </p>
        </div>
      </div>
    );
  }

  if (!eligibility) {
    return null;
  }

  return (
    <div 
      className={`bg-[#223449] rounded-xl p-6 ${className}`}
      style={{ fontFamily: theme.typography.fontFamily }}
    >
      <div className="flex items-start space-x-4">
        <div className={`text-2xl ${eligibility.es_elegible ? 'text-green-400' : 'text-yellow-400'}`}>
          {eligibility.es_elegible ? '🎓' : '📋'}
        </div>
        
        <div className="flex-1">
          <h3 className="text-white text-lg font-bold mb-2">
            Estado del Diploma
          </h3>
          
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${
            eligibility.es_elegible 
              ? 'bg-green-900/30 text-green-400 border border-green-500/30'
              : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'
          }`}>
            {eligibility.es_elegible ? '✅ Elegible para Diploma' : '⏳ Requisitos Pendientes'}
          </div>

          {eligibility.razon && (
            <p className="text-[#90abcb] text-sm mb-4">
              {eligibility.razon}
            </p>
          )}

          {/* Show calculated grade if available */}
          {eligibility.nota_calculada && (
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-[#90abcb] text-sm">Nota Final:</span>
                <span className={`font-bold ${
                  eligibility.nota_calculada >= 3.0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {eligibility.nota_calculada.toFixed(1)}/5.0
                </span>
              </div>
            </div>
          )}

          {/* Show missing requirements */}
          {eligibility.requisitos_faltantes && eligibility.requisitos_faltantes.length > 0 && (
            <div className="mb-4">
              <h4 className="text-white text-sm font-semibold mb-2">Requisitos Faltantes:</h4>
              <ul className="space-y-1">
                {eligibility.requisitos_faltantes.map((requisito, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <span className="text-red-400">•</span>
                    <span className="text-[#90abcb]">{requisito}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Show requirements progress */}
          {eligibility.progreso_requisitos && Object.keys(eligibility.progreso_requisitos).length > 0 && (
            <div className="mb-4">
              <h4 className="text-white text-sm font-semibold mb-2">Progreso de Requisitos:</h4>
              <div className="space-y-2">
                {Object.entries(eligibility.progreso_requisitos).map(([requisito, progreso]) => (
                  <div key={requisito} className="bg-[#314b68] rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#90abcb] text-sm">{requisito}</span>
                      <span className="text-white text-sm font-medium">
                        {typeof progreso === 'object' && progreso && 'porcentaje' in progreso 
                          ? `${progreso.porcentaje}%`
                          : String(progreso)
                        }
                      </span>
                    </div>
                    {typeof progreso === 'object' && progreso && 'porcentaje' in progreso && (
                      <div className="w-full bg-[#1a2332] rounded-full h-2">
                        <div 
                          className="bg-[#0c77f2] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.max(0, progreso.porcentaje))}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generate diploma button */}
          {eligibility.es_elegible && (
            <Button
              onClick={handleGenerateDiploma}
              disabled={generateDiplomaMutation.isPending}
              className="w-full"
            >
              {generateDiplomaMutation.isPending ? 'Generando Diploma...' : 'Generar Diploma'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiplomaEligibility; 