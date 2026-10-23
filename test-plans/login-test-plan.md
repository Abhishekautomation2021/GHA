# Employee Portal Login Test Plan

## Application Overview

Comprehensive functional and usability test coverage for the login screen at http://localhost:8081. The page presents an Employee Portal heading, username and password textboxes, and a Login button. Browser exploration confirmed that submitting username `admin` with password `password` displays `Login Successful`; other credentials, including blank credentials, display `Login Failed`. The current page uses a click handler, has no native required-field validation, and pressing Enter in the password field did not invoke submission. Tests should start independently from a fresh page with empty fields. Authentication appears to be a front-end demo: no route change, session state, or network authentication request was observed. The keyboard-submit case is included as an expected usability behavior and may expose the observed implementation gap.

## Test Scenarios

### 1. Login form and credential validation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Log in with valid demo credentials

**File:** `tests/login/valid-credentials.spec.ts`

**Steps:**
  1. Open http://localhost:8081 in a fresh browser page.
    - expect: The Employee Portal login page is displayed with empty username and password fields.
  2. Enter `admin` in the username field and `password` in the password field.
    - expect: The username is visible in its field and the password remains masked.
  3. Click Login.
    - expect: A `Login Successful` message is displayed.
    - expect: The page remains on the login screen; no unexpected error is shown.

#### 1.2. Reject an unknown username with the correct password

**File:** `tests/login/invalid-username.spec.ts`

**Steps:**
  1. Open http://localhost:8081 in a fresh browser page.
    - expect: The login fields are empty and no previous result message is displayed.
  2. Enter `unknown-user` as the username and `password` as the password.
    - expect: Both values are accepted into their respective fields.
  3. Click Login.
    - expect: A `Login Failed` message is displayed.
    - expect: No success message or authenticated destination is shown.

#### 1.3. Reject an incorrect password for the valid username

**File:** `tests/login/invalid-password.spec.ts`

**Steps:**
  1. Open http://localhost:8081 in a fresh browser page.
    - expect: The login fields are empty.
  2. Enter `admin` as the username and an incorrect password such as `wrong-password`.
    - expect: The username is visible and the password is masked.
  3. Click Login.
    - expect: A `Login Failed` message is displayed.
    - expect: No success message or authenticated destination is shown.

#### 1.4. Reject invalid username and password together

**File:** `tests/login/both-invalid.spec.ts`

**Steps:**
  1. Open http://localhost:8081 in a fresh browser page.
    - expect: The login fields are empty.
  2. Enter `not-admin` as the username and `not-password` as the password.
    - expect: Both fields accept the entered values.
  3. Click Login.
    - expect: A `Login Failed` message is displayed.
    - expect: The page does not navigate to an authenticated destination.

#### 1.5. Handle submission with both credentials empty

**File:** `tests/login/empty-credentials.spec.ts`

**Steps:**
  1. Open http://localhost:8081 in a fresh browser page and leave both fields empty.
    - expect: The username and password fields are empty.
  2. Click Login.
    - expect: A clear `Login Failed` result is displayed.
    - expect: The page remains usable and does not show a success result or crash.

#### 1.6. Reject a missing username

**File:** `tests/login/missing-username.spec.ts`

**Steps:**
  1. Open http://localhost:8081 in a fresh browser page.
    - expect: The login fields are empty.
  2. Leave the username empty and enter `password` in the password field.
    - expect: The username remains empty and the password is masked.
  3. Click Login.
    - expect: A `Login Failed` message is displayed.
    - expect: No success message is shown.

#### 1.7. Reject a missing password

**File:** `tests/login/missing-password.spec.ts`

**Steps:**
  1. Open http://localhost:8081 in a fresh browser page.
    - expect: The login fields are empty.
  2. Enter `admin` in the username field and leave the password field empty.
    - expect: The username is visible and the password field remains empty.
  3. Click Login.
    - expect: A `Login Failed` message is displayed.
    - expect: No success message is shown.

#### 1.8. Treat username and password case differences as invalid

**File:** `tests/login/case-sensitive-credentials.spec.ts`

**Steps:**
  1. Open http://localhost:8081 in a fresh browser page.
    - expect: The login fields are empty.
  2. Enter `Admin` and `password`, then click Login.
    - expect: A `Login Failed` message is displayed; a case-changed username is not accepted.
  3. Reload http://localhost:8081 to restore a fresh page.
    - expect: Both fields are empty and the previous result is cleared.
  4. Enter `admin` and `Password`, then click Login.
    - expect: A `Login Failed` message is displayed; a case-changed password is not accepted.

#### 1.9. Do not silently normalize whitespace in credential values

**File:** `tests/login/whitespace-credentials.spec.ts`

**Steps:**
  1. Open http://localhost:8081 in a fresh browser page.
    - expect: The login fields are empty.
  2. Enter ` admin` (one leading space) as the username and `password` as the password, then click Login.
    - expect: A `Login Failed` message is displayed; the whitespace-altered username is not treated as the exact valid username.
  3. Reload the page, enter `admin` as the username and `password ` (one trailing space) as the password, then click Login.
    - expect: A `Login Failed` message is displayed; the whitespace-altered password is not treated as the exact valid password.

#### 1.10. Mask the password while retaining entered values

**File:** `tests/login/password-masking.spec.ts`

**Steps:**
  1. Open http://localhost:8081 in a fresh browser page.
    - expect: The username and password controls are available.
  2. Enter `admin` as the username and `password` as the password without submitting.
    - expect: The username is readable in the username field.
    - expect: The password is displayed as masked characters and the underlying input is a password-type control.

#### 1.11. Allow a valid login attempt after a failed attempt

**File:** `tests/login/retry-after-failure.spec.ts`

**Steps:**
  1. Open http://localhost:8081 in a fresh browser page.
    - expect: The login fields are empty.
  2. Enter `admin` and `wrong-password`, then click Login.
    - expect: A `Login Failed` message is displayed.
  3. Replace the password with `password` and click Login again.
    - expect: The result updates to `Login Successful`.
    - expect: The stale failure result is not left as the final feedback.

#### 1.12. Submit credentials using Enter from the password field

**File:** `tests/login/keyboard-submit.spec.ts`

**Steps:**
  1. Open http://localhost:8081 in a fresh browser page.
    - expect: The login fields are empty.
  2. Enter `admin` in the username field and `password` in the password field.
    - expect: The credentials are entered correctly and the password is masked.
  3. Keep focus in the password field and press Enter.
    - expect: The login is submitted without requiring a mouse click.
    - expect: A `Login Successful` message is displayed.

#### 1.13. Handle unusually long invalid input safely

**File:** `tests/login/long-invalid-input.spec.ts`

**Steps:**
  1. Open http://localhost:8081 in a fresh browser page.
    - expect: The login fields are empty.
  2. Enter a long username and long password (for example, 256 repeated `x` characters in each field), then click Login.
    - expect: The input can be entered or is rejected with clear, non-crashing validation if a documented limit exists.
  3. Observe the result after submission.
    - expect: The page remains responsive and presents a safe failure/validation outcome.
    - expect: No success message, raw exception, or broken layout appears.
