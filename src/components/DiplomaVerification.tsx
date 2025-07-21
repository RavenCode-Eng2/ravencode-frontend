import React, { useState } from 'react';
import { useDiplomaVerificacion } from '../hooks/useDiplomas';
import { theme } from '../theme';
import Button from './Button';
import Input from './Input';

interface DiplomaVerificationProps {
  className?: string;
}

const DiplomaVerification: React.FC<DiplomaVerificationProps> = ({ className = '' }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [shouldVerify, setShouldVerify] = useState(false);

  const { data: verification, isLoading, error, refetch } = useDiplomaVerificacion(
    verificationCode,
    shouldVerify && verificationCode.length > 0
  );

  const handleVerify = () => {
    if (verificationCode.trim()) {
      setShouldVerify(true);
      refetch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
    setShouldVerify(false); // Reset verification when code changes
  };

  return (
    <div 
      className={`bg-[#223449] rounded-xl p-6 ${className}`}
      style={{ fontFamily: theme.typography.fontFamily }}
    >
      <h3 className="text-white text-xl font-bold mb-4">
        Verificar Diploma
      </h3>
      
      <p className="text-[#90abcb] text-sm mb-4">
        Ingresa el código de verificación para comprobar la autenticidad de un diploma.
      </p>

      <div className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Código de verificación"
            value={verificationCode}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <Button
          onClick={handleVerify}
          disabled={!verificationCode.trim() || isLoading}
          className="w-full"
        >
          {isLoading ? 'Verificando...' : 'Verificar Diploma'}
        </Button>

        {/* Verification Results */}
        {shouldVerify && !isLoading && (
          <div className="mt-4">
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="text-red-400 text-xl">❌</div>
                  <div>
                    <h4 className="text-red-400 font-semibold">Error de Verificación</h4>
                    <p className="text-red-300 text-sm">
                      {error instanceof Error ? error.message : 'Error al verificar el diploma'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {verification && (
              <div className={`border rounded-lg p-4 ${
                verification.es_valido 
                  ? 'bg-green-900/20 border-green-500/30' 
                  : 'bg-red-900/20 border-red-500/30'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className={`text-xl ${verification.es_valido ? 'text-green-400' : 'text-red-400'}`}>
                    {verification.es_valido ? '✅' : '❌'}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${verification.es_valido ? 'text-green-400' : 'text-red-400'}`}>
                      {verification.es_valido ? 'Diploma Válido' : 'Diploma No Válido'}
                    </h4>
                    
                    {verification.mensaje && (
                      <p className={`text-sm ${verification.es_valido ? 'text-green-300' : 'text-red-300'}`}>
                        {verification.mensaje}
                      </p>
                    )}

                    {verification.diploma && (
                      <div className="mt-3 space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-[#90abcb]">Email:</span>
                            <span className="text-white ml-2">{verification.diploma.email}</span>
                          </div>
                          <div>
                            <span className="text-[#90abcb]">Curso:</span>
                            <span className="text-white ml-2">{verification.diploma.id_curso}</span>
                          </div>
                          <div>
                            <span className="text-[#90abcb]">Tipo:</span>
                            <span className="text-white ml-2">{verification.diploma.tipo_diploma}</span>
                          </div>
                          <div>
                            <span className="text-[#90abcb]">Fecha:</span>
                            <span className="text-white ml-2">
                              {new Date(verification.diploma.fecha_emision).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {verification.diploma.url_descarga && (
                          <a
                            href={verification.diploma.url_descarga}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-[#0c77f2] hover:text-[#0a66d1] text-sm font-medium"
                          >
                            <span>Descargar Diploma</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}

                    <div className="mt-2 text-xs text-[#90abcb]">
                      Verificado el: {new Date(verification.fecha_verificacion).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiplomaVerification; 