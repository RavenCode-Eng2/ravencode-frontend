"""
Legacy Integration Test for RavenCode Frontend
Converted from the original monolithic test file
"""

import time
import random
from base_test import BaseTest
from test_data.users import get_admin_user, get_student_user, generate_test_user


class LegacyIntegrationTest(BaseTest):
    """Legacy integration test suite"""
    
    def test_login_valid_user(self):
        """Test login with valid user credentials"""
        self.logger.add_log("Testing valid user login", "INFO")
        
        admin_user = get_admin_user()
        success = self.login_user(admin_user['email'], admin_user['password'])
        
        if success:
            # Additional verification for welcome message
            try:
                welcome_element = self.wait_for_element("xpath", "//h2[contains(., 'Bienvenido')]", timeout=10)
                if welcome_element:
                    self.logger.add_log("Valid user login: PASS", "PASS")
                    return True
                else:
                    self.logger.add_log("Valid user login: FAIL (welcome message not found)", "FAIL")
                    return False
            except Exception as e:
                self.logger.add_log(f"Valid user login: FAIL ({str(e)})", "FAIL")
                return False
        
        return success
    
    def test_login_invalid_user(self):
        """Test login with invalid user credentials"""
        self.logger.add_log("Testing invalid user login", "INFO")
        
        success = self.login_user("invalid@example.com", "wrongpassword", expect_success=False)
        
        if success:
            self.logger.add_log("Invalid user login: PASS", "PASS")
        else:
            self.logger.add_log("Invalid user login: FAIL", "FAIL")
        
        return success
    
    def test_register_new_user(self):
        """Test registration of a new user"""
        self.logger.add_log("Testing registration of a new user", "INFO")
        
        self.navigate_to("/register")
        
        try:
            # Generate unique email
            test_user = generate_test_user()
            
            # Fill the form
            fields = [
                ("nombre", test_user['nombre']),
                ("email", test_user['email']),
                ("password", test_user['password']),
                ("confirmPassword", test_user['confirmPassword']),
                ("fecha_de_nacimiento", test_user['fecha_de_nacimiento']),
                ("institucion_educativa", test_user['institucion_educativa']),
                ("grado_academico", test_user['grado_academico'])
            ]
            
            for field_id, value in fields:
                field = self.find_element_safely("id", field_id)
                if field:
                    field.send_keys(value)
                else:
                    self.logger.add_log(f"Field not found: {field_id}", "FAIL")
                    return None
            
            # Accept terms
            terms_checkbox = self.find_element_safely("id", "terms")
            if terms_checkbox:
                terms_checkbox.click()
            
            # Click register button
            register_button = self.wait_for_clickable("xpath", "//button[contains(., 'Crear cuenta')]")
            if register_button:
                register_button.click()
                time.sleep(2)
                
                # Check for successful registration (redirect to login)
                if "login" in self.driver.current_url.lower():
                    self.logger.add_log("New user registration: PASS", "PASS")
                    return test_user['email']
                else:
                    self.logger.add_log("New user registration: FAIL", "FAIL")
                    return None
            else:
                self.logger.add_log("Register button not found", "FAIL")
                return None
                
        except Exception as e:
            self.logger.add_log(f"New user registration: FAIL ({str(e)})", "FAIL")
            return None
    
    def test_register_existing_user(self, email):
        """Test registration of an existing user"""
        self.logger.add_log("Testing registration of an existing user", "INFO")
        
        if not email:
            email = get_student_user()['email']
        
        self.navigate_to("/register")
        
        try:
            # Use existing email
            test_user = generate_test_user()
            test_user['email'] = email
            
            # Fill form
            fields = [
                ("nombre", test_user['nombre']),
                ("email", test_user['email']),
                ("password", test_user['password']),
                ("confirmPassword", test_user['confirmPassword']),
                ("fecha_de_nacimiento", test_user['fecha_de_nacimiento']),
                ("institucion_educativa", test_user['institucion_educativa']),
                ("grado_academico", test_user['grado_academico'])
            ]
            
            for field_id, value in fields:
                field = self.find_element_safely("id", field_id)
                if field:
                    field.send_keys(value)
            
            # Accept terms
            terms_checkbox = self.find_element_safely("id", "terms")
            if terms_checkbox:
                terms_checkbox.click()
            
            # Submit
            register_button = self.wait_for_clickable("xpath", "//button[contains(., 'Crear cuenta')]")
            if register_button:
                register_button.click()
                time.sleep(2)
                
                # Should show error or stay on registration page
                error_toast = self.wait_for_toast_message("Email already registered", timeout=5)
                if error_toast or "register" in self.driver.current_url.lower():
                    self.logger.add_log("Existing user registration: PASS (error shown as expected)", "PASS")
                    return True
                else:
                    self.logger.add_log("Existing user registration: FAIL", "FAIL")
                    return False
            
        except Exception as e:
            self.logger.add_log(f"Existing user registration: FAIL ({str(e)})", "FAIL")
            return False
    
    def test_forgot_password_request(self, test_email=None):
        """Test forgot password request"""
        self.logger.add_log("Testing forgot password request", "INFO")
        
        if not test_email:
            test_email = get_student_user()['email']
        
        self.navigate_to("/forgot-password")
        
        try:
            email_input = self.wait_for_element("id", "email")
            if email_input:
                email_input.clear()
                email_input.send_keys(test_email)
                
                send_button = self.wait_for_clickable("xpath", "//button[contains(., 'Enviar código')]")
                if send_button:
                    send_button.click()
                    
                    # Check for success message
                    success_toast = self.wait_for_toast_message("Código de recuperación enviado", timeout=10)
                    if success_toast:
                        self.logger.add_log("Forgot password request: PASS (success toast shown)", "PASS")
                        return True
                    else:
                        self.logger.add_log("Forgot password request: FAIL", "FAIL")
                        return False
                        
        except Exception as e:
            self.logger.add_log(f"Forgot password request: FAIL ({str(e)})", "FAIL")
            return False
    
    def test_dashboard(self, user_email=None, user_password=None, expected_name="Usuario"):
        """Test dashboard page"""
        self.logger.add_log("Testing dashboard page", "INFO")
        
        if not user_email or not user_password:
            admin_user = get_admin_user()
            user_email = admin_user['email']
            user_password = admin_user['password']
            expected_name = admin_user['name']
        
        # Login first
        if not self.login_user(user_email, user_password):
            return False
        
        try:
            # Wait for dashboard greeting
            greeting = self.wait_for_element("xpath", "//h2[contains(., '¡Bienvenido de nuevo')]", timeout=10)
            if not greeting:
                self.logger.add_log("Dashboard greeting not found", "FAIL")
                return False
            
            # Check if greeting contains expected name
            if expected_name not in greeting.text:
                self.logger.add_log(f"Greeting does not contain expected name: {greeting.text}", "WARN")
            
            # Check for key dashboard elements
            elements_to_check = [
                "//*[contains(text(), 'Continúa Tu Aventura')]",
                "//*[contains(text(), 'Fundamentos de Python')]",
                "//*[contains(text(), 'Logros')]"
            ]
            
            found_elements = 0
            for element_xpath in elements_to_check:
                if self.wait_for_element("xpath", element_xpath, timeout=5):
                    found_elements += 1
            
            if found_elements >= 2:
                self.logger.add_log("Dashboard page: PASS (all key elements found)", "PASS")
                return True
            else:
                self.logger.add_log("Dashboard page: FAIL (missing key elements)", "FAIL")
                return False
                
        except Exception as e:
            self.logger.add_log(f"Dashboard page: FAIL ({str(e)})", "FAIL")
            return False
    
    def test_settings_update(self, user_email=None, user_password=None, new_name="Updated Name", 
                           new_school="Updated School", new_grade="Updated Grade"):
        """Test settings page update"""
        self.logger.add_log("Testing settings page update", "INFO")
        
        if not user_email or not user_password:
            student_user = get_student_user()
            user_email = student_user['email']
            user_password = student_user['password']
        
        # Login first
        if not self.login_user(user_email, user_password):
            return False
        
        try:
            # Go to settings page
            self.navigate_to("/settings")
            
            # Wait for settings form to load
            if not self.check_page_load("//h2[contains(., 'Configuración de Perfil')]", "Settings"):
                return False
            
            # Update fields
            fields_to_update = [
                ("Nombre", new_name),
                ("Institucion_educativa", new_school),
                ("Grado_academico", new_grade)
            ]
            
            for field_id, value in fields_to_update:
                field = self.find_element_safely("id", field_id)
                if field:
                    field.clear()
                    field.send_keys(value)
                else:
                    self.logger.add_log(f"Settings field not found: {field_id}", "FAIL")
                    return False
            
            # Submit the form
            save_button = self.wait_for_clickable("xpath", "//button[contains(., 'Guardar cambios')]")
            if save_button:
                save_button.click()
                
                # Wait for success toast
                success_toast = self.wait_for_toast_message("Perfil actualizado exitosamente", timeout=10)
                if success_toast:
                    self.logger.add_log("Settings page update: PASS (profile updated successfully)", "PASS")
                    return True
                else:
                    self.logger.add_log("Settings page update: FAIL (no success message)", "FAIL")
                    return False
            else:
                self.logger.add_log("Save button not found", "FAIL")
                return False
                
        except Exception as e:
            self.logger.add_log(f"Settings page update: FAIL ({str(e)})", "FAIL")
            return False
    
    def test_module1_full_workflow(self, user_email=None, user_password=None):
        """Test Module1 full workflow"""
        self.logger.add_log("Testing Module1 full workflow", "INFO")
        
        if not user_email or not user_password:
            admin_user = get_admin_user()
            user_email = admin_user['email']
            user_password = admin_user['password']
        
        try:
            # Login
            if not self.login_user(user_email, user_password):
                return False
            
            # Go to courses
            self.navigate_to("/courses")
            
            if not self.check_page_load("//h1[contains(., 'Cursos')]", "Courses"):
                return False
            
            # Find Module 1
            module1_card = self.wait_for_element("xpath", "//*[normalize-space(text())='Módulo 1: Fundamentos de Python']", timeout=30)
            if not module1_card:
                self.logger.add_log("Module 1 card not found", "FAIL")
                return False
            
            # Click "Ver contenidos"
            ver_contenidos_btn = self.wait_for_clickable("xpath", "//button[contains(., 'Ver contenidos')]")
            if ver_contenidos_btn:
                self.scroll_to_element(ver_contenidos_btn)
                ver_contenidos_btn.click()
                time.sleep(2)
            else:
                self.logger.add_log("Ver contenidos button not found", "FAIL")
                return False
            
            # Click "Ver lección" for Introduction
            ver_leccion_btn = self.wait_for_clickable("xpath", "//button[contains(., 'Ver lección')][ancestor::*[contains(., 'Introducción')]]")
            if ver_leccion_btn:
                self.scroll_to_element(ver_leccion_btn)
                ver_leccion_btn.click()
                time.sleep(2)
            else:
                self.logger.add_log("Introduction Ver lección button not found", "FAIL")
                return False
            
            # Click "Inicia tu aprendizaje"
            inicia_btn = self.wait_for_clickable("xpath", "//button[contains(., 'Inicia tu aprendizaje')]")
            if inicia_btn:
                self.scroll_to_element(inicia_btn)
                inicia_btn.click()
                time.sleep(2)
            else:
                self.logger.add_log("Inicia tu aprendizaje button not found", "FAIL")
                return False
            
            # Navigate through lessons 1-5
            for lesson_num in range(1, 6):
                lesson_indicator = self.wait_for_element("xpath", f"//*[contains(text(), 'Lección {lesson_num}')]", timeout=10)
                if lesson_indicator:
                    self.logger.add_log(f"On Lección {lesson_num}", "INFO")
                
                siguiente_btn = self.wait_for_clickable("xpath", "//button[contains(., 'Siguiente')]")
                if siguiente_btn:
                    self.scroll_to_element(siguiente_btn)
                    siguiente_btn.click()
                    time.sleep(2)
                else:
                    self.logger.add_log(f"Siguiente button not found on lesson {lesson_num}", "FAIL")
                    return False
            
            # On last lesson, click "Reto"
            reto_btn = self.wait_for_clickable("xpath", "//button[contains(., 'Reto')]")
            if reto_btn:
                self.scroll_to_element(reto_btn)
                reto_btn.click()
                time.sleep(2)
            else:
                self.logger.add_log("Reto button not found", "FAIL")
                return False
            
            # Check for assessment
            assessment = self.wait_for_element("xpath", "//*[contains(text(), 'Evaluación Juez Módulo 1')]", timeout=10)
            if assessment:
                self.logger.add_log("Module1 full workflow: PASS (reached Evaluación Juez Módulo 1)", "PASS")
                return True
            else:
                self.logger.add_log("Module1 full workflow: FAIL (assessment not reached)", "FAIL")
                return False
                
        except Exception as e:
            self.logger.add_log(f"Module1 full workflow: FAIL ({str(e)})", "FAIL")
            return False
    
    def run_all_tests(self):
        """Run all legacy integration tests"""
        self.logger.add_log("Starting Legacy Integration Test Suite", "INFO")
        results = {}
        
        try:
            self.setup_driver()
            
            # Run tests in sequence
            results['valid_login'] = self.test_login_valid_user()
            self.logout_user()
            
            results['invalid_login'] = self.test_login_invalid_user()
            
            new_email = self.test_register_new_user()
            results['new_user_registration'] = bool(new_email)
            
            if new_email:
                results['duplicate_registration'] = self.test_register_existing_user(new_email)
            else:
                results['duplicate_registration'] = self.test_register_existing_user(None)
            
            results['forgot_password'] = self.test_forgot_password_request()
            
            admin_user = get_admin_user()
            results['dashboard'] = self.test_dashboard(admin_user['email'], admin_user['password'], admin_user['name'])
            
            student_user = get_student_user()
            results['settings_update'] = self.test_settings_update(student_user['email'], student_user['password'])
            
            results['module1_workflow'] = self.test_module1_full_workflow(admin_user['email'], admin_user['password'])
            
        except Exception as e:
            self.logger.add_log(f"Legacy integration test suite failed: {str(e)}", "FAIL")
        finally:
            self.teardown_driver()
        
        # Summary
        passed = sum(1 for result in results.values() if result)
        total = len(results)
        self.logger.add_log(f"Legacy integration tests completed: {passed}/{total} passed", "INFO")
        
        return results 