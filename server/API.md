# Credit Dashboard & Loan Management API Documentation

Base URL: `/`

## Authentication

### POST `/auth/register`
Registers a new user.
- **Body:** `{ firstName, lastName, email, password }`
- **Response:** `{ token }`

### POST `/auth/login`
Login with email and password.
- **Body:** `{ email, password }`
- **Response:** `{ token }`

### POST `/auth/forgot-password`
Step 1: Confirm email for password reset.
- **Body:** `{ email }`
- **Response:** `{ message }`

### POST `/auth/reset-password`
Step 2: Set new password after confirming email.
- **Body:** `{ email, newPassword }`
- **Response:** `{ message }`

### GET `/auth/me`
Get current user info (JWT required).
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `{ user }`

## Root

### GET `/`
API health check.
- **Response:** `{ message }`

## Future Endpoints
- `/loans` (CRUD for loans)
- `/repayments` (CRUD for repayments)
- `/users` (profile management)

---

**Note:** All endpoints return JSON. Authentication uses JWT. Extend endpoints for loans and repayments as needed.
