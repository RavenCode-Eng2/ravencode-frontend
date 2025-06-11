import React from "react";
import { theme } from "../../theme";
import Button from "../../components/Button"; 
import colab1 from "../../assets/images/colab1.png";
import colab2 from "../../assets/images/colab2.png";
import VS1 from "../../assets/images/VS1.png";
import VS2 from "../../assets/images/VS2.png";
import VS3 from "../../assets/images/VS3.png";
import VS4 from "../../assets/images/VS4.png";
import VS5 from "../../assets/images/VS5.png";
import VS6 from "../../assets/images/VS6.png";
import VS7 from "../../assets/images/VS7.png";
import VS8 from "../../assets/images/VS8.png";
import { Link, useNavigate } from 'react-router-dom';


const Lesson2 = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
        navigate('/lesson1'); 
    };

   const handleButtonClick1 = () => {
        navigate('/lesson3')
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
                ¿Cómo descargar e instalar python?
              </span>
            </div>
             <div className="flex flex-col gap-8 text-center mt-16">
                <h1 className="text-white tracking-light text-[35px] font-bold leading-tight text-left pb-3 pt-5">
              Lección 2: ¿Cómo descargar e instalar python?
               </h1>
                <h3 className="text-white text-2xl font-black leading-tight tracking-[-0.033em] text-left">
                    ¿Cómo descargar e instalar python?
                </h3>
                <h2 className="text-white text-lg font-normal leading-normal text-justify">
                  Para comenzar a programar en Python, puedes elegir entre diferentes opciones que se adaptan a tus necesidades. Puedes instalar un editor de código en tu computador, como Visual Studio Code, o trabajar directamente desde tu navegador con herramientas como Google Colab, que no requieren instalación. Además, este curso te brindará un editor de código integrado en la plataforma, diseñado especialmente para que puedas escribir y ejecutar tus programas de forma sencilla y segura, sin complicaciones técnicas.
                </h2>
              </div>
              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Google Colab
              </h2>
              <h2 className="text-white text-[18px] leading-tight px-5 pb-3 pt-5">
                    Google Colab es una página web que te permite escribir y ejecutar código directamente desde tu navegador sin instalar nada.
              </h2>
              <h2 className="text-white text-[18px] font-bold leading-tight tracking-[-0.015em] px-6 pb-3 pt-5">
              Ventajas 
              </h2>
              <ul className="list-disc pl-8 text-white text-[18px] font-normal leading-normal mb-4">
                <li >Puedes guardar tus archivos en Google Drive.</li>
                <li>Funciona desde cualquier dispositivo con internet.</li>
              </ul>
              <h2 className="text-white text-[18px] font-bold leading-tight tracking-[-0.015em] px-6 pb-3 pt-5">
               Pasos para usarlo 
              </h2>
              <ol className="list-decimal pl-8 text-white text-[18px] font-normal leading-normal px-7 mb-4">
                <li >Ve a https://colab.research.google.com</li>
                <li>Inicia sesión con tu cuenta de Google.</li>
                <li>Haz clic en "Archivo  →  Nuevo cuaderno".</li>
                <li>Escribe tu primer programa, en la casilla de código:</li>
              </ol>
            <div
              className="flex min-h-[50px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${colab1})`,
                backgroundSize: "cover", // Asegura que la imagen se cubra completamente
                backgroundPosition: "center", // Centra la imagen dentro del contenedor
                marginTop: "20px", // Ajusta la posición de la imagen
              }}
            >
            </div>
            <h2 className="text-white text-[18px] leading-tight tracking-[-0.015em] px-6 pb-3 pt-5">
               Luego de escribir tú código debe verse algo así:
            </h2>
            <div
              className="flex min-h-[50px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${colab2})`,
                backgroundSize: "cover", // Asegura que la imagen se cubra completamente
                backgroundPosition: "center", // Centra la imagen dentro del contenedor
                marginTop: "20px", // Ajusta la posición de la imagen
              }}
            >
            </div>

            <h2 className="text-white text-[18px] leading-tight tracking-[-0.015em] px-6 pb-3 pt-5">
               Y para ejecutarlo sólo debes dar click en el botón ▶️
            </h2>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Visual Studio Code
            </h2>
            <h2 className="text-white text-[18px] leading-tight px-5 pb-3 pt-5">
                    Visual Studio Code es un editor de código muy poderoso para estudiantes y profesionales que desean escribir programas en varios lenguajes, incluyendo Python.
            </h2>
            <h2 className="text-white text-[18px] font-bold leading-tight tracking-[-0.015em] px-6 pb-3 pt-5">
               Pasos para usarlo 
              </h2>
              <ol className="list-decimal pl-8 text-white text-[18px] font-normal leading-normal px-7 mb-4">
                <li >Descarga e instala VS Code desde https://code.visualstudio.com/download</li>
                 <div
                 className="flex min-h-[560px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 mb-4"
                 style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${VS1})`,
                    backgroundSize: "cover", // Asegura que la imagen se cubra completamente
                    backgroundPosition: "center", // Centra la imagen dentro del contenedor
                    marginTop: "20px", // Ajusta la posición de la imagen
                 }}
                >
                </div>
                <h2 className="text-white text-[18px] leading-tight tracking-[-0.015em] pb-3 pt-5">
                    Acá debes escoger la versión que más se ajuste a tu dispositivo.
               </h2>
               <ul className="list-disc pl-8 text-white text-[18px] font-normal leading-normal px-7 mb-4">


                
                <li> Una vez descargado el archivo, ábrelo para comenzar la instalación</li> 
                <li>Deja seleccionadas las opciones por defecto.</li> 
                <li>Marca la opción que dice “Add to PATH (recomendada)”</li> 
                <li>Acepta los términos y condiciones.”</li> 
                <li>Haz clic en “Install” y espera a que termine.”</li> 
                <li>Abre VS Code desde el menú de inicio o el escritorio.”</li> 
               </ul>
                <li>Instalar Python.</li>
                <ol className="list-disc pl-8 text-white text-[18px] font-normal leading-normal px-7 mb-4">
                <li>Ve a: https://www.python.org/downloads/</li> 
                <div
                 className="flex min-h-[360px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 mb-4"
                 style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${VS2})`,
                    backgroundSize: "cover", // Asegura que la imagen se cubra completamente
                    backgroundPosition: "center", // Centra la imagen dentro del contenedor
                    marginTop: "20px", // Ajusta la posición de la imagen
                 }}
                >
                </div>
                <li>Descarga la versión más reciente.</li> 
                <li>Abre el instalador y activa la casilla “Add Python to PATH”.</li> 
                <li>Haz clic en “Install Now”.</li> 
               </ol>
                <li>Instalar la extensión de Python en VS Code</li>
                <ol className="list-disc pl-8 text-white text-[18px] font-normal leading-normal px-7 mb-4">
                <li>Abre VS Code.</li> 
                <li>Ve a la barra lateral izquierda y haz clic en el ícono de Extensiones.</li> 
                <div
                 className="flex min-h-[790px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 mb-4"
                 style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${VS3})`,
                    backgroundSize: "cover", // Asegura que la imagen se cubra completamente
                    backgroundPosition: "center", // Centra la imagen dentro del contenedor
                    marginTop: "20px", // Ajusta la posición de la imagen
                 }}
                >
                </div>
                <li>En el buscador escribe: Python, y descarga la opción que te mostramos en la imagen.</li> 
                <div
                 className="flex min-h-[790px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 mb-4"
                 style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${VS4})`,
                    backgroundSize: "cover", // Asegura que la imagen se cubra completamente
                    backgroundPosition: "center", // Centra la imagen dentro del contenedor
                    marginTop: "20px", // Ajusta la posición de la imagen
                 }}
                >
                </div>
                <h2 className="text-white text-[18px] leading-tight tracking-[-0.015em] pb-3 pt-5">
                    Esto le va a permitir a Visual Studio Code que reconozca y entienda los programas escritos en Python.
               </h2>
               </ol>
                <li>Crear tu primer archivo en Python</li>
                <ol className="list-disc pl-8 text-white text-[18px] font-normal leading-normal px-7 mb-4">
                <li>Ve a Files → New File</li> 
                <div
                 className="flex min-h-[490px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 mb-4"
                 style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${VS5})`,
                    backgroundSize: "cover", // Asegura que la imagen se cubra completamente
                    backgroundPosition: "center", // Centra la imagen dentro del contenedor
                    marginTop: "20px", // Ajusta la posición de la imagen
                 }}
                ></div>
                <h2 className="text-white text-[18px] leading-tight tracking-[-0.015em] pb-3 pt-5">
                    Y luego escoge el tipo de archivo, en este caso python.
               </h2>
               <div
                 className="flex min-h-[290px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 mb-4"
                 style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${VS6})`,
                    backgroundSize: "cover", // Asegura que la imagen se cubra completamente
                    backgroundPosition: "center", // Centra la imagen dentro del contenedor
                    marginTop: "20px", // Ajusta la posición de la imagen
                 }}
                ></div>
                <li>Escribe tu código, por ejemplo:</li> 
                <div
                 className="flex min-h-[150px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 mb-4"
                 style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${VS7})`,
                    backgroundSize: "cover", // Asegura que la imagen se cubra completamente
                    backgroundPosition: "center", // Centra la imagen dentro del contenedor
                    marginTop: "20px", // Ajusta la posición de la imagen
                 }}
                >
                </div>
                <li>Guarda el archivo como: mi_primer_print.py</li> 
                <div
                 className="flex min-h-[990px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 mb-4"
                 style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${VS8})`,
                    backgroundSize: "cover", // Asegura que la imagen se cubra completamente
                    backgroundPosition: "center", // Centra la imagen dentro del contenedor
                    marginTop: "20px", // Ajusta la posición de la imagen
                 }}
                >
                </div>
                <h2 className="text-white text-[18px] leading-tight tracking-[-0.015em] pb-3 pt-5">
                    Es importante que el archivo termine en .py, ya que esto indica que el archivo corresponde a un archivo Python.
               </h2>
               </ol>
                <li>Ejecuta tu programa</li>
                <div
                 className="flex min-h-[590px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 mb-4"
                 style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${VS5})`,
                    backgroundSize: "cover", // Asegura que la imagen se cubra completamente
                    backgroundPosition: "center", // Centra la imagen dentro del contenedor
                    marginTop: "20px", // Ajusta la posición de la imagen
                 }}
                >
                </div>
              </ol>



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
