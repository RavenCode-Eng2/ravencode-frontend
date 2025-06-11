
import React , { useState } from 'react';
import { theme } from "../../theme";
import Button from "../../components/Button"; // Asegúrate de tener el componente Button

import { Link, useNavigate } from 'react-router-dom';
import '../../App.css'; 
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';  // Importa el resaltado de sintaxis
import { monokai} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import EditorContainer from "../../components/CodeMirror/EditorContainer";

interface PageWithEditorsProps {}


const Lesson3: React.FC<PageWithEditorsProps> = () => {
  // Estado para los códigos en los editores
    const [currentCode1, setCurrentCode1] =
      useState<string>(`
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
        navigate('/lesson2'); 
    };

   const handleButtonClick1 = () => {
        navigate('/lesson4')
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
              <span className="text-[#8e99cc] text-base font-medium leading-normal">
                /
              </span>
              <span className="text-white text-base font-medium leading-normal">
                Entrada del usuario, salidas del programa y comentarios 
              </span>
            </div>
            <div className="flex flex-col gap-8 text-center">
                <h1 className="text-white tracking-light text-[35px] font-bold leading-tight text-left pb-3 pt-5">
              Lección 3: Entrada del usuario, salidas del programa y comentarios 
               </h1>
                <h3 className="text-white text-2xl font-black leading-tight tracking-[-0.033em] text-left">
                    Entrada del usuario, salidas del programa y comentarios 
                </h3>
                <h2 className="text-white text-lg font-normal leading-normal text-justify">
                  La programación hace referencia a la actividad de escribir un conjunto de instrucciones (un programa) para que el computador las pueda ejecutar. Por ejemplo, el siguiente es un ejemplo del que suele ser el primer programa que la mayoría de los programadores escribe.
                </h2>
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-3  text-left">
                  ¿Qué es un print()?
                </h2>
                <h2 className="text-white text-[18px] leading-tight px-5 pb-3  text-justify">
                    print() es una función que muestra información en pantalla.
              </h2>
              </div>

              <div className="console-container px-5">
                <div className="console-box">
                    <SyntaxHighlighter language="python" style={monokai}>
{`print("¡Hola, mundo!")
`}
                    </SyntaxHighlighter>
                </div>
              </div>
              <h2 className="text-white text-[18px] leading-tight px-5 pb-3 pt-3  text-justify">
                    Puedes usarlo para mostrar el contenido de variables de diferentes tipos, resultados de operaciones o combinar ambos, estos conceptos los entenderás mejor con el contenido de las siguientes lecciones.
              </h2>
              <div className="console-container px-5">
                <div className="console-box">
                    <SyntaxHighlighter language="python" style={monokai}>
{`print("La suma de 3 y 5 es:", 3+5)
`}
                    </SyntaxHighlighter>
                </div>
              </div>

              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-3 pb-3 pt-3 text-left">
                  ¿Qué es un input()?
              </h2>

              <h2 className="text-white text-[18px] leading-tight px-5 pb-1 pt-3  text-justify">
                    input() es una función que permite al usuario recibir algo desde el teclado. Cuando se llama a esta función el programa se detiene para esperar una respuesta por parte del usuario.

              </h2>

              <div className="console-container px-5">
                <div className="console-box">
                    <SyntaxHighlighter language="python" style={monokai}>
{`nombre = input("¿Cómo te llamas?")

print("Hola", nombre)
`}
                    </SyntaxHighlighter>
                </div>
              </div>

              <h2 className="text-white text-[18px] leading-tight px-5 pb-3 pt-3  text-justify">
                    En el anterior ejemplo lo que estamos haciendo es mostrarle al usuario la pregunta “¿cómo te llamas?”, al ejecutarse está línea el código va a esperar por la respuesta del usuario, al recibirla almacenará esta información en la variable “nombre”. Luego con ayuda de la función print() podremos ver la información obtenida. 
              </h2>
              
              <h2 className="text-white text-[18px] leading-tight px-5 pb-3 pt-3  text-justify">
                    💡 Recuerda:
              </h2>

              <h2 className="text-white text-[18px] leading-tight px-6 pb-3 pt-3  text-justify">
                    La función input() siempre devuelve los datos que ingresa el usuario como texto (tipo str), incluso si escribes números. Por esta razón, si quieres trabajar con números en lugar de texto, es necesario convertir el tipo de dato.
              </h2>

              <h2 className="text-white text-[18px] leading-tight px-6 pb-3 pt-3  text-justify">
                    Puedes hacerlo de la siguiente manera:
              </h2>
              <div className="console-container px-5">
                <div className="console-box">
                    <SyntaxHighlighter language="python" style={monokai}>
{`nombre = int(input("¿Cuántos años tienes?"))
`}
                    </SyntaxHighlighter>
                </div>
              </div>

              <h2 className="text-white text-[18px] leading-tight px-6 pb-3 pt-3  text-justify">
                    En esta línea de código, estamos "casteando" el resultado de input() a un número entero (int). El proceso de convertir un tipo de dato a otro se llama casteo o conversión de tipos.
              </h2>
              <h2 className="text-white text-[18px] leading-tight px-6 pb-3 pt-3  text-justify">
                    No te preocupes si algunos términos como "casteo" o “variables” no son familiares en este momento; en las siguientes lecciones los explicaremos con más detalle.
              </h2>

              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-3 pb-3 pt-3 text-left">
                  Uso de comentarios
              </h2>

              <h2 className="text-white text-[18px] leading-tight px-5 pb-1 pt-3  text-justify">
                    Los comentarios sirven para explicar qué hace tu código, estos comentarios no afectan la ejecución de tu programa, ya que Python los ignora.
              </h2>
              <h2 className="text-white text-[18px] leading-tight px-5 pb-1 pt-3  text-justify">
                    En Python puede poner comentarios en una línea con ayuda del símbolo “#”:
              </h2>
              <div className="console-container px-5">
                <div className="console-box">
                    <SyntaxHighlighter language="python" style={monokai}>
{`# Este es un comentario en una línea
`}
                    </SyntaxHighlighter>
                </div>
              </div>

              <h2 className="text-white text-[18px] leading-tight px-5 pb-1 pt-3  text-justify">
                   Si necesitas escribir un comentario más largo que ocupe varias líneas, puedes utilizar comillas triples (""") al principio y al final del bloque de comentarios. De esta forma, todo lo que escribas dentro de esas comillas será ignorado por Python:
              </h2>

              <div className="console-container px-5">
                <div className="console-box">
                    <SyntaxHighlighter language="python" style={monokai}>
{`"""
Este es un comentario
que ocupa varias líneas
y no será ejecutado.
"""
`}
                    </SyntaxHighlighter>
                </div>
              </div>
              <h2 className="text-white text-[18px] leading-tight px-5 pb-1 pt-3  text-justify">
                   Ahora revisa este ejemplo en el que verás todo lo aprendido en está lección:
              </h2>

                            <div className="console-container px-5">
                <div className="console-box">
                    <SyntaxHighlighter language="python" style={monokai}>
{`
#Programa que saluda al usuario y calcula su edad futura
nombre = input("¿Cómo te llamas? ")  # Entrada del nombre
edad = int(input("¿Cuántos años tienes? "))  # Entrada de edad

# Mostrar mensaje personalizado
print("Hola", nombre)
print("En 10 años tendrás", edad + 10)

`}
                    </SyntaxHighlighter>
                </div>
              </div>

              <h2 className="text-white text-[18px] leading-tight px-5 pb-1 pt-3  text-justify">
                  En el anterior ejemplo estamos recibiendo el nombre de la persona, su edad (haciendo un “casteo”), y luego imprimimos algunos mensajes personalizados dependiendo de la información proporcionada por el usuario. Además, haciendo uso de los comentarios se explica el funcionamiento del programa.
              </h2>

               <h2 className="text-white text-[18px] font-bold leading-tight px-5 pb-1 pt-3  text-justify">
                   ¡Ahora te toca a ti!
              </h2>

               <h2 className="text-white text-[18px] leading-tight px-5 pb-1 pt-3  text-justify">
                   Crea un programa que pida al usuario su nombre y la cantidad de mascotas que tiene. Luego, el programa debe mostrar un mensaje que diga:  "[Nombre del usuario] tiene [número de mascotas] mascotas."
              </h2>

              <h2 className="text-white text-[18px] leading-tight px-5 pb-1 pt-3  text-justify">
                   Recuerda agregar comentarios en tu código para explicar qué hace cada parte. Esto te ayudará a entender mejor el funcionamiento del programa.
              </h2>


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

export default Lesson3;
