// Course metadata and structure
export interface CourseMetadata {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // total duration in minutes
  tags: string[];
  lastUpdated: string;
  createdAt: string;
  publishedAt?: string;
  status: 'draft' | 'published' | 'archived';
  version: string;
  totalStudents: number;
  rating: number;
  reviewCount: number;
}

export interface CourseInstructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface CourseCertificate {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface CoursePricing {
  price: number;
  currency: string;
  discountPrice?: number;
  validUntil?: string;
}

// Main Course entity
export interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  moduleIds: string[]; // References to modules in order
  duration: number; // Total duration in minutes
  instructor: CourseInstructor;
  coverImage: string;
  objectives: string[];
  requirements: string[];
  skills: string[]; // Skills taught in the course
  certificate?: CourseCertificate;
  pricing?: CoursePricing;
  metadata: CourseMetadata;
}

// Course Progress tracking
export interface CourseProgress {
  userId: string;
  courseId: string;
  startedAt: string;
  lastAccessedAt: string;
  completedModules: string[]; // Module IDs
  completedLessons: string[]; // Lesson IDs
  assessmentResults: {
    assessmentId: string;
    score: number;
    completedAt: string;
    passed: boolean;
  }[];
  currentModuleId: string;
  currentLessonId: string;
  progress: number; // Percentage complete (0-100)
  certificateEarned: boolean;
  certificateUrl?: string;
  timeSpent: number; // Total time spent in minutes
} 