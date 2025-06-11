import React, { useState } from "react";
import { theme } from "../../theme";
import Button from "../../components/Button"; // Asegúrate de que tienes el componente Button
import oper_aritm from "../../assets/images/oper_aritmet.png";
import oper_comp from "../../assets/images/oper_comp.png";
import oper_logic from "../../assets/images/oper_logicos.png";
import operacion from "../../assets/images/operacion.png";
import { Link, useNavigate } from 'react-router-dom'; 
import { useEffect } from "react";


import { Light as SyntaxHighlighter } from "react-syntax-highlighter"; // Importa el resaltado de sintaxis
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import EditorContainer from "../../components/CodeMirror/EditorContainer";

interface PageWithEditorsProps {}
const questions = [
  {
    question: "¿Qué es una variable en Python?",
    options: [
      "Un tipo de dato",
      "Un contenedor de datos",
      "Un operador",
      "Una función",
    ],
    answer: "Un contenedor de datos",
  },
  {
    question: "¿Cómo se asigna un valor a una variable en Python?",
    options: ["= valor", ": valor", "variable: valor", "variable = valor"],
    answer: "variable = valor",
  },
  {
    question: "¿Cuál es el resultado de 10 + 5 * 2?",
    options: ["30", "20", "40", "25"],
    answer: "20",
  },
  {
    question: "¿Qué tipo de dato se usa para almacenar textos en Python?",
    options: ["int", "str", "float", "bool"],
    answer: "str",
  },
  {
    question: "¿Cómo se define un número decimal en Python?",
    options: ["10", "10.0", "10,0", "None"],
    answer: "10.0",
  },
  {
    question:
      "Imagina que tienes el siguiente programa. ¿Cuál es la salida del programa al ejecutarlo",
    description: (
      <div className="console-container">
        <div className="console-box">
          <SyntaxHighlighter language="python" style={monokai}>
            {`a = 5 
 b = 2
 suma = a + b # 7 
 resta = a - b # 3 
 multiplicacion = a * b # 10 
 division = a / b # 2.5 
 entera = a // b # 2 
 modulo = a % b # 1 
 exponente = a ** b # 25`}
          </SyntaxHighlighter>
        </div>
      </div>
    ),
    options: [
      "El programa imprime: El resultado es 105",
      "El programa imprime: El resultado es 50",
      "El programa arroja un error porque la función print no se llama de manera correcta",
      "El programa arroja un error porque no es posible efectuar la operación propuesta entre a y b",
    ],
    answer:
      "El programa arroja un error porque no es posible efectuar la operación propuesta entre a y b",
  },
  {
    question: "¿Qué operador se utiliza para la división en Python?",
    options: ["/", "//", "%", "^"],
    answer: "/",
  },
  {
    question: "¿Cómo se convierte una cadena a un entero en Python?",
    options: ["int()", "str()", "float()", "bool()"],
    answer: "int()",
  },
  {
    question:
      "¿Cuál es el valor de la variable después de la operación x = '10' + 5?",
    options: ["'105'", "15", "'15'", "Error"],
    answer: "Error",
  },
  {
    question: "¿Cuál de los siguientes es un tipo de dato booleano en Python?",
    options: ["True", "1", "None", "All"],
    answer: "True",
  },
];

interface ExamProps {}

const Assesment1: React.FC<ExamProps> = () => {
  const [answers, setAnswers] = useState<string[]>(new Array(10).fill(""));
  const [score, setScore] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
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
      setModalMessage("¡Felicidades, aprobaste el módulo 1!");
    }

    setShowModal(true); // Show the modal after submitting
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
            <h1 className="text-white tracking-light text-[35px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Examen de Fundamentos de Python
            </h1>
            <form>
              {questions.map((question, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-white text-lg font-bold tracking-[-0.015em] px-4 pb-2 pt-4">
                    {question.question}
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
                          {option}
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
            {score !== null && (
              <div className="mt-8 text-center">
                <h3 className="text-white text-lg font-bold tracking-[-0.015em]">
                  Tu calificación es: {score} de {questions.length}
                </h3>
              </div>
            )}
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
            <p className="text-lg text-black mb-4">{modalMessage}</p>
            <Button
              size="md"
              variant="primary"
              className="px-6 py-3 text-base font-bold leading-normal"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assesment1;