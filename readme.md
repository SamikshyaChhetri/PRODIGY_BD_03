# ProdigyTask3 - User Authentication System

This project implements a RESTful API for user authentication with role-based access control using Express.js, Prisma ORM, and MySQL.

## Features

- User registration and login
- JWT-based authentication
- Role-based access control (admin/user)
- Secure password hashing with bcrypt
- Input validation using Zod

## API Endpoints

The following table lists all available endpoints and the roles that can access them:

| Endpoint         | Method | Description                        | Required Role          |
| ---------------- | ------ | ---------------------------------- | ---------------------- |
| `/auth/register` | POST   | Register a new user                | Public (no auth)       |
| `/auth/login`    | POST   | Authenticate and receive JWT token | Public (no auth)       |
| `/profile`       | GET    | Get user profile information       | Any authenticated user |
| `/admin`         | GET    | Access admin-only information      | Admin                  |

## Request/Response Details

### `/auth/register` (POST)

- **Request Body**:
  ```json
  {
    "name": "Samikshya Baniya Chhetri",
    "email": "samikshya@gmail.com",
    "address": "Lalitpur",
    "password": "password123",
    "role": "user" // "user" or "admin"
  }
  ```

### `/auth/login` (POST)

- **Request Body**:
  ```json
  {
    "email": "samikshya.com",
    "password": "password123"
  }
  ```

### `/profile` (GET)

- **Headers**: Authentication cookie required (set during login)
- **Success Response**: `200 OK` with user profile data
- **Error Response**: `401 Unauthorized` if not logged in

### `/admin` (GET)

- **Headers**: Authentication cookie required (set during login)
- **Success Response**: `200 OK` with admin information
- **Error Response**: `403 Forbidden` if user doesn't have admin role

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your database connection string:
   ```
   DATABASE_URL="mysql://username:password@localhost:3306/dbname"
   ```
4. Run database migrations:
   ```
   npx prisma migrate dev
   ```
5. Start the development server:
   ```
   npm run dev
   ```

## Authentication Flow

1. Register a user with `/auth/register`
2. Login with `/auth/login` to receive a token
3. The token is automatically stored as a cookie
4. Protected routes check for valid token and user role

## Project Structure

- `index.js` - Application entry point
- `features/` - Feature-based modules
  - `auth/` - Authentication functionality
  - `profile/` - Profile management
- `middleware/` - Authentication middleware
- `prisma/` - Database schema and migrations

## Technologies Used

- Express.js
- Prisma ORM
- MySQL
- JSON Web Tokens (JWT)
- bcrypt
- Zod (validation)
- cookie-parser

## Development

Run the development server with:

```
npm run dev
```
