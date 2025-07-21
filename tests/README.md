# RavenCode Frontend Test Suite

This is a comprehensive Selenium-based test suite for the RavenCode frontend application. The tests are designed to be run independently from any repository and cover all major functionalities and user workflows.

## Prerequisites

1. **Python 3.7+**
2. **Chrome Browser** (latest version recommended)
3. **Required Python packages**:
   ```bash
   pip install selenium webdriver-manager reportlab
   ```

## Setup

1. Clone or download this test suite to any directory
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Ensure your RavenCode frontend is running on `http://localhost:3000`

## Test Structure

```
tests/
├── README.md
├── requirements.txt
├── test_logger.py              # Logging and PDF report generation
├── base_test.py               # Base test class with common utilities
├── config.py                  # Test configuration and constants
├── page_objects/              # Page Object Model classes
│   ├── __init__.py
│   ├── login_page.py
│   ├── register_page.py
│   ├── dashboard_page.py
│   ├── courses_page.py
│   ├── achievements_page.py
│   ├── settings_page.py
│   ├── admin_pages.py
│   └── module_pages.py
├── test_suites/               # Organized test suites
│   ├── __init__.py
│   ├── test_authentication.py
│   ├── test_user_management.py
│   ├── test_courses.py
│   ├── test_modules.py
│   ├── test_achievements.py
│   ├── test_admin.py
│   └── test_navigation.py
├── test_data/                 # Test data and fixtures
│   ├── __init__.py
│   ├── users.py
│   └── courses.py
└── run_tests.py              # Main test runner
```

## Running Tests

### Run All Tests
```bash
python run_tests.py
```

### Run Specific Test Suite
```bash
python run_tests.py --suite authentication
python run_tests.py --suite courses
python run_tests.py --suite admin
```

### Run Single Test
```bash
python run_tests.py --test test_login_valid_user
```

### Run with Options
```bash
# Run in headless mode
python run_tests.py --headless

# Run with custom timeout
python run_tests.py --timeout 30

# Generate detailed logs
python run_tests.py --verbose
```

## Test Coverage

### Authentication & Authorization
- Valid/Invalid login
- User registration (new/duplicate)
- Password recovery flow
- Session management
- Admin vs Student role access

### User Management
- Profile updates
- Settings configuration
- User preferences
- Account information display

### Course Navigation
- Course listing
- Module access
- Lesson progression
- Assessment completion

### Module Workflows
- Complete Module 1 workflow
- Complete Module 2 workflow
- Lesson navigation
- Assessment submissions

### Achievement System
- Achievement display
- Achievement details
- Diploma management
- Progress tracking

### Admin Functionality
- User management
- Course administration
- Achievement management
- Admin dashboard access

### Navigation & UI
- Sidebar navigation
- Header functionality
- Responsive behavior
- Error handling

## Test Data

The test suite uses a combination of:
- **Static test data** (defined in `test_data/`)
- **Dynamic test data** (generated during test execution)
- **Environment-specific data** (configurable in `config.py`)

## Reports

After each test run, you'll get:
- **Console output** with real-time test progress
- **PDF report** with detailed test results
- **Screenshots** for failed tests (saved in `screenshots/`)

## Configuration

Edit `config.py` to customize:
- Base URL
- Timeouts
- Test user credentials
- Browser settings

## Troubleshooting

### Common Issues

1. **Chrome driver issues**: The test suite uses `webdriver-manager` to automatically download the correct Chrome driver
2. **Element not found**: Increase timeouts in `config.py` if your application loads slowly
3. **Login failures**: Ensure test user accounts exist in your database

### Debug Mode

Run with verbose logging to see detailed execution steps:
```bash
python run_tests.py --verbose --debug
```

## Contributing

When adding new tests:
1. Follow the Page Object Model pattern
2. Add test data to appropriate files in `test_data/`
3. Use descriptive test names and add proper logging
4. Update this README if adding new test suites

## Test Environment

- **Browser**: Chrome (latest)
- **Resolution**: 1920x1080 (configurable)
- **Timeout**: 10 seconds default (configurable)
- **Screenshots**: Captured on failures 