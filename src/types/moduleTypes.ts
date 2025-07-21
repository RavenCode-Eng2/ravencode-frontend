// Module metadata
export interface ModuleMetadata {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // total duration in minutes
  tags: string[];
  lastUpdated: string;
  createdAt: string;
  status: 'draft' | 'published' | 'archived';
}

// Main Module entity
export interface Module {
  id: string;
  courseId: string; // Reference to parent course
  title: string;
  description: string;
  order: number; // Order within the course
  lessonIds: string[]; // References to lessons in order
  assessmentIds: string[]; // References to assessments
  prerequisites?: string[]; // IDs of prerequisite modules
  objectives: string[];
  duration: number; // Total duration in minutes
  coverImage?: string;
  metadata: ModuleMetadata;
}

// Module Progress tracking
export interface ModuleProgress {
  userId: string;
  moduleId: string;
  courseId: string;
  startedAt: string;
  completedAt?: string;
  completedLessons: string[]; // Lesson IDs
  assessmentResults: {
    assessmentId: string;
    score: number;
    completedAt: string;
    passed: boolean;
  }[];
  currentLessonId?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number; // Percentage complete (0-100)
  timeSpent: number; // Total time spent in minutes
} 