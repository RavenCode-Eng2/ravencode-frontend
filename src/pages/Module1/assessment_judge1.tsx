
import React, { useState, useEffect } from "react";
import { theme } from "../../theme";
import Button from "../../components/Button";
import { Link, useNavigate } from 'react-router-dom'; 


import { judgeService, SubmissionResponse } from "../../services/judgeService";
import toast from "react-hot-toast";
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { python } from '@codemirror/lang-python';

import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const AssessmentJudge1: React.FC = () => {
  const { user } = useAuth();  // Obtener el usuario autenticado

  
  useEffect(() => {
    // Al montar el componente, llevar el scroll a la parte superior
    window.scrollTo(0, 0);
  }, []); // Este efecto solo se ejecutará una vez al montar el componente

  const navigate = useNavigate();

  // Estado para el código en el editor
  const [currentCode1, setCurrentCode1] = useState<string>(`# Escribe acá tu código

`);

  // Estado para entrada de usuario y output (como en Lesson1)
  const [userInput, setUserInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  // Estado para el resultado de la evaluación
  const [evaluationResult, setEvaluationResult] = useState<SubmissionResponse | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // ID del problema de promedio (se debe obtener del backend)
  const PROBLEM_ID = "promedio_problem"; // Esto se debe actualizar con el ID real

  const handleButtonClick = () => {
    navigate('/lesson5'); 
  };

  const handleButtonClick1 = () => {
    navigate("/Assesment1");
  };

  // Función para ejecutar código localmente (como en Lesson1)
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('⏳ Ejecutando...');

    const encode = (str: string) => btoa(unescape(encodeURIComponent(str)));
    const decode = (str: string) => atob(str || '');

    const postSubmission = async (language_id: number, source_code: string, stdin: string) => {
      const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'b4e5c5a05fmsh9adf6ec091523f8p165338jsncc58f31c26e1',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
          language_id: language_id,
          source_code: encode(source_code),
          stdin: encode(stdin)
        }
      };
      const res = await axios.request(options);
      return res.data.token;
    };

    const getOutput = async (token: string) => {
      const options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
          'X-RapidAPI-Key': '3ed7a75b44mshc9e28568fe0317bp17b5b2jsn6d89943165d8',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      };
      const res = await axios.request(options);
      if (res.data.status_id <= 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return await getOutput(token);
      }
      return res.data;
    };

    const language_id = 71; // Python
    try {
      const token = await postSubmission(language_id, currentCode1, userInput);
      const res = await getOutput(token);
      let result = decode(res.stdout || '') || decode(res.stderr || '') || decode(res.compile_output || '');

      if (res.status.description.toLowerCase().includes('accepted')) {
        result = result.replace('Accepted', '').trim();
      }

      setOutput(result);
    } catch (err) {
      setOutput('❌ Error al ejecutar el código.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitToJudge = async () => {

    if (!user) {
      toast.error("Debes estar autenticado para enviar código al juez");
      return;
    }

    if (!user.Correo_electronico) {
      toast.error("No se pudo obtener el email del usuario");
      return;
    }

    setIsEvaluating(true);
    setEvaluationResult(null);

    try {
      console.log("Obteniendo lista de problemas...");
      const problems = await judgeService.getProblems();
      console.log("Problemas obtenidos:", problems);
      
      const promedioProblem = problems.find(p => p.title === "Módulo 1");
      console.log("Problema encontrado:", promedioProblem);
      
      if (!promedioProblem) {
        toast.error("Problema no encontrado en el sistema");
        return;
      }

      const problemId = promedioProblem?._id;
      if (!problemId) {
        toast.error("Error: ID del problema no encontrado");
        return;
      }
      console.log("ID del problema:", problemId);

      console.log("Email del usuario:", user.Correo_electronico);

      console.log("Enviando código al juez...");
      console.log("Código a enviar:", currentCode1);
      

      // Crear la submisión con el email del usuario
      const submission = await judgeService.createSubmission({
        problem_id: problemId,
        code: currentCode1,
        language: "python",
        email: user.Correo_electronico  // Agregar el email del usuario
      });

      console.log("Submission creada:", submission);
      toast.success("Código enviado al juez. Evaluando...");

      const submissionId = submission._id;
      if (!submissionId) {
        toast.error("Error: ID de la submission no encontrado");
        return;
      }
      console.log("ID de la submission:", submissionId);

      // Esperar el resultado
      console.log("Esperando resultado...");

      const result = await judgeService.waitForSubmissionResult(submissionId, user.Correo_electronico);
      console.log("Resultado recibido:", result);
      
      setEvaluationResult(result);

      if (result.status === 'accepted') {
        toast.success("¡Felicitaciones! Tu código pasó todas las pruebas");
      } else if (result.status === 'wrong_answer') {
        toast.error("Tu código no pasó todas las pruebas. Revisa los resultados");
      } else {
        toast.error("Error en la evaluación: " + result.status);
      }

    } catch (error) {
      console.error("Error detallado al enviar al juez:", error);
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("Error desconocido al enviar el código al juez");
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col"
      style={{
        background: theme.colors.background.main,
        color: theme.colors.text.primary,
        fontFamily: 'Lexend, "Noto Sans", sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap gap-2 p-4">
              <Link
                className="text-[#8e99cc] text-base font-medium leading-normal"
                to="/courses"
              >
                Fundamentos de Python
              </Link>
              <span className="text-[#8e99cc] text-base font-medium leading-normal">
                /
              </span>
              <span className="text-white text-base font-medium leading-normal">
                Evaluación Juez Módulo 1
              </span>
            </div>
            <h1 className="text-white tracking-light text-[35px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Evaluación Juez Módulo 1
            </h1>

            {/* Ejercicio de programación */}
            <div className="mb-6 px-4">
              <h2 className="text-white text-xl font-bold tracking-[-0.015em] pb-4">
                Ejercicio de Programación
              </h2>
              <div className="bg-[#1a2332] rounded-lg p-6 mb-6">
                <h3 className="text-white text-lg font-bold mb-4">
                  Primer ejercicio práctico
                </h3>
                <div className="text-white text-base leading-relaxed mb-4">
                  <p className="mb-3">
                    Escribe un programa que calcule
                    el promedio de tres notas ingresadas por el usuario.
                  </p>
                  <p className="mb-3">
                    <strong>El programa debe:</strong>
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Pedir el nombre del estudiante.</li>
                    <li>Leer tres notas (pueden ser decimales).</li>
                    <li>Calcular el promedio.</li>
                    <li>
                      Imprimir el mensaje: [nombre] tiene un promedio de
                      [promedio]
                    </li>
                  </ul>

                  <div className="bg-[#0d1117] rounded p-4 mb-4">
                    <h4 className="text-green-400 font-bold mb-2">
                      ✅ Entrada de ejemplo:
                    </h4>
                    <p className="text-gray-300">
                      El programa debe leer, en este orden:
                    </p>
                    <div className="font-mono text-sm mt-2">
                      <div>Ana</div>
                      <div>4.5</div>
                      <div>3.7</div>
                      <div>4.2</div>
                    </div>
                  </div>

                  <div className="bg-[#0d1117] rounded p-4">
                    <h4 className="text-green-400 font-bold mb-2">
                      ✅ Salida de ejemplo:
                    </h4>
                    <div className="font-mono text-sm">
                      Ana tiene un promedio de 4.13
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor de código con estructura visual de Lesson1 */}
            <div className="console-container mb-6 px-4">
                <div className="console-box">
                    <CodeMirror
                        value={currentCode1}
                        height="200px"
                        theme={dracula}
                        extensions={[python()]}
                        onChange={(value) => setCurrentCode1(value)}
                        basicSetup={{
                            lineNumbers: true,
                            highlightActiveLineGutter: true,
                            highlightSpecialChars: true,
                            history: true,
                            foldGutter: true,
                            drawSelection: true,
                            dropCursor: true,
                            allowMultipleSelections: true,
                            indentOnInput: true,
                            syntaxHighlighting: true,
                            bracketMatching: true,
                            closeBrackets: true,
                            autocompletion: true,
                            rectangularSelection: true,
                            crosshairCursor: true,
                            highlightActiveLine: true,
                            highlightSelectionMatches: true,
                            closeBracketsKeymap: true,
                            defaultKeymap: true,
                            searchKeymap: true,
                            historyKeymap: true,
                            foldKeymap: true,
                            completionKeymap: true,
                            lintKeymap: true,
                        }}
                    />
                </div>
            </div>

            {/* Entrada de usuario y botón de ejecutar (como en Lesson1) */}
            <div className="flex flex-col gap-4 mb-4 px-4">
                <div className="flex flex-col gap-2">
                    <label className="text-white text-sm font-medium">
                        Entrada del programa (stdin):
                    </label>
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ingresa aquí los datos que tu programa necesita (ej: Ana&#10;4.5&#10;3.7&#10;4.2)"
                        className="w-full p-3 bg-[#2d2d2d] text-white border border-[#444] rounded-lg font-mono text-sm resize-none"
                        rows={5}
                    />
                </div>
                <div className="flex justify-end">
                    <Button
                        size="md"
                        variant="primary"
                        className="px-6 py-3 text-base font-bold leading-normal"
                        onClick={handleRunCode}
                        disabled={isRunning}
                    >
                        {isRunning ? 'Ejecutando...' : 'Ejecutar código'}
                    </Button>
                </div>
            </div>

            {/* Output (como en Lesson1) */}
            <div className="console-container mb-6 px-4">
                <div className="console-box">
                    <div className="bg-[#1e1e1e] text-white p-4 rounded-t-lg border-b border-[#333]">
                        <h3 className="text-sm font-bold">Output:</h3>
                    </div>
                    <div className="bg-[#1e1e1e] text-white p-4 rounded-b-lg min-h-[100px] font-mono text-sm">
                        <pre className="whitespace-pre-wrap">{output}</pre>
                    </div>
                </div>
            </div>

            {/* Botón de envío al juez */}
            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                variant="primary"
                className="px-8 py-4 text-lg font-bold leading-normal"
                onClick={handleSubmitToJudge}
                disabled={isEvaluating}
                isLoading={isEvaluating}
              >
                {isEvaluating ? "Evaluando..." : "Enviar al Juez"}
              </Button>
            </div>

            {/* Resultados de la evaluación */}
            {evaluationResult && (
              <div className="mt-6 px-4">
                <div className={`rounded-lg p-6 ${
                  evaluationResult.status === 'accepted' 
                    ? 'bg-green-900/20 border border-green-500' 
                    : 'bg-red-900/20 border border-red-500'
                }`}>
                  <h3 className={`text-lg font-bold mb-4 ${
                    evaluationResult.status === 'accepted' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {evaluationResult.status === 'accepted' ? '✅ Evaluación Exitosa' : '❌ Evaluación Fallida'}
                  </h3>
                  
                  <div className="space-y-2">
                    <p className="text-white">
                      <strong>Estado:</strong> {evaluationResult.status}
                    </p>
                    {evaluationResult.score !== undefined && (
                      <p className="text-white">
                        <strong>Puntuación:</strong> {evaluationResult.score}%
                      </p>
                    )}
                    {evaluationResult.execution_time !== undefined && (
                      <p className="text-white">
                        <strong>Tiempo de ejecución:</strong> {evaluationResult.execution_time}ms
                      </p>
                    )}
                    {evaluationResult.memory_used !== undefined && (
                      <p className="text-white">
                        <strong>Memoria utilizada:</strong> {evaluationResult.memory_used}MB
                      </p>
                    )}
                  </div>

                  {evaluationResult.test_case_results && evaluationResult.test_case_results.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-white font-bold mb-2">Resultados de casos de prueba:</h4>
                      <div className="space-y-2">
                        {evaluationResult.test_case_results.map((result, index) => (
                          <div key={result._id || result.id} className={`p-3 rounded ${
                            result.status === 'passed' ? 'bg-green-800/30' : 'bg-red-800/30'
                          }`}>
                            <p className={`font-medium ${
                              result.status === 'passed' ? 'text-green-300' : 'text-red-300'
                            }`}>
                              Caso {index + 1}: {result.status === 'passed' ? '✅ Pasó' : '❌ Falló'}
                            </p>
                            {result.output && (
                              <p className="text-gray-300 text-sm mt-1">
                                <strong>Salida:</strong> {result.output}
                              </p>
                            )}
                            {result.error_message && (
                              <p className="text-red-300 text-sm mt-1">
                                <strong>Error:</strong> {result.error_message}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Botones de navegación */}
            <div className="mt-8 flex justify-between">
              <div className="mt-8 text-left">
                <Button
                  size="md"
                  variant="primary"
                  className=" px-6 py-3 text-base font-bold leading-normal"
                  onClick={handleButtonClick}
                >
                  Anterior
                </Button>
              </div>

              <div className="mt-8 text-right">
                <Button
                  size="md"
                  variant="primary"
                  className=" px-6 py-3 text-base font-bold leading-normal"
                  onClick={handleButtonClick1}
                >
                  Empezar evaluación
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentJudge1; 