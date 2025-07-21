"""
Test Configuration
Contains all configurable settings for the RavenCode frontend test suite
"""

import os

# Application Configuration
BASE_URL = os.getenv('RAVENCODE_BASE_URL', 'http://localhost:3000')

# Selenium Configuration
DEFAULT_TIMEOUT = int(os.getenv('TEST_TIMEOUT', '10'))
IMPLICIT_WAIT = int(os.getenv('IMPLICIT_WAIT', '5'))
PAGE_LOAD_TIMEOUT = int(os.getenv('PAGE_LOAD_TIMEOUT', '30'))

# Browser Configuration
HEADLESS = os.getenv('HEADLESS', 'False').lower() == 'true'
WINDOW_SIZE = os.getenv('WINDOW_SIZE', '1920,1080').split(',')
WINDOW_WIDTH = int(WINDOW_SIZE[0])
WINDOW_HEIGHT = int(WINDOW_SIZE[1])

# Test Data Configuration
TEST_USERS = {
    'valid_admin': {
        'email': 'camurcioa@unal.edu.co',
        'password': 'RavenCode123',
        'name': 'Carlos',
        'role': 'admin'
    },
    'valid_student': {
        'email': 'tatianitalamasbonita@example.com',
        'password': 'Tatis123',
        'name': 'Tatianita Rodriguez',
        'role': 'student'
    },
    'test_student': {
        'email': 'ciamurciamur@gmail.com',
        'password': 'TestPassword123',
        'name': 'Test User',
        'role': 'student'
    }
}

# Test Emails for Registration Tests
TEST_REGISTRATION_DATA = {
    'nombre': 'Test User',
    'password': 'TestPassword123',
    'confirmPassword': 'TestPassword123',
    'fecha_de_nacimiento': '2000-01-01',
    'institucion_educativa': 'Test School',
    'grado_academico': 'Test Grade'
}

# Admin Test Data
ADMIN_TEST_DATA = {
    'new_user': {
        'nombre': 'Admin Created User',
        'email': 'admin_created_{timestamp}@test.com',
        'password': 'AdminTest123',
        'role': 'student',
        'fecha_de_nacimiento': '1995-05-15',
        'institucion_educativa': 'Admin Test School',
        'grado_academico': 'Admin Test Grade'
    }
}

# Profile Update Test Data
PROFILE_UPDATE_DATA = {
    'nombre': 'Updated Test Name',
    'institucion_educativa': 'Updated Test School',
    'grado_academico': 'Updated Test Grade'
}

# Module Test Configuration
MODULE_TEST_CONFIG = {
    'module1': {
        'lessons_count': 5,
        'assessment_name': 'Evaluación Juez Módulo 1'
    },
    'module2': {
        'lessons_count': 4,
        'assessment_name': 'Evaluación Juez Módulo 2'
    }
}

# File Paths
SCREENSHOTS_DIR = os.path.join(os.path.dirname(__file__), 'screenshots')
REPORTS_DIR = os.path.join(os.path.dirname(__file__), 'reports')

# Create directories if they don't exist
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
os.makedirs(REPORTS_DIR, exist_ok=True)

# Test Categories
TEST_CATEGORIES = {
    'authentication': ['login', 'register', 'forgot_password', 'logout'],
    'user_management': ['profile', 'settings', 'dashboard'],
    'courses': ['course_listing', 'module_access', 'lesson_navigation'],
    'modules': ['module1_workflow', 'module2_workflow', 'assessments'],
    'achievements': ['achievement_display', 'diploma_management', 'progress_tracking'],
    'admin': ['user_management', 'course_management', 'achievement_management', 'admin_dashboard'],
    'navigation': ['sidebar', 'header', 'routing', 'responsive']
}

# Expected UI Elements
UI_ELEMENTS = {
    'login_page': {
        'email_input': 'email',
        'password_input': 'password',
        'login_button': "//button[contains(., 'Iniciar sesión')]",
        'register_link': "//a[contains(., 'Crear cuenta')]"
    },
    'register_page': {
        'nombre_input': 'nombre',
        'email_input': 'email',
        'password_input': 'password',
        'confirm_password_input': 'confirmPassword',
        'fecha_nacimiento_input': 'fecha_de_nacimiento',
        'institucion_input': 'institucion_educativa',
        'grado_input': 'grado_academico',
        'terms_checkbox': 'terms',
        'register_button': "//button[contains(., 'Crear cuenta')]"
    },
    'dashboard': {
        'welcome_message': "//h2[contains(., 'Bienvenido')]",
        'progress_card': "//*[contains(text(), 'Continúa Tu Aventura')]",
        'modules_section': "//*[contains(text(), 'Fundamentos de Python')]",
        'achievements_section': "//*[contains(text(), 'Logros')]"
    },
    'courses_page': {
        'courses_heading': "//h1[contains(., 'Cursos')]",
        'module1_card': "//*[normalize-space(text())='Módulo 1: Fundamentos de Python']",
        'module2_card': "//*[normalize-space(text())='Módulo 2:']",
        'ver_contenidos_button': "//button[contains(., 'Ver contenidos')]"
    },
    'settings_page': {
        'settings_heading': "//h2[contains(., 'Configuración de Perfil')]",
        'nombre_input': 'Nombre',
        'institucion_input': 'Institucion_educativa',
        'grado_input': 'Grado_academico',
        'save_button': "//button[contains(., 'Guardar cambios')]"
    },
    'admin_dashboard': {
        'admin_heading': "//h1[contains(., 'Panel de Administración')]",
        'users_card': "//*[contains(text(), 'Gestión de Usuarios')]",
        'courses_card': "//*[contains(text(), 'Gestión de Cursos')]",
        'achievements_card': "//*[contains(text(), 'Gestión de Logros')]"
    }
}

# Success Messages
SUCCESS_MESSAGES = {
    'login_success': "Bienvenido",
    'registration_success': "Usuario registrado exitosamente",
    'profile_update_success': "Perfil actualizado exitosamente",
    'password_recovery_sent': "Código de recuperación enviado",
    'user_created': "Usuario creado exitosamente",
    'user_deleted': "Usuario eliminado exitosamente"
}

# Error Messages
ERROR_MESSAGES = {
    'invalid_login': "Credenciales inválidas",
    'email_already_exists': "Email already registered",
    'registration_error': "Error al registrar",
    'unauthorized_access': "No autorizado",
    'user_not_found': "Usuario no encontrado"
}

# Navigation Paths
NAVIGATION_PATHS = {
    'login': '/login',
    'register': '/register',
    'dashboard': '/dashboard',
    'courses': '/courses',
    'achievements': '/achievements',
    'settings': '/settings',
    'forgot_password': '/forgot-password',
    'admin': '/admin',
    'admin_users': '/admin/users',
    'admin_courses': '/admin/courses',
    'admin_achievements': '/admin/achievements',
    'module1_intro': '/module1/introduction',
    'module2_intro': '/module2/introduction'
} 