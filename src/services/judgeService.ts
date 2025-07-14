import { useAuth } from '../context/AuthContext';

const JUDGE_API_BASE_URL = 'http://localhost:8000'; // Ajusta según tu configuración

export interface SubmissionRequest {
  problem_id: string;
  code: string;
  language: string;

  email: string;  // Agregar campo email

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
    console.log("Obteniendo headers de autenticación...");
    
    // Intentar obtener el token del juez primero

    let token: string | null = localStorage.getItem('judge_access_token');

    console.log("Token existente:", token ? "Sí" : "No");
    
    // Si no hay token del juez, intentar autenticarse
    if (!token) {
      console.log("No hay token, intentando autenticación...");
      try {
        const response = await fetch(`${JUDGE_API_BASE_URL}/api/v1/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'username=admin&password=admin123'
        });

        console.log("Respuesta de autenticación:", response.status);
        
        if (response.ok) {
          const data = await response.json();

          if (data.access_token) {
            token = data.access_token;
            localStorage.setItem('judge_access_token', token);
            console.log("Nuevo token obtenido y guardado");
          } else {
            throw new Error('No se recibió token de acceso');
          }

        } else {
          const errorText = await response.text();
          console.error("Error en autenticación:", errorText);
          throw new Error(`Error de autenticación: ${response.status} - ${errorText}`);
        }
      } catch (error) {
        console.error('Error al autenticarse con el juez:', error);
        throw new Error('Error al autenticarse con el juez: ' + (error instanceof Error ? error.message : 'Error desconocido'));
      }
    }

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
    
    console.log("Headers preparados:", headers);
    return headers;
  }

  async createSubmission(submission: SubmissionRequest): Promise<SubmissionResponse> {
    console.log("Creando submission...");
    console.log("Datos de submission:", submission);
    
    const headers = await this.getAuthHeaders();
    console.log("Headers para submission:", headers);
    
    try {
      const response = await fetch(`${JUDGE_API_BASE_URL}/api/v1/submissions/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(submission)
      });

      console.log("Respuesta de crear submission:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al crear submission:", errorText);
        throw new Error(`Error al crear submisión: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Submission creada:", data);
      return data;
    } catch (error) {
      console.error("Error en createSubmission:", error);
      throw new Error('Error al crear submission: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
  }


  async getSubmission(submissionId: string, email: string): Promise<SubmissionResponse> {
    console.log(`Obteniendo submission ${submissionId} para email ${email}...`);
    
    const headers = await this.getAuthHeaders();
    try {
      const response = await fetch(`${JUDGE_API_BASE_URL}/api/v1/submissions/${submissionId}?email=${encodeURIComponent(email)}`, {

        method: 'GET',
        headers
      });

      console.log("Respuesta de get submission:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al obtener submission:", errorText);
        throw new Error(`Error al obtener submisión: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Submission obtenida:", data);
      return data;
    } catch (error) {
      console.error("Error en getSubmission:", error);
      throw new Error('Error al obtener submission: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
  }


  async deleteSubmission(submissionId: string, email: string): Promise<void> {
    console.log(`Eliminando submission ${submissionId} para email ${email}...`);
    
    const headers = await this.getAuthHeaders();
    const url = `${JUDGE_API_BASE_URL}/api/v1/submissions/${submissionId}?email=${encodeURIComponent(email)}`;
    console.log("URL de eliminación:", url);
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      
      console.log("Respuesta de delete submission:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al eliminar submission:", errorText);
        throw new Error(`Error al eliminar submission: ${response.status} - ${errorText}`);
      }
      
      console.log("Submission eliminada exitosamente");
    } catch (error) {
      console.error("Error en deleteSubmission:", error);
      throw new Error('Error al eliminar submission: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
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


  async getSubmissions(email: string): Promise<SubmissionResponse[]> {
    console.log(`Obteniendo submissions para email ${email}...`);
    
    const headers = await this.getAuthHeaders();
    try {
      const response = await fetch(`${JUDGE_API_BASE_URL}/api/v1/submissions/?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers
      });

      console.log("Respuesta de get submissions:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al obtener submissions:", errorText);
        throw new Error(`Error al obtener submissions: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Submissions obtenidas:", data);
      return data;
    } catch (error) {
      console.error("Error en getSubmissions:", error);
      throw new Error('Error al obtener submissions: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
  }

  // Función para esperar a que la evaluación termine
  async waitForSubmissionResult(submissionId: string, email: string, maxWaitTime: number = 30000): Promise<SubmissionResponse> {
    console.log(`Esperando resultado de submission ${submissionId} para email ${email}...`);

    console.log(`Tiempo máximo de espera: ${maxWaitTime}ms`);
    
    const startTime = Date.now();
    let attempts = 0;
    
    while (Date.now() - startTime < maxWaitTime) {
      attempts++;
      console.log(`Intento ${attempts} - Tiempo transcurrido: ${Date.now() - startTime}ms`);
      
      try {

        const submission = await this.getSubmission(submissionId, email);

        console.log(`Estado actual: ${submission.status}`);
        
        if (submission.status !== 'pending' && submission.status !== 'running') {
          console.log("Resultado final obtenido:", submission);
          return submission;
        }
        
        // Esperar 1 segundo antes de verificar nuevamente
        console.log("Esperando 1 segundo antes del siguiente intento...");
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error en intento ${attempts}:`, error);
        // Continuar intentando a pesar de errores
      }
    }
    
    console.error("Tiempo de espera agotado");
    throw new Error('Tiempo de espera agotado para la evaluación');
  }
}

export const judgeService = new JudgeService(); 