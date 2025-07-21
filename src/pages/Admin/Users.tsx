import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Usuario } from '../../types';
import { userService, CreateUserRequest, UpdateUserRequest } from '../../services/userService';
import { theme } from '../../theme';
import { getResponsiveContainer } from '../../utils/responsive';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { toast } from 'react-hot-toast';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: any) => Promise<void>;
  user?: Usuario | null;
  mode: 'create' | 'edit';
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, user, mode }) => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    nombre: '',
    correo_electronico: '',
    contrasena: '',
    foto_de_perfil: '',
    role: 'student',
    fecha_de_nacimiento: '',
    institucion_educativa: '',
    grado_academico: '',
    departamento: '',
    nivel_acceso: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && user) {
      setFormData({
        nombre: user.nombre || '',
        correo_electronico: user.correo_electronico || '',
        contrasena: '', // Don't prefill password
        foto_de_perfil: user.foto_de_perfil || '',
        role: user.role as 'student' | 'admin',
        fecha_de_nacimiento: user.fecha_de_nacimiento || '',
        institucion_educativa: user.institucion_educativa || '',
        grado_academico: user.grado_academico || '',
        departamento: user.departamento || '',
        nivel_acceso: user.nivel_acceso || '',
      });
    } else {
      // Reset form for create mode
      setFormData({
        nombre: '',
        correo_electronico: '',
        contrasena: '',
        foto_de_perfil: '',
        role: 'student',
        fecha_de_nacimiento: '',
        institucion_educativa: '',
        grado_academico: '',
        departamento: '',
        nivel_acceso: '',
      });
    }
  }, [mode, user, isOpen]);

  const handleInputChange = (field: keyof CreateUserRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.nombre || !formData.correo_electronico) {
        toast.error('Nombre y correo electrónico son obligatorios');
        return;
      }

      if (mode === 'create' && !formData.contrasena) {
        toast.error('La contraseña es obligatoria para nuevos usuarios');
        return;
      }

      // Prepare data based on role
      const submitData: CreateUserRequest | UpdateUserRequest = {
        nombre: formData.nombre,
        correo_electronico: formData.correo_electronico,
        foto_de_perfil: formData.foto_de_perfil || null,
      };

      // Only include password if it's provided
      if (formData.contrasena) {
        submitData.contrasena = formData.contrasena;
      }

      if (formData.role === 'student') {
        submitData.fecha_de_nacimiento = formData.fecha_de_nacimiento;
        submitData.institucion_educativa = formData.institucion_educativa;
        submitData.grado_academico = formData.grado_academico;
      } else if (formData.role === 'admin') {
        submitData.departamento = formData.departamento;
        submitData.nivel_acceso = formData.nivel_acceso;
      }

      if (mode === 'create') {
        (submitData as CreateUserRequest).role = formData.role;
      }

      await onSave(submitData);
      onClose();
      toast.success(mode === 'create' ? 'Usuario creado exitosamente' : 'Usuario actualizado exitosamente');
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error(error instanceof Error ? error.message : 'Error al guardar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#283039] rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-white mb-4">
          {mode === 'create' ? 'Crear Usuario' : 'Editar Usuario'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={(e) => handleInputChange('nombre', e.target.value)}
            required
          />
          
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={formData.correo_electronico}
            onChange={(e) => handleInputChange('correo_electronico', e.target.value)}
            required
            disabled={mode === 'edit'} // Email can't be changed in edit mode
          />
          
          <Input
            type="password"
            placeholder={mode === 'edit' ? 'Nueva contraseña (opcional)' : 'Contraseña'}
            value={formData.contrasena}
            onChange={(e) => handleInputChange('contrasena', e.target.value)}
            required={mode === 'create'}
          />
          
          <Input
            type="url"
            placeholder="URL de foto de perfil (opcional)"
            value={formData.foto_de_perfil || ''}
            onChange={(e) => handleInputChange('foto_de_perfil', e.target.value)}
          />

          {mode === 'create' && (
            <div>
              <label className="block text-white text-sm font-medium mb-2">Rol</label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full px-3 py-2 bg-[#121416] border border-[#40474f] rounded-lg text-white focus:outline-none focus:border-[#0b79ee]"
              >
                <option value="student">Estudiante</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          )}

          {formData.role === 'student' && (
            <>
              <Input
                type="date"
                placeholder="Fecha de nacimiento"
                value={formData.fecha_de_nacimiento}
                onChange={(e) => handleInputChange('fecha_de_nacimiento', e.target.value)}
              />
              <Input
                type="text"
                placeholder="Institución educativa"
                value={formData.institucion_educativa}
                onChange={(e) => handleInputChange('institucion_educativa', e.target.value)}
              />
              <Input
                type="text"
                placeholder="Grado académico"
                value={formData.grado_academico}
                onChange={(e) => handleInputChange('grado_academico', e.target.value)}
              />
            </>
          )}

          {formData.role === 'admin' && (
            <>
              <Input
                type="text"
                placeholder="Departamento"
                value={formData.departamento}
                onChange={(e) => handleInputChange('departamento', e.target.value)}
              />
              <Input
                type="text"
                placeholder="Nivel de acceso"
                value={formData.nivel_acceso}
                onChange={(e) => handleInputChange('nivel_acceso', e.target.value)}
              />
            </>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Guardando...' : mode === 'create' ? 'Crear' : 'Actualizar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
  onItemsPerPageChange
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    const showPages = 5; // Number of page buttons to show
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-[#1e2124] rounded-lg">
      {/* Items per page selector */}
      <div className="flex items-center gap-2">
        <span className="text-[#a2abb3] text-sm">Mostrar:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="px-2 py-1 bg-[#283039] border border-[#40474f] rounded text-white text-sm focus:outline-none focus:border-[#0b79ee]"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="text-[#a2abb3] text-sm">
          usuarios de {totalItems}
        </span>
      </div>

      {/* Page info and controls */}
      <div className="flex items-center gap-2">
        <span className="text-[#a2abb3] text-sm mr-4">
          Página {currentPage} de {totalPages}
        </span>
        
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-[#283039] border border-[#40474f] rounded text-white text-sm hover:bg-[#40474f] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        {/* Page numbers */}
        <div className="flex gap-1">
          {currentPage > 3 && totalPages > 5 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="px-3 py-1 bg-[#283039] border border-[#40474f] rounded text-white text-sm hover:bg-[#40474f]"
              >
                1
              </button>
              {currentPage > 4 && <span className="px-2 py-1 text-[#a2abb3]">...</span>}
            </>
          )}
          
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 border rounded text-sm ${
                page === currentPage
                  ? 'bg-[#0b79ee] border-[#0b79ee] text-white'
                  : 'bg-[#283039] border-[#40474f] text-white hover:bg-[#40474f]'
              }`}
            >
              {page}
            </button>
          ))}
          
          {currentPage < totalPages - 2 && totalPages > 5 && (
            <>
              {currentPage < totalPages - 3 && <span className="px-2 py-1 text-[#a2abb3]">...</span>}
              <button
                onClick={() => onPageChange(totalPages)}
                className="px-3 py-1 bg-[#283039] border border-[#40474f] rounded text-white text-sm hover:bg-[#40474f]"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-[#283039] border border-[#40474f] rounded text-white text-sm hover:bg-[#40474f] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

const AdminUsers: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadUsers();
  }, []);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Memoized filtered and paginated data
  const { filteredUsers, paginatedUsers, totalPages } = useMemo(() => {
    const filtered = users.filter(user => 
      user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.correo_electronico?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

    return {
      filteredUsers: filtered,
      paginatedUsers: paginated,
      totalPages: Math.max(1, totalPages)
    };
  }, [users, searchTerm, currentPage, itemsPerPage]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getUsers();
      console.log('Users response:', response);
      
      // Handle the response structure
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (Array.isArray(response)) {
        // Handle case where response is not wrapped in data property
        setUsers(response);
      } else {
        console.error('Unexpected response structure:', response);
        setError('Formato de respuesta inesperado');
      }
    } catch (err) {
      console.error('Error loading users:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      await userService.createUser(userData);
      await loadUsers(); // Reload the users list
    } catch (error) {
      throw error; // Re-throw to be handled by the modal
    }
  };

  const handleUpdateUser = async (userData: UpdateUserRequest) => {
    if (!selectedUser) return;
    
    try {
      await userService.updateUser(selectedUser.correo_electronico, userData);
      await loadUsers(); // Reload the users list
    } catch (error) {
      throw error; // Re-throw to be handled by the modal
    }
  };

  const handleDeleteUser = async (email: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      await userService.deleteUser(email);
      await loadUsers(); // Reload the users list
      toast.success('Usuario eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error instanceof Error ? error.message : 'Error al eliminar usuario');
    }
  };

  const openCreateModal = () => {
    setSelectedUser(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openEditModal = (user: Usuario) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: theme.colors.background.main }}>
        <div className="text-white">Cargando usuarios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: theme.colors.background.main }}>
        <div className="text-red-500">{error}</div>
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
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div>
                <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                  Gestión de Usuarios
                </p>
                <p className="text-[#a2abb3] text-sm mt-1">
                  {filteredUsers.length} usuario{filteredUsers.length !== 1 ? 's' : ''} 
                  {searchTerm && ` encontrado${filteredUsers.length !== 1 ? 's' : ''}`}
                </p>
              </div>
              <Button onClick={openCreateModal} variant="primary">
                Nuevo Usuario
              </Button>
            </div>

            {/* Search */}
            <div className="px-4 pb-3">
              <Input
                type="text"
                placeholder="Buscar usuarios por nombre, email o rol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>

            {/* Users Table */}
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#40474f] bg-[#121416]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#1e2124]">
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Usuario
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Rol
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Información Adicional
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user) => (
                      <tr key={user._id} className="border-t border-t-[#40474f]">
                        <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">
                          <div className="flex items-center gap-3">
                            {user.foto_de_perfil ? (
                              <img
                                src={user.foto_de_perfil}
                                alt={user.nombre}
                                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-[#0b79ee] flex items-center justify-center flex-shrink-0 min-w-[2.5rem]">
                                <span className="text-white font-semibold text-sm leading-none">
                                  {user.nombre?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <span>{user.nombre}</span>
                          </div>
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#a2abb3] text-sm font-normal leading-normal">
                          {user.correo_electronico}
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#a2abb3] text-sm font-normal leading-normal">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-red-500/20 text-red-400' 
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {user.role === 'admin' ? 'Administrador' : 'Estudiante'}
                          </span>
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#a2abb3] text-sm font-normal leading-normal">
                          {user.role === 'student' ? (
                            <div className="text-xs">
                              {user.institucion_educativa && <div>🏫 {user.institucion_educativa}</div>}
                              {user.grado_academico && <div>🎓 {user.grado_academico}</div>}
                            </div>
                          ) : (
                            <div className="text-xs">
                              {user.departamento && <div>🏢 {user.departamento}</div>}
                              {user.nivel_acceso && <div>🔑 {user.nivel_acceso}</div>}
                            </div>
                          )}
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#a2abb3] text-sm font-bold leading-normal tracking-[0.015em]">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditModal(user)}
                              className="text-blue-400 hover:text-blue-300 px-2 py-1 rounded text-xs"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.correo_electronico)}
                              className="text-red-400 hover:text-red-300 px-2 py-1 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={user.correo_electronico === currentUser?.correo_electronico} // Prevent self-deletion
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
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-[#a2abb3]">
                  {searchTerm ? 'No se encontraron usuarios que coincidan con la búsqueda.' : 'No hay usuarios registrados.'}
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredUsers.length > 0 && (
              <div className="px-4 mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredUsers.length}
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={modalMode === 'create' ? handleCreateUser : handleUpdateUser}
        user={selectedUser}
        mode={modalMode}
      />
    </div>
  );
};

export default AdminUsers; 