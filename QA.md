# QA.md — Task Board Test Plan & Spec Review

**Project:** Task Board App  
**Prepared by:** Edidiong Affia  
**Date:** 25/06/2026  
**App version:** 1.0  

---

## Table of Contents

1. [B1 — Test Plan for the Task Board App](#b1--test-plan-for-the-task-board-app)
2. [B2 — Spec Review: Login Form](#b2--spec-review-login-form)

---

## B1 — Test Plan for the Task Board App

### Test Environment

| Item | Details |
|------|---------|
| Browser | Google Chrome (latest) |
| OS | macOS / Windows |
| Screen | Laptop (1366×768) and mobile (375×667) |
| Data | Cleared localStorage before each test unless stated |

### How to read this table

- **ID**: Unique test case identifier.
- **Steps**: What the tester does, step by step.
- **Expected result**: What should happen if the app works correctly.
- **Actual result**: What actually happened when the test was run.
- **Status**: PASS or FAIL.
- **Type**: The category of the test (happy path, validation, edge case, etc.).

### Test Cases

| ID | Steps | Expected result | Actual result | Status | Type |
|----|-------|-----------------|---------------|--------|------|
| TC-01 | 1. Type "Buy milk" in the input field. <br> 2. Click the Add button. | Task "Buy milk" appears in the list. Open count increases from 0 to 1. | Task appeared in the list. Counter changed from "0 open tasks" to "1 open task". | PASS | Happy path |
| TC-02 | 1. Leave the input field empty. <br> 2. Click the Add button. | No task is created. An error message "Please type a task before adding." is shown. | No task created. Error message appeared below the input. | PASS | Validation |
| TC-03 | 1. Type only spaces ("   ") in the input field. <br> 2. Click the Add button. | No task is created. Error message is shown. (Whitespace is trimmed, so it counts as empty.) | No task created. Error message appeared. | PASS | Validation |
| TC-04 | 1. Add a task titled "Buy Suya". <br> 2. Click the checkbox next to the task. | Task shows a done state (strikethrough text, gray color). Open count decreases from 1 to 0. | Task text got strikethrough and turned gray. Counter changed to "0 open tasks". | PASS | Happy path |
| TC-05 | 1. Start with a task that is marked done. <br> 2. Click the checkbox again to uncheck it. | Task returns to open state (no strikethrough). Open count increases from 0 to 1. | Task returned to normal text. Counter changed to "1 open task". | PASS | Happy path |
| TC-06 | 1. Add two tasks. <br> 2. Click the Delete button on the first task. | First task is removed from the list. Second task remains. Counter updates. | First task disappeared. Second task remained. Counter updated correctly. | PASS | Happy path |
| TC-07 | 1. Add one task. <br> 2. Delete that task. | Task is removed. Empty state message "No tasks yet. Add one above to get started!" appears. Counter shows "0 open tasks". | Task removed. Empty state message appeared. Counter showed "0 open tasks". | PASS | Edge case |
| TC-08 | 1. Paste a very long title (200 characters) into the input. <br> 2. Click Add. | Task is added. The long text wraps within the task row instead of breaking the layout. | Task added. Text wrapped to multiple lines within the row. Layout stayed intact. | PASS | Edge case |
| TC-09 | 1. Type `<script>alert("hi")</script> & emoji 🎉` in the input. <br> 2. Click Add. | Task is added. The text is displayed as plain text (not executed as code). Special characters and emoji show correctly. | Task added. Text displayed safely as plain text. No script executed. Emoji showed correctly. | PASS | Edge case |
| TC-10 | 1. Type "Walk the dog" in the input. <br> 2. Press the Enter key on the keyboard (do not click Add). | Task is added, same as clicking the Add button. Input field is cleared. | Task was added. Input was cleared. | PASS | Keyboard |
| TC-11 | 1. Type "Test task" in the input. <br> 2. Rapidly double-click the Add button. | Only one task is created (the input is cleared after the first click, so the second click finds an empty input). | One task was created. A brief error message appeared from the second click but caused no harm. | PASS | Edge case |
| TC-12 | 1. Add three tasks. <br> 2. Mark one as done. <br> 3. Click the "Open" filter button. | Only the two open (not done) tasks are shown. The done task is hidden. | Two open tasks shown. Done task hidden. | PASS | Filter |
| TC-13 | 1. Add three tasks. <br> 2. Mark one as done. <br> 3. Click the "Done" filter button. | Only the one done task is shown. The two open tasks are hidden. | One done task shown. Open tasks hidden. | PASS | Filter |
| TC-14 | 1. Add two tasks. <br> 2. Refresh the page (F5 / browser reload). | Both tasks are still visible after the refresh (data was saved in localStorage). Counter is correct. | Both tasks reappeared after refresh. Counter was correct. | PASS | Persistence |
| TC-15 | 1. Open the app on a phone-width screen (375px wide) or less than or equal to (450px wide). <br> 2. Add a task. <br> 3. Use the filters. | The layout adjusts: input and button stack vertically. Filter buttons spread evenly. Everything is usable. | Layout adjusted to mobile. Input and button stacked. Filters spread evenly. All features worked. | PASS | Responsive |

### Test Summary

| Metric | Value |
|--------|-------|
| Total test cases | 15 |
| Passed | 15 |
| Failed | 0 |
| Pass rate | 100% |

### Notes

- All test cases passed during this test run.
- TC-11 (rapid double-click): The app handles this gracefully, only one task is created. A brief error message appears from the second click because the input is already empty. This is a minor cosmetic note, not a bug. If desired, the Add button could be disabled for a short time after clicking, but this is not required.
- The app was tested with localStorage cleared and with pre-existing data. Both scenarios worked correctly.
- No console errors or warnings were observed during any test.

---

## B2 — Spec Review: Login Form

### The Spec (as provided)

> - The form has an email field and a password field.
> - When the user clicks Login, they are taken to the dashboard.
> - Passwords must be secure.
> - If login fails, show an error.
> - The form should be fast.

### Reviewer's Note

As a QA engineer, my job here is to find every problem, gap, and ambiguity **before** development starts. The sooner we catch these, the easier and cheaper they are to fix. Below I have organized the issues into categories.

---

### Category 1: Vague or Untestable Statements

| # | Issue | Why it matters | Suggested fix |
|---|-------|----------------|---------------|
| 1 | "Passwords must be secure" is not defined. | This cannot be tested because "secure" has no definition. Does it mean 8 characters? 12? Must include special characters? Uppercase? Numbers? A password policy must be specific or QA cannot verify it. | Define exact rules, e.g., "Minimum 8 characters, at least 1 uppercase letter, 1 number, and 1 special character." |
| 2 | "The form should be fast" is not defined. | "Fast" is subjective and cannot be tested. There is no number to measure against. | Define a specific threshold, e.g., "The form should load in under 2 seconds on a 3G connection. Login response should return within 3 seconds." |
| 3 | "If login fails, show an error" does not specify the error. | What does the error say? Where does it appear? How long does it stay? Is it red text, a popup, a toast notification? QA cannot test something with no defined appearance or content. | Specify the error message text, its location on the screen, and its behavior (e.g., "Show red text below the form: 'Invalid email or password.' Remove the message when the user retypes.") |

### Category 2: Missing Requirements

| # | Issue | Why it matters | Suggested fix |
|---|-------|----------------|---------------|
| 4 | No email validation rules. | The spec says there is an "email field" but does not say the input must be a valid email format. What happens if the user types "hello" (not an email)? | Add: "The email field must validate that the input is a valid email address (e.g., name@example.com). Show an error if it is not." |
| 5 | No password length limits. | There is no minimum or maximum password length. Can a user submit a 1-character password? A 10,000-character password? | Add min and max length, e.g., "Password must be between 8 and 128 characters." |
| 6 | No mention of empty field handling. | What happens if the user clicks Login with one or both fields empty? Does it submit? Show an error? | Add: "If either field is empty, do not submit. Show a message telling the user which field is required." |
| 7 | No definition of what causes a login to "fail." | Login could fail for many reasons: wrong password, wrong email, account doesn't exist, account locked, server down, network timeout. Each might need different handling. | List the failure scenarios and the expected error message for each. |
| 8 | No loading state during login. | When the user clicks Login, the app needs to contact the server. During that time, what does the user see? If nothing changes, they might click again. | Add: "Show a loading spinner on the Login button after clicking. Disable the button until the response returns." |
| 9 | No double-submit protection. | A user could click Login multiple times rapidly, sending multiple requests. | Add: "Disable the Login button after the first click until the response returns." |
| 10 | No mention of session management. | After a successful login, how is the user's session maintained? Cookie? Token? How long does it last? What happens when it expires? | Define the session mechanism and timeout. |
| 11 | No "forgot password" flow. | Users will forget passwords. There is no way to recover an account. | Add a "Forgot password?" link and define the reset flow. |
| 12 | No account lockout policy. | If someone tries to brute-force a password, there is no mention of locking the account after too many failed attempts. | Add: "After 5 failed login attempts, lock the account for 15 minutes and show a message." |
| 13 | No keyboard submission. | The spec only mentions clicking Login. Can the user press Enter to submit? | Add: "Pressing Enter in the password field should also submit the form." |
| 14 | No "Remember me" option. | There is no way for the user to stay logged in across sessions if they want to. | Consider adding a "Remember me" checkbox and define its behavior. |

### Category 3: Security Concerns

| # | Issue | Why it matters | Suggested fix |
|---|-------|----------------|---------------|
| 15 | No mention of HTTPS. | If the form is served over HTTP, the password is sent in plain text and can be intercepted. | Add: "The login form must be served over HTTPS only. Redirect HTTP to HTTPS." |
| 16 | No mention of CSRF protection. | A malicious site could forge a login request. | Add: "Use CSRF tokens on the login form." |
| 17 | Error message could reveal too much. | "If login fails, show an error", if the error says "email not found" vs "wrong password," an attacker can learn which emails are registered. | Specify: "Show a generic error: 'Invalid email or password.' Do not reveal which field is wrong." |
| 18 | No mention of password masking. | Should the password field hide characters as the user types? This is expected but not stated. | Add: "The password field must mask characters (type='password'). Consider a show/hide toggle." |
| 19 | No input sanitization mentioned. | Malicious input in the email or password field could cause XSS (cross-site scripting) if displayed anywhere. | Add: "All user input must be sanitized on both client and server." |

### Category 4: Accessibility Concerns

| # | Issue | Why it matters | Suggested fix |
|---|-------|----------------|---------------|
| 20 | No accessibility requirements. | Users with disabilities may not be able to use the form. Screen reader users need labels. Keyboard-only users need focus management. | Add: "All fields must have associated label elements. The form must be fully usable with keyboard only. Error messages must use ARIA roles so screen readers announce them." |
| 21 | No focus management after error. | If login fails and an error appears, does focus move to the error message? A screen reader user might not know an error appeared. | Add: "On error, move focus to the error message and announce it." |
| 22 | No color contrast requirements. | If the error text is red on a white background, is the contrast ratio sufficient for visually impaired users? | Add: "All text must meet WCAG AA contrast ratio (4.5:1 for normal text)." |

### Category 5: Edge Cases

| # | Issue | Why it matters | Suggested fix |
|---|-------|----------------|---------------|
| 23 | What happens on browser back button after login? | If the user logs in, then clicks the browser back button, do they see the login form again? Can they resubmit? | Define: "After login, the back button should not show the login form. Use redirect (303) or clear form state." |
| 24 | What if the server is unreachable? | The spec only covers "login fails" but not network errors. What does the user see if the server is down? | Add: "If the server cannot be reached, show: 'Cannot connect to the server. Please try again later.'" |
| 25 | What if the user has an active session and visits the login page? | Should they see the login form or be redirected to the dashboard? | Add: "If the user is already logged in, redirect them to the dashboard." |

### Summary

| Category | Issues found |
|----------|-------------|
| Vague or untestable statements | 3 |
| Missing requirements | 11 |
| Security concerns | 5 |
| Accessibility concerns | 3 |
| Edge cases | 3 |
| **Total** | **25** |

### Recommendation

The spec is not ready for development. It describes the **happy path** (user enters credentials, clicks Login, goes to dashboard) but leaves out nearly every detail that a developer and QA engineer need: validation rules, error handling, security, accessibility, and edge cases. I recommend the author revise the spec to address the 25 issues above before any code is written. This will save time by preventing rework and ensuring everyone has the same understanding of what "done" looks like.
