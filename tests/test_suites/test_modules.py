"""
Module Workflow Test Suite for RavenCode Frontend
Tests complete module workflows, lesson navigation, and assessment completion
"""

import time
from base_test import BaseTest
from test_data.users import get_admin_user, get_student_user


class ModuleTests(BaseTest):
    """Test suite for module functionality"""
    
    def test_module1_complete_workflow(self):
        """Test complete Module 1 workflow from courses to assessment"""
        self.logger.add_log("Testing Module 1 complete workflow", "INFO")
        
        # Use admin user for comprehensive access
        admin_user = get_admin_user()
        
        try:
            # 1. Login
            if not self.login_user(admin_user['email'], admin_user['password']):
                return False
            
            # 2. Navigate to Courses
            self.navigate_to("/courses")
            self.logger.add_log("Navigated to Cursos page", "INFO")
            
            # Wait for courses page to load
            if not self.check_page_load("//h1[contains(., 'Cursos')]", "Courses"):
                return False
            
            # 3. Find Module 1 card
            module1_card = self.wait_for_element("xpath", "//*[normalize-space(text())='Módulo 1: Fundamentos de Python']", timeout=30)
            if not module1_card:
                self.logger.add_log("Module 1 card not found", "FAIL")
                return False
            
            self.logger.add_log("Found Module 1 card", "PASS")
            
            # 4. Click "Ver contenidos" for Module 1
            ver_contenidos_btn = self.wait_for_clickable("xpath", "//button[contains(., 'Ver contenidos')]")
            if not ver_contenidos_btn:
                return False
            
            self.scroll_to_element(ver_contenidos_btn)
            ver_contenidos_btn.click()
            self.logger.add_log("Clicked 'Ver contenidos'", "INFO")
            time.sleep(2)
            
            # 5. Click "Ver lección" for Introduction
            ver_leccion_intro_btn = self.wait_for_clickable("xpath", "//button[contains(., 'Ver lección')][ancestor::*[contains(., 'Introducción')]]")
            if not ver_leccion_intro_btn:
                self.logger.add_log("Introduction 'Ver lección' button not found", "FAIL")
                return False
            
            self.scroll_to_element(ver_leccion_intro_btn)
            ver_leccion_intro_btn.click()
            self.logger.add_log("Clicked 'Ver lección' for Introduction", "INFO")
            time.sleep(2)
            
            # 6. Click "Inicia tu aprendizaje"
            inicia_btn = self.wait_for_clickable("xpath", "//button[contains(., 'Inicia tu aprendizaje')]")
            if not inicia_btn:
                self.logger.add_log("'Inicia tu aprendizaje' button not found", "FAIL")
                return False
            
            self.scroll_to_element(inicia_btn)
            inicia_btn.click()
            self.logger.add_log("Clicked 'Inicia tu aprendizaje'", "INFO")
            time.sleep(2)
            
            # 7. Navigate through lessons 1-5
            for lesson_num in range(1, 6):
                # Verify we're on the correct lesson
                lesson_indicator = self.wait_for_element("xpath", f"//*[contains(text(), 'Lección {lesson_num}')]", timeout=10)
                if lesson_indicator:
                    self.logger.add_log(f"Successfully on Lección {lesson_num}", "PASS")
                else:
                    self.logger.add_log(f"Could not verify Lección {lesson_num}", "WARN")
                
                # Click "Siguiente" to go to next lesson
                siguiente_btn = self.wait_for_clickable("xpath", "//button[contains(., 'Siguiente')]")
                if siguiente_btn:
                    self.scroll_to_element(siguiente_btn)
                    siguiente_btn.click()
                    self.logger.add_log(f"Clicked 'Siguiente' on Lección {lesson_num}", "INFO")
                    time.sleep(2)
                else:
                    self.logger.add_log(f"'Siguiente' button not found on Lección {lesson_num}", "FAIL")
                    return False
            
            # 8. On the last lesson, click "Reto" instead of "Siguiente"
            reto_btn = self.wait_for_clickable("xpath", "//button[contains(., 'Reto')]")
            if not reto_btn:
                self.logger.add_log("'Reto' button not found on final lesson", "FAIL")
                return False
            
            self.scroll_to_element(reto_btn)
            reto_btn.click()
            self.logger.add_log("Clicked 'Reto' on final lesson", "INFO")
            time.sleep(2)
            
            # 9. Verify we reached the assessment
            assessment_indicator = self.wait_for_element("xpath", "//*[contains(text(), 'Evaluación Juez Módulo 1')]", timeout=10)
            if assessment_indicator:
                self.logger.add_log("Successfully reached Module 1 assessment", "PASS")
                return True
            else:
                self.logger.add_log("Failed to reach Module 1 assessment", "FAIL")
                return False
                
        except Exception as e:
            self.logger.add_log(f"Module 1 workflow failed: {str(e)}", "FAIL")
            self.take_screenshot("module1_workflow_error")
            return False
    
    def test_module2_complete_workflow(self):
        """Test complete Module 2 workflow"""
        self.logger.add_log("Testing Module 2 complete workflow", "INFO")
        
        admin_user = get_admin_user()
        
        try:
            # Login if not already logged in
            if not self.login_user(admin_user['email'], admin_user['password']):
                return False
            
            # Navigate to Courses
            self.navigate_to("/courses")
            
            if not self.check_page_load("//h1[contains(., 'Cursos')]", "Courses"):
                return False
            
            # Find Module 2 card (may have different naming)
            module2_card = self.wait_for_element("xpath", "//*[contains(text(), 'Módulo 2')]", timeout=30)
            if not module2_card:
                self.logger.add_log("Module 2 card not found", "FAIL")
                return False
            
            self.logger.add_log("Found Module 2 card", "PASS")
            
            # Click "Ver contenidos" for Module 2
            # Look for the second "Ver contenidos" button or one associated with Module 2
            ver_contenidos_btns = self.driver.find_elements("xpath", "//button[contains(., 'Ver contenidos')]")
            if len(ver_contenidos_btns) >= 2:
                module2_btn = ver_contenidos_btns[1]  # Assuming Module 2 is second
                self.scroll_to_element(module2_btn)
                module2_btn.click()
                self.logger.add_log("Clicked 'Ver contenidos' for Module 2", "INFO")
                time.sleep(2)
            else:
                self.logger.add_log("Module 2 'Ver contenidos' button not found", "FAIL")
                return False
            
            # Navigate through Module 2 lessons (assuming 4 lessons)
            for lesson_num in range(1, 5):
                lesson_indicator = self.wait_for_element("xpath", f"//*[contains(text(), 'Lección {lesson_num}')]", timeout=10)
                if lesson_indicator:
                    self.logger.add_log(f"On Module 2 Lección {lesson_num}", "PASS")
                else:
                    self.logger.add_log(f"Could not verify Module 2 Lección {lesson_num}", "WARN")
                
                # Navigate to next lesson or assessment
                if lesson_num < 4:
                    siguiente_btn = self.wait_for_clickable("xpath", "//button[contains(., 'Siguiente')]")
                    if siguiente_btn:
                        self.scroll_to_element(siguiente_btn)
                        siguiente_btn.click()
                        time.sleep(2)
                else:
                    # On last lesson, look for assessment button
                    reto_btn = self.wait_for_clickable("xpath", "//button[contains(., 'Reto') or contains(., 'Evaluación')]")
                    if reto_btn:
                        self.scroll_to_element(reto_btn)
                        reto_btn.click()
                        time.sleep(2)
            
            # Verify we reached Module 2 assessment
            assessment_indicator = self.wait_for_element("xpath", "//*[contains(text(), 'Evaluación Juez Módulo 2') or contains(text(), 'Módulo 2')]", timeout=10)
            if assessment_indicator:
                self.logger.add_log("Successfully reached Module 2 assessment", "PASS")
                return True
            else:
                self.logger.add_log("Failed to reach Module 2 assessment", "FAIL")
                return False
                
        except Exception as e:
            self.logger.add_log(f"Module 2 workflow failed: {str(e)}", "FAIL")
            self.take_screenshot("module2_workflow_error")
            return False
    
    def test_lesson_navigation_buttons(self):
        """Test lesson navigation button functionality"""
        self.logger.add_log("Testing lesson navigation buttons", "INFO")
        
        admin_user = get_admin_user()
        
        try:
            if not self.login_user(admin_user['email'], admin_user['password']):
                return False
            
            # Navigate directly to a module lesson
            self.navigate_to("/module1/lesson1")
            time.sleep(2)
            
            # Test "Siguiente" button
            siguiente_btn = self.find_element_safely("xpath", "//button[contains(., 'Siguiente')]")
            if siguiente_btn:
                self.logger.add_log("'Siguiente' button found", "PASS")
                
                # Click and verify navigation
                siguiente_btn.click()
                time.sleep(2)
                
                # Check if URL changed or content changed
                if "lesson2" in self.driver.current_url or self.find_element_safely("xpath", "//*[contains(text(), 'Lección 2')]"):
                    self.logger.add_log("'Siguiente' button works correctly", "PASS")
                else:
                    self.logger.add_log("'Siguiente' button may not be working", "WARN")
            else:
                self.logger.add_log("'Siguiente' button not found", "FAIL")
                return False
            
            # Test "Anterior" button if available
            anterior_btn = self.find_element_safely("xpath", "//button[contains(., 'Anterior') or contains(., 'Atrás')]")
            if anterior_btn:
                self.logger.add_log("'Anterior' button found", "PASS")
                anterior_btn.click()
                time.sleep(2)
            
            return True
            
        except Exception as e:
            self.logger.add_log(f"Lesson navigation test failed: {str(e)}", "FAIL")
            return False
    
    def test_assessment_page_load(self):
        """Test that assessment pages load correctly"""
        self.logger.add_log("Testing assessment page load", "INFO")
        
        admin_user = get_admin_user()
        
        try:
            if not self.login_user(admin_user['email'], admin_user['password']):
                return False
            
            # Test Module 1 assessment direct access
            self.navigate_to("/module1/assessment")
            time.sleep(2)
            
            # Look for assessment elements
            assessment_elements = [
                "//*[contains(text(), 'Evaluación')]",
                "//*[contains(text(), 'Juez')]",
                "//*[contains(text(), 'Pregunta')]",
                "//textarea",
                "//button[contains(., 'Enviar') or contains(., 'Submit')]"
            ]
            
            found_elements = 0
            for element_xpath in assessment_elements:
                if self.find_element_safely("xpath", element_xpath):
                    found_elements += 1
            
            if found_elements >= 2:
                self.logger.add_log("Assessment page loaded with expected elements", "PASS")
                return True
            else:
                self.logger.add_log("Assessment page missing expected elements", "FAIL")
                return False
                
        except Exception as e:
            self.logger.add_log(f"Assessment page load test failed: {str(e)}", "FAIL")
            return False
    
    def test_module_progress_tracking(self):
        """Test module progress tracking"""
        self.logger.add_log("Testing module progress tracking", "INFO")
        
        student_user = get_student_user()
        
        try:
            if not self.login_user(student_user['email'], student_user['password']):
                return False
            
            # Go to dashboard to check progress
            self.navigate_to("/dashboard")
            
            if not self.check_page_load("//h2[contains(., 'Bienvenido')]", "Dashboard"):
                return False
            
            # Look for progress indicators
            progress_elements = [
                "//*[contains(text(), 'Progreso')]",
                "//*[contains(text(), '%')]",
                "//*[contains(@class, 'progress')]",
                "//div[contains(@style, 'width')]"  # Progress bars often use width styling
            ]
            
            found_progress = False
            for element_xpath in progress_elements:
                if self.find_element_safely("xpath", element_xpath):
                    found_progress = True
                    break
            
            if found_progress:
                self.logger.add_log("Progress tracking elements found", "PASS")
                return True
            else:
                self.logger.add_log("Progress tracking elements not found", "WARN")
                return False
                
        except Exception as e:
            self.logger.add_log(f"Progress tracking test failed: {str(e)}", "FAIL")
            return False
    
    def test_module_accessibility(self):
        """Test module accessibility for different user roles"""
        self.logger.add_log("Testing module accessibility", "INFO")
        
        # Test student access
        student_user = get_student_user()
        
        try:
            if not self.login_user(student_user['email'], student_user['password']):
                return False
            
            # Try to access modules
            module_paths = ["/courses", "/module1/introduction", "/module1/lesson1"]
            
            accessible_count = 0
            for path in module_paths:
                self.navigate_to(path)
                time.sleep(2)
                
                # Check if page loads without error
                if not ("404" in self.driver.page_source or "403" in self.driver.page_source or "Error" in self.driver.title):
                    accessible_count += 1
                    self.logger.add_log(f"Student can access {path}", "PASS")
                else:
                    self.logger.add_log(f"Student cannot access {path}", "WARN")
            
            if accessible_count >= 2:
                self.logger.add_log("Student has appropriate module access", "PASS")
                return True
            else:
                self.logger.add_log("Student has limited module access", "WARN")
                return False
                
        except Exception as e:
            self.logger.add_log(f"Module accessibility test failed: {str(e)}", "FAIL")
            return False
    
    def run_all_tests(self):
        """Run all module tests"""
        self.logger.add_log("Starting Module Test Suite", "INFO")
        results = {}
        
        try:
            self.setup_driver()
            
            # Test complete workflows
            results['module1_workflow'] = self.test_module1_complete_workflow()
            results['module2_workflow'] = self.test_module2_complete_workflow()
            
            # Test navigation and functionality
            results['lesson_navigation'] = self.test_lesson_navigation_buttons()
            results['assessment_load'] = self.test_assessment_page_load()
            results['progress_tracking'] = self.test_module_progress_tracking()
            results['module_accessibility'] = self.test_module_accessibility()
            
        except Exception as e:
            self.logger.add_log(f"Module test suite failed: {str(e)}", "FAIL")
        finally:
            self.teardown_driver()
        
        # Summary
        passed = sum(1 for result in results.values() if result)
        total = len(results)
        self.logger.add_log(f"Module tests completed: {passed}/{total} passed", "INFO")
        
        return results 