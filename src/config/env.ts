export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const config = {
  userApiUrl: import.meta.env.VITE_USER_API_URL || 'http://localhost:8001',
  judgeApiUrl: import.meta.env.VITE_JUDGE_API_URL || 'http://localhost:8002',
  learningApiUrl: import.meta.env.VITE_LEARNING_API_URL || 'http://localhost:8003',
  achievementsApiUrl: import.meta.env.VITE_ACHIEVEMENTS_API_URL || 'http://localhost:8003'
}; 