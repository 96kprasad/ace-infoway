# Task Management API

## Setup
1. Install PostgreSQL
2. Create database: `taskmanager`
3. Update `.env` file with your database credentials
4. Run: `npm install`
5. Run: `npm run start:dev`

## API Endpoints

### Authentication
- **POST /auth/register** - Register user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **POST /auth/login** - Login user
  ```json
  {
    "email": "user@example.com", 
    "password": "password123"
  }
  ```

### Tasks (Protected - Requires JWT Token)
- **GET /tasks** - Get all user tasks
- **POST /tasks** - Create task
  ```json
  {
    "title": "Task Title",
    "description": "Task Description", 
    "status": "To Do",
    "due_date": "2024-12-31"
  }
  ```

- **PUT /tasks/:id** - Update task
- **DELETE /tasks/:id** - Delete task

### Task Status Options
- "To Do"
- "In Progress" 
- "Completed"

### Authorization
Add header: `Authorization: Bearer <jwt_token>`