#!/usr/bin/env python3
"""
Main Test Runner for RavenCode Frontend Test Suite
Orchestrates and executes all test suites with comprehensive reporting
"""

import sys
import argparse
import time
from datetime import datetime

# Import test suites
from test_logger import TestLogger
from test_suites.test_authentication import AuthenticationTests
from test_suites.test_modules import ModuleTests

# Import the original monolithic test (converted from your provided file)
from legacy_test import LegacyIntegrationTest


class RavenCodeTestRunner:
    """Main test runner for RavenCode frontend tests"""
    
    def __init__(self, verbose=False, headless=False, timeout=10):
        self.verbose = verbose
        self.headless = headless
        self.timeout = timeout
        self.logger = TestLogger("RavenCode Frontend Test Suite")
        self.all_results = {}
        
    def run_authentication_tests(self):
        """Run authentication test suite"""
        self.logger.add_log("=" * 60, "INFO")
        self.logger.add_log("STARTING AUTHENTICATION TESTS", "INFO")
        self.logger.add_log("=" * 60, "INFO")
        
        auth_tests = AuthenticationTests(self.logger)
        results = auth_tests.run_all_tests()
        self.all_results['authentication'] = results
        return results
    
    def run_module_tests(self):
        """Run module workflow test suite"""
        self.logger.add_log("=" * 60, "INFO")
        self.logger.add_log("STARTING MODULE WORKFLOW TESTS", "INFO")
        self.logger.add_log("=" * 60, "INFO")
        
        module_tests = ModuleTests(self.logger)
        results = module_tests.run_all_tests()
        self.all_results['modules'] = results
        return results
    
    def run_legacy_integration_test(self):
        """Run the original comprehensive integration test"""
        self.logger.add_log("=" * 60, "INFO")
        self.logger.add_log("STARTING LEGACY INTEGRATION TEST", "INFO")
        self.logger.add_log("=" * 60, "INFO")
        
        legacy_test = LegacyIntegrationTest(self.logger)
        results = legacy_test.run_all_tests()
        self.all_results['legacy_integration'] = results
        return results
    
    def run_specific_test(self, test_name):
        """Run a specific test by name"""
        self.logger.add_log(f"Running specific test: {test_name}", "INFO")
        
        # Map test names to methods
        test_methods = {
            # Authentication tests
            'test_login_valid_admin': lambda: AuthenticationTests(self.logger).test_valid_login_admin(),
            'test_login_valid_student': lambda: AuthenticationTests(self.logger).test_valid_login_student(),
            'test_login_invalid': lambda: AuthenticationTests(self.logger).test_invalid_login_wrong_password(),
            'test_registration_new': lambda: AuthenticationTests(self.logger).test_user_registration_valid(),
            'test_registration_duplicate': lambda: AuthenticationTests(self.logger).test_user_registration_duplicate_email(),
            'test_forgot_password': lambda: AuthenticationTests(self.logger).test_forgot_password_request(),
            'test_logout': lambda: AuthenticationTests(self.logger).test_logout_functionality(),
            
            # Module tests
            'test_module1_workflow': lambda: ModuleTests(self.logger).test_module1_complete_workflow(),
            'test_module2_workflow': lambda: ModuleTests(self.logger).test_module2_complete_workflow(),
            'test_lesson_navigation': lambda: ModuleTests(self.logger).test_lesson_navigation_buttons(),
            'test_assessment_load': lambda: ModuleTests(self.logger).test_assessment_page_load(),
            
            # Legacy tests
            'test_legacy_full': lambda: LegacyIntegrationTest(self.logger).run_all_tests(),
        }
        
        if test_name in test_methods:
            # Setup driver for individual test
            test_instance = AuthenticationTests(self.logger)  # Use auth tests as base
            test_instance.setup_driver()
            
            try:
                result = test_methods[test_name]()
                self.all_results[test_name] = result
                return result
            finally:
                test_instance.teardown_driver()
        else:
            self.logger.add_log(f"Unknown test: {test_name}", "FAIL")
            available_tests = list(test_methods.keys())
            self.logger.add_log(f"Available tests: {', '.join(available_tests)}", "INFO")
            return False
    
    def run_test_suite(self, suite_name):
        """Run a specific test suite"""
        suite_methods = {
            'authentication': self.run_authentication_tests,
            'modules': self.run_module_tests,
            'legacy': self.run_legacy_integration_test,
            'all': self.run_all_tests
        }
        
        if suite_name in suite_methods:
            return suite_methods[suite_name]()
        else:
            self.logger.add_log(f"Unknown test suite: {suite_name}", "FAIL")
            available_suites = list(suite_methods.keys())
            self.logger.add_log(f"Available suites: {', '.join(available_suites)}", "INFO")
            return {}
    
    def run_all_tests(self):
        """Run all test suites"""
        self.logger.add_log("🚀 STARTING COMPREHENSIVE RAVENCODE FRONTEND TEST SUITE", "INFO")
        start_time = time.time()
        
        # Run all test suites
        auth_results = self.run_authentication_tests()
        module_results = self.run_module_tests()
        legacy_results = self.run_legacy_integration_test()
        
        # Calculate overall statistics
        total_time = time.time() - start_time
        self.generate_final_summary(total_time)
        
        return {
            'authentication': auth_results,
            'modules': module_results,
            'legacy': legacy_results
        }
    
    def generate_final_summary(self, total_time):
        """Generate final test summary"""
        self.logger.add_log("=" * 80, "INFO")
        self.logger.add_log("FINAL TEST SUMMARY", "INFO")
        self.logger.add_log("=" * 80, "INFO")
        
        total_tests = 0
        total_passed = 0
        
        for suite_name, suite_results in self.all_results.items():
            if isinstance(suite_results, dict):
                suite_total = len(suite_results)
                suite_passed = sum(1 for result in suite_results.values() if result)
            else:
                suite_total = 1
                suite_passed = 1 if suite_results else 0
            
            total_tests += suite_total
            total_passed += suite_passed
            
            self.logger.add_log(f"{suite_name.upper()}: {suite_passed}/{suite_total} passed", "INFO")
        
        pass_rate = (total_passed / total_tests * 100) if total_tests > 0 else 0
        
        self.logger.add_log("-" * 80, "INFO")
        self.logger.add_log(f"OVERALL RESULTS: {total_passed}/{total_tests} tests passed ({pass_rate:.1f}%)", "INFO")
        self.logger.add_log(f"TOTAL EXECUTION TIME: {total_time:.2f} seconds", "INFO")
        
        if pass_rate >= 90:
            self.logger.add_log("🎉 EXCELLENT! Test suite passed with high success rate", "PASS")
        elif pass_rate >= 75:
            self.logger.add_log("✅ GOOD! Test suite passed with acceptable success rate", "PASS")
        elif pass_rate >= 50:
            self.logger.add_log("⚠️  WARNING! Test suite has moderate success rate", "WARN")
        else:
            self.logger.add_log("❌ CRITICAL! Test suite has low success rate", "FAIL")
        
        self.logger.add_log("=" * 80, "INFO")


def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(description='RavenCode Frontend Test Suite')
    parser.add_argument('--suite', choices=['authentication', 'modules', 'legacy', 'all'], 
                       default='all', help='Test suite to run')
    parser.add_argument('--test', help='Specific test to run')
    parser.add_argument('--headless', action='store_true', help='Run in headless mode')
    parser.add_argument('--timeout', type=int, default=10, help='Default timeout in seconds')
    parser.add_argument('--verbose', action='store_true', help='Verbose output')
    parser.add_argument('--debug', action='store_true', help='Debug mode with extra logging')
    
    args = parser.parse_args()
    
    # Initialize test runner
    runner = RavenCodeTestRunner(
        verbose=args.verbose or args.debug,
        headless=args.headless,
        timeout=args.timeout
    )
    
    runner.logger.start_test()
    
    try:
        if args.test:
            # Run specific test
            result = runner.run_specific_test(args.test)
            success = bool(result)
        elif args.suite:
            # Run test suite
            results = runner.run_test_suite(args.suite)
            success = any(results.values()) if results else False
        else:
            # Run all tests
            results = runner.run_all_tests()
            success = any(any(suite_results.values()) if isinstance(suite_results, dict) else suite_results 
                         for suite_results in results.values())
        
    except KeyboardInterrupt:
        runner.logger.add_log("Test execution interrupted by user", "WARN")
        success = False
    except Exception as e:
        runner.logger.add_log(f"Test execution failed with error: {str(e)}", "FAIL")
        success = False
    finally:
        runner.logger.end_test()
        
        # Generate PDF report
        report_num = runner.logger.generate_pdf()
        if report_num:
            print(f"\n📊 Report generated: ravencode_frontend_test_report_{report_num:010d}.pdf")
        
        # Print final status
        if success:
            print("\n✅ Test execution completed successfully!")
            sys.exit(0)
        else:
            print("\n❌ Test execution completed with failures!")
            sys.exit(1)


if __name__ == "__main__":
    main() 