import React from 'react';
import { useUpdateAchievement } from '../hooks/useAchievements';
import { useAuth } from '../context/AuthContext';
import { createAchievementData } from '../utils/achievementHelpers';
import toast from 'react-hot-toast';

interface AchievementTriggerProps {
  achievementName: string;
  courseId: string;
  title: string;
  description?: string;
  score: number;
  totalPoints: number;
  metadata?: Record<string, any>;
  trigger?: 'auto' | 'manual';
  children?: React.ReactNode;
  className?: string;
}

/**
 * Component to trigger achievements when certain conditions are met
 * Can be used in auto mode (triggers immediately) or manual mode (requires user action)
 * 
 * Example usage:
 * 
 * // Auto trigger when component mounts
 * <AchievementTrigger
 *   achievementName="first_lesson_completed"
 *   courseId="python-101"
 *   title="Primera Lección Completada"
 *   description="Has completado tu primera lección"
 *   score={100}
 *   totalPoints={100}
 *   trigger="auto"
 * />
 * 
 * // Manual trigger with button
 * <AchievementTrigger
 *   achievementName="module_completed"
 *   courseId="python-101"
 *   title="Módulo Completado"
 *   score={85}
 *   totalPoints={100}
 *   trigger="manual"
 * >
 *   <button>Completar Módulo</button>
 * </AchievementTrigger>
 */
const AchievementTrigger: React.FC<AchievementTriggerProps> = ({
  achievementName,
  courseId,
  title,
  description = null,
  score,
  totalPoints,
  metadata,
  trigger = 'manual',
  children,
  className = '',
}) => {
  const { user } = useAuth();
  const updateAchievementMutation = useUpdateAchievement();

  const handleTriggerAchievement = () => {
    if (!user?.correo_electronico) {
      toast.error('Usuario no autenticado');
      return;
    }

    const achievementData = createAchievementData(
      user.correo_electronico,
      achievementName,
      courseId,
      title,
      description,
      score,
      totalPoints,
      metadata
    );

    updateAchievementMutation.mutate(achievementData);
  };

  // Auto trigger on mount
  React.useEffect(() => {
    if (trigger === 'auto' && user?.correo_electronico) {
      handleTriggerAchievement();
    }
  }, [trigger, user?.correo_electronico]);

  // For auto trigger, don't render anything visible
  if (trigger === 'auto') {
    return null;
  }

  // For manual trigger, render children with click handler
  if (children) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: handleTriggerAchievement,
      disabled: updateAchievementMutation.isPending || !user?.correo_electronico,
      className: className,
    });
  }

  // Default button if no children provided
  return (
    <button
      onClick={handleTriggerAchievement}
      disabled={updateAchievementMutation.isPending || !user?.correo_electronico}
      className={`bg-[#0c77f2] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0a66d1] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {updateAchievementMutation.isPending ? 'Guardando...' : 'Completar Logro'}
    </button>
  );
};

export default AchievementTrigger; 