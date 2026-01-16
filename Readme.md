# Student Management System - Developer Skill Test

A comprehensive full-stack web application for managing school operations including students, staff, classes, notices, and leave management. This project serves as a skill assessment platform for **Frontend**, **Backend**, and **Blockchain** developers.

## 🏗️ Project Architecture

```
skill-test/
├── frontend/           # React + TypeScript + Material-UI
├── backend/            # Node.js + Express + PostgreSQL
├── go-service/         # Golang microservice for PDF reports
├── seed_db/           # Database schema and seed data
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5007
- **Demo Credentials**: 
  - Email: `admin@school-admin.com`
  - Password: `3OU4zn3q6Zh9`

### ** Database Setup **
```bash
# Create PostgreSQL database
createdb school_mgmt

# Run database migrations
psql -d school_mgmt -f seed_db/tables.sql
psql -d school_mgmt -f seed_db/seed-db.sql
```

## 🎯 Skill Test Problems

### **Frontend Developer Challenge**
**Fix "Add New Notice" Page**

- **Location**: `/app/notices/add`
- **Issue**: When clicking the 'Save' button, the 'description' field doesn't get saved
- **Skills Tested**: React, Form handling, State management, API integration
- **Expected Fix**: Ensure description field is properly bound and submitted

### **Backend Developer Challenge**
**Complete CRUD Operations in Student Management**

- **Location**: `/src/modules/students/students-controller.js`
- **Issue**: Implement missing CRUD operations for student management
- **Skills Tested**: Node.js, Express, PostgreSQL, API design
- **Expected Implementation**: Full Create, Read, Update, Delete operations

---

## ✅ Implementation Summary

This section documents all the fixes and improvements made to complete the skill test challenges.

### **Frontend Fixes**

#### 1. Notice Description Field Fix
**Files Modified:**
- `frontend/src/domains/notice/components/notice-form.tsx`
- `frontend/src/domains/notice/pages/add-notice-page.tsx`

**Problem:**
- The form was using `content` field but the schema and backend expected `description`
- Description field was not being saved when creating a notice

**Solution:**
- Changed form field registration from `register('content')` to `register('description')` in `notice-form.tsx`
- Updated initial state from `content: ''` to `description: ''` in `add-notice-page.tsx`
- Now the description field is properly bound to the form state and submitted to the backend

**Result:**
- Notice description field now saves correctly when creating a new notice
- Form validation works as expected

---

### **Backend Fixes**

#### 1. Student CRUD Operations Implementation
**Files Modified:**
- `backend/src/modules/students/students-controller.js`

**Problem:**
- All 5 handler functions were empty with only `//write your code` comments
- No CRUD operations were implemented

**Solution:**
Implemented all 5 handler functions:

1. **`handleGetAllStudents`** - GET `/api/v1/students`
   - Extracts query parameters (name, className, section, roll)
   - Calls `getAllStudents()` service function
   - Returns list of students as JSON

2. **`handleAddStudent`** - POST `/api/v1/students`
   - Extracts request body payload
   - Calls `addNewStudent()` service function
   - Returns success message

3. **`handleUpdateStudent`** - PUT `/api/v1/students/:id`
   - Extracts student ID from URL params and converts to integer
   - Validates ID is a valid number
   - Merges ID with request body payload
   - Calls `updateStudent()` service function
   - Returns success message

4. **`handleGetStudentDetail`** - GET `/api/v1/students/:id`
   - Extracts student ID from URL params
   - Calls `getStudentDetail()` service function
   - Returns student details as JSON

5. **`handleStudentStatus`** - POST `/api/v1/students/:id/status`
   - Extracts student ID from URL params
   - Extracts reviewer ID from authenticated user
   - Extracts status from request body
   - Calls `setStudentStatus()` service function
   - Returns success message

6. **`handleDeleteStudent`** - DELETE `/api/v1/students/:id`
   - Extracts student ID from URL params and converts to integer
   - Validates ID is a valid number
   - Checks if student exists before deletion
   - Deletes both user and user_profile records
   - Returns success message

**Result:**
- All student CRUD endpoints are now fully functional (Create, Read, Update, Delete)
- Proper error handling and validation
- Complete CRUD operations as required by the challenge

---

#### 2. Input Validation Schema
**Files Created:**
- `backend/src/modules/students/students-schema.js`

**Problem:**
- No validation for student data before database operations
- Poor error messages when invalid data is submitted
- Type mismatches (e.g., roll number as string "test" instead of number)

**Solution:**
- Created comprehensive Zod validation schema for student data
- Validates all fields including:
  - Required fields (name, email)
  - Optional fields (gender, phone, dob, etc.)
  - Type validation (roll must be number, dates must be in correct format)
  - Custom validation for roll number (accepts number or string that can be converted to number)
  - User-friendly error messages for each validation failure

**Features:**
- Validates email format
- Validates date formats (YYYY-MM-DD)
- Converts string numbers to integers for roll field
- Provides clear error messages (e.g., "Roll number must be a valid number, not text")
- Handles optional fields gracefully

**Result:**
- All student data is validated before database operations
- Users receive clear, actionable error messages
- Prevents invalid data from reaching the database

---

#### 3. Enhanced Error Handling
**Files Modified:**
- `backend/src/modules/students/students-service.js`
- `backend/src/modules/students/students-controller.js`

**Improvements:**
- Added comprehensive error handling for validation errors
- Formatted Zod validation errors into user-friendly messages
- Preserved original error messages from database operations
- Added proper HTTP status codes (400 for validation errors, 500 for server errors)
- Added logging for debugging purposes

**Error Message Format:**
```
Validation failed: roll: Roll number must be a valid number, not text. Please enter a number.
```

---

#### 4. Performance Optimizations
**Files Modified:**
- `backend/src/modules/students/students-service.js`
- `backend/src/config/db.js`

**Email Sending Optimization:**
- Changed email sending from blocking to non-blocking
- Email verification emails now send in the background
- API responses return immediately without waiting for email
- Prevents API from hanging if email service is slow or unavailable

**Database Connection Optimization:**
- Added connection pool settings:
  - `max: 20` - Maximum number of clients in the pool
  - `idleTimeoutMillis: 30000` - Close idle clients after 30 seconds
  - `connectionTimeoutMillis: 10000` - Return error after 10 seconds if connection cannot be established
- Prevents hanging when database is unreachable

**Result:**
- Student creation is now fast and responsive

- Better error handling for connection issues

---

#### 5. Code Documentation and Comments
**Files Modified:**
- `backend/src/modules/students/students-controller.js`
- `backend/src/modules/students/students-repository.js`
- `backend/src/modules/students/students-service.js`

**Added Comments:**
- Explained why we serialize payload to JSON string for PostgreSQL JSONB functions
- Documented the flow of each controller function
- Explained validation steps in service layer
- Added comments for database query operations

**Example Comment:**
```javascript
// PostgreSQL JSONB functions require the data to be passed as a JSON string
// We serialize the JavaScript object to JSON string using JSON.stringify
// The $1::jsonb cast tells PostgreSQL to treat the string as JSONB type
```

---

#### 6. Type Conversion Fixes
**Files Modified:**
- `backend/src/modules/students/students-controller.js`
- `backend/src/modules/students/students-schema.js`

**Problem:**
- URL parameters are always strings, but schema expected numbers
- Update requests failed with "Expected number, received string" error

**Solution:**
- Added `parseInt()` conversion in controller for URL parameter IDs
- Updated schema to accept both number and string (that can be converted to number) for `userId`
- Added validation to ensure ID is a valid number before processing

**Result:**
- PUT requests now work correctly
- Proper type conversion from URL params to numbers

---

### **Configuration Fixes**

#### 1. API URL Configuration
**Files Modified:**
- `frontend/.env`

**Problem:**
- Frontend was configured to call `http://localhost:5000` but backend runs on port `5007`

**Solution:**
- Updated `VITE_API_URL` from `http://localhost:5000` to `http://localhost:5007`

**Result:**
- Frontend now correctly calls the backend API
- All API requests work as expected

---

### **Testing the Fixes**

#### Frontend Testing:
1. Navigate to `/app/notices/add`
2. Fill in the form including the description field
3. Click "Save"
4. Verify the notice is created with the description saved correctly

#### Backend Testing:
1. **GET** `/api/v1/students` - Should return list of students
2. **POST** `/api/v1/students` - Should create a new student (with validation)
3. **GET** `/api/v1/students/:id` - Should return student details
4. **PUT** `/api/v1/students/:id` - Should update student
5. **DELETE** `/api/v1/students/:id` - Should delete student
6. **POST** `/api/v1/students/:id/status` - Should update student status

**Test Validation:**
- Try creating a student with `roll: "test"` - Should return validation error
- Try creating a student with invalid email - Should return validation error
- Try updating with invalid ID - Should return proper error

---

### **Summary of Changes**

| Component | Files Changed | Lines Added | Key Improvements |
|-----------|--------------|-------------|------------------|
| Frontend | 2 files | ~5 lines | Fixed notice description field binding |
| Backend Controller | 1 file | ~50 lines | Implemented all 6 CRUD handlers (including DELETE) |
| Backend Service | 1 file | ~70 lines | Added validation, error handling, performance optimizations, delete function |
| Backend Repository | 1 file | ~15 lines | Added JSONB serialization comments, delete function |
| Backend Router | 1 file | 1 line | Added DELETE route |
| Backend Schema | 1 file (new) | ~70 lines | Comprehensive validation schema |
| Configuration | 1 file | 1 line | Fixed API URL port |

**Total:** 8 files modified/created, ~212 lines of code added

---

### **Key Achievements**

✅ **Frontend Challenge Completed:**
- Notice description field now saves correctly
- Form validation working as expected

✅ **Backend Challenge Completed:**
- All 5 CRUD operations fully implemented
- Comprehensive input validation
- User-friendly error messages
- Performance optimizations
- Well-documented code

✅ **Additional Improvements:**
- Better error handling throughout
- Performance optimizations (non-blocking emails, connection pooling)
- Type safety and validation
- Code documentation and comments

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **UI Library**: Material-UI (MUI) v6
- **State Management**: Redux Toolkit + RTK Query
- **Form Handling**: React Hook Form + Zod validation
- **Build Tool**: Vite
- **Code Quality**: ESLint, Prettier, Husky

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT + CSRF protection
- **Password Hashing**: Argon2
- **Email Service**: Resend API
- **Validation**: Zod

### Database
- **Primary DB**: PostgreSQL
- **Schema**: Comprehensive school management schema
- **Features**: Role-based access control, Leave management, Notice system

## 📋 Features

### Core Functionality
- **Dashboard**: User statistics, notices, birthday celebrations, leave requests
- **User Management**: Multi-role system (Admin, Student, Teacher, Custom roles)
- **Academic Management**: Classes, sections, students, class teachers
- **Leave Management**: Policy definition, request submission, approval workflow
- **Notice System**: Create, approve, and distribute notices
- **Staff Management**: Employee profiles, departments, role assignments
- **Access Control**: Granular permissions system

### Security Features
- JWT-based authentication with refresh tokens
- CSRF protection
- Role-based access control (RBAC)
- Password reset and email verification
- Secure cookie handling

## 🔧 Development Guidelines

### Code Standards
- **File Naming**: kebab-case for consistency across OS
- **Import Style**: Absolute imports for cleaner code
- **Code Formatting**: Prettier with consistent configuration
- **Git Hooks**: Husky for pre-commit quality checks

### Project Structure
```
frontend/src/
├── api/           # API configuration and base setup
├── assets/        # Static assets (images, styles)
├── components/    # Shared/reusable components
├── domains/       # Feature-based modules
│   ├── auth/      # Authentication module
│   ├── students/  # Student management
│   ├── notices/   # Notice system
│   └── ...
├── hooks/         # Custom React hooks
├── routes/        # Application routing
├── store/         # Redux store configuration
├── theme/         # MUI theme customization
└── utils/         # Utility functions
```

```
backend/src/
├── config/        # Database and app configuration
├── middlewares/   # Express middlewares
├── modules/       # Feature-based API modules
│   ├── auth/      # Authentication endpoints
│   ├── students/  # Student CRUD operations
│   ├── notices/   # Notice management
│   └── ...
├── routes/        # API route definitions
├── shared/        # Shared utilities and repositories
├── templates/     # Email templates
└── utils/         # Helper functions
```

## 🧪 Testing Instructions

### For Frontend Developers
1. Navigate to the notices section
2. Try to create a new notice with description
3. Verify the description is saved correctly
4. Test form validation and error handling

### For Backend Developers
1. Test all student CRUD endpoints using Postman/curl
2. Verify proper error handling and validation
3. Check database constraints and relationships
4. Test authentication and authorization

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/refresh` - Refresh access token

### Student Management
- `GET /api/v1/students` - List all students
- `POST /api/v1/students` - Create new student
- `GET /api/v1/students/:id` - Get student details
- `PUT /api/v1/students/:id` - Update student
- `DELETE /api/v1/students/:id` - Delete student
- `POST /api/v1/students/:id/status` - Update student status

### Notice Management
- `GET /api/v1/notices` - List notices
- `POST /api/v1/notices` - Create notice
- `PUT /api/v1/notices/:id` - Update notice
- `DELETE /api/v1/notices/:id` - Delete notice

### PDF Generation Service (Go)
- `GET /api/v1/students/:id/report` - Generate and download a PDF report for a specific student.

## 🤝 Contributing / Submission Instructions

1. Complete the assigned task
2. Push your results to a public repository
3. Share the repository link along with a short Loom video demonstrating your results.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions and support:
- Create an issue in the repository
- Check existing documentation in `/frontend/README.md` and `/backend/README.md`
- Review the database schema in `/seed_db/tables.sql`

---

**Happy Coding! 🚀**