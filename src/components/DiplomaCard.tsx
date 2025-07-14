import React from 'react';
import { Diploma } from '../types';

interface DiplomaCardProps {
  diploma: Diploma;
  onClick?: (diploma: Diploma) => void;
  showDetails?: boolean;
}

const DiplomaCard: React.FC<DiplomaCardProps> = ({ 
  diploma, 
  onClick, 
  showDetails = false 
}) => {
  return (
    <div
      className="relative flex flex-col gap-3 p-4 rounded-xl cursor-pointer transition-all duration-300 
                 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 
                 hover:scale-105 hover:shadow-xl hover:border-blue-400/50"
      onClick={() => onClick?.(diploma)}
    >
      {/* Diploma Image */}
      <div className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-xl overflow-hidden">
        {diploma.image ? (
          <img 
            src={diploma.image} 
            alt={diploma.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
      </div>

      {/* Diploma Details */}
      {showDetails && (
        <div className="flex flex-col gap-2">
          <h3 className="text-white text-sm font-bold leading-tight">
            {diploma.title}
          </h3>
          <p className="text-gray-400 text-xs leading-normal line-clamp-2">
            {diploma.description}
          </p>
          
          {/* Course Name */}
          <div className="text-blue-400 text-xs font-medium">
            {diploma.courseName}
          </div>

          {/* Date Earned */}
          <div className="text-gray-500 text-xs">
            Completado: {new Date(diploma.dateEarned).toLocaleDateString()}
          </div>

          {/* Skills */}
          {diploma.skills && diploma.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {diploma.skills.slice(0, 3).map((skill, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {diploma.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-full">
                  +{diploma.skills.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Certificate Download */}
          {diploma.certificateUrl && (
            <button 
              className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                window.open(diploma.certificateUrl, '_blank');
              }}
            >
              Descargar Certificado
            </button>
          )}
        </div>
      )}

      {/* Completion Badge */}
      <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default DiplomaCard; 