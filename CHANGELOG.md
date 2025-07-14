# Changelog

Todos los cambios importantes de este proyecto se documentan en este archivo.


### Added
- Módulo 2 completo con 4 lecciones (Lesson1, Lesson2, Lesson3, Lesson4)
- Sistema de bloqueo del Módulo 2 basado en aprobación del examen del Módulo 1
- Verificación automática de calificaciones del Módulo 1 para desbloquear Módulo 2
- Interfaz visual de módulo bloqueado con icono de candado
- Integración con learningService para verificar calificaciones
- Lógica de aprobación (grade >= 40) para desbloquear Módulo 2
- Página de introducción del Módulo 2 con objetivos y descripción
- Lecciones interactivas con editor de código integrado
- Ejercicios prácticos en cada lección del Módulo 2
- Navegación completa entre lecciones del Módulo 2
- Página de evaluación del juez para Módulo 1 (`assessment_judge1.tsx`)
- Página de evaluación del juez para Módulo 2 (`assessment_judge2.tsx`)
- Integración completa con el backend del juez
- Editor de código CodeMirror con tema Dracula
- Sistema de entrada de usuario (stdin) para pruebas
- Output separado para mostrar resultados de ejecución
- Botón "Ejecutar código" para pruebas locales
- Botón "Enviar al Juez" para evaluación oficial
- Visualización detallada de resultados de evaluación
- Casos de prueba individuales con estado (pasó/falló)
- Métricas de evaluación (tiempo, memoria, puntuación)
- Toast notifications para feedback del usuario
- Navegación entre módulos y evaluaciones
- Comentario inicial en editores: "# Escribe acá tu código"
- Entrada de usuario ampliada (5 filas) para mejor usabilidad

### Changed
- Sistema de navegación entre módulos con verificación de progreso
- Interfaz de usuario con estados de bloqueo/desbloqueo visual
- Integración entre servicios de aprendizaje y evaluación
- Experiencia de usuario con feedback visual de progreso
- Sistema de rutas protegidas basado en calificaciones
- Estructura visual del editor de código en evaluaciones
- Interfaz de usuario consistente entre lecciones y evaluaciones
- Manejo de estados de carga durante ejecución y evaluación
- Experiencia de usuario con feedback visual mejorado
- Navegación entre páginas del Módulo 2

### Technical Details
- **Framework**: React 18 con TypeScript
- **Editor**: CodeMirror con extensiones Python
- **Tema**: Dracula para mejor experiencia visual
- **Estado**: React hooks para manejo de estado
- **Navegación**: React Router v7
- **Notificaciones**: React Hot Toast
- **Estilos**: Tailwind CSS con clases personalizadas
- **Sistema de Bloqueo**: Verificación automática de calificaciones con learningService
- **Lógica de Aprobación**: Grade >= 40 para desbloquear Módulo 2
- **Estados Visuales**: Opacidad y pointer-events para módulos bloqueados

### New Pages
- **`/introduction-module2`**: Introducción al Módulo 2 (Control de flujo)
- **`/lesson1-module2`**: Lección 1 - Condicionales (if, elif, else)
- **`/lesson2-module2`**: Lección 2 - Bucles (while, for)
- **`/lesson3-module2`**: Lección 3 - Operadores lógicos
- **`/lesson4-module2`**: Lección 4 - Combinando condicionales y bucles
- **`/assessment2`**: Evaluación del Módulo 2
- **`/AssessmentJudge1`**: Evaluación del juez para Módulo 1 (Cálculo de Promedio)
- **`/AssessmentJudge2`**: Evaluación del juez para Módulo 2 (Cajero Automático)

### Features
- **Sistema de Bloqueo Progresivo**: Módulo 2 bloqueado hasta aprobar Módulo 1
- **Verificación Automática**: Consulta automática de calificaciones al cargar la página
- **Interfaz de Bloqueo**: Visualización clara con icono de candado y mensaje explicativo
- **Navegación Condicional**: Rutas protegidas basadas en progreso del estudiante
- **Evaluación Oficial**: Envío al backend del juez con casos de prueba
- **Resultados Detallados**: Ver qué casos pasaron y cuáles fallaron
- **Métricas**: Tiempo de ejecución, memoria utilizada, puntuación
- **Feedback Inmediato**: Toast notifications para todas las acciones
- **Interfaz Intuitiva**: Editor, entrada y output claramente separados

### Fixed
- Imports duplicados en `App.tsx` que causaban errores de compilación
- Rutas duplicadas en el router que causaban conflictos
- Navegación incorrecta en botones de evaluación

---

## [1.0.0] - 2025-06-13
### Added
- Versión inicial del proyecto RavenCode Frontend
- Sistema de autenticación completo
- Módulos de aprendizaje interactivos
- Editor de código integrado
- Sistema de navegación entre lecciones
- Integración con servicios de backend 