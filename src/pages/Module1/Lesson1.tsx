
import React, { useState } from 'react';
import { theme } from "../../theme";
import Button from "../../components/Button"; // Asegúrate de tener el componente Button
import program from "../../assets/images/programacion.png";

import { useNavigate } from 'react-router-dom';
import '../../App.css'; 
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';  // Importa el resaltado de sintaxis
import { monokai} from 'react-syntax-highlighter/dist/esm/styles/hljs';


const Lesson1 = () => {
   const navigate = useNavigate();

   const handleButtonClick = () => {
        navigate('/introduction'); 
    };

   const handleButtonClick1 = () => {
        navigate('/lesson2')
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
            <div className="flex flex-col gap-8 text-center">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Lección 1
                </h1>
                <h3 className="text-white text-2xl font-black leading-tight tracking-[-0.033em] text-left">
                    ¿Qué es programar?
                </h3>
                <h2 className="text-white text-lg font-normal leading-normal text-justify">
                  La programación hace referencia a la actividad de escribir un conjunto de instrucciones (un programa) para que el computador las pueda ejecutar. Por ejemplo, el siguiente es un ejemplo del que suele ser el primer programa que la mayoría de los programadores escribe.
                </h2>
              </div>

              <div className="console-container">
                <div className="console-box">
                    <SyntaxHighlighter language="python" style={monokai}>
{`print("¡Hola, mundo!")
`}
                    </SyntaxHighlighter>
                </div>
              </div>
              

            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${program})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginTop: "20px", // Separación entre imagen y título
              }}
            >
            </div>
            <h2 className="text-white text-lg font-normal leading-normal text-justify mb-6 mt-6">
                Programar no es en sí misma una actividad difícil, pero sí es una actividad compleja que involucra varios elementos y habilidades complementarias. La habilidad más importante para un programador es la capacidad para resolver problemas, que a su vez es la combinación de otras habilidades como la comprensión de lectura, la abstracción, la descomposición, el razonamiento abstracto y creatividad. Otro componente importante en el mundo de la programación es el pensamiento algorítmico, este hace referencia a una forma de aproximarse a la resolución de problemas. El término algoritmo hace referencia a las instrucciones para resolver un determinado problema. Un ejemplo que puede ayudarnos a llevar este concepto a la vida cotidiana son las instrucciones que se encuentran en él un envase de shampoo, o las instrucciones para hacer una receta. Sabiendo esto podemos decir que el pensamiento algorítmico hace referencia a la habilidad para describir cómo se debe llegar a la solución de un problema en términos de una serie de instrucciones que alguien más pueda repetir.
            </h2>

            <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
              ¿Qué es Python?
            </h2>
            <h2 className="text-white text-lg font-normal leading-normal text-justify mb-6 mt-6">
                Python es un lenguaje de programación fácil de aprender, con una sintaxis muy sencilla que se asemeja bastante al pseudocódigo. En otras palabras, con este lenguaje podemos escribir poco código que hace muchas cosas. El uso de este lenguaje no está ligado a un sector concreto, por lo que podemos sumergirnos en muchos campos gracias a la ayuda de Python. 

            </h2>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Características
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-1 gap-3 rounded-lg border border-[#2f396a] bg-[#181d35] p-4 flex-col">
                <div className="text-white">
                  {/* Icon here */}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Es un lenguaje interpretado
                  </h2>
                  <p className="text-[#8e99cc] text-sm font-normal leading-normal text-justify">
                    Lo que quiere decir que el código fuente se ejecuta directamente, línea por línea, por un intérprete sin necesidad de ser compilado previamente a código de máquina.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#2f396a] bg-[#181d35] p-4 flex-col">
                <div className="text-white">
                  {/* Icon here */}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Usa tipado dinámico
                  </h2>
                  <p className="text-[#8e99cc] text-sm font-normal leading-normal text-justify">
                    Lo que significa que una variable puede tomar valores de distinto tipo.
                  </p>
                </div>
                
              </div>
              

              <div className="flex flex-1 gap-3 rounded-lg border border-[#2f396a] bg-[#181d35] p-4 flex-col">
                <div className="text-white">
                  {/* Icon here */}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Es fuertemente tipado
                  </h2>
                  <p className="text-[#8e99cc] text-sm font-normal leading-normal text-justify">
                    Lo que significa que el tipo no cambia de manera repentina. Para que se produzca un cambio de tipo tiene que haber una conversión explícita.
                  </p>
                </div>
                
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#2f396a] bg-[#181d35] p-4 flex-col">
                <div className="text-white">
                  {/* Icon here */}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Es multiplataforma
                  </h2>
                  <p className="text-[#8e99cc] text-sm font-normal leading-normal text-justify">
                    Ya que un código escrito en macOS también funciona en Windows o Linux y viceversa.  Es importante aclarar que los anteriormente nombrados son diferentes sistemas operativos.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Usos de Python
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-1 gap-3 rounded-lg border border-[#2f396a] bg-[#181d35] p-4 flex-col">
                <div className="text-white">
                  {/* Icon here */}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Desarrollo web
                  </h2>
                  <p className="text-[#8e99cc] text-sm font-normal leading-normal text-justify">
                    Existen framework como Django, Pyramid, Flask o Bottle que permiten desarrollar páginas web
                  </p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#2f396a] bg-[#181d35] p-4 flex-col">
                <div className="text-white">
                  {/* Icon here */}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Ciencia y Educación
                  </h2>
                  <p className="text-[#8e99cc] text-sm font-normal leading-normal text-justify">
                    Debido a su sintaxis tan sencilla, es una herramienta perfecta para enseñar conceptos de programación a todos los niveles.
                  </p>
                </div>
                
              </div>

              <div className="flex flex-1 gap-3 rounded-lg border border-[#2f396a] bg-[#181d35] p-4 flex-col">
                <div className="text-white">
                  {/* Icon here */}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Machine Learning
                  </h2>
                  <p className="text-[#8e99cc] text-sm font-normal leading-normal text-justify">
                     En los últimos años ha crecido el número de implementaciones en Python de herramientas que permiten el aprendizaje automático.
                  </p>
                </div>
                
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#2f396a] bg-[#181d35] p-4 flex-col">
                <div className="text-white">
                  {/* Icon here */}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Visualización de datos
                  </h2>
                  <p className="text-[#8e99cc] text-sm font-normal leading-normal text-justify">
                    Python cuenta con una gran variedad de herramientas que permiten mostrar datos en gráficas y hacer distintos tipos de análisis.
                  </p>
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

export default Lesson1;
