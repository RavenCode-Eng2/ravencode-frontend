export * from './courseTypes';
export * from './lessonTypes';
export * from './assessmentTypes';

export interface Leccion {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  orden: number;
  moduloId: number;
}

export interface Usuario {
  _id: string;
  correo_electronico: string;
  departamento?: string;
  fecha_de_nacimiento?: string;
  foto_de_perfil: string | null;
  nivel_acceso?: string;
  nombre: string;
  role: string;
  created_at?: string;
  // Student-specific fields
  institucion_educativa?: string;
  grado_academico?: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ErrorResponse {
  detail: string;
  status_code: number;
}

// Achievement and Diploma types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  dateEarned?: string;
  isEarned: boolean;
  requirements: string[];
  xpReward: number;
}

// API Schema types for the new Achievements API v2.0.0
export interface AchievementInput {
  achievement_name: string;
  course_id: string;
  title: string;
  description?: string | null;
  metadata?: Record<string, any> | null;
}

export interface AchievementUpdateRequest {
  email: string;
  achievement: AchievementInput;
  score: number;
  total_points: number;
}

export interface BulkUpdateRequest {
  updates: AchievementUpdateRequest[];
}

export interface ApiAchievementRecord {
  id?: string;
  email: string;
  achievement_name: string;
  course_id: string;
  title: string;
  description?: string | null;
  score: number;
  total_points: number;
  percentage?: number;
  date_earned?: string | null;
  status?: string;
  achieved?: boolean;
  metadata?: Record<string, any>;
}

export interface AchievementStats {
  total_achievements: number;
  total_xp: number;
  average_score: number;
  achievements_by_course: Record<string, number>;
  recent_achievements: ApiAchievementRecord[];
}

export interface AvailableAchievement {
  achievement_name: string;
  title: string;
  description?: string;
  requirements?: string[];
  max_points: number;
  category?: string;
  rarity?: string;
}

export interface Diploma {
  id: string;
  title: string;
  description: string;
  image: string;
  courseId: string;
  courseName: string;
  dateEarned: string;
  certificateUrl?: string;
  skills: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  joinDate: string;
  achievements: Achievement[];
  diplomas: Diploma[];
  stats: {
    coursesCompleted: number;
    totalXp: number;
    currentStreak: number;
    longestStreak: number;
    problemsSolved: number;
    rank: string;
  };
}

export interface UserAchievements {
  profile: UserProfile;
  achievements: Achievement[];
  diplomas: Diploma[];
  nextAchievements: Achievement[];
} 

// Content types for different sections within a lesson
export interface CodeExample {
  code: string;
  language: 'python' | 'javascript' | 'typescript' | string;
  description?: string;
}

export interface InteractiveCode {
  initialCode: string;
  language: 'python' | 'javascript' | 'typescript' | string;
  description?: string;
  expectedOutput?: string;
  hints?: string[];
}

// Base content type that can be extended for different content types
export interface CourseContent {
  title: string;
  content: string;
  type: 'text' | 'code' | 'image' | 'interactive';
  codeExample?: CodeExample;
  interactiveCode?: InteractiveCode;
  imagePath?: string;
}

export interface KeyConcept {
  title: string;
  description: string;
  examples?: CodeExample[];
}

// Question types for assessments
export interface Question {
  id: string;
  question: string;
  description?: string | JSX.Element;
  type: 'multiple-choice' | 'coding' | 'true-false';
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  points?: number;
}

export interface Assessment {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  timeLimit?: number; // in minutes
  passingScore: number;
  questions: Question[];
  codingEnvironment?: {
    language: string;
    initialCode?: string;
    testCases?: {
      input: string;
      expectedOutput: string;
    }[];
  };
}

// Lesson structure
export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  prerequisites?: string[]; // IDs of prerequisite lessons
  objectives: string[];
  content: CourseContent[];
  keyConcepts: KeyConcept[];
  interactiveElements?: {
    codingExercises?: InteractiveCode[];
    quizzes?: Question[];
  };
  nextLessonId?: string;
  previousLessonId?: string;
  estimatedDuration: number; // in minutes
  metadata?: {
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    tags: string[];
    lastUpdated: string;
  };
}

// New diploma API types based on OpenAPI v2.1.0 schema
export interface RequisitosDiploma {
  nombre_logro: string;
  id_curso: string;
  nota_minima?: number | null;
  es_obligatorio?: boolean;
}

export interface PlantillaDiploma {
  tipo_diploma: string;
  id_curso: string;
  nombre_diploma: string;
  titulo_diploma: string;
  descripcion?: string | null;
  institucion_emisora?: string;
  requisitos: RequisitosDiploma[];
  url_plantilla?: string | null;
  creditos_academicos?: number | null;
  horas_academicas?: number | null;
  modalidad?: string;
  nivel_educativo?: string;
  codigo_snies?: string | null;
}

export interface SolicitudDiploma {
  email: string;
  id_curso: string;
  tipo_diploma?: string;
  forzar_generacion?: boolean;
  incluir_apostilla?: boolean;
  idioma?: string;
  formato_entrega?: string;
}

export interface DiplomaConfiguracion {
  sistema_educativo: string;
  pais: string;
  idioma_principal: string;
  escala_notas: {
    minima: number;
    maxima: number;
    aprobacion: number;
  };
  tipos_diploma: string[];
  requisitos_generales: string[];
}

export interface ElegibilidadDiploma {
  es_elegible: boolean;
  razon?: string;
  requisitos_faltantes?: string[];
  progreso_requisitos?: Record<string, any>;
  nota_calculada?: number;
}

export interface DiplomaGenerado {
  id: string;
  email: string;
  id_curso: string;
  tipo_diploma: string;
  codigo_verificacion: string;
  fecha_emision: string;
  url_descarga?: string;
  estado: string;
  metadata?: Record<string, any>;
}

export interface EstadisticasDiploma {
  total_diplomas_emitidos: number;
  diplomas_por_curso: Record<string, number>;
  diplomas_por_tipo: Record<string, number>;
  promedio_notas: number;
  diplomas_recientes: DiplomaGenerado[];
}

export interface VerificacionDiploma {
  es_valido: boolean;
  diploma?: DiplomaGenerado;
  mensaje?: string;
  fecha_verificacion: string;
}

// Module structure that contains lessons and assessments
export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  assessment: Assessment;
  prerequisites?: string[]; // IDs of prerequisite modules
  learningPath?: string; // ID of the learning path this module belongs to
  metadata?: {
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedDuration: number; // total duration in minutes
    tags: string[];
    lastUpdated: string;
  };
} 