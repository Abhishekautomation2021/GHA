# Employee Portal Login Test Plan

## Application Overview

Comprehensive functional and usability test plan for the Employee Portal login page at http://192.168.1.5:8080/. The observed UI has a page title of "Agent Demo", an "Employee Portal" heading, a username textbox (placeholder "Enter Username"), a password textbox (placeholder "Enter Password"), a "Login" button, and a level-two result heading that displayed "Login Failed" after an empty submission. No links, form element, native required attributes, or autocomplete attributes were observed. Valid credentials and post-authentication behavior were not provided, so positive-authentication scenarios require an authorized test account and confirmation of the expected destination and session behavior. Each test begins from a fresh unauthenticated page with cleared fields and no prior result message; clear state/reload the page between scenarios. Avoid real user credentials; use designated test data only. Success requires the expected behavior in each test and no unintended navigation, data exposure, or misleading feedback.

## Test Scenarios

### 1. Login form rendering and interaction

**Seed:** `tests/seed.spec.ts`

#### 1.1. Render the employee portal login form

**File:** `login-test-plan/login-form-rendering.spec.ts`

**Steps:**
  1. Open http://192.168.1.5:8080/ in a fresh browser context.
    - expect: The page loads and the document title is Agent Demo.
  2. Inspect the page heading and controls.
    - expect: A level-one heading reads Employee Portal.
    - expect: A username textbox with placeholder Enter Username, a password textbox with placeholder Enter Password, and a Login button are visible and enabled.
    - expect: The password control masks entered characters.
    - expect: The initial form state has empty fields and no authentication result message.

#### 1.2. Enter, edit, and clear username and password values

**File:** `login-test-plan/login-field-interaction.spec.ts`

**Steps:**
  1. Enter a designated non-sensitive test username and password in their respective fields.
    - expect: The username is visible as entered.
    - expect: The password remains masked.
  2. Select and replace part of the username, then clear both fields.
    - expect: The username can be edited and cleared.
    - expect: Both fields return to an empty state without changing page location or displaying a success result.
  3. Use Tab and Shift+Tab to move between the fields and Login button.
    - expect: Keyboard focus moves in a logical order among username, password, and Login.
    - expect: The focused control is visibly identifiable.

#### 1.3. Submit login form using the keyboard

**File:** `login-test-plan/login-keyboard-submit.spec.ts`

**Steps:**
  1. On a fresh page, focus the username field, enter designated test values, and submit using Enter from the password field.
    - expect: Submission follows the same authentication behavior as activating Login.
    - expect: The result is clear and the page does not hang or expose the password.

### 2. Authentication and error handling

**Seed:** `tests/seed.spec.ts`

#### 2.1. Sign in with authorized valid test credentials

**File:** `login-test-plan/login-valid-credentials.spec.ts`

**Steps:**
  1. Start fresh and enter an authorized, active test account's valid username and password.
    - expect: Values are accepted without being exposed in page text, URL, or console output.
  2. Activate Login.
    - expect: Authentication succeeds and the user reaches the documented authenticated destination or receives an unambiguous success state.
    - expect: The authenticated identity/session is correct and no Login Failed message is shown.
    - expect: The password is not displayed after submission.
  3. Reload the authenticated destination and then use the application's documented logout procedure if available.
    - expect: Session persistence or expiry matches the product's documented policy.
    - expect: Logout ends access to protected content and returns the user to an unauthenticated state.

#### 2.2. Reject an incorrect password

**File:** `login-test-plan/login-invalid-credentials.spec.ts`

**Steps:**
  1. Enter a known test account username with an intentionally incorrect password and activate Login.
    - expect: Authentication is denied and a clear failure state is shown; observed baseline feedback is Login Failed.
    - expect: No protected content or authenticated session is granted.
    - expect: Password characters are masked and not echoed into the URL.
  2. Correct the password and retry using the authorized valid test account.
    - expect: The user can retry and the outcome reflects the corrected credentials without stale failure feedback.

#### 2.3. Reject an unknown username

**File:** `login-test-plan/login-unknown-user.spec.ts`

**Steps:**
  1. Enter a syntactically ordinary but nonexistent test username and a non-sensitive invalid password, then activate Login.
    - expect: Authentication is denied with a generic failure response that does not disclose whether a username exists.
    - expect: No protected content or authenticated session is granted.

#### 2.4. Handle empty login submission

**File:** `login-test-plan/login-empty-fields.spec.ts`

**Steps:**
  1. On a fresh page leave both fields empty and activate Login.
    - expect: The application gives clear validation or authentication-failure feedback; the observed behavior displays Login Failed.
    - expect: The page remains usable at the login URL and does not show authenticated content.
  2. Reload to reset the page and submit with only username entered, then reset and submit with only password entered.
    - expect: Each incomplete submission is handled consistently with the application's validation policy and does not authenticate.
    - expect: Feedback is understandable, and entered values are not unintentionally lost unless that is the documented behavior.

#### 2.5. Handle whitespace and padded credentials

**File:** `login-test-plan/login-whitespace-input.spec.ts`

**Steps:**
  1. Submit username and password fields containing only spaces.
    - expect: Whitespace-only values do not grant access and receive clear validation or generic failure feedback.
  2. Submit a designated test username with leading/trailing spaces and a deliberately invalid password with surrounding spaces.
    - expect: Input normalization follows the documented policy; no unintended authentication occurs and the response remains safe and clear.

#### 2.6. Handle special characters and long input safely

**File:** `login-test-plan/login-special-input.spec.ts`

**Steps:**
  1. Enter punctuation, Unicode characters, and representative very long strings in username and password fields, then submit.
    - expect: The page remains responsive and inputs are handled or rejected according to documented limits.
    - expect: No crash, unintended navigation, script execution, or misleading success state occurs.
    - expect: Failure feedback does not expose submitted passwords or sensitive implementation details.

#### 2.7. Handle repeated failed login attempts

**File:** `login-test-plan/login-repeated-attempts.spec.ts`

**Steps:**
  1. Submit several incorrect credential attempts using a designated test account and at a rate approved for the test environment.
    - expect: Every attempt is denied unless valid credentials are supplied.
    - expect: Any documented throttling, lockout, or recovery policy is enforced consistently and communicates next steps without revealing account existence.

### 3. Security, accessibility, and resilience

**Seed:** `tests/seed.spec.ts`

#### 3.1. Protect password privacy in the login flow

**File:** `login-test-plan/login-password-privacy.spec.ts`

**Steps:**
  1. Enter a non-sensitive test password and inspect the visible UI before and after a failed submission.
    - expect: The password is masked in the field and is never rendered in the result message or page content.
  2. Inspect the URL and browser-visible navigation after submission.
    - expect: Credentials are not included in the URL or query string.

#### 3.2. Verify keyboard and assistive-technology access

**File:** `login-test-plan/login-accessibility.spec.ts`

**Steps:**
  1. Navigate the login page using only the keyboard, checking focus order and activating Login with the keyboard.
    - expect: Username, password, and Login are keyboard reachable and operable.
    - expect: Focus is visible and the failure/success result is programmatically discoverable and understandable.
  2. Inspect accessible names and relationships for the username and password controls and result message.
    - expect: Both inputs have meaningful accessible names, and authentication feedback is announced or exposed accessibly.
    - expect: Controls have sufficient visible focus indication and are not obscured at common viewport sizes.

#### 3.3. Handle login service failure

**File:** `login-test-plan/login-network-failure.spec.ts`

**Steps:**
  1. In a controlled test environment, make the authentication service unavailable and submit designated test credentials.
    - expect: The user receives a clear service/unavailable error distinct from successful authentication.
    - expect: The page remains recoverable for a later retry and does not expose stack traces, secrets, or internal service details.

#### 3.4. Handle refresh and browser navigation safely

**File:** `login-test-plan/login-refresh-and-navigation.spec.ts`

**Steps:**
  1. Submit invalid credentials, refresh the page, then use browser Back and Forward where applicable.
    - expect: The login page returns to a clean, usable state after refresh.
    - expect: Authentication feedback does not incorrectly persist as a success, and no protected content is exposed through history navigation.
