import React from 'react';
import { useAvailableAchievements } from '../hooks/useAchievements';
import { theme } from '../theme';

interface AvailableAchievementsPanelProps {
  courseId: string;
  className?: string;
}

/**
 * Component to display available achievements for a specific course
 * Shows what achievements students can earn and their requirements
 */
const AvailableAchievementsPanel: React.FC<AvailableAchievementsPanelProps> = ({
  courseId,
  className = '',
}) => {
  const { data: availableAchievements, isLoading, error } = useAvailableAchievements(courseId);

  if (isLoading) {
    return (
      <div className={`bg-[#223449] rounded-xl p-4 ${className}`}>
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0c77f2]"></div>
          <span className="ml-2 text-[#90abcb] text-sm">Cargando logros disponibles...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-[#223449] rounded-xl p-4 ${className}`}>
        <div className="text-center p-4">
          <div className="text-red-400 text-sm">Error al cargar logros disponibles</div>
        </div>
      </div>
    );
  }

  if (!availableAchievements || availableAchievements.length === 0) {
    return (
      <div className={`bg-[#223449] rounded-xl p-4 ${className}`}>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🎯</div>
          <div className="text-[#90abcb] text-sm">No hay logros disponibles para este curso</div>
        </div>
      </div>
    );
  }

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400';
      case 'epic': return 'text-purple-400';
      case 'rare': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityBorder = (rarity?: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400';
      case 'epic': return 'border-purple-400';
      case 'rare': return 'border-blue-400';
      default: return 'border-gray-400';
    }
  };

  return (
    <div className={`bg-[#223449] rounded-xl p-4 ${className}`} style={{ fontFamily: theme.typography.fontFamily }}>
      <div className="flex items-center mb-4">
        <div className="text-xl mr-2">🏆</div>
        <h3 className="text-white text-lg font-semibold">Logros Disponibles</h3>
      </div>
      
      <div className="space-y-3">
        {availableAchievements.map((achievement) => (
          <div 
            key={achievement.achievement_name}
            className={`bg-[#101923] rounded-lg p-3 border-l-4 ${getRarityBorder(achievement.rarity)} hover:bg-[#1a2633] transition-colors`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-white font-medium text-sm">{achievement.title}</h4>
              <div className="flex items-center space-x-2">
                {achievement.rarity && (
                  <span className={`text-xs font-semibold uppercase ${getRarityColor(achievement.rarity)}`}>
                    {achievement.rarity}
                  </span>
                )}
                <span className="text-yellow-400 text-xs font-semibold">
                  {achievement.max_points} pts
                </span>
              </div>
            </div>
            
            {achievement.description && (
              <p className="text-[#90abcb] text-xs mb-2">{achievement.description}</p>
            )}
            
            {achievement.requirements && achievement.requirements.length > 0 && (
              <div className="mt-2">
                <div className="text-[#90abcb] text-xs font-semibold mb-1">Requisitos:</div>
                <ul className="space-y-1">
                  {achievement.requirements.map((requirement, index) => (
                    <li key={index} className="text-[#90abcb] text-xs flex items-center">
                      <div className="w-1 h-1 bg-[#0c77f2] rounded-full mr-2"></div>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {achievement.category && (
              <div className="mt-2">
                <span className="bg-[#0c77f2] text-white text-xs px-2 py-1 rounded-full">
                  {achievement.category}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableAchievementsPanel; 