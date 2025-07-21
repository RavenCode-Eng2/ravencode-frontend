import { Course } from '../types';
import program from "../assets/images/programacion.png";
import objetivos from "../assets/images/objetivos.png";

export const pythonCourse: Course = {
  id: 'python-fundamentals',
  title: 'Fundamentos de Python',
  description: 'Aprende los fundamentos de programación con Python, desde conceptos básicos hasta estructuras de datos y control de flujo.',
  language: 'Python',
  level: 'beginner',
  category: 'Programming',
  tags: ['python', 'programming', 'beginner', 'fundamentals'],
  duration: 600, // 10 hours total
  instructor: {
    id: 'inst-1',
    name: 'RavenCode Team',
    avatar: 'https://example.com/avatar.jpg',
    bio: 'Equipo de instructores expertos en programación',
  },
  coverImage: program,
  objectives: [
    'Entender los conceptos básicos de programación',
    'Aprender la sintaxis básica de Python',
    'Desarrollar habilidades de resolución de problemas',
    'Crear programas simples en Python',
  ],
  requirements: [
    'No se requiere experiencia previa en programación',
    'Computadora con acceso a internet',
  ],
  skills: [
    'Python Basics',
    'Problem Solving',
    'Algorithm Design',
    'Data Types',
    'Control Flow',
  ],
  modules: [
    {
      id: 'module-1',
      title: 'Introducción a Python',
      description: 'Fundamentos básicos de programación y Python',
      order: 1,
      introduction: {
        title: 'Bienvenido/a al mundo de la programación!',
        description: 'En este espacio encontrarás herramientas que te ayudarán a dar tus primeros pasos en el mundo de la programación.',
        content: [
          {
            type: 'text',
            content: 'En este primer módulo aprenderás los fundamentos esenciales para comenzar a escribir tus propios programas.'
          },
          {
            type: 'image',
            content: 'Objetivos del módulo',
            imageUrl: objetivos
          }
        ],
        objectives: [
          '¿Qué es programar? ¿Qué es Python?',
          '¿Cómo descargar e instalar python?',
          'Entrada del usuario, salidas del programa y comentarios.',
          'Variables y tipos de datos (int, float, str, bool)',
          'Operaciones y expresiones'
        ],
        coverImage: program
      },
      lessons: [
        {
          id: 'lesson-1-1',
          title: '¿Qué es programar? ¿Qué es Python?',
          description: 'Introducción a la programación y Python',
          order: 1,
          content: [
            {
              type: 'text',
              content: 'La programación hace referencia a la actividad de escribir un conjunto de instrucciones (un programa) para que el computador las pueda ejecutar.'
            },
            {
              type: 'code',
              content: 'print("¡Hola, mundo!")',
              language: 'python'
            },
            {
              type: 'image',
              content: 'Programación conceptos',
              imageUrl: program
            }
          ],
          duration: 30,
          skills: ['Basic Programming Concepts', 'Python Introduction']
        },
        // Additional lessons would be defined here...
      ],
      assessment: {
        id: 'assessment-1',
        title: 'Evaluación Módulo 1',
        description: 'Evaluación de conceptos básicos de Python',
        passingGrade: 70,
        questions: [
          {
            id: 'q1',
            question: '¿Cuál es la habilidad más importante de un programador?',
            options: [
              'Creatividad.',
              'Capacidad de razonamiento abstracto.',
              'Capacidad para resolver problemas.',
              'Saber construir algoritmos.',
            ],
            answer: 'Capacidad para resolver problemas.'
          },
          // Additional questions would be defined here...
        ],
        hasJudge: true,
        judgeConfig: {
          language: 'python',
          testCases: [
            {
              input: '',
              expectedOutput: 'Bienvenidos al curso de programación de RavenCode.'
            }
          ],
          timeLimit: 1,
          memoryLimit: 256
        }
      },
      duration: 300,
      level: 'beginner',
      skills: ['Python Basics', 'Programming Logic']
    },
    // Module 2 would be defined here...
  ],
  metadata: {
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-19T00:00:00Z',
    publishedAt: '2024-01-15T00:00:00Z',
    status: 'published',
    version: '1.0.0',
    totalStudents: 100,
    rating: 4.5,
    reviewCount: 25
  }
}; 