import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { theme } from "../theme";
import python_logo from "../assets/images/python_logo.png";
import flujo_logo from "../assets/images/flujo_logo.png";
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { learningService } from "../services/learningService";
import { getResponsiveContainer } from '../utils/responsive';

const courseData = [
  {
    id: "python",
    title: "Python",
    description: "Aprende programación con Python desde cero hasta conceptos avanzados",
    image: python_logo,
    modules: [
      {
        id: "python-module1",
        title: "Módulo 1: Fundamentos de Python",
        description: "En este primer módulo aprenderás los fundamentos esenciales para comenzar a escribir tus propios programas.",
        lessons: [
          { title: "Introducción", description: "Bienvenida", route: "/introduction" },
          { title: "Lección 1", description: "¿Qué es programar? ¿Qué es python?", route: "/lesson1" },
          { title: "Lección 2", description: "Cómo descargar y usar python en tu computador", route: "/lesson2" },
          { title: "Lección 3", description: "Entrada del usuario, salidas del programa y comentarios", route: "/lesson3" },
          { title: "Lección 4", description: "Variables y tipos de datos (int, float, str, bool)", route: "/lesson4" },
          { title: "Lección 5", description: "Operaciones y expresiones", route: "/lesson5" },
          { title: "Reto", description: "¡Reta tus conocimientos!", route: "/AssessmentJudge1" },
          { title: "Examen", description: "Prueba tus conocimientos", route: "/Assesment1" }
        ]
      },
      {
        id: "python-module2",
        title: "Módulo 2: Control de flujo",
        description: "Aprende sobre condicionales, bucles y control de flujo en Python",
        lessons: [
          { title: "Introducción", description: "Condicionales: if, elif, else", route: "/introduction-module2" },
          { title: "Lección 1", description: "Condicionales: if, elif, else", route: "/lesson1-module2" },
          { title: "Lección 2", description: "Ciclo while", route: "/lesson2-module2" },
          { title: "Lección 3", description: "Ciclo for y range()", route: "/lesson3-module2" },
          { title: "Lección 4", description: "Combinación de condicionales + bucles + operadores lógicos", route: "/lesson4-module2" },
          { title: "Reto", description: "¡Reta tus conocimientos!", route: "/AssessmentJudge2" },
          { title: "Examen", description: "Prueba tus conocimientos", route: "/assessment2" }
        ]
      }
    ]
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Domina JavaScript y el desarrollo web moderno",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    modules: [
      {
        id: "js-module1",
        title: "Módulo 1: Fundamentos de JavaScript",
        description: "Aprende los conceptos básicos de JavaScript y programación web",
        lessons: [
          { title: "Introducción", description: "¿Qué es JavaScript?", route: "/js-introduction" },
          { title: "Lección 1", description: "Variables y tipos de datos", route: "/js-lesson1" },
          { title: "Lección 2", description: "Funciones en JavaScript", route: "/js-lesson2" },
          { title: "Lección 3", description: "Objetos y arrays", route: "/js-lesson3" },
          { title: "Lección 4", description: "DOM y eventos", route: "/js-lesson4" },
          { title: "Proyecto", description: "Crea tu primera página interactiva", route: "/js-project1" },
          { title: "Examen", description: "Evaluación del módulo", route: "/js-assessment1" }
        ]
      },
      {
        id: "js-module2",
        title: "Módulo 2: JavaScript Avanzado",
        description: "Conceptos avanzados y frameworks modernos",
        lessons: [
          { title: "Introducción", description: "Programación asíncrona", route: "/js-advanced-intro" },
          { title: "Lección 1", description: "Promises y async/await", route: "/js-advanced-lesson1" },
          { title: "Lección 2", description: "APIs y fetch", route: "/js-advanced-lesson2" },
          { title: "Lección 3", description: "Introducción a React", route: "/js-advanced-lesson3" },
          { title: "Proyecto", description: "Aplicación web completa", route: "/js-advanced-project" },
          { title: "Examen", description: "Evaluación final", route: "/js-advanced-assessment" }
        ]
      }
    ]
  },
  {
    id: "java",
    title: "Java",
    description: "Aprende programación orientada a objetos con Java",
    image: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    modules: [
      {
        id: "java-module1",
        title: "Módulo 1: Introducción a Java",
        description: "Fundamentos de Java y programación orientada a objetos",
        lessons: [
          { title: "Introducción", description: "¿Qué es Java?", route: "/java-introduction" },
          { title: "Lección 1", description: "Sintaxis básica y variables", route: "/java-lesson1" },
          { title: "Lección 2", description: "Clases y objetos", route: "/java-lesson2" },
          { title: "Lección 3", description: "Herencia y polimorfismo", route: "/java-lesson3" },
          { title: "Lección 4", description: "Manejo de excepciones", route: "/java-lesson4" },
          { title: "Proyecto", description: "Sistema de gestión simple", route: "/java-project1" },
          { title: "Examen", description: "Evaluación del módulo", route: "/java-assessment1" }
        ]
      },
      {
        id: "java-module2",
        title: "Módulo 2: Java Avanzado",
        description: "Conceptos avanzados y desarrollo de aplicaciones",
        lessons: [
          { title: "Introducción", description: "Colecciones y generics", route: "/java-advanced-intro" },
          { title: "Lección 1", description: "Streams y programación funcional", route: "/java-advanced-lesson1" },
          { title: "Lección 2", description: "Multithreading", route: "/java-advanced-lesson2" },
          { title: "Lección 3", description: "Conexión a bases de datos", route: "/java-advanced-lesson3" },
          { title: "Proyecto", description: "Aplicación empresarial", route: "/java-advanced-project" },
          { title: "Examen", description: "Evaluación final", route: "/java-advanced-assessment" }
        ]
      }
    ]
  }
];

interface Lesson {
  title: string;
  description: string;
  route?: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  modules: Module[];
}

const ModuleCard: React.FC<{
  module: Module;
  isUnlocked: boolean;
}> = ({ module, isUnlocked }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    if (isUnlocked) {
      setIsPanelOpen(!isPanelOpen);
    }
  };

  return (
    <div className={`p-4 ${!isUnlocked ? 'opacity-50 pointer-events-none select-none relative' : ''}`}>
      <div className="flex items-stretch justify-between gap-4 rounded-xl bg-[rgb(40,48,57)] p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <div className="flex flex-[2_2_0px] flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-white text-base font-bold leading-tight">
              {module.title}
            </p>
            <p className="text-[#9caaba] text-sm font-normal leading-normal">
              {isUnlocked ? module.description : "Debes completar el módulo anterior para desbloquear este módulo."}
            </p>
          </div>
          <Button
            size="sm"
            variant="primary"
            className="w-fit"
            onClick={togglePanel}
            disabled={!isUnlocked}
          >
            <span className="truncate">
              {isPanelOpen ? "Ocultar contenidos" : "Ver contenidos"}
            </span>
          </Button>
        </div>
      </div>
      
      {!isUnlocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="mb-2 text-white drop-shadow-lg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 10V7a4 4 0 10-8 0v3M5 10h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
            <circle cx="12" cy="16" r="1.5" fill="currentColor" />
          </svg>
          <span className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-lg font-bold">Módulo bloqueado</span>
        </div>
      )}
      
      {isPanelOpen && isUnlocked && (
        <div className="p-4 mt-4 bg-[rgb(40,48,57)] rounded-xl">
          <p className="text-white text-lg font-semibold">Lecciones</p>
          <ul className="mt-3 space-y-3">
            {module.lessons.map((lesson, index) => (
              <li
                key={index}
                className="bg-[#2c353f] p-3 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-white text-md font-bold">{lesson.title}</p>
                  <p className="text-[#9caaba] text-sm">{lesson.description}</p>
                </div>
                {lesson.route ? (
                  <Link to={lesson.route} className="mt-2 mr-8 w-fit">
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

const CourseCard: React.FC<{
  course: Course;
  module2Unlocked: boolean;
}> = ({ course, module2Unlocked }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const getModuleUnlockStatus = (moduleIndex: number) => {
    if (course.id === "python") {
      return moduleIndex === 0 ? true : module2Unlocked;
    }
    // For JavaScript and Java, all modules are unlocked for now
    return true;
  };

  return (
    <div className="mb-8">
      <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-xl bg-[rgb(40,48,57)] p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
          <div className="flex flex-[2_2_0px] flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-white text-xl font-bold leading-tight">
                {course.title}
              </p>
              <p className="text-[#9caaba] text-sm font-normal leading-normal">
                {course.description}
              </p>
            </div>
            <Button
              size="sm"
              variant="primary"
              className="w-fit"
              onClick={togglePanel}
            >
              <span className="truncate">
                {isPanelOpen ? "Ocultar módulos" : "Ver módulos"}
              </span>
            </Button>
          </div>
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
            style={{
              backgroundImage: `url('${course.image}')`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      </div>
      
      {isPanelOpen && (
        <div className="ml-4 mr-4">
          {course.modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={module}
              isUnlocked={getModuleUnlockStatus(index)}
            />
          ))}
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
        const res = await learningService.getGrade(user.correo_electronico, "Assessment1");
        console.log("Respuesta del backend:", res);
        console.log("Grade recibido:", res.data?.grade);
        setModule2Unlocked(res.data?.grade >= 40);
      } catch (e) {
        setModule2Unlocked(false);
      }
      setLoading(false);
    };
    checkModule1Passed();
  }, [user]);

  if (loading) return <div className="text-white">Cargando...</div>;

  return (
          <div className={getResponsiveContainer()}>
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white tracking-light text-[32px] font-bold leading-tight">
              Cursos disponibles
            </p>
            <p className="text-[#9caaba] text-sm font-normal leading-normal">
              Explora nuestra lista de cursos de programación diseñados para aprender desde cero. ¡Comienza tu viaje de programación hoy!
            </p>
          </div>
        </div>
        
        {courseData.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            module2Unlocked={module2Unlocked}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
