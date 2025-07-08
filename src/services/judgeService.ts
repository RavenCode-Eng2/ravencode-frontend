import { useAuth } from '../context/AuthContext';

const JUDGE_API_BASE_URL = 'http://localhost:8000'; // Ajusta según tu configuración

export interface SubmissionRequest {
  problem_id: string;
  code: string;
  language: string;
}

export interface SubmissionResponse {
  _id: string;
  id?: string; // Para compatibilidad
  problem_id: string;
  user_id: string;
  code: string;
  language: string;
  status: 'pending' | 'running' | 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'runtime_error' | 'compilation_error' | 'error';
  execution_time?: number;
  memory_used?: number;
  score?: number;
  created_at: string;
  test_case_results?: TestCaseResult[];
}

export interface TestCaseResult {
  _id: string;
  id?: string; // Para compatibilidad
  test_case_id: string;
  status: string;
  execution_time?: number;
  memory_used?: number;
  output?: string;
  error_message?: string;
  created_at: string;
}

export interface Problem {
  _id: string;
  id?: string; // Para compatibilidad
  title: string;
  description: string;
  difficulty: string;
  time_limit: number;
  memory_limit: number;
  created_at: string;
  test_cases: TestCase[];
}

export interface TestCase {
  _id: string;
  id?: string; // Para compatibilidad
  problem_id: string;
  input_data: string;
  expected_output: string;
  is_sample: boolean;
  created_at: string;
}

class JudgeService {
  private async getAuthHeaders(): Promise<HeadersInit> {
    // Intentar obtener el token del juez primero
    let token = localStorage.getItem('judge_access_token');
    
    // Si no hay token del juez, intentar autenticarse
    if (!token) {
      try {
        const response = await fetch(`${JUDGE_API_BASE_URL}/api/v1/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'username=admin&password=admin123'
        });

        if (response.ok) {
          const data = await response.json();
          token = data.access_token;
          localStorage.setItem('judge_access_token', token);
        }
      } catch (error) {
        console.error('Error al autenticarse con el juez:', error);
      }
    }

    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  async createSubmission(submission: SubmissionRequest): Promise<SubmissionResponse> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${JUDGE_API_BASE_URL}/api/v1/submissions/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(submission)
    });

    if (!response.ok) {
      throw new Error(`Error al crear submisión: ${response.statusText}`);
    }

    return response.json();
  }

  async getSubmission(submissionId: string): Promise<SubmissionResponse> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${JUDGE_API_BASE_URL}/api/v1/submissions/${submissionId}`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      throw new Error(`Error al obtener submisión: ${response.statusText}`);
    }

    return response.json();
  }

  async getProblem(problemId: string): Promise<Problem> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${JUDGE_API_BASE_URL}/api/v1/problems/${problemId}`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      throw new Error(`Error al obtener problema: ${response.statusText}`);
    }

    return response.json();
  }

  async getProblems(): Promise<Problem[]> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${JUDGE_API_BASE_URL}/api/v1/problems/`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      throw new Error(`Error al obtener problemas: ${response.statusText}`);
    }

    return response.json();
  }

  // Función para esperar a que la evaluación termine
  async waitForSubmissionResult(submissionId: string, maxWaitTime: number = 30000): Promise<SubmissionResponse> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWaitTime) {
      const submission = await this.getSubmission(submissionId);
      
      if (submission.status === 'accepted' || submission.status === 'wrong_answer' || submission.status === 'error' || 
          submission.status === 'time_limit_exceeded' || submission.status === 'runtime_error' || submission.status === 'compilation_error') {
        return submission;
      }
      
      // Esperar 1 segundo antes de verificar nuevamente
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    throw new Error('Tiempo de espera agotado para la evaluación');
  }
}

export const judgeService = new JudgeService(); 