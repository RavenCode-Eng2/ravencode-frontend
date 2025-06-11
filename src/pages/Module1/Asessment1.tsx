import React, { useState } from "react";
import { theme } from "../../theme";
import Button from "../../components/Button"; // Asegúrate de que tienes el componente Button
import { Link, useNavigate } from 'react-router-dom'; 
import { useEffect } from "react";


import { Light as SyntaxHighlighter } from "react-syntax-highlighter"; // Importa el resaltado de sintaxis
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import EditorContainer from "../../components/CodeMirror/EditorContainer";

interface PageWithEditorsProps {}
const questions = [
  {
    question: "¿Cuál es la habilidad más importante de un programador?",
    description: "",
    options: [
      "Creatividad.",
      "Capacidad de razonamiento abstracto.",
      "Capacidad para resolver problemas.",
      "Saber construir algoritmos.",
    ],
    answer: "Capacidad para resolver problemas.",
  },
  {
    question: "¿Cuál de estás NO es una característica de Python?",
    description: "",
    options: ["Es un lenguaje compilado.", "Usa tipado dinamico.", "Es multiplataforma.", "Es un lenguaje fuertemente tipado."],
    answer: "Es un lenguaje compilado.",
  },
  {
    question: "Para usar Python siempre se debe descargar un editor de código ",
    description: "",
    options: ["Verdadero", "Falso"],
    answer: "Falso",
  },
  {
    question: "Al ejecutar la siguiente línea de código, ¿Qué resultados deberías recibir?:",
    description: (
      <div className="console-container">
        <div className="console-box">
          <SyntaxHighlighter language="python" style={monokai}>
            {`print(“Bienvenidos al curso de programación de RavenCode.”)`}
          </SyntaxHighlighter>
        </div>
      </div>
    ),
    options: ["Hola,mundo", "¿Cómo te llamas?", "La suma de los números es 28", "Bienvenidos al curso de programación de RavenCode"],
    answer: "Bienvenidos al curso de programación de RavenCode",
  },
  {
    question: "Si necesitas recibir un input por parte del usuario, en el que vas a recibir la cantidad de hermanos que tiene, ¿que línea de código deberías utilizar? :",
    options: ["numero_hermanos = input(“¿Cuántos hermanos tienes?”)", "numero_hermanos = # int(input(“¿Cuántos hermanos tienes?”))",
       "numero_hermanos = print(“¿Cuántos hermanos tienes?”)", "numero_hermanos = int(input(“¿Cuántos hermanos tienes?”))"],
    answer: "numero_hermanos = int(input(“¿Cuántos hermanos tienes?”))",
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
    question:
      "¿Cuál de las siguientes es la mejor opción para nombrar una variable que se va a encargar de almacenar el nombre de un profesor de cierto colegio?",
    options: [
      "profesor_del_colegio ",
      "prof_n",
      "profesor_nombre",
      "Nombre_Del_Profesor",
    ],
    answer: "profesor_nombre",
  },
  {
    question: "Imagina que tienes el siguiente programa:",
    options: [
      "1.81",
      "1",
      "2",
      "El programa muestra un error porque no podemos usar int() en un valor de tipo float",
    ],
    answer:
      "El programa muestra un error porque no podemos usar int() en un valor de tipo float",
  },

  {
    question: "Actividad especial para las preguntas 9 y 10",
    description: (
      <>
        <h2 className="text-white text-xl font-bold">Instrucciones:</h2>
        <ul className="text-white list-disc pl-6">
          <li>Pide al estudiante su nombre utilizando la función input().</li>
          <li>
            Define las notas de los exámenes de matemáticas como valores de tipo
            float:
          </li>
          <ul className="text-white list-inside">
            <li>Examen 1: 4.7</li>
            <li>Examen 2: 1.8</li>
            <li>Examen 3: 2.7</li>
            <li>Examen 4: 3.5</li>
          </ul>
          <li>
            Calcula el promedio de las 4 notas y guárdalo en una variable
            llamada <code>promedio</code>.
          </li>
          <li>
            Crea una variable llamada <code>estudiante_aprobado</code> y asigna
            un valor <code>True</code> si el promedio es mayor o igual a 3.0. Si
            el promedio es menor a 3.0, asigna <code>False</code>.
          </li>
          <li>Imprime el nombre del estudiante y su promedio.</li>
          <li>Imprime si el estudiante aprobó o no la asignatura.</li>
        </ul>
        <h2 className="text-white text-xl font-bold">
          <br />
          Ejemplo de salida esperada:
        </h2>
        <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
          <div className="console-container">
            ¿Nombre del estudiante? Juan El estudiante Juan tiene un promedio de
            4.4 en la asignatura de matemáticas ¿El estudiante aprobó la
            asignatura?: True
          </div>
        </p>
        <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
          Recuerda, los valores dados en la salida son sacados de un caso de
          ejemplo, pero tú debes usar las notas que te hemos dado para realizar
          el ejercicio.
        </p>

        <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
          ¿Cuál es el promedio obtenido por el estudiante?
        </p>
      </>
    ),
    options: ["2.99", "4.12", "3.175", "2.68"],
    answer: "3.175",
  },

  {
    question:
      "¿Cuál es la forma correcta para asignar el valor a la variable estudiante_aprovado?",
    options: [
      "estudiante_aprovado = promedio >= 3.0",
      "estudiante_aprovado = promedio == 3.0",
      " estudiante_aprovado = promedio < 3.0",
      "estudiante_aprovado = promedio  <= 3.0",
    ],
    answer: "estudiante_aprovado = promedio >= 3.0",
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
            <div className="flex flex-wrap gap-2 p-4">
              <Link
                className="text-[#8e99cc] text-base font-medium leading-normal"
                to="/courses"
              >
                Fundamentos de Python
              </Link>
              <span className="text-[#8e99cc] text-base font-medium leading-normal">/</span>
              <span className="text-white text-base font-medium leading-normal">
                Examen Módulo 1
              </span>
            </div>
            <h1 className="text-white tracking-light text-[35px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Examen Módulo 1
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