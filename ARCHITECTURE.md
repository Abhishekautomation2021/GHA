# Playwright Agent Demo - Architecture Overview

## High-Level Architecture

The Playwright Agent Demo follows a **5-layer architecture** designed around intelligent test automation using AI agents:

```
┌─────────────────────────────────────────────────────────────┐
│ LAYER 1: PLAYWRIGHT AGENTS                                   │
│ ├── Planner Agent       - Test plan generation               │
│ ├── Generator Agent     - Test code generation               │
│ └── Other Agents       - Supporting agents                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ LAYER 2: PLAYWRIGHT TEST FRAMEWORK                           │
│ ├── Page Object Model   - UI element abstractions            │
│ ├── Locators (CSS)      - Element location strategies        │
│ └── Assertions          - Test validations                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ LAYER 3: TEST SUITES                                         │
│ ├── Credential Validation Tests                              │
│ ├── UI/UX Interaction Tests                                  │
│ ├── Responsive Layout Tests                                  │
│ └── Accessibility Tests                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ LAYER 4: APPLICATION UNDER TEST                              │
│ └── Employee Portal                                          │
│     ├── HTML Form UI                                         │
│     ├── JavaScript Validation Logic                          │
│     └── Feedback System                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ LAYER 5: INFRASTRUCTURE                                      │
│ ├── Local Dev Server (Port 8081)                             │
│ ├── Chromium Browser Engine                                  │
│ └── Test Reports & Artifacts                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Layer Details

### LAYER 1: Playwright Agents

**Purpose**: AI-driven test automation orchestration

- **Planner Agent** (`prompts/planner.txt`)
  - Analyzes the application at `http://localhost:8081`
  - Creates comprehensive test plans in Markdown format
  - Generates structured test scenarios
  
- **Generator Agent** (`prompts/generator.txt`)
  - Converts test plans into executable Playwright TypeScript tests
  - Follows strict rules for code quality and maintainability
  - Uses CSS locators (not role-based) for element selection
  - Generates clean, descriptive test code with proper assertions

### LAYER 2: Playwright Test Framework

**Purpose**: Browser automation and test execution engine

- **Page Object Model**
  - Abstraction of UI elements using locators
  - Maintainable selector management
  
- **Locators**
  - CSS-based selectors (e.g., `#username`, `#password`, `button`)
  - Not role-based locators (follows generator rules)
  - Elements: Username input, Password input, Login button, Message display
  
- **Assertions & Validations**
  - Verify page titles
  - Check text content
  - Validate URL changes
  - Assert element visibility and focus states

### LAYER 3: Test Suites

**Purpose**: Organized test scenarios covering all aspects

**10 Test Suites in `tests/` directory**:

1. **accept-configured-valid-credentials.spec.ts**
   - Validates login with correct credentials (admin/password)
   - Verifies success message display

2. **reject-incorrect-credentials.spec.ts**
   - Tests rejection of invalid username/password combinations
   - Validates error message

3. **handle-empty-and-partial-credentials.spec.ts**
   - Tests empty input fields
   - Tests partial credential entry

4. **require-exact-credential-matching.spec.ts**
   - Tests case-sensitivity (admin ≠ Admin)
   - Tests whitespace handling (no trimming)

5. **keep-password-entry-masked.spec.ts**
   - Verifies password field type is "password"
   - Ensures no reveal/unmask buttons present

6. **use-login-controls-with-keyboard.spec.ts**
   - Tests Tab navigation
   - Tests Enter/Space key submission
   - Tests focus management

7. **check-login-accessibility-and-responsive-layout.spec.ts**
   - Tests across multiple viewport sizes
   - Validates responsive behavior
   - Ensures accessibility of form controls

8. **check-refresh-and-browser-history-behavior.spec.ts**
   - Tests page refresh behavior
   - Tests browser history navigation
   - Validates login state reset

9. **update-feedback-on-repeated-login-attempts.spec.ts**
   - Tests multiple login attempts
   - Validates feedback message updates

10. **seed.spec.ts**
    - Seed/setup test

### LAYER 4: Application Under Test

**Structure**: Single-page application (`app/index.html`)

**Components**:
- **HTML Form**
  - Username input (`#username`)
  - Password input (`#password`)
  - Login button (`#signinBtn`)
  - Message display (`#message`)

- **JavaScript Logic**
  - Form submission handler
  - Credential validation: `user === "admin" && pass === "password"`
  - Dynamic message rendering

- **Validation Rules**
  - Exact credential matching (case-sensitive)
  - No whitespace trimming
  - Simple string equality check

### LAYER 5: Infrastructure

**Purpose**: Execution environment and reporting

- **Local Dev Server**
  - Runs on `http://localhost:8081`
  - Serves `app/index.html`
  - No backend; pure client-side validation

- **Browser Engine**
  - Chromium (as configured in `playwright.config.js`)
  - Desktop Chrome device profile
  - Fully parallel test execution

- **Test Configuration** (`playwright.config.js`)
  - Test directory: `./tests`
  - Parallel execution: enabled
  - CI/CD support: retry logic, blob reporting
  - Trace collection: on first retry
  - Reporters: HTML (for local), Blob (for CI)

- **Test Reports**
  - HTML reports: `playwright-report/`
  - Test results: `test-results/`
  - Trace files: for debugging failed tests

---

## Data Flow

```
1. Planner Agent
   ↓
   Analyzes app at localhost:8081
   ↓
   Generates test plan (Markdown)

2. Generator Agent
   ↓
   Reads test plan
   ↓
   Generates TypeScript test code
   ↓
   Saves to tests/ directory

3. Playwright Test Runner
   ↓
   Loads playwright.config.js
   ↓
   Spawns Chromium browser instances
   ↓
   Navigates to http://localhost:8081
   ↓
   Executes test scripts in parallel

4. Test Execution
   ↓
   Interacts with page (click, fill, keyboard)
   ↓
   Validates expectations (assertions)
   ↓
   Collects traces on failure

5. Reporting
   ↓
   HTML reports + Blob reports generated
   ↓
   Test results available for review
```

---

## Key Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| 1 | Playwright Agents | AI-driven test planning & generation |
| 2 | @playwright/test | Test framework and browser automation |
| 3 | TypeScript/JavaScript | Test implementation language |
| 4 | HTML/JavaScript | Application under test |
| 5 | Node.js | Runtime environment |
| 5 | Chromium | Browser engine |

---

## Configuration Files

### `playwright.config.js`
- Test discovery: `testDir: './tests'`
- Parallel execution: `fullyParallel: true`
- CI/CD settings: retries, worker count
- Reporter: HTML & Blob formats
- Trace collection: on first retry

### `package.json`
- **Dependencies**: `@playwright/test@^1.64.1`
- **DevDependencies**: `@types/node@^26.6.5`

### Project Structure
```
playwright_Agent_Demo/
├── app/
│   └── index.html                    # Application under test
├── tests/                            # Test suites (10 spec files)
├── prompts/
│   ├── planner.txt                   # Planner agent instructions
│   ├── generator.txt                 # Generator agent instructions
│   └── helear.txt                    # Additional agent config
├── playwright.config.js              # Test framework configuration
├── package.json                      # Project dependencies
├── playwright-report/                # HTML test reports
└── test-results/                     # Test execution results
```

---

## Execution Flow

1. **Agent Planning Phase**
   - Planner Agent analyzes the application
   - Generates comprehensive test scenarios

2. **Code Generation Phase**
   - Generator Agent converts plan to executable tests
   - Validates against code quality rules

3. **Test Execution Phase**
   - Playwright CLI reads `playwright.config.js`
   - Spins up Chromium browsers
   - Runs tests in parallel across files
   - Collects artifacts (traces, reports)

4. **Reporting Phase**
   - Aggregates test results
   - Generates HTML reports
   - Produces CI-compatible blob reports

---

## Test Coverage

| Area | Coverage |
|------|----------|
| **Functional** | Login validation, credential checking, feedback |
| **UI/UX** | Responsive layouts, keyboard navigation, accessibility |
| **Security** | Password masking, case-sensitive matching, input handling |
| **Reliability** | State reset, refresh behavior, repeated attempts |
| **Edge Cases** | Empty inputs, partial credentials, special characters |

---

## Benefits of This Architecture

✅ **Intelligent Automation**: AI agents generate tests from analysis  
✅ **Maintainability**: Clear layer separation and organization  
✅ **Scalability**: Parallel test execution  
✅ **Quality**: Comprehensive test coverage with multiple strategies  
✅ **Traceability**: Full audit trail with trace collection  
✅ **CI/CD Ready**: Built-in CI/CD support and reporting  
✅ **No Backend**: Pure frontend testing (no API dependencies)  
