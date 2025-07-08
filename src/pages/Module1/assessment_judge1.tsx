import React, { useState } from "react";
import { theme } from "../../theme";
import Button from "../../components/Button";
import { Link, useNavigate } from 'react-router-dom'; 
import EditorContainer from "../../components/CodeMirror/EditorContainer";
import { useEffect } from "react";
import { judgeService, SubmissionResponse } from "../../services/judgeService";
import toast from "react-hot-toast";

const AssessmentJudge1: React.FC = () => {
  
  useEffect(() => {
    // Al montar el componente, llevar el scroll a la parte superior
    window.scrollTo(0, 0);
  }, []); // Este efecto solo se ejecutará una vez al montar el componente

  const navigate = useNavigate();

  // Estado para el código en el editor
  const [currentCode1, setCurrentCode1] = useState<string>(`# Escribe tu código aquí
# Calcula el promedio de tres notas

`);

  // Estado para el lenguaje y tema
  const [currentLanguage, setCurrentLanguage] = useState<string>("python");
  const [currentTheme, setCurrentTheme] = useState<{
    value: string;
    label: string;
  }>({ value: "githubDark", label: "GitHub Dark" });

  // Tamaños para el editor y consola
  const editorSize1 = { width: "950px", height: "300px" };
  const consoleSize1 = { width: "950px", height: "200px" };

  const handleButtonClick = () => {
    navigate('/lesson5'); 
  };

  const handleButtonClick1 = () => {
    navigate("/Assesment1");
  };

  // Estado para el resultado de la evaluación
  const [evaluationResult, setEvaluationResult] = useState<SubmissionResponse | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // ID del problema de promedio (se debe obtener del backend)
  const PROBLEM_ID = "promedio_problem"; // Esto se debe actualizar con el ID real

  const handleSubmitToJudge = async () => {
    if (!currentCode1.trim()) {
      toast.error("Por favor, escribe código antes de enviar");
      return;
    }

    setIsEvaluating(true);
    setEvaluationResult(null);

    try {
      // Primero, obtener el ID real del problema
      const problems = await judgeService.getProblems();
      const promedioProblem = problems.find(p => p.title === "Cálculo de Promedio");
      
      if (!promedioProblem) {
        toast.error("Problema no encontrado en el sistema");
        return;
      }

      // Crear la submisión
      const submission = await judgeService.createSubmission({
        problem_id: promedioProblem._id || promedioProblem.id || '',
        code: currentCode1,
        language: "python"
      });

      toast.success("Código enviado al juez. Evaluando...");

      // Esperar el resultado
      const result = await judgeService.waitForSubmissionResult(submission._id || submission.id || '');
      setEvaluationResult(result);

      if (result.status === 'accepted') {
        toast.success("¡Felicitaciones! Tu código pasó todas las pruebas");
      } else if (result.status === 'wrong_answer') {
        toast.error("Tu código no pasó todas las pruebas. Revisa los resultados");
      } else {
        toast.error("Error en la evaluación: " + result.status);
      }

    } catch (error) {
      console.error("Error al enviar al juez:", error);
      toast.error("Error al enviar el código al juez");
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

            {/* Editor de código */}
            <div className="flex flex-col gap-4 px-4 pt-5">
              <EditorContainer
                currentCode={currentCode1}
                setCurrentCode={setCurrentCode1}
                currentLanguage={currentLanguage}
                setCurrentLanguage={setCurrentLanguage}
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
                editorSize={editorSize1}
                consoleSize={consoleSize1}
              />
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