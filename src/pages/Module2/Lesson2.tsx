import React, { useState } from 'react';
import { theme } from "../../theme";
import Button from "../../components/Button";
import oper_logicos from "../../assets/images/oper_logicos.png";

import { Link, useNavigate } from 'react-router-dom';
import '../../App.css'; 
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { monokai} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useEffect } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { python } from '@codemirror/lang-python';
import axios from 'axios';


const Lesson2 = () => {
  const [code, setCode] = useState(`# ¡Inténtalo!
# Haz un programa que pida un número positivo. Si se escribe un número negativo, vuelve a preguntar.

# Aquí va tu código con ciclo while
# Usa while para repetir hasta que se ingrese un número positivo

`);

  const [output, setOutput] = useState('Ejecuta tu código para ver el resultado aquí...');
  const [isRunning, setIsRunning] = useState(false);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
      // Al montar el componente, llevar el scroll a la parte superior
      window.scrollTo(0, 0);
    }, []); // Este efecto solo se ejecutará una vez al montar el componente
  
   const navigate = useNavigate();

   const handleButtonClick = () => {
        navigate('/lesson1-module2'); 
    };

   const handleButtonClick1 = () => {
        navigate('/lesson3-module2')
    };

   // Función para ejecutar el código con Judge0
   const handleRunCode = async () => {
     setIsRunning(true);
     setOutput('⏳ Ejecutando...');

     const encode = (str: string) => btoa(unescape(encodeURIComponent(str)));
     const decode = (str: string) => atob(str || '');

     const postSubmission = async (source_code: string) => {
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
           language_id: 71, // Python
           source_code: encode(source_code),
           stdin: encode(userInput)
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

     try {
       const token = await postSubmission(code);
       const res = await getOutput(token);
       let result = decode(res.stdout || '') || decode(res.stderr || '') || decode(res.compile_output || '');

       if (res.status.description.toLowerCase().includes('accepted')) {
         result = result.replace('Accepted', '').trim();
       }

       setOutput(result || 'Sin salida');
     } catch (err) {
       setOutput('❌ Error al ejecutar el código.');
     } finally {
       setIsRunning(false);
     }
   };



    return (

    <div
      className="relative flex min-h-screen flex-col"
      style={{
        background: theme.colors.background.main,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap gap-2 p-4">
              <Link
                className="text-[#8e99cc] text-base font-medium leading-normal"
                to= "/courses"
              >
                Control de flujo
              </Link>
              <span className="text-[#8e99cc] text-base font-medium leading-normal">
                /
              </span>
              <span className="text-white text-base font-medium leading-normal">
                Ciclo while
              </span>
            </div>
            <div className="flex flex-col gap-8 text-center">
                <h1 className="text-white tracking-light text-[35px] font-bold leading-tight text-left pb-3 pt-5">
              Lección 2: Ciclo while
               </h1>
                <h3 className="text-white text-2xl font-black leading-tight tracking-[-0.033em] text-left">
                    ¿Qué es el ciclo while?
                </h3>
                <h2 className="text-white text-lg font-normal leading-normal text-justify">
                  El ciclo while se usa cuando no sabemos cuántas veces repetiremos algo, pero sí sabemos la condición bajo la cual queremos repetirlo.
                </h2>
              </div>

              <div className="console-container">
                <div className="console-box">
                    <SyntaxHighlighter language="python" style={monokai}>
{`while condicion:
    # bloque de instrucciones`}
                    </SyntaxHighlighter>
                </div>
              </div>
              

            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${oper_logicos})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginTop: "20px", // Separación entre imagen y título
              }}
            >
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Términos clave
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-1 gap-3 rounded-lg border border-[#2f396a] bg-[#181d35] p-4 flex-col">
                <div className="text-white">
                  {/* Icon here */}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Iteración
                  </h2>
                  <p className="text-[#8e99cc] text-sm font-normal leading-normal text-justify">
                    Una repetición del ciclo.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#2f396a] bg-[#181d35] p-4 flex-col">
                <div className="text-white">
                  {/* Icon here */}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Condición de parada
                  </h2>
                  <p className="text-[#8e99cc] text-sm font-normal leading-normal text-justify">
                    Lo que hace que el ciclo termine. Debe volverse False eventualmente.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#2f396a] bg-[#181d35] p-4 flex-col">
                <div className="text-white">
                  {/* Icon here */}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Ciclo infinito
                  </h2>
                  <p className="text-[#8e99cc] text-sm font-normal leading-normal text-justify">
                    Cuando la condición nunca deja de cumplirse y el programa no se detiene.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Ejemplo práctico
            </h2>
            <div className="console-container">
                <div className="console-box">
                    <SyntaxHighlighter language="python" style={monokai}>
{`clave = "python123"
intento = ""

while intento != clave:
    intento = input("Escribe la contraseña: ")

print("¡Acceso concedido!")`}
                    </SyntaxHighlighter>
                </div>
              </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Actividad
            </h2>
            <div className="flex flex-1 gap-3 rounded-lg border border-[#2f396a] bg-[#181d35] p-4 flex-col">
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Ejercicio práctico
                  </h2>
                  <p className="text-[#8e99cc] text-sm font-normal leading-normal text-justify">
                    Haz un programa que pida un número positivo. Si se escribe un número negativo, vuelve a preguntar.
                  </p>
                </div>
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Editor de código
            </h2>
            <div className="console-container mb-6">
                <div className="console-box">
                    <CodeMirror
                        value={code}
                        height="200px"
                        theme={dracula}
                        extensions={[python()]}
                        onChange={(value) => setCode(value)}
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

            <div className="flex flex-col gap-4 mb-4">
                <div className="flex flex-col gap-2">
                    <label className="text-white text-sm font-medium">
                        Entrada del programa (stdin):
                    </label>
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ingresa aquí los datos que tu programa necesita (ej: -5, 3)"
                        className="w-full p-3 bg-[#2d2d2d] text-white border border-[#444] rounded-lg font-mono text-sm resize-none"
                        rows={3}
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

            <div className="console-container mb-6">
                <div className="console-box">
                    <div className="bg-[#1e1e1e] text-white p-4 rounded-t-lg border-b border-[#333]">
                        <h3 className="text-sm font-bold">Output:</h3>
                    </div>
                    <div className="bg-[#1e1e1e] text-white p-4 rounded-b-lg min-h-[100px] font-mono text-sm">
                        <pre className="whitespace-pre-wrap">{output}</pre>
                    </div>
                </div>
            </div>

        <div className="mt-2 flex justify-between">
            <div className="mt-2 text-left">
                <Button
                  size="md"
                  variant="primary"
                  className=" px-6 py-3 text-base font-bold leading-normal"
                  onClick={handleButtonClick}
                >
                  Anterior
                </Button>
            </div>

            <div className="mt-2 text-right">
                <Button
                  size="md"
                  variant="primary"
                  className=" px-6 py-3 text-base font-bold leading-normal"
                  onClick={handleButtonClick1}
                >
                  Siguiente
                </Button>
            </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson2;
