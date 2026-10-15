# Employee Portal Login Test Plan

## Application Overview

Comprehensive browser-based functional, validation, security-conscious, accessibility, and usability test plan for the Employee Portal login page at http://192.168.1.4:8081/. Exploration found username and password inputs, a Login button, and an inline result heading. The observed client-side logic accepts the exact pair username `admin` and password `password`, showing `Login Successful`; all other inputs, including blank fields, show `Login Failed`. No form-level required constraints, navigation, or additional login controls were observed. Tests should run against an isolated, non-production environment using approved test accounts only.

## Test Scenarios

### 1. Login functional behavior

**Seed:** ``

#### 1.1. Accept the configured valid credentials

**File:** `tests\login\valid-credentials.spec.ts`

**Steps:**
  1. Open the Employee Portal login page in a fresh browser context.
    - expect: The page title is Agent Demo.
    - expect: The page shows username and password inputs and a Login button.
  2. Enter username `admin` and password `password`, then activate Login.
    - expect: A visible result heading reads `Login Successful`.
    - expect: The browser remains at the login URL and the page does not navigate.

#### 1.2. Reject incorrect credentials

**File:** `tests\login\invalid-credentials.spec.ts`

**Steps:**
  1. Open the login page in a fresh browser context and enter a username other than `admin` with password `password`; activate Login.
    - expect: The visible result reads `Login Failed`.
  2. Replace the username with `admin`, enter a password other than `password`, and activate Login.
    - expect: The visible result reads `Login Failed`.
  3. Enter incorrect values in both fields and activate Login.
    - expect: The visible result reads `Login Failed`.

#### 1.3. Handle empty and partially completed credentials

**File:** `tests\login\empty-fields.spec.ts`

**Steps:**
  1. Open the login page and activate Login without entering either value.
    - expect: The page displays `Login Failed`, matching observed behavior; no unhandled error occurs.
  2. Enter `admin` as username, leave password empty, and activate Login.
    - expect: The page displays `Login Failed`.
  3. Clear username, enter `password` as password, and activate Login.
    - expect: The page displays `Login Failed`.

#### 1.4. Require exact credential matching

**File:** `tests\login\credential-boundaries.spec.ts`

**Steps:**
  1. For each case, enter the specified username and password and activate Login: `Admin`/`password`, ` admin`/`password`, `admin `/`password`, `admin`/`Password`, `admin`/` password`, and `admin`/`password `.
    - expect: Each case displays `Login Failed`; matching is case- and whitespace-sensitive based on the observed implementation.
    - expect: No case displays a success result unless both values exactly match.

#### 1.5. Update feedback on repeated login attempts

**File:** `tests\login\result-state.spec.ts`

**Steps:**
  1. Enter the valid pair and activate Login; then change the password to an incorrect value and activate Login again.
    - expect: The initial result is `Login Successful`.
    - expect: The subsequent result changes to `Login Failed` without reloading the page.
  2. Correct the password and activate Login again.
    - expect: The result changes back to `Login Successful`.
    - expect: Only one current result is displayed; stale feedback is not duplicated.

#### 1.6. Keep password entry masked

**File:** `tests\login\password-visibility.spec.ts`

**Steps:**
  1. Open the login page and enter a sample password in the password input.
    - expect: The password input is of type `password` and does not reveal typed characters in the rendered field.
    - expect: No password-visibility toggle is present in the observed interface.

#### 1.7. Use the login controls with a keyboard

**File:** `tests\login\keyboard-accessibility.spec.ts`

**Steps:**
  1. Open the login page and use Tab to focus username, then password, then Login; enter credentials while using keyboard navigation.
    - expect: Focus moves through the username input, password input, and Login button in a logical order.
    - expect: The active control has a visible focus indication.
  2. With valid credentials entered, activate Login using Enter or Space while the Login button is focused.
    - expect: The login action runs and `Login Successful` is displayed.
  3. With invalid credentials entered, activate Login using the keyboard.
    - expect: The login action runs and `Login Failed` is displayed.

#### 1.8. Check login labels, feedback semantics, and responsive layout

**File:** `tests\login\accessibility-and-layout.spec.ts`

**Steps:**
  1. Inspect the page with accessibility semantics and at desktop, tablet, and narrow mobile viewport widths.
    - expect: Username and password controls have accessible names; the observed placeholders are `Enter Username` and `Enter Password`.
    - expect: The Login control is exposed as a button with the accessible name `Login`.
    - expect: Login result feedback is perceivable to assistive technology; report a defect if it is not announced or associated appropriately.
    - expect: Controls and feedback remain visible, usable, and free of unintended horizontal overflow at supported widths.

#### 1.9. Handle special characters and long input safely

**File:** `tests\login\input-safety.spec.ts`

**Steps:**
  1. Enter representative special characters, markup-like text, and a long but reasonable username or password; activate Login.
    - expect: The values are treated as text and rejected with `Login Failed` unless they exactly match the accepted pair.
    - expect: Input does not execute markup or script, corrupt the page, or create duplicate result elements.
    - expect: The page remains responsive and no unhandled runtime error occurs.

#### 1.10. Check refresh and browser-history behavior

**File:** `tests\login\session-and-refresh.spec.ts`

**Steps:**
  1. Submit the valid pair and observe the result, then reload the page.
    - expect: The initial attempt shows `Login Successful`.
    - expect: After reload, the page returns to its initial state with empty fields and no stale success message, unless persistence is explicitly intended.
  2. Submit the valid pair, then use browser back and forward controls if navigation occurred.
    - expect: Observed behavior currently stays on the same URL; no unexpected history entries or navigation should be created.
