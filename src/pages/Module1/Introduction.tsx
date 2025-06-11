import React from "react";
import { theme } from "../../theme";
import Button from "../../components/Button"; 
import objetivos_image from "../../assets/images/objetivos.png";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const Introduction = () => {
  useEffect(() => {
    // Al montar el componente, llevar el scroll a la parte superior
    window.scrollTo(0, 0);
  }, []); // Este efecto solo se ejecutará una vez al montar el componente

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/lesson1");
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
                to="/courses"
              >
                Fundamentos de Python
              </Link>
              <span className="text-[#8e99cc] text-base font-medium leading-normal">
                /
              </span>
              <span className="text-white text-base font-medium leading-normal">
                Introducción
              </span>
            </div>
            <div className="flex flex-col gap-8 text-center mt-16">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                Bienvenido/a al mundo de la programación!
              </h1>
              <h2 className="text-white text-lg font-normal leading-normal text-justify">
                En este espacio encontrarás herramientas que te ayudarán a dar
                tus primeros pasos en el mundo de la programación. Nuestro
                objetivo no es solo que aprendas, sino que descubras lo
                fascinante y útil que puede ser programar. A lo largo del curso
                trabajaremos con dos lenguajes muy populares: Python y
                JavaScript. Comenzaremos con Python, un lenguaje ideal para
                principiantes por su claridad y simplicidad.
              </h2>
              <h3 className="text-white text-lg font-normal leading-normal text-justify">
                En este primer módulo aprenderás los fundamentos esenciales para
                comenzar a escribir tus propios programas.
              </h3>
            </div>
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlA0SxLbck7YlX137hccTw8grDDZBiTKzfoof08o0n64Y0dmrJzBT0vQZFB0s9unCeEGO-TmEHwuBtwfKk3McNhr_Xe-fMAw6mIrAWfdqXr8e78R7qMNmuLsalmuhljUHU_yJbUh_F4ca5Zze74oAkEFysSQOhs_JVAY-yfJp65clOMFw0_XXVVct2scBjkhd2Con75mr7V4mMpjY4__SUDnYYZzf3cNEhQweMofytJlNZvru-I5d37xDTKfcms9KHWS_UQHRE0syG")`,
                backgroundSize: "cover", // Asegura que la imagen se cubra completamente
                backgroundPosition: "center", // Centra la imagen dentro del contenedor
                marginTop: "20px", // Ajusta la posición de la imagen
              }}
            ></div>

            <h2 className="text-white text-[25px] font-bold leading-tight tracking-[-0.015em] px-3 pb-3 pt-5">
              Objetivos
            </h2>
            <p className="text-white text-lg font-normal leading-normal pb-3 pt-1 px-4">
              El objetivo de este módulo es que entiendas que es programar y que
              entiendas la sintaxis básica de Python. Para lograrlo, abordaremos
              los siguientes temas distribuidos en 5 lecciones:
            </p>
            <ul className="list-disc pl-8 text-white text-lg font-normal leading-normal mb-4">
              <li>¿Qué es programar? ¿Qué es Python?</li>
              <li>¿Cómo descargar e instalar python?</li>
              <li>Entrada del usuario, salidas del programa y comentarios.</li>
              <li>Variables y tipos de datos (int, float, str, bool)</li>
              <li>Operaciones y expresiones</li>
            </ul>
            <p className="text-white text-lg font-normal leading-normal pb-3 pt-1 px-4 mb-4">
              Al finalizar, pondrás a prueba lo aprendido a través de un examen
              que te ayudará a reforzar tus conocimientos.
            </p>
            <p className="text-white text-lg font-normal leading-normal pb-3 pt-1 px-4 mb-4">
              ¡Comencemos tu camino en el mundo de la programación con Python!
            </p>
            <div className="flex w-full grow bg-[#101323] p-4">
              <div className="w-full gap-1 overflow-hidden bg-[#101323] aspect-[3/2] rounded-xl flex">
                <div
                  className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
                  style={{
                    backgroundImage: `url(${objetivos_image})`,
                    backgroundSize: "cover", // Ajusta la imagen para que se muestre correctamente
                    backgroundPosition: "center", // Asegura que la imagen esté centrada
                    backgroundRepeat: "no-repeat", // Evita que la imagen se repita
                  }}
                />
              </div>
            </div>

            <div className="mt-8">
              <Button
                size="md"
                variant="primary"
                className="w-full px-6 py-3 text-base font-bold leading-normal"
                onClick={handleButtonClick}
              >
                Inicia tu aprendizaje
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
