# RavenCode Frontend Test Suite - Quick Start

## 🚀 Quick Start

### 1. Setup
```bash
# Install dependencies
pip install selenium webdriver-manager reportlab Pillow

# Ensure your RavenCode frontend is running
# Default expected URL: http://localhost:3000
```

### 2. Run Tests
```bash
# Run all tests
python run_tests.py

# Run specific test suite
python run_tests.py --suite authentication
python run_tests.py --suite modules

# Run in headless mode (no browser window)
python run_tests.py --headless

# Run with verbose output
python run_tests.py --verbose
```

### 3. View Results
- **Console**: Real-time colored output
- **PDF Report**: Generated in `reports/` directory
- **Screenshots**: Failed tests saved in `screenshots/`

## 📋 Test Categories

### Authentication Tests
- ✅ Valid admin login
- ✅ Valid student login  
- ✅ Invalid login attempts
- ✅ User registration (new/duplicate)
- ✅ Password recovery
- ✅ Logout functionality
- ✅ Session persistence

### Module Workflow Tests
- ✅ Complete Module 1 workflow
- ✅ Complete Module 2 workflow
- ✅ Lesson navigation
- ✅ Assessment page loading
- ✅ Progress tracking
- ✅ Role-based access

### Legacy Integration Tests
- ✅ Dashboard functionality
- ✅ Settings updates
- ✅ End-to-end workflows

## 🔧 Configuration

Edit `config.py` to customize:
- Base URL (default: http://localhost:3000)
- Timeouts
- Test user credentials
- Browser settings

## 📊 Expected Results

A successful test run should show:
- **90%+ pass rate** for core functionality
- **PDF report** with detailed logs
- **Screenshots** only for failed tests

## 🐛 Troubleshooting

### Common Issues
1. **Chrome driver**: Auto-downloaded by webdriver-manager
2. **Element not found**: Increase timeout in config.py
3. **Login failures**: Verify test users exist in database

### Test Users Required
The tests expect these users to exist in your database:
- **Admin**: camurcioa@unal.edu.co / RavenCode123
- **Student**: tatianitalamasbonita@example.com / Tatis123

### Debug Mode
```bash
python run_tests.py --verbose --debug
```

## 🎯 Test Coverage

- **Authentication**: Login, registration, password recovery
- **Navigation**: All major pages and routes
- **Modules**: Complete learning workflows
- **User Management**: Profile updates, settings
- **Admin Features**: Admin-specific functionality
- **Error Handling**: Invalid inputs and edge cases

## 📈 Reporting

Each test run generates:
1. **Console output** with real-time progress
2. **PDF report** with:
   - Test summary
   - Pass/fail statistics
   - Detailed logs by category
   - Execution time
3. **Screenshots** for debugging failures

## 🔄 Continuous Integration

To run in CI/CD:
```bash
python run_tests.py --headless --timeout 30
```

Exit codes:
- `0`: All tests passed
- `1`: Some tests failed 