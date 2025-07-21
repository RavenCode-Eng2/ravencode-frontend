import React, { useState, useMemo, useEffect } from 'react';
import { useUserAchievementsByEmail, useUpdateAchievement, useUserAchievementStats } from '../hooks/useAchievements';
import { useEstudianteDiplomas } from '../hooks/useDiplomas';
import { useAuth } from '../context/AuthContext';
import AchievementCard from '../components/AchievementCard';

import DiplomaManager from '../components/DiplomaManager';
import DiplomaVerification from '../components/DiplomaVerification';
import { theme } from '../theme';
import { getResponsiveContainer } from '../utils/responsive';
import { ApiAchievementRecord, Achievement } from '../types';
import { getAchievementRarity, getAchievementXP, calculateAchievementPercentage, createAchievementData, createAchievementMetadata } from '../utils/achievementHelpers';

// Helper function to transform API achievement data to frontend format
const transformApiAchievementToFrontend = (apiAchievement: ApiAchievementRecord): Achievement => {
  const percentage = apiAchievement.percentage || calculateAchievementPercentage(apiAchievement.score, apiAchievement.total_points);
  
  return {
    id: apiAchievement.id || `${apiAchievement.achievement_name}-${apiAchievement.course_id}`,
    title: apiAchievement.title,
    description: apiAchievement.description || 'Logro completado',
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8s_J2GdV9KiKKCBakIxWKcyX2fNpy9NbDzKoW9Wk0OUOqf0ZLRkJlx4FC_L8Dn2Z2RzMYPv6ET7oWnBt2RfBgybavw4oXt5b9fkqMQyaxuAmoeugNUO_EPzg6DPnAm_zsLD4DGBi5oliJ3T6QLwR7IP5IPGKpUDdlK5ViTZl1X7jwSyOXkyWF_ul_UfJAo6oY45B7u8o362oLH8fXdhozRqWnJ5C5b3obXoGIjmgZWoXxkxs4tIOslZ-YROirT3glPMiT1qxCOBq',
    category: apiAchievement.course_id,
    rarity: getAchievementRarity(percentage),
    dateEarned: apiAchievement.date_earned || undefined,
    isEarned: apiAchievement.achieved || false, // Use the achieved field from API
    requirements: [`Completar ${apiAchievement.achievement_name}`],
    xpReward: getAchievementXP(percentage),
  };
};

const Achievements: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('achievements');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch user data from new API
  const { data: apiAchievements, isLoading: apiAchievementsLoading, error: apiAchievementsError } = useUserAchievementsByEmail(
    user?.correo_electronico || '', 
    !!user?.correo_electronico
  );

  // Fetch user achievement statistics
  const { data: achievementStats, isLoading: statsLoading } = useUserAchievementStats(
    user?.correo_electronico || '',
    !!user?.correo_electronico
  );

  // Fetch new diploma data
  const { data: newDiplomas, isLoading: newDiplomasLoading, error: newDiplomasError } = useEstudianteDiplomas(
    user?.correo_electronico || '',
    !!user?.correo_electronico
  );

  // Legacy API calls disabled - endpoints don't exist
  // const { data: userProfile, isLoading: profileLoading } = useUserProfile();
  // const { data: userAchievements, isLoading: achievementsLoading } = useUserAchievements();
  // const { data: userDiplomas, isLoading: diplomasLoading } = useUserDiplomas();
  
  // Use mock data for legacy fallbacks since legacy endpoints don't exist
  const userProfile = null;
  const userAchievements = null;
  const userDiplomas = null;
  const profileLoading = false;
  const achievementsLoading = false;
  const diplomasLoading = false;

  // Achievement update mutation
  const updateAchievementMutation = useUpdateAchievement();

  // Transform API achievements to frontend format
  const transformedAchievements = useMemo(() => {
    if (!apiAchievements || !Array.isArray(apiAchievements)) return [];
    return apiAchievements.map(transformApiAchievementToFrontend);
  }, [apiAchievements]);

  const isActive = (tab: string) => activeTab === tab;

  // Mock data for demonstration (replace with actual data when API is ready)
  const mockProfile = {
    id: '1',
    name: 'Alex Turner',
    email: 'alex.turner@example.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZTRd97aQRKwMuAZM5OJfc8wSAeGExpxdPUTbbl5rCBnhrfNMPzTLhS8GZDrpHp2179wQy2hsJhlZFMlTp_Bn6verWlpl4e--kxqYNrZmo7EMeXDy9HxT0MZXdqT_EATDMybMOSp33G5sPE46AFJa-IELHMa_SnWK57wzHv5zlwhTEnsLET5TPoi_8U9jY-TiglXLaNrBBYfTPpdb-O3yF9aw-sjRtE4AeT14DY3SMPwqcdcO0IRkrK8Se2b5jktHYEsxnTA8Hq3HE',
    level: 12,
    xp: 2450,
    joinDate: '2022',
    achievements: [],
    diplomas: [],
    stats: {
      coursesCompleted: 3,
      totalXp: 2450,
      currentStreak: 7,
      longestStreak: 15,
      problemsSolved: 45,
      rank: 'Advanced'
    }
  };

  const mockAchievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8s_J2GdV9KiKKCBakIxWKcyX2fNpy9NbDzKoW9Wk0OUOqf0ZLRkJlx4FC_L8Dn2Z2RzMYPv6ET7oWnBt2RfBgybavw4oXt5b9fkqMQyaxuAmoeugNUO_EPzg6DPnAm_zsLD4DGBi5oliJ3T6QLwR7IP5IPGKpUDdlK5ViTZl1X7jwSyOXkyWF_ul_UfJAo6oY45B7u8o362oLH8fXdhozRqWnJ5C5b3obXoGIjmgZWoXxkxs4tIOslZ-YROirT3glPMiT1qxCOBq',
      category: 'Learning',
      rarity: 'common' as const,
      dateEarned: '2024-01-15',
      isEarned: true,
      requirements: ['Complete first lesson'],
      xpReward: 100
    },
    {
      id: '2',
      title: 'Problem Solver',
      description: 'Solve 10 coding problems',
      icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-tYDT5kbfoccsbfTK53kY2y3g4xr91oubMDvjxb1Jzh3GoqbttOE0wKP_TToyXEby6wlVEQDXFWwnALH094XFBmBrUCLQgAJDYj_tg9tHshbm4zifxzzedmukmrgEj7EURhuzpkXk4PyE4eg2d8l271q5mjT515FNXDccbb7mc3ddTOrhuoJtNMCjSbQZswoSk37hmfrG326wC3xNZIpgbzAzbvUImYCf32bGV3DKdQL_1eSnEcPoMuUZvWDB9TaBlWP6AjT_-q_J',
      category: 'Practice',
      rarity: 'rare' as const,
      dateEarned: '2024-01-20',
      isEarned: true,
      requirements: ['Solve 10 problems'],
      xpReward: 250
    },
    {
      id: '3',
      title: 'Speed Demon',
      description: 'Complete a lesson in under 5 minutes',
      icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK_fZcY0cIoopBeKCaOXBFR-hXLHCxTep2q2ugKiWeaKzTNzUBGudMUZ2wAJS0YjlsoP8qRP9MpwJs4o8It11UpKGLzZcv6inP-haZV8gVkU45WBDhrqlEZVGI_FjNwVSrx7xHHnckamp8RNzel7w59-LMW44A98sg0jjiWFpOiT14A_0M04T6xXNStcGpgJTcvtatR-2rYH6PlIlgeoqdrDntkwqQoll3HgGsAtPaV805bmvV88cQfPuIIzsZ7hsX4No1o0n9GpLh',
      category: 'Achievement',
      rarity: 'epic' as const,
      isEarned: false,
      requirements: ['Complete lesson in under 5 minutes'],
      xpReward: 500
    },
    {
      id: '4',
      title: 'Master Coder',
      description: 'Complete all advanced modules',
      icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKUPB3Pe6VO3vYz056X12Ls4q-QBd2KIQtrTNssqTuzYlvIr-EVQb3Jp1HhCOam3aS6A1nfMcslfDFr--UreeGfy3bTcotk2Lu8TPOItHxg0I1mnmZlG3lnPQxIDlLFHCcaN_xPXfMDvOhCYJ9-Ajf7oRMoxsRl0O4zEpFM05lHMM2o3MTS86uLFm5_nLEhu-yX3Ff6ALI9XDeMPYyTjWh_dZub1ixg42NFvzi00gDYEVfimPrGQMK7BI96DRZFBPsevpqsmhi6UuP',
      category: 'Mastery',
      rarity: 'legendary' as const,
      isEarned: false,
      requirements: ['Complete all advanced modules'],
      xpReward: 1000
    },
    {
      id: '5',
      title: 'Streak Master',
      description: 'Maintain a 30-day learning streak',
      icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDH1tPLOnkUQ9NdDboQ9g1egsX8bdlDWZFLwZCHrQVCMCRkiYMx2RgJEyhM1Ar4xafUMHHiCDBaYMkRKyPl64Zk2czPRDqiWEFVE4xhzFCf2GH0jYHvd0Gkq90ZixYfHw8sqLjX3kllX3Vc124Njnzjzd3yvUF2zSkwX7Esz6J_iHiAAExBOmhEzsBfZm2M0Px4Iw3wB2QODK8wuvzb3rvcXraUvpMD9ceBabw5XMOkL8GtsOqd2GyBFdXjnn11IgJ0YnSQv6m6Fsd',
      category: 'Dedication',
      rarity: 'epic' as const,
      isEarned: false,
      requirements: ['Learn for 30 consecutive days'],
      xpReward: 750
    },
    {
      id: '6',
      title: 'Community Helper',
      description: 'Help 5 other students',
      icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv8iJwScrz8sJfL9mHC301emBnIEHEHnAeEuGKdY3GEQo8WQMYvCZQ1VPk-tTZe-oh2g8uBtGV8X51R27vXFxr3q5QCBe9uvWFPTV6U5j6E0iuQrrCsSk_7j8VyTgmtNtlG7gy_FNi-Gp6qk3fd58fps5nWK5RYZ82qq7YIHJjVaV42jKTRNpUXGWlNhA2Qj9B-ngK74gql3J6Y3Dbp9bXpZwPkW0ScjTUESaXxi48JsQpMVpmKNe-mk5wKue2lcS3f-obGnL_flDT',
      category: 'Community',
      rarity: 'rare' as const,
      isEarned: false,
      requirements: ['Help 5 students in forums'],
      xpReward: 300
    }
  ];

  const mockDiplomas = [
    {
      id: '1',
      title: 'Python Fundamentals',
      description: 'Master the basics of Python programming',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgOtM0WLDu8qT5BZAD1RIzTrLaGKnQYaz7M4PVENgFWIuVKrjMaK03WrHN4aHY3jDsb4QBQX6h6x4aJiBRD9oCRwEsTbNwCQMlcMKFBMProwEWezJPY_-XbWcuP94XS7lb8S0AU1xloWYGhurXrcLJCc5mNxPGhTbhnt9LwduXe-Q-D9e-j_HtdjmUOFq6-9vSYKVhlTFmySIGhhOOvV7JU5O4gahsCM_YEF9w5uyuWRMwJZe41xOXpNVWxvm1sQ_kwJ6Y_zoK6W5v',
      courseId: 'python-101',
      courseName: 'Python for Beginners',
      dateEarned: '2024-01-30',
      certificateUrl: '#',
      skills: ['Variables', 'Functions', 'Loops', 'Data Types']
    },
    {
      id: '2',
      title: 'Web Development Basics',
      description: 'Complete introduction to web development',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiMjnyapQ-50ijErugtnp9EPlA-YrRuSdlzSFWSm19adLfdKLW09OhZ_vg2GdYTx0jvc8k2gYY7y-DKXyh8wg1vBOfva69DUzxsoNkGqgX4H0Syx0S_DZKTBYqgWze4CFYcMiAo2P8WdTckfTEWJwEolrbbT-_gmOEIqvnT7noVtUGVMx2gSxqiWAX0A4NYlspFTJZh1YOtpsF0j-_pJCNCUEurX2h2fjv5YN2myRdjJY_X-gMYWDQmouzV-KW-zBbKGfOSQOlasRR',
      courseId: 'web-101',
      courseName: 'Web Development Fundamentals',
      dateEarned: '2024-02-15',
      certificateUrl: '#',
      skills: ['HTML', 'CSS', 'JavaScript', 'DOM']
    },
    {
      id: '3',
      title: 'Advanced Algorithms',
      description: 'Master complex programming algorithms',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvPWkDmznc-b04OZFKNx2vEK7LcUjcEwbjUYEVJ6siQ6qa_-WSZvrZP15X8F5k2ARMzYUBT4EFq1Cwq_xRPfI31K3uconxeloMO289O4uEGjC0mtySDHpESaxEXxDdPGdgw1lqQSXWylUtKUo9vANNhNtP9Xw-KJc-MrzEe42XdRFazUaX65O4hLWw76N9pSL5j62VYy4xN6Y4Cb9mrQd5b9DmfOCx6eylgjlJAM_rG0eV_OBiuSrZZbVpN7XVi-688qUFkl2JNorx',
      courseId: 'algo-201',
      courseName: 'Advanced Algorithms & Data Structures',
      dateEarned: '2024-03-01',
      certificateUrl: '#',
      skills: ['Sorting', 'Searching', 'Dynamic Programming', 'Graph Theory']
    }
  ];

  const currentProfile = userProfile || mockProfile;
  // Use new API data if available, otherwise fall back to legacy API or mock data
  const currentAchievements = useMemo(() => {
          try {
        // If there's an API error, return empty array - no mock data
        if (apiAchievementsError) {
          console.warn('[Achievements] API error:', apiAchievementsError);
          return [];
        }

        // Only return transformed achievements from API, no mock data fallback
        return transformedAchievements;
      } catch (error) {
        console.error('[Achievements] Error processing achievements:', error);
        return [];
      }
  }, [transformedAchievements, apiAchievementsError]);
  
  // Use new diploma data if available, no mock fallback
  const currentDiplomas = useMemo(() => {
    // If there's an API error, return empty array
    if (newDiplomasError) {
      console.warn('[Achievements] Diploma API error:', newDiplomasError);
      return [];
    }
    return newDiplomas || [];
  }, [newDiplomas, newDiplomasError]);

  // Loading state
  const isLoading = apiAchievementsLoading || profileLoading || statsLoading || newDiplomasLoading;

  // Test function to create a sample achievement
  const handleTestAchievement = () => {
    if (!user?.correo_electronico) return;
    
    const metadata = createAchievementMetadata(
      'learning',
      'rare',
      250,
      { difficulty: 'beginner', module: 'introduction' }
    );
    
    const testAchievementData = createAchievementData(
      user.correo_electronico,
      'first_lesson_completed',
      'python-101',
      'Primera Lección Completada',
      'Has completado tu primera lección de Python',
      85,
      100,
      metadata
    );

    updateAchievementMutation.mutate(testAchievementData);
  };

  // Handle achievement click
  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAchievement(null);
  };

  return (
    <div 
      className="relative flex size-full min-h-screen flex-col bg-[#101923] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: theme.typography.fontFamily }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className={getResponsiveContainer()}>
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Profile Section */}
            <div className="flex p-4">
              <div className="flex w-full flex-col gap-4 items-center">
                <div className="flex gap-4 flex-col items-center">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                    style={{ 
                      backgroundImage: user?.foto_de_perfil 
                        ? `url("${user.foto_de_perfil}")` 
                        : `url("${currentProfile.avatar}")` 
                    }}
                  />
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                      {user?.nombre || currentProfile.name}
                    </p>
                    <p className="text-[#90abcb] text-base font-normal leading-normal text-center">
                      {user?.correo_electronico}
                    </p>
                    <p className="text-[#90abcb] text-base font-normal leading-normal text-center">
                      Unido en {user?.created_at 
                        ? new Date(user.created_at).toLocaleDateString() 
                        : currentProfile.joinDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="pb-3">
              <div className="flex border-b border-[#314b68] px-4 gap-8">
                <button 
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                    isActive('info') 
                      ? 'border-b-[#0c77f2] text-white' 
                      : 'border-b-transparent text-[#90abcb]'
                  }`}
                  onClick={() => setActiveTab('info')}
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">Información</p>
                </button>
                <button 
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                    isActive('achievements') 
                      ? 'border-b-[#0c77f2] text-white' 
                      : 'border-b-transparent text-[#90abcb]'
                  }`}
                  onClick={() => setActiveTab('achievements')}
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">Logros</p>
                </button>
                <button 
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                    isActive('diplomas') 
                      ? 'border-b-[#0c77f2] text-white' 
                      : 'border-b-transparent text-[#90abcb]'
                  }`}
                  onClick={() => setActiveTab('diplomas')}
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">Diplomas</p>
                </button>
                <button 
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                    isActive('verification') 
                      ? 'border-b-[#0c77f2] text-white' 
                      : 'border-b-transparent text-[#90abcb]'
                  }`}
                  onClick={() => setActiveTab('verification')}
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">Verificar</p>
                </button>
              </div>
            </div>

            {/* Debug Panel (temporary for testing) */}
            {import.meta.env.DEV && (
              <div className="px-4 py-2 border-b border-[#314b68]">
                <button
                  onClick={handleTestAchievement}
                  disabled={updateAchievementMutation.isPending || !user?.correo_electronico}
                  className="bg-[#0c77f2] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0a66d1] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updateAchievementMutation.isPending ? 'Creando...' : 'Crear Logro de Prueba'}
                </button>
                <span className="ml-2 text-xs text-[#90abcb]">
                  (Solo visible en desarrollo)
                </span>
              </div>
            )}

            {/* Tab Content */}
            {activeTab === 'info' && (
              <div className="px-4 py-5">
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
                  Estadísticas
                </h2>
                {isLoading ? (
                  <div className="flex justify-center items-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0c77f2]"></div>
                    <span className="ml-2 text-[#90abcb]">Cargando estadísticas...</span>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-[#223449] rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#0c77f2]">
                          {achievementStats?.total_achievements || currentProfile.stats.coursesCompleted}
                        </div>
                        <div className="text-sm text-[#90abcb]">Logros Totales</div>
                      </div>
                      <div className="bg-[#223449] rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-400">
                          {achievementStats?.total_xp || currentProfile.stats.totalXp}
                        </div>
                        <div className="text-sm text-[#90abcb]">XP Total</div>
                      </div>
                      <div className="bg-[#223449] rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">
                          {achievementStats?.average_score ? `${achievementStats.average_score.toFixed(1)}%` : currentProfile.stats.currentStreak}
                        </div>
                        <div className="text-sm text-[#90abcb]">
                          {achievementStats?.average_score ? 'Promedio' : 'Racha Actual'}
                        </div>
                      </div>
                      <div className="bg-[#223449] rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          {Object.keys(achievementStats?.achievements_by_course || {}).length || currentProfile.stats.problemsSolved}
                        </div>
                        <div className="text-sm text-[#90abcb]">
                          {achievementStats ? 'Cursos con Logros' : 'Problemas Resueltos'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Achievement by Course breakdown */}
                    {achievementStats?.achievements_by_course && Object.keys(achievementStats.achievements_by_course).length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-white text-lg font-semibold mb-3">Logros por Curso</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {Object.entries(achievementStats.achievements_by_course).map(([courseId, count]) => (
                            <div key={courseId} className="bg-[#223449] rounded-lg p-3 flex justify-between items-center">
                              <span className="text-[#90abcb] text-sm">{courseId}</span>
                              <span className="text-white font-semibold">{count} logros</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Achievements */}
                    {achievementStats?.recent_achievements && achievementStats.recent_achievements.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-white text-lg font-semibold mb-3">Logros Recientes</h3>
                        <div className="space-y-2">
                          {achievementStats.recent_achievements.slice(0, 3).map((achievement) => (
                            <div key={achievement.id || achievement.achievement_name} className="bg-[#223449] rounded-lg p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-white font-medium text-sm">{achievement.title}</h4>
                                  <p className="text-[#90abcb] text-xs">{achievement.description}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-yellow-400 font-semibold text-sm">
                                    {achievement.percentage || Math.round((achievement.score / achievement.total_points) * 100)}%
                                  </div>
                                  <div className="text-[#90abcb] text-xs">
                                    {achievement.date_earned ? new Date(achievement.date_earned).toLocaleDateString() : 'Reciente'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div>
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                  Logros
                </h2>
                {isLoading ? (
                  <div className="flex justify-center items-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0c77f2]"></div>
                    <span className="ml-2 text-[#90abcb]">Cargando logros...</span>
                  </div>
                ) : currentAchievements.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="text-4xl mb-4">🏆</div>
                    <h3 className="text-white text-lg font-semibold mb-2">
                      ¡Aún no tienes logros!
                    </h3>
                    <p className="text-[#90abcb] text-sm max-w-md">
                      Completa lecciones y desafíos para ganar logros y mostrar tu progreso.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,120px))] gap-3 p-4 justify-start">
                    {currentAchievements.map((achievement) => (
                      <AchievementCard 
                        key={achievement.id} 
                        achievement={achievement}
                        showDetails={false}
                        onClick={handleAchievementClick}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'diplomas' && (
              <div>
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                  Diplomas
                </h2>
                <div className="p-4">
                  {/* New diploma manager component */}
                  <DiplomaManager className="mb-6" />
                </div>
              </div>
            )}

            {activeTab === 'verification' && (
              <div className="p-4">
                <DiplomaVerification />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Achievement Detail Modal */}
      {isModalOpen && selectedAchievement && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e2124] rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#40474f]">
              <h3 className="text-white text-lg font-bold">Detalles del Logro</h3>
              <button
                onClick={closeModal}
                className="text-[#90abcb] hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Achievement Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-gray-600 to-gray-700">
                  {selectedAchievement.icon ? (
                    <img 
                      src={selectedAchievement.icon} 
                      alt={selectedAchievement.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 11-2 0 1 1 0 012 0zM7 8a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Achievement Title */}
              <h4 className="text-white text-xl font-bold text-center mb-2">
                {selectedAchievement.title}
              </h4>

              {/* Achievement Status */}
              <div className="flex justify-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedAchievement.isEarned 
                    ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                    : 'bg-gray-600/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {selectedAchievement.isEarned ? '🏆 Desbloqueado' : '🔒 Bloqueado'}
                </span>
              </div>

              {/* Description */}
              <p className="text-[#90abcb] text-center mb-6 leading-relaxed">
                {selectedAchievement.description}
              </p>

              {/* Achievement Details */}
              <div className="space-y-4">
                {/* Rarity */}
                <div className="flex items-center justify-between p-3 bg-[#2a2d31] rounded-lg">
                  <span className="text-[#90abcb]">Rareza:</span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    selectedAchievement.rarity === 'common' ? 'bg-gray-600 text-gray-300' :
                    selectedAchievement.rarity === 'rare' ? 'bg-blue-600 text-blue-100' :
                    selectedAchievement.rarity === 'epic' ? 'bg-purple-600 text-purple-100' :
                    'bg-yellow-600 text-yellow-100'
                  }`}>
                    {selectedAchievement.rarity === 'common' ? 'Común' :
                     selectedAchievement.rarity === 'rare' ? 'Raro' :
                     selectedAchievement.rarity === 'epic' ? 'Épico' : 'Legendario'}
                  </span>
                </div>

                {/* Category */}
                <div className="flex items-center justify-between p-3 bg-[#2a2d31] rounded-lg">
                  <span className="text-[#90abcb]">Categoría:</span>
                  <span className="text-white font-medium">{selectedAchievement.category}</span>
                </div>

                {/* XP Reward */}
                <div className="flex items-center justify-between p-3 bg-[#2a2d31] rounded-lg">
                  <span className="text-[#90abcb]">Recompensa XP:</span>
                  <div className="flex items-center gap-1 text-yellow-400 font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{selectedAchievement.xpReward} XP</span>
                  </div>
                </div>

                {/* Date Earned */}
                {selectedAchievement.isEarned && selectedAchievement.dateEarned && (
                  <div className="flex items-center justify-between p-3 bg-[#2a2d31] rounded-lg">
                    <span className="text-[#90abcb]">Fecha obtenida:</span>
                    <span className="text-white font-medium">
                      {new Date(selectedAchievement.dateEarned).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}

                {/* Requirements */}
                {selectedAchievement.requirements && selectedAchievement.requirements.length > 0 && (
                  <div className="p-3 bg-[#2a2d31] rounded-lg">
                    <span className="text-[#90abcb] block mb-2">Requisitos:</span>
                    <ul className="space-y-1">
                      {selectedAchievement.requirements.map((requirement, index) => (
                        <li key={index} className="text-white text-sm flex items-start gap-2">
                          <span className="text-[#90abcb] mt-1">•</span>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#40474f]">
              <button
                onClick={closeModal}
                className="w-full bg-[#0c77f2] hover:bg-[#0a66d1] text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements; 