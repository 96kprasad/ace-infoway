# Task Management System — Ace Infoway Assignment

This repository contains my full-stack implementation of the **Task Management System** built as part of the Ace Infoway developer assignment.

## 📋 Assignment Overview

**Test Objective:** Build a small full-stack application demonstrating proficiency in modern web development technologies.

**Requirements Fulfilled:**
- ✅ Next.js frontend with App Router
- ✅ NestJS backend API
- ✅ MySQL database integration
- ✅ JWT-based authentication
- ✅ Complete CRUD operations
- ✅ Protected routes and middleware
- ✅ Input validation and error handling
- ✅ Responsive UI with TailwindCSS

### Tech Stack
- **Frontend:** Next.js (App Router), React, TailwindCSS  
- **Backend:** NestJS, TypeORM, MySQL  
- **Auth:** JWT-based authentication  
- **Deployment Ready:** Clear folder structure, environment variables, reusable services, DTO validation

---

### Features

#### User Authentication
- Register new users  
- Secure login  
- JWT token generation  
- Protected routes  

#### Task Management
- Create tasks  
- View all tasks for logged-in user  
- Update tasks  
- Delete tasks  
- Fields:  
  - `title`  
  - `description`  
  - `status` (todo, in_progress, completed)  
  - `due_date`  
  - `user_id` (Owner)

---

---

### Getting Started

#### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

###  API Endpoints

**Authentication**
- `POST /auth/register` — Register new user
- `POST /auth/login` — Login (returns access_token)

**Tasks** (Authentication required)
- `GET /tasks` — Get all tasks
- `POST /tasks` — Create new task
- `PUT /tasks/:id` — Update task
- `DELETE /tasks/:id` — Delete task

---

### 🏗️ Technical Highlights

#### Architecture & Design Patterns
- **Clean Architecture:** Separation of concerns with distinct layers (Controllers, Services, Entities)
- **Repository Pattern:** TypeORM integration for database abstraction
- **DTO Pattern:** Request/Response validation using class-validator
- **Context API:** Centralized state management for authentication
- **Custom Hooks:** Reusable logic for API calls and state management

#### Security Implementation
- **Password Hashing:** bcrypt for secure password storage
- **JWT Authentication:** Stateless token-based authentication
- **Route Protection:** Guards and middleware for secure endpoints
- **Input Sanitization:** Comprehensive validation on both client and server

#### Performance & UX
- **Optimistic Updates:** Immediate UI feedback for better user experience
- **Error Boundaries:** Graceful error handling and user feedback
- **Loading States:** Visual feedback during API operations
- **Responsive Design:** Mobile-first approach with TailwindCSS

---

### Potential Improvements

#### Frontend Enhancements
- **Response Middleware:** Implement centralized response handling for better error management and consistent API responses
- **Form Validation:** Add comprehensive client-side validation for task creation and editing forms
- **SEO Considerations:** Not applicable for this private task management system as content is authentication-protected

#### Backend Enhancements
- **Middleware Integration:** Add custom middleware for request logging, rate limiting, and enhanced security
- **Advanced Error Handling:** Implement global exception filters for better error responses
- **API Documentation:** Swagger/OpenAPI integration for better API documentation

---

###  Key Learning Outcomes

- **Full-Stack Development:** End-to-end application development with modern technologies
- **API Design:** RESTful API design principles and best practices
- **Database Design:** Relational database modeling and optimization
- **Authentication Flow:** Secure user authentication and authorization
- **State Management:** Client-side state management with React Context
- **TypeScript Integration:** Type-safe development across the stack

---

###  Repository Structure

```
ace-infoway/
├── backend/                 # NestJS API Server
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── tasks/          # Tasks CRUD module
│   │   ├── users/          # User management
│   │   └── common/         # Shared utilities
│   └── package.json
├── frontend/               # Next.js Application
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React Context providers
│   │   └── services/      # API service layer
│   └── package.json
└── README.md
```

---

###  Reference

**Assignment Source:** Ace Infoway Developer Assessment  
**API Reference:** [DummyJSON Todos](https://dummyjson.com/docs/todos) (for structure reference)

---

###  Developer

**Prasad Sapkal**  
Full-Stack Developer specializing in React, Next.js, and Node.js ecosystems.

*This project demonstrates proficiency in modern web development practices, clean code architecture, and full-stack application development.*