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
export interface LessonContent {
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

// Main Lesson entity
export interface Lesson {
  id: string;
  courseId: string; // Reference to parent course
  moduleId: string; // Reference to parent module
  title: string;
  description: string;
  order: number; // Order within the module
  prerequisites?: string[]; // IDs of prerequisite lessons
  objectives: string[];
  content: LessonContent[];
  keyConcepts: KeyConcept[];
  interactiveElements?: {
    codingExercises?: InteractiveCode[];
  };
  nextLessonId?: string;
  previousLessonId?: string;
  estimatedDuration: number; // in minutes
  metadata: {
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    tags: string[];
    lastUpdated: string;
    createdAt: string;
    status: 'draft' | 'published' | 'archived';
  };
}

// Lesson Progress tracking
export interface LessonProgress {
  userId: string;
  lessonId: string;
  courseId: string;
  startedAt: string;
  completedAt?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  timeSpent: number; // in minutes
  interactiveProgress?: {
    exerciseId: string;
    completed: boolean;
    attempts: number;
    lastAttemptAt: string;
  }[];
} 