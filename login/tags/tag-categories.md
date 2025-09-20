# Playwright Test Tags - Login Page Testing

## Tag Categories Overview

This document defines comprehensive tag categories for organizing and running login page tests efficiently.

## 1. Priority Tags

### @critical
- **Description**: Essential tests that must pass for basic functionality
- **Usage**: Core login functionality, authentication flow
- **Examples**: Valid login, invalid login, password validation

### @high
- **Description**: Important tests for user experience
- **Usage**: UI interactions, form validation, error handling
- **Examples**: Field validation, error messages, UI responsiveness

### @medium
- **Description**: Nice-to-have tests for enhanced functionality
- **Usage**: Advanced features, edge cases
- **Examples**: Remember me checkbox, keyboard navigation

### @low
- **Description**: Optional tests for comprehensive coverage
- **Usage**: Rare scenarios, accessibility features
- **Examples**: Screen reader compatibility, advanced keyboard shortcuts

## 2. Test Type Tags

### @smoke
- **Description**: Quick validation tests for basic functionality
- **Usage**: Pre-deployment verification, quick health checks
- **Examples**: Basic login flow, page load verification

### @regression
- **Description**: Tests to prevent previously fixed bugs from reoccurring
- **Usage**: Bug fix verification, stability testing
- **Examples**: Specific bug scenarios, edge case handling

### @integration
- **Description**: Tests that verify multiple components working together
- **Usage**: End-to-end workflows, system integration
- **Examples**: Complete login flow with navigation, multi-step processes

### @unit
- **Description**: Tests for individual components or functions
- **Usage**: Component-level testing, isolated functionality
- **Examples**: Form field validation, individual button behavior

## 3. Environment Tags

### @staging
- **Description**: Tests specific to staging environment
- **Usage**: Pre-production testing, staging-specific features
- **Examples**: Staging URL tests, staging-specific configurations

### @production
- **Description**: Tests for production environment
- **Usage**: Production-ready validation, live environment testing
- **Examples**: Production URL tests, live data validation

### @local
- **Description**: Tests for local development environment
- **Usage**: Development testing, local server validation
- **Examples**: Localhost tests, development configurations

## 4. Browser Tags

### @chrome
- **Description**: Tests specific to Chrome browser
- **Usage**: Chrome-specific functionality, Chrome-only features
- **Examples**: Chrome autofill, Chrome-specific UI elements

### @firefox
- **Description**: Tests specific to Firefox browser
- **Usage**: Firefox-specific functionality, Firefox-only features
- **Examples**: Firefox autofill, Firefox-specific UI elements

### @safari
- **Description**: Tests specific to Safari browser
- **Usage**: Safari-specific functionality, Safari-only features
- **Examples**: Safari autofill, Safari-specific UI elements

### @mobile
- **Description**: Tests for mobile browsers
- **Usage**: Mobile-specific functionality, responsive design
- **Examples**: Touch interactions, mobile UI elements

## 5. Feature Tags

### @authentication
- **Description**: Tests related to user authentication
- **Usage**: Login, logout, session management
- **Examples**: Valid login, invalid login, session timeout

### @validation
- **Description**: Tests for form validation and input checking
- **Usage**: Field validation, error handling, input sanitization
- **Examples**: Email format validation, password strength, required fields

### @ui
- **Description**: Tests for user interface elements and interactions
- **Usage**: UI responsiveness, element visibility, user interactions
- **Examples**: Button states, form layout, error message display

### @security
- **Description**: Tests for security-related functionality
- **Usage**: Security measures, data protection, access control
- **Examples**: Password masking, CSRF protection, secure headers

### @accessibility
- **Description**: Tests for accessibility compliance
- **Usage**: Screen reader support, keyboard navigation, ARIA labels
- **Examples**: Tab navigation, screen reader compatibility, color contrast

## 6. Performance Tags

### @performance
- **Description**: Tests for performance-related functionality
- **Usage**: Load times, response times, resource usage
- **Examples**: Page load speed, API response times, memory usage

### @load
- **Description**: Tests for load testing scenarios
- **Usage**: High user load, concurrent access, stress testing
- **Examples**: Multiple concurrent logins, high traffic scenarios

## 7. Data Tags

### @positive
- **Description**: Tests with valid, expected data
- **Usage**: Happy path testing, successful scenarios
- **Examples**: Valid credentials, correct form inputs

### @negative
- **Description**: Tests with invalid, unexpected data
- **Usage**: Error handling, edge cases, failure scenarios
- **Examples**: Invalid credentials, malformed inputs, boundary values

### @boundary
- **Description**: Tests for boundary value conditions
- **Usage**: Edge cases, limit testing, boundary validation
- **Examples**: Maximum field lengths, minimum values, edge conditions

## 8. User Role Tags

### @admin
- **Description**: Tests for administrator user roles
- **Usage**: Admin-specific functionality, elevated permissions
- **Examples**: Admin login, admin-only features, elevated access

### @user
- **Description**: Tests for regular user roles
- **Usage**: Standard user functionality, normal permissions
- **Examples**: Regular user login, standard features, normal access

### @guest
- **Description**: Tests for guest/unauthenticated users
- **Usage**: Public access, unauthenticated functionality
- **Examples**: Public page access, guest features, unauthenticated flows

## 9. Maintenance Tags

### @flaky
- **Description**: Tests that are known to be unstable
- **Usage**: Tests that may fail intermittently, need investigation
- **Examples**: Network-dependent tests, timing-sensitive tests

### @skip
- **Description**: Tests that should be skipped
- **Usage**: Disabled tests, tests under development, known failures
- **Examples**: Work-in-progress tests, temporarily disabled tests

### @fixme
- **Description**: Tests that need to be fixed
- **Usage**: Broken tests, tests with known issues
- **Examples**: Failing tests, tests with incorrect assertions

## 10. Execution Tags

### @slow
- **Description**: Tests that take a long time to execute
- **Usage**: Long-running tests, complex scenarios
- **Examples**: Full workflow tests, comprehensive integration tests

### @fast
- **Description**: Tests that execute quickly
- **Usage**: Quick validation, simple checks
- **Examples**: Basic assertions, simple interactions

### @parallel
- **Description**: Tests that can run in parallel
- **Usage**: Independent tests, non-conflicting scenarios
- **Examples**: Isolated tests, independent functionality

### @serial
- **Description**: Tests that must run sequentially
- **Usage**: Dependent tests, state-dependent scenarios
- **Examples**: Tests that depend on previous test state, cleanup tests
