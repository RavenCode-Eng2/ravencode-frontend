import React, { useState } from "react";
import { theme } from "../../theme";
import Button from "../../components/Button"; // Asegúrate de tener el componente Button
import tipos_datos from "../../assets/images/tipos_datos.png";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"; // Importa el resaltado de sintaxis
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Link, useNavigate } from 'react-router-dom'; 
import EditorContainer from "../../components/CodeMirror/EditorContainer";

interface PageWithEditorsProps {}

const Lesson4: React.FC<PageWithEditorsProps> = () => {
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
        navigate('/lesson3'); 
    };

   const handleButtonClick1 = () => {
        navigate('/lesson1')
    };


  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#101323] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
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
                Variables y tipos de datos
              </span>
            </div>
            <h1 className="text-white tracking-light text-[35px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Lección 4: Variables y tipos de datos
            </h1>
            <h2 className="text-white tracking-light text-[25px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Variables
            </h2>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Puedes pensar en una variable como una caja con nombre que guarda
              un valor para poder usarlo más adelante. Sirve para guardar
              información como números, palabras o resultados, y ese valor puede
              cambiar durante el programa.
            </p>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Por ejemplo, si escribes:
            </p>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`edad = 17`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Estás creando una variable llamada edad que guarda el número 17.
              Más tarde puedes usar esa variable para mostrar la edad, comprarla
              o cambiarla.
            </p>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              En las siguientes líneas de código puedes observar un ejemplo en
              el que usamos dos variables y les definimos un valor, además
              usamos la función print que ya aprendimos anteriormente para
              mostrar los resultados:
            </p>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`edad = 20
carrera = “Arquitectura”
print(“Juan tiene”, edad, “años y es estudiante de”, carrera)`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>

            <h1 className="text-white tracking-light text-[18px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              ¡Ahora te toca a ti!
            </h1>
            <h3 className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Crea dos variables llamadas “nombre” y “edad” y asígnales como
              valores tu nombre y edad. Luego, usa la función print() para
              mostrar una presentación tuya en pantalla. Por ejemplo, deberías
              ver algo como “Me llamo Juan y tengo 20 años”
            </h3>
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

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              💡 Recuerda
            </p>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 ml-5 px-4">
              - Los textos van entre comillas: "así"
              <br />- Los números van sin comillas: 20
            </p>

            <h2 className="text-white tracking-light text-[25px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              ¿Cómo nombrar las variables?
            </h2>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Aunque técnicamente podemos nombrar nuestras variables como
              queramos, existen buenas prácticas que nos ayudan a escribir
              código más claro, fácil de entender y sin errores.
              <br />
              En Python usamos snake_case, que es una convención para los
              nombres de las variables. Esta nos dice que debemos usar solo
              letras minúsculas y separar las palabras con un guión bajo (_)
              <br />
              Además de esta convención, hay otras sencillas reglas que debemos
              seguir para nombrar a las variables:
            </p>
            <ol className="ml-8">
              <li>-Solo puedes usar letras, números y guión bajo (_)</li>
              <li>-Usa nombres descriptivos y no muy extensos</li>
              <li>-No pueden empezar con un número</li>
              <li>-No uses espacios, tildes ni símbolos especiales</li>
              <li>
                -No uses palabras reservadas de Python (como print, if, class,
                etc.)
              </li>
            </ol>

            <h2 className="text-white tracking-light text-[25px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Palabras reservadas
            </h2>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Una palabra reservada es una palabra que tiene un significado
              especial y predefinido de python, por lo cual no podemos usarla
              como un identificador de otra cosa.
              <br />
              Por ejemplo, print y type son palabras reservadas.
              <br />
              Más adelante en el curso aprenderemos más sobre las palabras
              reservadas y cuándo se usan
              <br />
              Si quieres, puedes ejecutar el siguiente código para ver en
              cualquier momento una lista de las palabras reservadas en la
              versión de python que estés usando
            </p>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`import keyword
print(keyword.kwlist)
`}
                  </SyntaxHighlighter>
                </div>
              </div>
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
            </div>

            <h1 className="text-white tracking-light text-[18px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Ejemplo
            </h1>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Digamos que queremos crear una variable para asignar un valor al
              curso de matemáticas de tu colegio. No sería adecuado algo como
            </p>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`mi_colegio_curso = “matemáticas”`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              En este caso, a pesar de quese sigue la convención snake_case, el
              nombre es demasiado largo y poco específico. Puede generar
              confusión sobre si realmente estamos hablando del nombre del curso
              o de algún otro atributo relacionado con el colegio. <br />
              Sería mejor algo como
            </p>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`curso_nombre = “matemáticas”`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              El nuevo nombre es más corto, más claro y más descriptivo. La
              variable se usa para almacenar el nombre del curso, por lo que
              curso_nombre describe con precisión su contenido.
            </p>

            <h1 className="text-white tracking-light text-[18px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Casteo
            </h1>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              En la lección anterior, vimos que el “casteo”, o conversión de
              tipos, es el proceso de convertir un valor de un tipo de dato a
              otro. En Python, esto es común cuando se desea realizar
              operaciones con datos de tipos diferentes, o cuando se necesita
              asegurarse de que los datos están en el formato adecuado para una
              operación o comparación.
              <br />
              Si bien a veces el casteo ocurre de manera implícita sin que nos
              demos cuenta, en ocasiones es necesario que lo hagamos de manera
              explícita usando las funciones para cada tipo de dato, como por
              ejemplo int(), float(), str() etc. A continuación veremos algunos
              ejemplos de cómo aplicar esta técnica:
            </p>

            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              int()
            </h3>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Convierte un valor a entero. Si la conversión no es posible,
              Python lanza un error.
            </p>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`x = "10"          		   # tipo str
y = 5.45         		   # tipo float
x_casteado = int(x)        # convierte a tipo int
y_casteado = int(y)	   # convierte a tipo int
print(x_casteado)          # 10
print(y_casteado )         # 5:  ahora es de tipo int
`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>

            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              float()
            </h3>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Convierte un valor a número decimal (float).
            </p>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`x = "3.14"        # tipo str
y = float(x)      # convierte a tipo float
print(y)          # 3.14
`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              String (str)
            </h3>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Convierte un valor a cadena de texto (string).
            </p>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`x = 123           # tipo int
y = str(x)        # convierte a tipo str
print(y)          # "123"
`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <br />
              💡 Ten en cuenta <br />
              - int() y los valores no numéricos: Si intentas convertir un
              string no numérico a entero, Python lanzará un error:
              <br />
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`x = "abc"
y = int(x)   # Esto lanzará un error: ValueError
`}
                  </SyntaxHighlighter>
                </div>
              </div>
              - Decimales con int(): Cuando conviertes un número decimal (float)
              a entero, Python eliminará la parte decimal sin redondear. Es
              decir, realiza un corte hacia abajo:
              <br />
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`x = 3.99
y = int(x)    # 3, no 4
print(y)      # 3
`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>

            <h2 className="text-white tracking-light text-[25px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Tipos de datos
            </h2>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              En programación, cada valor que asignemos a una variable tiene un
              tipo. Esto le dice a la computadora qué clase de información está
              guardando. A continuación te presentamos los tipos de datos más
              comunes que podemos encontrar en python
            </p>

            <div
              className="flex min-h-[160px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center p-4 ml-6"
              style={{
                backgroundImage: `url(${tipos_datos})`, // Solo la imagen sin gradiente
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
              Vamos a practicar con los primeros cuatro tipos de datos, los
              demás los veremos en su momento a medida que avances en el curso
              <br />
              Por ejemplo, si queremos crear un registro de un estudiante,
              podemos hacer uso de estos tipos de datos y asignarlos a las
              variables que necesitemos:
            </p>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <div className="console-container">
                <div className="console-box">
                  <SyntaxHighlighter language="python" style={monokai}>
                    {`nombre = "Sofía"          # str
edad = 17                 # int
promedio = 4.3            # float
aprobado = True           # bool

print("La variable nombre es de tipo :", type(nombre))
print("La variable edad es de tipo :", type(edad))
print("La variable promedio es de tipo :", type(promedio))
print("La variable aprobado es de tipo :", type(aprobado))
`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </p>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Como puedes ver, estamos usando una función nueva llamada type().
              <br />
              Esta función nos dice qué tipo de dato tiene una variable. Para
              usarla, colocamos el nombre de la variable entre paréntesis, como
              en type(nombre).
              <br /> A eso se le llama pasar un parámetro: es como enviarle un
              dato a la función para que lo analice. En este caso, le estamos
              enviando la variable nombre, y la función nos devuelve que es de
              tipo str.
            </p>

            <h1 className="text-white tracking-light text-[18px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              ¡Ahora te toca a ti!
            </h1>

            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Crea 4 variables para responder a las siguientes preguntas:
              <br />
              1. Película favorita Año de lanzamiento
              <br />
              2. Calificación obtenida en internet (puedes buscarla en IMDb)
              <br />
              3. ¿Ganó un oscar?
              <br />
              <br />
              Asígnale a cada variable un valor de un tipo distinto y luego,
              usando print, imprime el tipo de cada variable
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
            </div>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              <br />
              💡 Tips:
              <br />
              - Puedes usar type(mi_variable).__name__ si quieres mostrar solo
              el nombre del tipo, sin class '...'. <br />
              - Los valores de tipo str (texto) siempre van entre comillas.
              <br />
              - Los valores de tipo int (números enteros) no llevan comillas. Si
              escribes "18" entre comillas, Python lo toma como texto, no como
              número.
              <br />
              - Para los valores de tipo float (números con decimales), se debe
              usar el punto como separador decimal.
              <br />- Los valores de tipo bool (booleanos) deben escribirse con
              la primera letra en mayúscula: True o False
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

export default Lesson4;
