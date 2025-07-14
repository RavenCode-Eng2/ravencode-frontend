import React, { useState } from 'react';
import { useUserAchievements, useUserProfile, useUserDiplomas } from '../hooks/useAchievements';
import { useAuth } from '../context/AuthContext';
import AchievementCard from '../components/AchievementCard';
import DiplomaCard from '../components/DiplomaCard';
import { theme } from '../theme';

const Achievements: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('achievements');

  // Fetch user data
  const { data: userProfile, isLoading: profileLoading } = useUserProfile();
  const { data: userAchievements, isLoading: achievementsLoading } = useUserAchievements();
  const { data: userDiplomas, isLoading: diplomasLoading } = useUserDiplomas();

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
  const currentAchievements = userAchievements?.achievements || mockAchievements;
  const currentDiplomas = userDiplomas || mockDiplomas;

  return (
    <div 
      className="relative flex size-full min-h-screen flex-col bg-[#101923] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: theme.typography.fontFamily }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Profile Section */}
            <div className="flex p-4">
              <div className="flex w-full flex-col gap-4 items-center">
                <div className="flex gap-4 flex-col items-center">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                    style={{ backgroundImage: `url("${currentProfile.avatar}")` }}
                  />
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                      {currentProfile.name}
                    </p>
                    <p className="text-[#90abcb] text-base font-normal leading-normal text-center">
                      Nivel {currentProfile.level}
                    </p>
                    <p className="text-[#90abcb] text-base font-normal leading-normal text-center">
                      Unido en {currentProfile.joinDate}
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
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'info' && (
              <div className="px-4 py-5">
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
                  Estadísticas
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#223449] rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#0c77f2]">{currentProfile.stats.coursesCompleted}</div>
                    <div className="text-sm text-[#90abcb]">Cursos Completados</div>
                  </div>
                  <div className="bg-[#223449] rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{currentProfile.stats.totalXp}</div>
                    <div className="text-sm text-[#90abcb]">XP Total</div>
                  </div>
                  <div className="bg-[#223449] rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{currentProfile.stats.currentStreak}</div>
                    <div className="text-sm text-[#90abcb]">Racha Actual</div>
                  </div>
                  <div className="bg-[#223449] rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">{currentProfile.stats.problemsSolved}</div>
                    <div className="text-sm text-[#90abcb]">Problemas Resueltos</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div>
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                  Logros
                </h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                  {currentAchievements.map((achievement) => (
                    <AchievementCard 
                      key={achievement.id} 
                      achievement={achievement}
                      showDetails={false}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'diplomas' && (
              <div>
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                  Diplomas
                </h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                  {currentDiplomas.map((diploma) => (
                    <DiplomaCard 
                      key={diploma.id} 
                      diploma={diploma}
                      showDetails={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements; 