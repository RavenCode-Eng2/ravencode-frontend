"""
Test user data for RavenCode frontend tests
"""

import time
import random

# Static test users (should exist in the database)
STATIC_USERS = {
    'admin': {
        'email': 'camurcioa@unal.edu.co',
        'password': 'RavenCode123',
        'name': 'Carlos',
        'role': 'admin',
        'institucion_educativa': 'Universidad Nacional',
        'grado_academico': 'Pregrado'
    },
    'student1': {
        'email': 'tatianitalamasbonita@example.com',
        'password': 'Tatis123',
        'name': 'Tatianita Rodriguez',
        'role': 'student',
        'institucion_educativa': 'Colegio Mis Primeras Travesuras',
        'grado_academico': '2'
    },
    'student2': {
        'email': 'ciamurciamur@gmail.com',
        'password': 'TestPassword123',
        'name': 'Test User',
        'role': 'student',
        'institucion_educativa': 'Test School',
        'grado_academico': 'Test Grade'
    }
}

# Invalid test users (for negative testing)
INVALID_USERS = {
    'wrong_password': {
        'email': 'camurcioa@unal.edu.co',
        'password': 'WrongPassword123',
    },
    'nonexistent': {
        'email': 'nonexistent@example.com',
        'password': 'SomePassword123',
    },
    'malformed_email': {
        'email': 'invalid-email',
        'password': 'ValidPassword123',
    }
}

# Registration test data templates
REGISTRATION_TEMPLATES = {
    'valid_student': {
        'nombre': 'New Test Student',
        'password': 'NewStudent123',
        'confirmPassword': 'NewStudent123',
        'fecha_de_nacimiento': '1998-06-15',
        'institucion_educativa': 'Test University',
        'grado_academico': 'Undergraduate'
    },
    'invalid_passwords_mismatch': {
        'nombre': 'Test User',
        'password': 'Password123',
        'confirmPassword': 'DifferentPassword123',
        'fecha_de_nacimiento': '1995-01-01',
        'institucion_educativa': 'Test School',
        'grado_academico': 'Test Grade'
    },
    'weak_password': {
        'nombre': 'Test User',
        'password': '123',
        'confirmPassword': '123',
        'fecha_de_nacimiento': '1995-01-01',
        'institucion_educativa': 'Test School',
        'grado_academico': 'Test Grade'
    }
}

# Profile update test data
PROFILE_UPDATES = {
    'valid_update': {
        'nombre': 'Updated Test Name',
        'institucion_educativa': 'Updated Test Institution',
        'grado_academico': 'Updated Test Grade'
    },
    'empty_fields': {
        'nombre': '',
        'institucion_educativa': '',
        'grado_academico': ''
    }
}

def generate_unique_email():
    """Generate a unique email for testing"""
    timestamp = int(time.time())
    random_num = random.randint(1000, 9999)
    return f"testuser_{timestamp}_{random_num}@example.com"

def generate_test_user(role='student'):
    """Generate a complete test user"""
    email = generate_unique_email()
    return {
        'nombre': f'Test User {random.randint(100, 999)}',
        'email': email,
        'password': 'TestPassword123',
        'confirmPassword': 'TestPassword123',
        'fecha_de_nacimiento': '1995-05-15',
        'institucion_educativa': 'Automated Test School',
        'grado_academico': 'Test Grade',
        'role': role
    }

def get_user_by_role(role):
    """Get a static user by role"""
    for user_key, user_data in STATIC_USERS.items():
        if user_data['role'] == role:
            return user_data
    return None

def get_admin_user():
    """Get admin user"""
    return STATIC_USERS['admin']

def get_student_user():
    """Get a student user"""
    return STATIC_USERS['student1'] 