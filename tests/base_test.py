"""
Base Test Class for RavenCode Frontend Test Suite
Contains common utilities and setup for all tests
"""

import time
import os
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from test_logger import TestLogger
from config import (
    BASE_URL, DEFAULT_TIMEOUT, HEADLESS, WINDOW_WIDTH, WINDOW_HEIGHT,
    SCREENSHOTS_DIR, UI_ELEMENTS, SUCCESS_MESSAGES, ERROR_MESSAGES
)


class BaseTest:
    """Base test class with common functionality"""
    
    def __init__(self, logger=None):
        self.logger = logger or TestLogger()
        self.driver = None
        self.wait = None
        
    def setup_driver(self):
        """Setup Chrome WebDriver"""
        options = Options()
        if HEADLESS:
            options.add_argument('--headless')
        options.add_argument(f'--window-size={WINDOW_WIDTH},{WINDOW_HEIGHT}')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-gpu')
        options.add_argument('--disable-extensions')
        
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=options)
        self.driver.set_window_size(WINDOW_WIDTH, WINDOW_HEIGHT)
        self.wait = WebDriverWait(self.driver, DEFAULT_TIMEOUT)
        
        self.logger.add_log("WebDriver setup completed", "INFO")
        
    def teardown_driver(self):
        """Cleanup WebDriver"""
        if self.driver:
            self.driver.quit()
            self.logger.add_log("WebDriver closed", "INFO")
            
    def navigate_to(self, path):
        """Navigate to a specific path"""
        url = f"{BASE_URL}{path}"
        self.driver.get(url)
        time.sleep(1)  # Allow page to load
        self.logger.add_log(f"Navigated to {url}", "INFO")
        
    def take_screenshot(self, name):
        """Take a screenshot"""
        if not self.driver:
            return None
            
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{name}_{timestamp}.png"
        filepath = os.path.join(SCREENSHOTS_DIR, filename)
        
        try:
            self.driver.save_screenshot(filepath)
            self.logger.add_log(f"Screenshot saved: {filename}", "INFO")
            return filepath
        except Exception as e:
            self.logger.add_log(f"Failed to take screenshot: {str(e)}", "FAIL")
            return None
            
    def wait_for_element(self, locator_type, locator_value, timeout=None):
        """Wait for element to be present"""
        timeout = timeout or DEFAULT_TIMEOUT
        try:
            if locator_type == "id":
                element = WebDriverWait(self.driver, timeout).until(
                    EC.presence_of_element_located((By.ID, locator_value))
                )
            elif locator_type == "xpath":
                element = WebDriverWait(self.driver, timeout).until(
                    EC.presence_of_element_located((By.XPATH, locator_value))
                )
            elif locator_type == "class":
                element = WebDriverWait(self.driver, timeout).until(
                    EC.presence_of_element_located((By.CLASS_NAME, locator_value))
                )
            else:
                raise ValueError(f"Unsupported locator type: {locator_type}")
                
            return element
        except Exception as e:
            self.logger.add_log(f"Element not found: {locator_type}='{locator_value}' - {str(e)}", "FAIL")
            return None
            
    def wait_for_clickable(self, locator_type, locator_value, timeout=None):
        """Wait for element to be clickable"""
        timeout = timeout or DEFAULT_TIMEOUT
        try:
            if locator_type == "id":
                element = WebDriverWait(self.driver, timeout).until(
                    EC.element_to_be_clickable((By.ID, locator_value))
                )
            elif locator_type == "xpath":
                element = WebDriverWait(self.driver, timeout).until(
                    EC.element_to_be_clickable((By.XPATH, locator_value))
                )
            else:
                raise ValueError(f"Unsupported locator type: {locator_type}")
                
            return element
        except Exception as e:
            self.logger.add_log(f"Element not clickable: {locator_type}='{locator_value}' - {str(e)}", "FAIL")
            return None
            
    def find_element_safely(self, locator_type, locator_value):
        """Find element without throwing exception"""
        try:
            if locator_type == "id":
                return self.driver.find_element(By.ID, locator_value)
            elif locator_type == "xpath":
                return self.driver.find_element(By.XPATH, locator_value)
            elif locator_type == "class":
                return self.driver.find_element(By.CLASS_NAME, locator_value)
            else:
                raise ValueError(f"Unsupported locator type: {locator_type}")
        except Exception:
            return None
            
    def scroll_to_element(self, element):
        """Scroll to element"""
        try:
            self.driver.execute_script("arguments[0].scrollIntoView(true);", element)
            time.sleep(0.5)  # Allow scroll to complete
        except Exception as e:
            self.logger.add_log(f"Failed to scroll to element: {str(e)}", "WARN")
            
    def wait_for_toast_message(self, expected_message=None, timeout=10):
        """Wait for toast notification"""
        try:
            toast_element = WebDriverWait(self.driver, timeout).until(
                EC.presence_of_element_located((By.XPATH, "//*[contains(@class, 'react-hot-toast') or contains(@class, 'toaster')]"))
            )
            
            if expected_message:
                message_element = WebDriverWait(self.driver, timeout).until(
                    EC.presence_of_element_located((By.XPATH, f"//*[contains(text(), '{expected_message}')]"))
                )
                return message_element.text
            
            return toast_element.text
        except Exception as e:
            self.logger.add_log(f"Toast message not found: {str(e)}", "FAIL")
            return None
            
    def check_page_load(self, expected_element_xpath, page_name):
        """Check if page loaded correctly"""
        try:
            self.wait_for_element("xpath", expected_element_xpath)
            self.logger.add_log(f"{page_name} page loaded successfully", "PASS")
            return True
        except Exception as e:
            self.logger.add_log(f"{page_name} page failed to load: {str(e)}", "FAIL")
            self.take_screenshot(f"page_load_fail_{page_name}")
            return False
            
    def login_user(self, email, password, expect_success=True):
        """Generic login function"""
        self.navigate_to("/login")
        
        try:
            # Find and fill email
            email_input = self.wait_for_element("id", "email")
            if not email_input:
                return False
                
            email_input.clear()
            email_input.send_keys(email)
            
            # Find and fill password
            password_input = self.find_element_safely("id", "password")
            if not password_input:
                self.logger.add_log("Password input not found", "FAIL")
                return False
                
            password_input.clear()
            password_input.send_keys(password)
            
            # Click login button
            login_button = self.wait_for_clickable("xpath", "//button[contains(., 'Iniciar sesión')]")
            if not login_button:
                return False
                
            login_button.click()
            time.sleep(2)
            
            if expect_success:
                # Check for successful login (dashboard)
                success = self.wait_for_element("xpath", "//h2[contains(., 'Bienvenido')]", timeout=10)
                if success:
                    self.logger.add_log(f"Login successful for {email}", "PASS")
                    return True
                else:
                    self.logger.add_log(f"Login failed for {email} - Dashboard not reached", "FAIL")
                    return False
            else:
                # For invalid login, we expect to stay on login page
                time.sleep(2)
                if "login" in self.driver.current_url.lower():
                    self.logger.add_log(f"Invalid login correctly rejected for {email}", "PASS")
                    return True
                else:
                    self.logger.add_log(f"Invalid login incorrectly accepted for {email}", "FAIL")
                    return False
                    
        except Exception as e:
            self.logger.add_log(f"Login process failed: {str(e)}", "FAIL")
            self.take_screenshot("login_error")
            return False
            
    def logout_user(self):
        """Logout current user"""
        try:
            # Look for user menu/profile dropdown
            profile_button = self.find_element_safely("xpath", "//button[contains(@class, 'profile') or contains(@aria-label, 'profile')]")
            if profile_button:
                profile_button.click()
                time.sleep(1)
                
            # Look for logout button/link
            logout_element = self.wait_for_clickable("xpath", "//button[contains(., 'Cerrar sesión')] | //a[contains(., 'Cerrar sesión')]")
            if logout_element:
                logout_element.click()
                time.sleep(2)
                
                # Verify we're back to login page
                if "login" in self.driver.current_url.lower():
                    self.logger.add_log("Logout successful", "PASS")
                    return True
                    
            self.logger.add_log("Logout failed", "FAIL")
            return False
            
        except Exception as e:
            self.logger.add_log(f"Logout process failed: {str(e)}", "FAIL") 