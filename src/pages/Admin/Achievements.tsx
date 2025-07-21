import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ApiAchievementRecord } from '../../types';
import { achievementService } from '../../services/achievementService';
import { userService } from '../../services/userService';
import { theme } from '../../theme';
import { getResponsiveContainer } from '../../utils/responsive';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { toast } from 'react-hot-toast';

// Types for the admin panel
interface AdminAchievementRecord extends ApiAchievementRecord {
  user_name?: string;
  user_email: string;
}

interface CreateAchievementRequest {
  user_email: string;
  course_id: string;
  achievement_name: string;
  title: string;
  description: string;
  score: number;
  total_points: number;
  metadata?: {
    category?: string;
    rarity?: 'common' | 'rare' | 'epic' | 'legendary';
    xp_reward?: number;
    difficulty?: string;
    module?: string;
    [key: string]: any;
  };
}

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateAchievementRequest) => Promise<void>;
  achievement?: AdminAchievementRecord | null;
  mode: 'create' | 'edit';
}

// Pagination component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) pages.push('...');
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-[#90abcb]">
        <span>Mostrar</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="bg-[#2a2d31] border border-[#40474f] rounded px-2 py-1 text-white"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>de {totalItems} logros</span>
      </div>
      
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-[#2a2d31] text-[#90abcb] hover:bg-[#40474f] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ←
        </button>
        
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
            disabled={typeof page !== 'number'}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? 'bg-[#0c77f2] text-white'
                : typeof page === 'number'
                ? 'bg-[#2a2d31] text-[#90abcb] hover:bg-[#40474f]'
                : 'text-[#90abcb] cursor-default'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-[#2a2d31] text-[#90abcb] hover:bg-[#40474f] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          →
        </button>
      </div>
    </div>
  );
};

const AchievementModal: React.FC<AchievementModalProps> = ({ isOpen, onClose, onSave, achievement, mode }) => {
  const [formData, setFormData] = useState<CreateAchievementRequest>({
    user_email: '',
    course_id: '',
    achievement_name: '',
    title: '',
    description: '',
    score: 0,
    total_points: 100,
    metadata: {
      category: 'learning',
      rarity: 'common',
      xp_reward: 100,
      difficulty: 'beginner',
      module: '',
    },
  });
  
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadUsers();
      if (mode === 'edit' && achievement) {
        setFormData({
          user_email: achievement.email,
          course_id: achievement.course_id,
          achievement_name: achievement.achievement_name,
          title: achievement.title,
          description: achievement.description || '',
          score: achievement.score,
          total_points: achievement.total_points,
          metadata: achievement.metadata || {
            category: 'learning',
            rarity: 'common',
            xp_reward: 100,
            difficulty: 'beginner',
            module: '',
          },
        });
      } else {
        setFormData({
          user_email: '',
          course_id: '',
          achievement_name: '',
          title: '',
          description: '',
          score: 0,
          total_points: 100,
          metadata: {
            category: 'learning',
            rarity: 'common',
            xp_reward: 100,
            difficulty: 'beginner',
            module: '',
          },
        });
      }
    }
  }, [isOpen, mode, achievement]);

  const loadUsers = async () => {
    try {
      const response = await userService.getUsers();
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSave(formData);
      onClose();
      toast.success(mode === 'create' ? 'Logro creado exitosamente' : 'Logro actualizado exitosamente');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al guardar logro');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e2124] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-[#40474f]">
          <h3 className="text-white text-lg font-bold">
            {mode === 'create' ? 'Crear Logro' : 'Editar Logro'}
          </h3>
          <button
            onClick={onClose}
            className="text-[#90abcb] hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* User Selection */}
          <div>
            <label className="block text-[#90abcb] text-sm font-medium mb-2">
              Usuario
            </label>
            <select
              value={formData.user_email}
              onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
              className="w-full bg-[#2a2d31] border border-[#40474f] rounded-lg px-3 py-2 text-white"
              required
            >
              <option value="">Seleccionar usuario</option>
              {users.map((user) => (
                <option key={user._id} value={user.correo_electronico}>
                  {user.nombre} ({user.correo_electronico})
                </option>
              ))}
            </select>
          </div>

          {/* Course ID */}
          <div>
            <label className="block text-[#90abcb] text-sm font-medium mb-2">
              ID del Curso
            </label>
            <Input
              value={formData.course_id}
              onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
              placeholder="python-101"
              required
            />
          </div>

          {/* Achievement Name */}
          <div>
            <label className="block text-[#90abcb] text-sm font-medium mb-2">
              Nombre del Logro (ID único)
            </label>
            <Input
              value={formData.achievement_name}
              onChange={(e) => setFormData({ ...formData, achievement_name: e.target.value })}
              placeholder="first_lesson_completed"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-[#90abcb] text-sm font-medium mb-2">
              Título
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Primera Lección Completada"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#90abcb] text-sm font-medium mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Has completado tu primera lección"
              className="w-full bg-[#2a2d31] border border-[#40474f] rounded-lg px-3 py-2 text-white resize-none"
              rows={3}
            />
          </div>

          {/* Score and Total Points */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#90abcb] text-sm font-medium mb-2">
                Puntuación
              </label>
              <Input
                type="number"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: Number(e.target.value) })}
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-[#90abcb] text-sm font-medium mb-2">
                Puntos Totales
              </label>
              <Input
                type="number"
                value={formData.total_points}
                onChange={(e) => setFormData({ ...formData, total_points: Number(e.target.value) })}
                min="1"
                required
              />
            </div>
          </div>

          {/* Metadata */}
          <div className="border border-[#40474f] rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Metadatos</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#90abcb] text-sm font-medium mb-2">
                  Categoría
                </label>
                <select
                  value={formData.metadata?.category || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    metadata: { ...formData.metadata, category: e.target.value }
                  })}
                  className="w-full bg-[#2a2d31] border border-[#40474f] rounded-lg px-3 py-2 text-white"
                >
                  <option value="learning">Aprendizaje</option>
                  <option value="practice">Práctica</option>
                  <option value="achievement">Logro</option>
                  <option value="mastery">Maestría</option>
                  <option value="dedication">Dedicación</option>
                  <option value="community">Comunidad</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[#90abcb] text-sm font-medium mb-2">
                  Rareza
                </label>
                <select
                  value={formData.metadata?.rarity || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    metadata: { ...formData.metadata, rarity: e.target.value as any }
                  })}
                  className="w-full bg-[#2a2d31] border border-[#40474f] rounded-lg px-3 py-2 text-white"
                >
                  <option value="common">Común</option>
                  <option value="rare">Raro</option>
                  <option value="epic">Épico</option>
                  <option value="legendary">Legendario</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[#90abcb] text-sm font-medium mb-2">
                  Recompensa XP
                </label>
                <Input
                  type="number"
                  value={formData.metadata?.xp_reward || 0}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    metadata: { ...formData.metadata, xp_reward: Number(e.target.value) }
                  })}
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-[#90abcb] text-sm font-medium mb-2">
                  Dificultad
                </label>
                <select
                  value={formData.metadata?.difficulty || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    metadata: { ...formData.metadata, difficulty: e.target.value }
                  })}
                  className="w-full bg-[#2a2d31] border border-[#40474f] rounded-lg px-3 py-2 text-white"
                >
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                  <option value="expert">Experto</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-[#90abcb] text-sm font-medium mb-2">
                Módulo
              </label>
              <Input
                value={formData.metadata?.module || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  metadata: { ...formData.metadata, module: e.target.value }
                })}
                placeholder="introduction, variables, functions..."
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Guardando...' : mode === 'create' ? 'Crear Logro' : 'Actualizar Logro'}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminAchievements: React.FC = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<AdminAchievementRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedAchievement, setSelectedAchievement] = useState<AdminAchievementRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadAchievements();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCourse, filterStatus]);

  const loadAchievements = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get all achievements using admin endpoint
      const response = await achievementService.getAllAchievementsAdmin();
      console.log('Admin achievements response:', response);
      
      if (Array.isArray(response.data)) {
        // Transform API data to admin format
        const adminAchievements: AdminAchievementRecord[] = response.data.map(achievement => ({
          ...achievement,
          user_email: achievement.email,
          user_name: (achievement as any).user_name || '', // This should come from the API
        }));
        setAchievements(adminAchievements);
      } else {
        setAchievements([]);
      }
    } catch (err) {
      console.error('Error loading achievements:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar logros';
      setError(errorMessage);
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and paginate achievements
  const { filteredAchievements, paginatedAchievements, totalPages } = useMemo(() => {
    let filtered = achievements.filter(achievement => {
      const matchesSearch = 
        achievement.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.achievement_name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCourse = !filterCourse || achievement.course_id === filterCourse;
      const matchesStatus = !filterStatus || 
        (filterStatus === 'achieved' && achievement.achieved) ||
        (filterStatus === 'not_achieved' && !achievement.achieved);
      
      return matchesSearch && matchesCourse && matchesStatus;
    });

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

    return {
      filteredAchievements: filtered,
      paginatedAchievements: paginated,
      totalPages: Math.max(1, totalPages)
    };
  }, [achievements, searchTerm, filterCourse, filterStatus, currentPage, itemsPerPage]);

  const handleCreateAchievement = async (data: CreateAchievementRequest) => {
    try {
      const achievementData = {
        email: data.user_email,
        achievement: {
          achievement_name: data.achievement_name,
          course_id: data.course_id,
          title: data.title,
          description: data.description,
          metadata: data.metadata,
        },
        score: data.score,
        total_points: data.total_points,
      };
      
      await achievementService.updateAchievement(achievementData);
      await loadAchievements();
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteAchievement = async (achievement: AdminAchievementRecord) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar el logro "${achievement.title}"?`)) {
      return;
    }

    try {
      await achievementService.deleteAchievement(achievement.email, achievement.achievement_name);
      await loadAchievements();
      toast.success('Logro eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting achievement:', error);
      toast.error(error instanceof Error ? error.message : 'Error al eliminar logro');
    }
  };

  const openCreateModal = () => {
    setSelectedAchievement(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openEditModal = (achievement: AdminAchievementRecord) => {
    setSelectedAchievement(achievement);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAchievement(null);
  };

  // Get unique courses for filter
  const uniqueCourses = [...new Set(achievements.map(a => a.course_id))].filter(Boolean);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: theme.colors.background.main }}>
        <div className="text-white">Cargando logros...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: theme.colors.background.main }}>
        <div className="max-w-2xl mx-auto p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-red-400 text-lg font-semibold">Error cargando logros</h3>
          </div>
          <div className="text-red-300 mb-4">{error}</div>
          {error.includes('Admin endpoint not implemented') && (
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-blue-400 font-semibold mb-2">📋 Para el equipo de Backend:</h4>
              <div className="text-blue-300 text-sm space-y-2">
                <p>Necesitas implementar estos endpoints en tu API:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><code className="bg-gray-800 px-2 py-1 rounded">GET /admin/achievements</code> - Obtener todos los logros</li>
                  <li><code className="bg-gray-800 px-2 py-1 rounded">GET /admin/achievements/user/{'{email}'}</code> - Logros de usuario específico</li>
                </ul>
                <p>Consulta el archivo <code className="bg-gray-800 px-2 py-1 rounded">src/types/achievementApi.ts</code> para ver las estructuras de datos esperadas.</p>
              </div>
            </div>
          )}
          <button 
            onClick={loadAchievements}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            🔄 Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{
        background: theme.colors.background.main,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className={getResponsiveContainer()}>
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            {/* Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div>
                <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                  Gestión de Logros
                </p>
                <p className="text-[#a2abb3] text-sm mt-1">
                  {filteredAchievements.length} logro{filteredAchievements.length !== 1 ? 's' : ''} 
                  {searchTerm && ` encontrado${filteredAchievements.length !== 1 ? 's' : ''}`}
                </p>
              </div>
              <Button onClick={openCreateModal} variant="primary">
                Nuevo Logro
              </Button>
            </div>

            {/* Filters */}
            <div className="px-4 pb-3 space-y-3">
              <Input
                type="text"
                placeholder="Buscar por título, usuario o nombre del logro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
              
              <div className="flex gap-3">
                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="bg-[#2a2d31] border border-[#40474f] rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Todos los cursos</option>
                  {uniqueCourses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-[#2a2d31] border border-[#40474f] rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Todos los estados</option>
                  <option value="achieved">Logrados</option>
                  <option value="not_achieved">No logrados</option>
                </select>
              </div>
            </div>

            {/* Achievements Table */}
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#40474f] bg-[#121416]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#1e2124]">
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Logro
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Usuario
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Curso
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Puntuación
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Estado
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAchievements.map((achievement) => (
                      <tr key={`${achievement.email}-${achievement.achievement_name}`} className="border-t border-t-[#40474f]">
                        <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">
                          <div>
                            <div className="font-semibold">{achievement.title}</div>
                            <div className="text-xs text-[#a2abb3]">{achievement.achievement_name}</div>
                          </div>
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#a2abb3] text-sm font-normal leading-normal">
                          <div>
                            <div>{achievement.user_name || 'N/A'}</div>
                            <div className="text-xs">{achievement.email}</div>
                          </div>
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#a2abb3] text-sm font-normal leading-normal">
                          {achievement.course_id}
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#a2abb3] text-sm font-normal leading-normal">
                          {achievement.score}/{achievement.total_points} ({achievement.percentage || 0}%)
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#a2abb3] text-sm font-normal leading-normal">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            achievement.achieved 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {achievement.achieved ? 'Logrado' : 'No logrado'}
                          </span>
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#a2abb3] text-sm font-bold leading-normal tracking-[0.015em]">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditModal(achievement)}
                              className="text-blue-400 hover:text-blue-300 px-2 py-1 rounded text-xs"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteAchievement(achievement)}
                              className="text-red-400 hover:text-red-300 px-2 py-1 rounded text-xs"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredAchievements.length === 0 && (
                <div className="text-center py-8 text-[#a2abb3]">
                  {searchTerm || filterCourse || filterStatus 
                    ? 'No se encontraron logros que coincidan con los filtros.' 
                    : 'No hay logros registrados.'}
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredAchievements.length > 0 && (
              <div className="px-4 mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredAchievements.length}
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={setItemsPerPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Achievement Modal */}
      <AchievementModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleCreateAchievement}
        achievement={selectedAchievement}
        mode={modalMode}
      />
    </div>
  );
};

export default AdminAchievements; 