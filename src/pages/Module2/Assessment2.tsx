import React, { useState } from "react";
import axios from "axios";
import { theme } from "../../theme";
import Button from "../../components/Button"; 
import { Link, useNavigate } from 'react-router-dom'; 
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"; 
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useEffect } from "react";
import { useAuth } from '../../context/AuthContext';

const questions = [
  {
    question: "¿Cuál es la función de un condicional if?",
    description: "",
    options: [
      "Repetir una tarea muchas veces",
      "Almacenar valores",
      "Tomar decisiones",
      "Pedir datos al usuario",
    ],
    answer: "Tomar decisiones",
  },
  {
    question: "¿Qué palabra se usa para una condición alternativa en Python?",
    description: "",
    options: [
      "else if",
      "elif",
      "elseif",
      "altif",
    ],
    answer: "elif",
  },
  {
    question: "El siguiente código imprime:",
    description: (
      <div className="console-container">
        <div className="console-box">
          <SyntaxHighlighter language="python" style={monokai}>
            {`for i in range(2, 6):
    print(i)`}
          </SyntaxHighlighter>
        </div>
      </div>
    ),
    options: [
      "2 3 4 5 6",
      "1 2 3 4 5",
      "2 3 4 5",
      "2 3 4 5 6",
    ],
    answer: "2 3 4 5",
  },
  {
    question: "¿Cuál operador se usa para comparar igualdad?",
    description: "",
    options: [
      "=",
      ":=",
      "==",
      "igual",
    ],
    answer: "==",
  },
  {
    question: "¿Qué hace el operador not?",
    description: "",
    options: [
      "Cambia una cadena de texto",
      "Niega un valor booleano",
      "Repite una acción",
      "Asigna una variable",
    ],
    answer: "Niega un valor booleano",
  },
  {
    question: "¿Qué estructura repetirá instrucciones mientras una condición sea verdadera?",
    description: "",
    options: [
      "for",
      "while",
      "if",
      "def",
    ],
    answer: "while",
  },
  {
    question: "El ciclo while puede generar un ciclo infinito si:",
    description: "",
    options: [
      "La condición nunca se vuelve falsa",
      "Se usa break",
      "Se coloca un print",
      "Se ejecuta una sola vez",
    ],
    answer: "La condición nunca se vuelve falsa",
  },
  {
    question: "¿Qué resultado imprime este código?",
    description: (
      <div className="console-container">
        <div className="console-box">
          <SyntaxHighlighter language="python" style={monokai}>
            {`x = 3
y = 4
print(x > 2 and y < 5)`}
          </SyntaxHighlighter>
        </div>
      </div>
    ),
    options: [
      "True",
      "False",
      "3",
      "Error",
    ],
    answer: "True",
  },
  {
    question: "En el ciclo for i in range(1,10,3), los valores de i son:",
    description: "",
    options: [
      "1 2 3 4 5",
      "1 3 5 7 9",
      "1 4 7 10",
      "1 4 7",
    ],
    answer: "1 4 7",
  },
  {
    question: "¿Cuál es el propósito del else en una estructura condicional?",
    description: "",
    options: [
      "Se ejecuta si todas las condiciones anteriores fallan",
      "Se usa solo en ciclos",
      "Es un tipo de bucle",
      "Es obligatorio siempre",
    ],
    answer: "Se ejecuta si todas las condiciones anteriores fallan",
  },
];

interface ExamProps {}
interface PageWithEditorsProps {}

interface SubmitExamParams {
  email: string;
  module: string;
  grade: number;
}

interface ResponsePayload {
  question_id: number;
  answer: string;
}

interface SubmitResponsesParams {
  email: string;
  responses: ResponsePayload[];
}

const submitExam = async ({ email, module, grade }: SubmitExamParams) => {
  try {
    const response = await axios.post("http://localhost:8002/grades/grades/", {
      email: email,
      module: module,
      grade: grade,
      date_assigned: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error("Error enviando examen:", error);
    throw error;
  }
};

const submitResponses = async ({ email, responses }: SubmitResponsesParams) => {
  try {
    const payload = {
      email: email,
      responses: responses.map(r => ({
        question_id: r.question_id,  
        answer: r.answer             
      }))
    };
    const res = await axios.post("http://localhost:8002/responses/responses/", payload);
    return res.data;
  } catch (err) {
    console.error("Error enviando respuestas:", err);
    throw err;
  }
};

const Assessment2: React.FC<ExamProps & PageWithEditorsProps> = () => {
  useEffect(() => {
    // Al montar el componente, llevar el scroll a la parte superior
    window.scrollTo(0, 0);
  }, []); // Este efecto solo se ejecutará una vez al montar el componente

  const [answers, setAnswers] = useState<string[]>(new Array(10).fill(""));
  const [score, setScore] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();



  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    let correctAnswers = 0;
    if (!user?.Correo_electronico) {
      console.error("Usuario no autenticado");
      navigate("/login"); // Redirigir al login si no está autenticado
      return;
    }

    const studentGrade = questions.map((question, index) => ({
      module: 'Assessment2',  // Nombre fijo para el módulo
      grade: answers[index] === question.answer ? 1 : 0,  // Calificación 1 si la respuesta es correcta, sino 0
      date_assigned: new Date().toISOString(),
    }));

    // Calculamos las respuestas correctas y la calificación (multiplicada por 5)
    const grade = studentGrade.reduce((acc, answer) => acc + answer.grade, 0) * 5;

    const studentResponses = questions.map((q, idx) => ({
      question_id: idx + 1,       // debe ser number
      answer: answers[idx]        // property `answer` (no `response`)
    }));

    try {
      // Enviar la calificación final a través del API
      const result = await submitExam({ email: user?.Correo_electronico, module: "Assessment2", grade });
      console.log("Examen enviado:", result);

      const result2 = await submitResponses({email: user?.Correo_electronico, responses:studentResponses});
      console.log("Examen enviado:", result2);

    } catch (error) {
      console.error("Error enviando el examen:", error);
    }

    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);

    // Set modal message based on score
    if (correctAnswers <= 3) {
      setModalMessage("Por favor revisa los contenidos del módulo y repite el examen.");
    } else if (correctAnswers >= 4 && correctAnswers <= 7) {
      setModalMessage("Sigue esforzándote, vas muy bien.");
    } else if (correctAnswers >= 8) {
      setModalMessage("¡Felicidades, aprobaste el módulo 2!");
    }

    setShowModal(true); // Show the modal after submitting
  };

  const handleModalClose = () => {
    if (score! <= 8) {
      // Clear answers if score is between 3 and 8
      setAnswers(new Array(10).fill(""));
    } else if (score! >= 8) {
      // Navigate to the next module if score is more than 8
      navigate("/courses"); // Change this path to the appropriate next module page
    }
    setShowModal(false);
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
                Control de flujo
              </Link>
              <span className="text-[#8e99cc] text-base font-medium leading-normal">/</span>
              <span className="text-white text-base font-medium leading-normal">
                Examen Módulo 2
              </span>
            </div>
            <h1 className="text-white tracking-light text-[35px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Examen del módulo
            </h1>
            <form>
              {questions.map((question, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-white text-lg font-bold tracking-[-0.015em] px-4 pb-2 pt-4">
                    {index + 1}. {question.question}
                  </h3>
                  {/* Mostrar la descripción si existe */}
                  {question.description && (
                    <div className="px-4">{question.description}</div>
                  )}
                  <div className="px-4">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="mb-2">
                        <label>
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={answers[index] === option}
                            onChange={(e) => handleOptionChange(e, index)}
                            className="mr-2"
                          />
                          {String.fromCharCode(97 + optionIndex)}. {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </form>
            <div className="mt-8 flex justify-between">
              <Button
                size="md"
                variant="primary"
                className="px-6 py-3 text-base font-bold leading-normal"
                onClick={handleSubmit}
              >
                Subir
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg text-center w-80">
            <h2 className="text-2xl font-bold text-black mb-4">
              Resultado del Examen
            </h2>
            {score !== null && (
              <div className="mt-8 text-center">
                <h3 className="text-black text-lg font-bold tracking-[-0.015em]">
                  Tu calificación es: {score} de {questions.length}
                </h3>
              </div>
            )}
            <p className="text-lg text-black mb-4">{modalMessage}</p>
            <Button
              size="md"
              variant="primary"
              className="px-6 py-3 text-base font-bold leading-normal"
              onClick={handleModalClose}
            >
              {score! >= 8 ? "Vamos al siguiente módulo" : "Cerrar"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessment2; 