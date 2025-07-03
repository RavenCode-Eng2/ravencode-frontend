import React from "react";
import { theme } from "../../theme";
import Button from "../../components/Button"; 
import introduction_module2 from "../../assets/images/introduction_module2.png";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const Introduction = () => {
  useEffect(() => {
    // Al montar el componente, llevar el scroll a la parte superior
    window.scrollTo(0, 0);
  }, []); // Este efecto solo se ejecutará una vez al montar el componente

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/lesson1-module2");
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
                Control de flujo
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
                Módulo 2: Control de flujo
              </h1>
              <h2 className="text-white text-lg font-normal leading-normal text-justify">
                ¡Bienvenido/a al segundo módulo del curso! Ahora que ya conoces los fundamentos de Python, 
                estás listo para aprender a tomar decisiones y repetir acciones dentro de tus programas. 
                Estas habilidades permitirán que tus programas reaccionen a diferentes situaciones, 
                se adapten y sean mucho más útiles.
              </h2>
              <h3 className="text-white text-lg font-normal leading-normal text-justify">
                Aprenderás a usar estructuras como condicionales y bucles para que tu código pueda 
                responder a entradas del usuario, repetir tareas, y actuar de forma inteligente.
              </h3>
            </div>


            <h2 className="text-white text-[25px] font-bold leading-tight tracking-[-0.015em] px-3 pb-3 pt-5">
              Objetivos
            </h2>
            <p className="text-white text-lg font-normal leading-normal pb-3 pt-1 px-4">
              Al finalizar este módulo serás capaz de:
            </p>
            <ul className="list-disc pl-8 text-white text-lg font-normal leading-normal mb-4">
              <li>Crear programas que tomen decisiones usando estructuras condicionales (if, elif, else).</li>
              <li>Usar ciclos para repetir bloques de código con while y for.</li>
              <li>Aplicar operadores lógicos para hacer comparaciones más complejas.</li>
              <li>Combinar condicionales y bucles para resolver problemas más interesantes.</li>
            </ul>
            <p className="text-white text-lg font-normal leading-normal pb-3 pt-1 px-4 mb-4">
              Al finalizar, pondrás a prueba lo aprendido a través de un examen
              que te ayudará a reforzar tus conocimientos.
            </p>
            <p className="text-white text-lg font-normal leading-normal pb-3 pt-1 px-4 mb-4">
              ¡Comencemos tu camino en el control de flujo con Python!
            </p>
            <div className="flex w-full grow bg-[#101323] p-4">
              <div className="w-full gap-1 overflow-hidden bg-[#101323] aspect-[3/2] rounded-xl flex">
                <div
                  className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
                  style={{
                    backgroundImage: `url(${introduction_module2})`,
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
