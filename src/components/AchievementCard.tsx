import React from 'react';
import { Achievement } from '../types';
import { theme } from '../theme';

interface AchievementCardProps {
  achievement: Achievement;
  onClick?: (achievement: Achievement) => void;
  showDetails?: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ 
  achievement, 
  onClick, 
  showDetails = false 
}) => {
  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-400';
      case 'rare':
        return 'border-blue-400';
      case 'epic':
        return 'border-purple-400';
      case 'legendary':
        return 'border-yellow-400';
      default:
        return 'border-gray-400';
    }
  };

  const getRarityGlow = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'shadow-gray-400/20';
      case 'rare':
        return 'shadow-blue-400/20';
      case 'epic':
        return 'shadow-purple-400/20';
      case 'legendary':
        return 'shadow-yellow-400/20';
      default:
        return 'shadow-gray-400/20';
    }
  };

  return (
    <div
      className={`
        relative flex flex-col gap-1 p-2 rounded cursor-pointer transition-all duration-300 
        ${achievement.isEarned 
          ? `bg-gradient-to-br from-gray-800 to-gray-900 border ${getRarityColor(achievement.rarity)} shadow-md ${getRarityGlow(achievement.rarity)}` 
          : 'bg-gray-800/50 border border-gray-600 opacity-60 hover:opacity-80'
        }
        hover:scale-102 hover:shadow-lg
      `}
      onClick={() => onClick?.(achievement)}
    >
      {/* Rarity indicator */}
      {achievement.isEarned && (
        <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${getRarityColor(achievement.rarity).replace('border-', 'bg-')}`} />
      )}

      {/* Achievement Icon */}
      <div className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded overflow-hidden">
        {achievement.icon ? (
          <img 
            src={achievement.icon} 
            alt={achievement.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 11-2 0 1 1 0 012 0zM7 8a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Achievement Details */}
      {showDetails && (
        <div className="flex flex-col gap-2">
          <h3 className="text-white text-sm font-bold leading-tight">
            {achievement.title}
          </h3>
          <p className="text-gray-400 text-xs leading-normal line-clamp-2">
            {achievement.description}
          </p>
          
          {/* XP Reward */}
          <div className="flex items-center gap-1 text-yellow-400 text-xs">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{achievement.xpReward} XP</span>
          </div>

          {/* Date Earned */}
          {achievement.isEarned && achievement.dateEarned && (
            <div className="text-gray-500 text-xs">
              Desbloqueado: {new Date(achievement.dateEarned).toLocaleDateString()}
            </div>
          )}

          {/* Category */}
          <div className="flex items-center gap-1">
            <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
              {achievement.category}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              achievement.rarity === 'common' ? 'bg-gray-600 text-gray-300' :
              achievement.rarity === 'rare' ? 'bg-blue-600 text-blue-100' :
              achievement.rarity === 'epic' ? 'bg-purple-600 text-purple-100' :
              'bg-yellow-600 text-yellow-100'
            }`}>
              {achievement.rarity}
            </span>
          </div>
        </div>
      )}

      {/* Lock overlay for unearned achievements */}
      {!achievement.isEarned && (
        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default AchievementCard; 