# Product Requirements Document (PRD) for Credit Dashboard & Loan Management System

## Project Overview:

The Credit Dashboard & Loan Management System is a web-based fintech application designed to allow users to manage credit, apply for loans, and track repayments. The system emphasizes scalable frontend architecture, performance optimization, and maintainable code, preparing developers for Senior Frontend Engineer responsibilities.

## Objectives:

1. Enable users to view credit status, loan history, and repayment schedules.
2. Allow users to apply for new loans within their credit limits.
3. Provide a responsive, accessible, and visually appealing user interface.
4. Ensure application performance using best practices like lazy loading and virtualization.
5. Implement a reusable component library for scalability.
6. Include comprehensive testing: unit, component, and E2E.
7. Offer optional enhancements like notifications, filtering, and search functionality.

## Proposed Pages & Features:

### 1. Login Page

* Mock login via phone/email and OTP.
* Error handling for invalid credentials.
* Responsive design.

### 2. Dashboard Page

* Overview of user credit status and limits.
* Active loans and repayment schedules.
* Charts for visualizing credit usage (Recharts).
* Quick actions: apply for a loan, view loan details.
* Notifications panel (optional).

### 3. Profile Page

* Display personal information and account settings.
* View loan history and current credit usage.
* Update contact information (mocked).
* Theme toggle (light/dark mode).

### 4. Loan Application Page

* Form to apply for new loans with validation.
* Display maximum allowed loan based on credit limit.
* Interest and EMI calculations.
* Submit loan application (mock API integration).

### 5. Loan Details Page

* Display details of selected loan: principal, interest, due dates, EMI breakdown.
* Option to mark as repaid (mock).
* Visual progress indicators for repayment.

### 6. Transaction History / Loan List Page

* Paginated and virtualized list of all loans and repayments.
* Sort, filter, and search functionalities.
* Quick access to loan details.

### 7. Component Library / Storybook Page

* Showcase reusable UI components: Buttons, Cards, Modals, Forms, Tables, Alerts.
* Documentation for component usage and props.

### 8. Settings Page (Optional)

* Manage notification preferences.
* Theme and layout preferences.
* Mock account settings.

### 9. Error / 404 Page

* Informative and user-friendly error messages.
* Navigation back to dashboard or login.

## Technical Considerations:

* **Routing:** React Router v6.
* **State Management:** Redux Toolkit + Context API.
* **Styling:** CSS/SCSS or Tailwind.
* **Data Visualization:** Recharts.
* **Backend:** JSON-server (mock API).
* **Testing:** Jest, React Testing Library, Cypress/Playwright.
* **Performance:** Lazy loading, virtualization, caching, memoization.

## Success Criteria:

* All pages implemented with required functionalities.
* Responsive and accessible UI.
* Smooth performance for large data sets.
* Component library reusable across the app.
* Fully tested with passing unit, component, and E2E tests.
* Documentation available for architecture, components, and performance strategies.
