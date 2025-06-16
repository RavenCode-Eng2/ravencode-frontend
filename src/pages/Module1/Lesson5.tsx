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

const Lesson5: React.FC<PageWithEditorsProps> = () => {

  useEffect(() => {
      // Al montar el componente, llevar el scroll a la parte superior
      window.scrollTo(0, 0);
    }, []); // Este efecto solo se ejecutará una vez al montar el componente
  
  // Estado para los códigos en los editores
  const [currentCode1, setCurrentCode1] = useState<string>(`
    `);
  const [currentCode2, setCurrentCode2] = useState<string>(
    'print("Hello, Second Editor!")'
  );

  // Estado para el lenguaje y tema
  const [currentLanguage, setCurrentLanguage] = useState<string>("python");
  const [currentTheme, setCurrentTheme] = useState<{
    value: string;
    label: string;
  }>({ value: "githubDark", label: "GitHub Dark" });

  // Tamaños para los editores y consolas
  const editorSize1 = { width: "950px", height: "100px" };
  const consoleSize1 = { width: "950px", height: "150px" };

  const editorSize2 = { width: "100px", height: "40px" };
  const consoleSize2 = { width: "100px", height: "15px" };


  const navigate = useNavigate();
  
     const handleButtonClick = () => {
          navigate('/lesson4'); 
      };
  
     const handleButtonClick1 = () => {
          navigate('/Assesment1')
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
                  Fundamentos de Python
                  </Link>        
              <span className="text-[#9ba1bf] text-base font-medium leading-normal">
                /
              </span>
              <span className="text-white text-base font-medium leading-normal">
                Operaciones y expresiones
              </span>
            </div>
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                Operaciones y expresiones
              </p>
            </div>
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Operaciones aritméticas
            </h3>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              En python podemos hacer todo tipo de operaciones, y así como en
              las matemáticas, necesitamos conocer ciertos símbolos que nos van
              a permitir efectuarlas.
            </p>
            <div
              className="flex min-h-[160px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center p-4 ml-6"
              style={{
                backgroundImage: `url(${oper_aritm})`, // Solo la imagen sin gradiente
                backgroundSize: "contain", // Asegura que toda la imagen sea visible
                backgroundPosition: "left", // La imagen se alinea a la izquierda
                height: "200px", // Mantén el tamaño deseado
                marginTop: "20px", // Separación entre imagen y título
                width: "100%", // Para que ocupe todo el ancho del contenedor
                borderRadius: "12px", // Redondea las esquinas de ambos lados
                overflow: "hidden", // Asegura que el contenido no se desborde por las esquinas redondeadas
              }}
            ></div>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <br />A continuación te mostramos cómo se pueden usar estas
              operaciones en el código para hallar nuevos valores. Como puedes
              ver, estamos almacenando los resultados de las operaciones en
              variables, tal como vimos en la lección anterior.
            </p>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
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
            </p>
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Prioridad de los operadores
            </h3>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              En una expresión aritmética, la jerarquía de los operadores sigue
              un orden similar al que usamos en matemáticas. Por ejemplo, los
              operadores *, /, //, %, ** tienen mayor prioridad que + y -.
              <br />
              Si los operadores están al mismo nivel de prioridad, se evalúan de
              izquierda a derecha.
              <br />
              Esto puede ser un poco confuso al principio, pero no te preocupes.
              Para controlar el orden de las operaciones, podemos usar
              paréntesis () para dar más prioridad a las operaciones que
              queramos.
            </p>
            <h3 className="text-white font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Ejemplo
            </h3>
            import EditorContainer from
            "../../components/CodeMirror/EditorContainer";
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`resultado = 3 + 4 * 2 # 11, porque * tiene mayor prioridad que +
 resultado_parentesis = (3 + 4) * 2 # 14, porque el paréntesis cambia el orden`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Operadores de asignación
            </h3>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Estos operadores son muy sencillos y útiles. Como su nombre
              indica, se usan para asignar de manera dinámica los resultados de
              una operación a una variable.
              <br />
              Estos operadores se forman anteponiendo el símbolo correspondiente
              de la operación aritmética que queremos realizar al símbolo de
              asignación “=”
            </p>
            <h3 className="text-white font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Ejemplo
            </h3>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`x = 5 
 x += 3 # x = x + 3 → 8 
 x *= 2 # x = x * 2 → 16`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Operadores de comparación
            </h3>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Los operadores de comparación se utilizan para comparar dos
              valores. Los resultados siempre son valores booleanos (True o
              False)
            </p>
            <div
              className="flex min-h-[160px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center p-4 ml-6"
              style={{
                backgroundImage: `url(${oper_comp})`, // Solo la imagen sin gradiente
                backgroundSize: "contain", // Asegura que toda la imagen sea visible
                backgroundPosition: "left", // La imagen se alinea a la izquierda
                height: "200px", // Mantén el tamaño deseado
                marginTop: "20px", // Separación entre imagen y título
                width: "100%", // Para que ocupe todo el ancho del contenedor
                borderRadius: "12px", // Redondea las esquinas de ambos lados
                overflow: "hidden", // Asegura que el contenido no se desborde por las esquinas redondeadas
              }}
            ></div>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <br />
              Como puedes ver, estos operadores nos permiten hacer todo tipo de
              comparaciones
            </p>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`a = 5   
 b = 3   
 resultado_igual = a == b # False    
 resultado_diferente = a != b # True 
 resultado_mayor = a > b # True`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Operadores lógicos
            </h3>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Los operadores lógicos permiten hacer comparaciones más complejas,
              combinando múltiples expresiones booleanas.
            </p>
            <div
              className="flex min-h-[160px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center p-4 ml-6"
              style={{
                backgroundImage: `url(${oper_logic})`, // Solo la imagen sin gradiente
                backgroundSize: "contain", // Asegura que toda la imagen sea visible
                backgroundPosition: "left", // La imagen se alinea a la izquierda
                height: "200px", // Mantén el tamaño deseado
                marginTop: "20px", // Separación entre imagen y título
                width: "100%", // Para que ocupe todo el ancho del contenedor
                borderRadius: "12px", // Redondea las esquinas de ambos lados
                overflow: "hidden", // Asegura que el contenido no se desborde por las esquinas redondeadas
              }}
            ></div>
            <h3 className="text-white font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Ejemplo
            </h3>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`a = True 
 b = False 
 resultado_and = a and b # False 
 resultado_or = a or b # True 
 resultado_not = not a # False`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
                Como puedes ver, el operador “and” solo devuelve True si tanto a
                como b son verdaderos, en cualquier otro caso, devuelve False
                <br />
                Por otro lado, el operador “or” devuelve True si al menos uno de
                los valores, a o b, es verdadero, Si ambos son falsos, entonces
                devuelve False. <br />
                Finalmente, el operador “not” devuelve lo contrario a la
                variable que tiene en frente. En este caso, como el valor de a
                es True, not a devuelve False
              </p>
            </p>
            <h3 className="text-white font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              !Ahora te toca a ti¡
            </h3>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              En tu editor de código, primero inicializa estas 3 variables
            </p>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`a = True  
 b = False 
 c = False `}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Realiza las siguientes operaciones, guarda su valor en distintas
              variables e imprime el resultado con print
            </p>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              - a and b and c <br />
              - c and not b <br />- a or not a
            </p>
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
            </div>{" "}
            <h3 className="text-white font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Ejercicio 2
            </h3>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Escribe en python la manera en la que representarías la siguiente
              operación aritmética y guarda el valor en una variable llamada
              resultado
            </p>
            <div
              className="flex min-h-[160px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center p-4 ml-6"
              style={{
                backgroundImage: `url(${operacion})`, // Solo la imagen sin gradiente
                backgroundSize: "contain", // Asegura que toda la imagen sea visible
                backgroundPosition: "left", // La imagen se alinea a la izquierda
                height: "80px", // Mantén el tamaño deseado
                marginTop: "20px", // Separación entre imagen y título
                width: "50%", // Para que ocupe todo el ancho del contenedor
                borderRadius: "12px", // Redondea las esquinas de ambos lados
                overflow: "hidden", // Asegura que el contenido no se desborde por las esquinas redondeadas
              }}
            ></div>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <br />
              ¿El resultado es menor a 140? usa un operador de comparación e
              imprime True o False.
            </p>
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
            </div>{" "}
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              💡 Tips:
              <br />
              - No hay que confundir el operador de comparación “==” con el
              operador de asignación “=”, estos no se pueden usar
              indistintamente, cada uno tiene una función diferente.
              <br />
              - Recuerda que las operaciones se ejecutan según la jerarquía de
              operadores. Usa paréntesis cuando quieras asegurar que ciertas
              operaciones se realicen primero.
              <br />
              - Cuidado con las operaciones de tipo float:
              <br />- Los números con decimales (float) pueden generar
              resultados imprecisos debido a la forma en que las computadoras
              representan estos números. Si necesitas precisión, considera
              redondear los resultados usando la función round().
            </p>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`resultado = 0.1 + 0.2 
 print(resultado) # Salida:0.30000000000000004 
 print(round(resultado, 2)) # Salida: 0.3`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>
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

export default Lesson5;
