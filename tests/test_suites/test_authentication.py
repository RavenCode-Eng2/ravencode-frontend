"""
Authentication Test Suite for RavenCode Frontend
Tests login, registration, password recovery, and logout functionality
"""

import time
from base_test import BaseTest
from test_data.users import STATIC_USERS, INVALID_USERS, generate_test_user


class AuthenticationTests(BaseTest):
    """Test suite for authentication functionality"""
    
    def test_valid_login_admin(self):
        """Test login with valid admin credentials"""
        self.logger.add_log("Testing valid admin login", "INFO")
        
        admin_user = STATIC_USERS['admin']
        success = self.login_user(admin_user['email'], admin_user['password'])
        
        if success:
            # Verify admin role display
            try:
                admin_indicator = self.wait_for_element("xpath", "//*[contains(text(), 'Administrador')]", timeout=5)
                if admin_indicator:
                    self.logger.add_log("Admin role correctly displayed", "PASS")
                else:
                    self.logger.add_log("Admin role not displayed", "WARN")
                    
                # Check for admin menu access
                admin_link = self.find_element_safely("xpath", "//a[contains(@href, '/admin')]")
                if admin_link:
                    self.logger.add_log("Admin menu access available", "PASS")
                else:
                    self.logger.add_log("Admin menu access not found", "WARN")
                    
            except Exception as e:
                self.logger.add_log(f"Error checking admin features: {str(e)}", "WARN")
        
        return success
    
    def test_valid_login_student(self):
        """Test login with valid student credentials"""
        self.logger.add_log("Testing valid student login", "INFO")
        
        student_user = STATIC_USERS['student1']
        success = self.login_user(student_user['email'], student_user['password'])
        
        if success:
            # Verify student role display
            try:
                student_indicator = self.wait_for_element("xpath", "//*[contains(text(), 'Estudiante')]", timeout=5)
                if student_indicator:
                    self.logger.add_log("Student role correctly displayed", "PASS")
                else:
                    self.logger.add_log("Student role not displayed", "WARN")
                    
                # Verify no admin access
                admin_link = self.find_element_safely("xpath", "//a[contains(@href, '/admin')]")
                if not admin_link:
                    self.logger.add_log("Admin access correctly restricted for student", "PASS")
                else:
                    self.logger.add_log("Admin access incorrectly available to student", "FAIL")
                    
            except Exception as e:
                self.logger.add_log(f"Error checking student features: {str(e)}", "WARN")
        
        return success
    
    def test_invalid_login_wrong_password(self):
        """Test login with wrong password"""
        self.logger.add_log("Testing login with wrong password", "INFO")
        
        invalid_user = INVALID_USERS['wrong_password']
        success = self.login_user(invalid_user['email'], invalid_user['password'], expect_success=False)
        
        return success
    
    def test_invalid_login_nonexistent_user(self):
        """Test login with nonexistent user"""
        self.logger.add_log("Testing login with nonexistent user", "INFO")
        
        invalid_user = INVALID_USERS['nonexistent']
        success = self.login_user(invalid_user['email'], invalid_user['password'], expect_success=False)
        
        return success
    
    def test_user_registration_valid(self):
        """Test user registration with valid data"""
        self.logger.add_log("Testing valid user registration", "INFO")
        
        self.navigate_to("/register")
        
        try:
            # Check if registration page loaded
            if not self.check_page_load("//h2[contains(., 'Crear cuenta') or contains(., 'Registrarse')]", "Registration"):
                return False
            
            # Generate unique test user
            test_user = generate_test_user()
            
            # Fill registration form
            fields = [
                ('nombre', test_user['nombre']),
                ('email', test_user['email']),
                ('password', test_user['password']),
                ('confirmPassword', test_user['confirmPassword']),
                ('fecha_de_nacimiento', test_user['fecha_de_nacimiento']),
                ('institucion_educativa', test_user['institucion_educativa']),
                ('grado_academico', test_user['grado_academico'])
            ]
            
            for field_id, value in fields:
                field = self.find_element_safely("id", field_id)
                if field:
                    field.clear()
                    field.send_keys(value)
                else:
                    self.logger.add_log(f"Registration field not found: {field_id}", "FAIL")
                    return False
            
            # Accept terms
            terms_checkbox = self.find_element_safely("id", "terms")
            if terms_checkbox and not terms_checkbox.is_selected():
                terms_checkbox.click()
            
            # Submit registration
            register_button = self.wait_for_clickable("xpath", "//button[contains(., 'Crear cuenta')]")
            if register_button:
                register_button.click()
                time.sleep(3)
                
                # Check for success (redirect to login or success message)
                if "login" in self.driver.current_url.lower():
                    self.logger.add_log("User registration successful - redirected to login", "PASS")
                    return test_user['email']
                else:
                    # Check for success toast
                    toast = self.wait_for_toast_message("registrado exitosamente", timeout=5)
                    if toast:
                        self.logger.add_log("User registration successful - success message shown", "PASS")
                        return test_user['email']
                    else:
                        self.logger.add_log("Registration may have failed - no success indication", "FAIL")
                        self.take_screenshot("registration_fail")
                        return False
            else:
                self.logger.add_log("Register button not found", "FAIL")
                return False
                
        except Exception as e:
            self.logger.add_log(f"Registration test failed: {str(e)}", "FAIL")
            self.take_screenshot("registration_error")
            return False
    
    def test_user_registration_duplicate_email(self, existing_email=None):
        """Test user registration with existing email"""
        self.logger.add_log("Testing registration with duplicate email", "INFO")
        
        if not existing_email:
            existing_email = STATIC_USERS['student1']['email']
        
        self.navigate_to("/register")
        
        try:
            if not self.check_page_load("//h2[contains(., 'Crear cuenta') or contains(., 'Registrarse')]", "Registration"):
                return False
            
            # Use existing email
            test_user = generate_test_user()
            test_user['email'] = existing_email
            
            # Fill form with duplicate email
            fields = [
                ('nombre', test_user['nombre']),
                ('email', test_user['email']),
                ('password', test_user['password']),
                ('confirmPassword', test_user['confirmPassword']),
                ('fecha_de_nacimiento', test_user['fecha_de_nacimiento']),
                ('institucion_educativa', test_user['institucion_educativa']),
                ('grado_academico', test_user['grado_academico'])
            ]
            
            for field_id, value in fields:
                field = self.find_element_safely("id", field_id)
                if field:
                    field.clear()
                    field.send_keys(value)
            
            # Accept terms
            terms_checkbox = self.find_element_safely("id", "terms")
            if terms_checkbox and not terms_checkbox.is_selected():
                terms_checkbox.click()
            
            # Submit registration
            register_button = self.wait_for_clickable("xpath", "//button[contains(., 'Crear cuenta')]")
            if register_button:
                register_button.click()
                time.sleep(3)
                
                # Should show error message
                error_toast = self.wait_for_toast_message("Email already registered", timeout=5)
                if error_toast:
                    self.logger.add_log("Duplicate email correctly rejected", "PASS")
                    return True
                else:
                    # Check if still on registration page
                    if "register" in self.driver.current_url.lower():
                        self.logger.add_log("Duplicate email correctly rejected (stayed on registration page)", "PASS")
                        return True
                    else:
                        self.logger.add_log("Duplicate email incorrectly accepted", "FAIL")
                        return False
            else:
                self.logger.add_log("Register button not found", "FAIL")
                return False
                
        except Exception as e:
            self.logger.add_log(f"Duplicate email test failed: {str(e)}", "FAIL")
            return False
    
    def test_forgot_password_request(self):
        """Test password recovery request"""
        self.logger.add_log("Testing forgot password request", "INFO")
        
        self.navigate_to("/forgot-password")
        
        try:
            if not self.check_page_load("//h2[contains(., 'Recuperar') or contains(., 'Olvidaste')]", "Forgot Password"):
                return False
            
            # Use a known email
            test_email = STATIC_USERS['student1']['email']
            
            # Fill email field
            email_input = self.wait_for_element("id", "email")
            if email_input:
                email_input.clear()
                email_input.send_keys(test_email)
                
                # Click send button
                send_button = self.wait_for_clickable("xpath", "//button[contains(., 'Enviar código') or contains(., 'Enviar')]")
                if send_button:
                    send_button.click()
                    time.sleep(2)
                    
                    # Check for success message
                    success_toast = self.wait_for_toast_message("Código de recuperación enviado", timeout=10)
                    if success_toast:
                        self.logger.add_log("Password recovery request successful", "PASS")
                        return True
                    else:
                        self.logger.add_log("Password recovery request may have failed", "WARN")
                        return False
                else:
                    self.logger.add_log("Send button not found", "FAIL")
                    return False
            else:
                self.logger.add_log("Email input not found", "FAIL")
                return False
                
        except Exception as e:
            self.logger.add_log(f"Forgot password test failed: {str(e)}", "FAIL")
            return False
    
    def test_logout_functionality(self):
        """Test user logout"""
        self.logger.add_log("Testing logout functionality", "INFO")
        
        # First login
        admin_user = STATIC_USERS['admin']
        if not self.login_user(admin_user['email'], admin_user['password']):
            self.logger.add_log("Could not login for logout test", "FAIL")
            return False
        
        # Now test logout
        return self.logout_user()
    
    def test_session_persistence(self):
        """Test session persistence across page refreshes"""
        self.logger.add_log("Testing session persistence", "INFO")
        
        # Login
        admin_user = STATIC_USERS['admin']
        if not self.login_user(admin_user['email'], admin_user['password']):
            return False
        
        # Refresh page
        self.driver.refresh()
        time.sleep(2)
        
        # Should still be logged in
        try:
            welcome_element = self.wait_for_element("xpath", "//h2[contains(., 'Bienvenido')]", timeout=10)
            if welcome_element:
                self.logger.add_log("Session correctly persisted after refresh", "PASS")
                return True
            else:
                self.logger.add_log("Session not persisted after refresh", "FAIL")
                return False
        except Exception as e:
            self.logger.add_log(f"Session persistence test failed: {str(e)}", "FAIL")
            return False
    
    def run_all_tests(self):
        """Run all authentication tests"""
        self.logger.add_log("Starting Authentication Test Suite", "INFO")
        results = {}
        
        try:
            self.setup_driver()
            
            # Test valid logins
            results['admin_login'] = self.test_valid_login_admin()
            self.logout_user()  # Logout between tests
            
            results['student_login'] = self.test_valid_login_student()
            self.logout_user()
            
            # Test invalid logins
            results['invalid_password'] = self.test_invalid_login_wrong_password()
            results['nonexistent_user'] = self.test_invalid_login_nonexistent_user()
            
            # Test registration
            new_email = self.test_user_registration_valid()
            results['new_user_registration'] = bool(new_email)
            
            if new_email:
                results['duplicate_email_registration'] = self.test_user_registration_duplicate_email(new_email)
            else:
                results['duplicate_email_registration'] = self.test_user_registration_duplicate_email()
            
            # Test password recovery
            results['forgot_password'] = self.test_forgot_password_request()
            
            # Test logout and session
            results['logout'] = self.test_logout_functionality()
            results['session_persistence'] = self.test_session_persistence()
            
        except Exception as e:
            self.logger.add_log(f"Authentication test suite failed: {str(e)}", "FAIL")
        finally:
            self.teardown_driver()
        
        # Summary
        passed = sum(1 for result in results.values() if result)
        total = len(results)
        self.logger.add_log(f"Authentication tests completed: {passed}/{total} passed", "INFO")
        
        return results 