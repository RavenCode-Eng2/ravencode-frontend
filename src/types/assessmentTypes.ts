// Question types for assessments
export interface Question {
  id: string;
  question: string;
  description?: string | JSX.Element;
  type: 'multiple-choice' | 'coding' | 'true-false';
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  points: number;
}

export interface CodingEnvironment {
  language: string;
  initialCode?: string;
  testCases: {
    input: string;
    expectedOutput: string;
    isHidden?: boolean; // Hidden test cases not shown to students
    points: number;
  }[];
  memoryLimit: number; // in MB
  timeLimit: number; // in seconds
  allowedLibraries?: string[]; // List of allowed import libraries
}

// Main Assessment entity
export interface Assessment {
  id: string;
  courseId: string; // Reference to parent course
  moduleId: string; // Reference to parent module
  title: string;
  description: string;
  instructions: string;
  timeLimit: number; // in minutes
  passingScore: number;
  totalPoints: number;
  questions: Question[];
  codingEnvironment?: CodingEnvironment;
  type: 'quiz' | 'coding-challenge' | 'mixed'; // Type of assessment
  metadata: {
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    tags: string[];
    lastUpdated: string;
    createdAt: string;
    status: 'draft' | 'published' | 'archived';
    averageScore?: number;
    totalAttempts?: number;
    passRate?: number;
  };
}

// Assessment Progress tracking
export interface AssessmentProgress {
  userId: string;
  assessmentId: string;
  courseId: string;
  startedAt: string;
  completedAt?: string;
  timeSpent: number; // in minutes
  score: number;
  passed: boolean;
  attempts: {
    attemptNumber: number;
    startedAt: string;
    completedAt: string;
    score: number;
    passed: boolean;
    answers: {
      questionId: string;
      answer: string;
      isCorrect: boolean;
      points: number;
    }[];
    codingSubmissions?: {
      submissionId: string;
      code: string;
      language: string;
      status: 'pending' | 'running' | 'completed' | 'error';
      results: {
        testCaseId: string;
        passed: boolean;
        output?: string;
        error?: string;
        executionTime?: number;
        memoryUsed?: number;
      }[];
      points: number;
    }[];
  }[];
} 