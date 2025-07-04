import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { theme } from "../theme";
import python_logo from "../assets/images/python_logo.png";
import flujo_logo from "../assets/images/flujo_logo.png";
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import { useAuth } from "../context/AuthContext";
import { learningService } from "../services/learningService";

const courseData = [
  {
    title: "Módulo 1: Fundamentos de Python",
    description:
      "En este primer módulo aprenderás los fundamentos esenciales para comenzar a escribir tus propios programas.",
    image: python_logo,
    modules: [
      { title: "Introducción", description: "Bienvenida", route: "/introduction" },
      { title: "Lección 1", description: "¿Qué es programar? ¿Qué es python?", route: "/lesson1" },
      {
        title: "Lección 2",
        description: "Cómo descargar y usar python en tu computador",
        route: "/lesson2"
      },
      {
        title: "Lección 3",
        description: "Entrada del usuario, salidas del programa y comentarios",
        route: "/lesson3"
      },
      {
        title: "Lección 4",
        description: "Variables y tipos de datos (int, float, str, bool)",
        route: "/lesson4"
      },
      { title: "Lección 5", description: "Operaciones y expresiones", route: "/lesson5" },
    ],
  },
  {
    title: "Módulo 2: Control de flujo",
    description:
      "Dive into web development with JavaScript. Build interactive websites and learn about front-end frameworks.",
    image: flujo_logo,
    modules: [
      { title: "Introducción", description: "Condicionales: if, elif, else", route: "/introduction-module2"},
      { title: "Lección 1", description: "Condicionales: if, elif, else",route: "/lesson1-module2" },
      {
        title: "Lección 2",
        description: "Ciclo while",
        route: "/lesson2-module2"
      },
      {
        title: "Lección 3",
        description: "Ciclo for y range()",
        route: "/lesson3-module2"
      },
      {
        title: "Lección 4",
        description: "Combinación de condicionales + bucles + operadores lógicos",
        route: "/lesson4-module2"
      },
      {
        title: "Examen",
        description: "Prueba tus conocimientos",
        route: "/assessment2"
      },
    ],
  },

  {
    title: "Módulo 3: ",
    description:
      "Dive into web development with JavaScript. Build interactive websites and learn about front-end frameworks.",
    image: "https://path/to/image",
    modules: [
      {
        title: "HTML & CSS",
        description: "The building blocks of web development.",
      },
      {
        title: "JavaScript Basics",
        description: "Learn JavaScript fundamentals.",
      },
      {
        title: "Web Frameworks",
        description: "Explore popular JavaScript frameworks.",
      },
    ],
  },
  {
    title: "Módulo 4: ",
    description:
      "Dive into web development with JavaScript. Build interactive websites and learn about front-end frameworks.",
    image: "https://path/to/image",
    modules: [
      {
        title: "HTML & CSS",
        description: "The building blocks of web development.",
      },
      {
        title: "JavaScript Basics",
        description: "Learn JavaScript fundamentals.",
      },
      {
        title: "Web Frameworks",
        description: "Explore popular JavaScript frameworks.",
      },
    ],
  },
  // Agregar los demás módulos con sus lecciones aquí...
];

interface ModuleItem {
  title: string;
  description: string;
  route?: string;
}

const CourseCard: React.FC<{
  title: string;
  description: string;
  image: string;
  modules: ModuleItem[];
}> = ({ title, description, image, modules }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="p-4">
      <div className="flex items-stretch justify-between gap-4 rounded-xl bg-[rgb(40,48,57)] p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <div className="flex flex-[2_2_0px] flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-white text-base font-bold leading-tight">
              {title}
            </p>
            <p className="text-[#9caaba] text-sm font-normal leading-normal">
              {description}
            </p>
          </div>
          {/* Cambio dinámico de texto en el botón */}
          <Button
            size="sm"
            variant="primary"
            className="w-fit"
            onClick={togglePanel}
          >
            <span className="truncate">
              {isPanelOpen ? "Ocultar contenidos" : "Ver contenidos"}
            </span>
          </Button>
        </div>
        {/* Aseguramos que la imagen se mantenga igual */}
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: "contain", // Ajusta la imagen para que se muestre completa
            backgroundPosition: "center", // Centra la imagen dentro del contenedor
            backgroundRepeat: "no-repeat", // Evita que la imagen se repita
          }}
        />
      </div>
      {isPanelOpen && (
        <div className="p-4 mt-4 bg-[rgb(40,48,57)] rounded-xl">
          <p className="text-white text-lg font-semibold">Lecciones</p>
          <ul className="mt-3 space-y-3">
            {modules.map((module, index) => (
              <li
                key={index}
                className="bg-[#2c353f] p-3 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-white text-md font-bold">{module.title}</p>
                  <p className="text-[#9caaba] text-sm">{module.description}</p>
                </div>
                {module.route ? (
                  <Link to={module.route} className="mt-2 mr-8 w-fit">
                    <Button size="sm" variant="primary">
                      <span className="truncate">Ver lección</span>
                    </Button>
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


const Courses: React.FC = () => {
  const { user } = useAuth();
  const [module2Unlocked, setModule2Unlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkModule1Passed = async () => {
      if (!user) {
        setModule2Unlocked(false);
        setLoading(false);
        return;
      }
      try {
        const res = await learningService.getGrade(user.Correo_electronico, "Assessment1");
        console.log("Respuesta del backend:", res);
        console.log("Grade recibido:", res.data?.grade, res.grade);
        // Considera aprobado si grade >= 40
        setModule2Unlocked(res.grade >= 40);
      } catch (e) {
        setModule2Unlocked(false);
      }
      setLoading(false);
    };
    checkModule1Passed();
  }, [user]);

  if (loading) return <div className="text-white">Cargando...</div>;

  // Modifica el renderizado de los módulos
  return (
    <div
      className={`relative flex min-h-screen flex-col`}
      style={{
        background: theme.colors.background.main,
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
      }}
    >
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight">
                Módulos del curso
              </p>
              <p className="text-[#9caaba] text-sm font-normal leading-normal">
                Explore our curated list of programming courses designed for
                teens. Start your coding journey today!
              </p>
            </div>
          </div>
          {courseData.map((course, index) => {
            // Si es el módulo 2 y está bloqueado
            if (index === 1 && !module2Unlocked) {
              return (
                <div key={index} className="opacity-50 pointer-events-none select-none relative">
                  <CourseCard
                    title={course.title}
                    description={"Debes aprobar el examen del Módulo 1 para desbloquear este módulo."}
                    image={course.image}
                    modules={course.modules}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="mb-2 text-white drop-shadow-lg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 10V7a4 4 0 10-8 0v3M5 10h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                    </svg>
                    <span className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-lg font-bold">Módulo bloqueado</span>
                  </div>
                </div>
              );
            }
            return (
              <CourseCard
                key={index}
                title={course.title}
                description={course.description}
                image={course.image}
                modules={course.modules}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Courses;
