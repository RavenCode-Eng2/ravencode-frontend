export const config = {
  userApiUrl: import.meta.env.VITE_USER_API_URL || 'http://localhost:8001',
  learningApiUrl: import.meta.env.VITE_LEARNING_API_URL || 'http://localhost:8002',
} as const; 