# 📋 Detailed Task Breakdown - Student Management System Challenge

## 🎯 Overview

This document breaks down **exactly** what needs to be done based on the challenge requirements.

---

## ✅ Task 1: Frontend Developer Challenge

### **Problem Statement:**
> Fix "Add New Notice" Page
> - **Location**: `/app/notices/add`
> - **Issue**: When clicking the 'Save' button, the 'description' field doesn't get saved
> - **Skills Tested**: React, Form handling, State management, API integration
> - **Expected Fix**: Ensure description field is properly bound and submitted

### **Detailed Requirements:**

#### 1.1 Identify the Issue
- [x] Locate the Add Notice page component
- [x] Find where the form is defined (`frontend/src/domains/notice/pages/add-notice-page.tsx`)
- [x] Check the form component (`frontend/src/domains/notice/components/notice-form.tsx`)
- [x] Identify why description field isn't being saved

#### 1.2 Fix the Form Binding
- [x] Ensure the description field uses `register('description')` not `register('content')`
- [x] Update initial state to use `description: ''` instead of `content: ''`
- [x] Verify the form schema expects `description` field

#### 1.3 Verify API Integration
- [x] Check that the API payload includes `description` field
- [x] Verify backend expects `description` (not `content`)
- [x] Test that description is saved to database

#### 1.4 Testing Requirements
- [ ] Navigate to `/app/notices/add`
- [ ] Create a new notice with a description
- [ ] Click 'Save' button
- [ ] Verify description is saved correctly
- [ ] Test form validation and error handling

### **Files Modified:**
- ✅ `frontend/src/domains/notice/components/notice-form.tsx` - Fixed field registration
- ✅ `frontend/src/domains/notice/pages/add-notice-page.tsx` - Fixed initial state

---

## ✅ Task 2: Backend Developer Challenge

### **Problem Statement:**
> Complete CRUD Operations in Student Management
> - **Location**: `/src/modules/students/students-controller.js`
> - **Issue**: Implement missing CRUD operations for student management
> - **Skills Tested**: Node.js, Express, PostgreSQL, API design
> - **Expected Implementation**: Full Create, Read, Update, Delete operations

### **Detailed Requirements:**

#### 2.1 Implement GET /api/v1/students (List All Students)
- [x] **Handler**: `handleGetAllStudents`
- [x] Extract query parameters: `name`, `className`, `section`, `roll`
- [x] Call service function: `getAllStudents(payload)`
- [x] Return JSON response with students array
- [x] Handle errors appropriately

#### 2.2 Implement POST /api/v1/students (Create Student)
- [x] **Handler**: `handleAddStudent`
- [x] Extract request body payload
- [x] Call service function: `addNewStudent(payload)`
- [x] Return success message
- [x] Handle errors appropriately

#### 2.3 Implement PUT /api/v1/students/:id (Update Student)
- [x] **Handler**: `handleUpdateStudent`
- [x] Extract `id` from route params
- [x] Extract request body payload
- [x] Call service function: `updateStudent({ ...payload, userId })`
- [x] Return success message
- [x] Handle errors appropriately

#### 2.4 Implement GET /api/v1/students/:id (Get Student Detail)
- [x] **Handler**: `handleGetStudentDetail`
- [x] Extract `id` from route params
- [x] Call service function: `getStudentDetail(id)`
- [x] Return student object
- [x] Handle errors appropriately

#### 2.5 Implement POST /api/v1/students/:id/status (Update Student Status)
- [x] **Handler**: `handleStudentStatus`
- [x] Extract `id` from route params as `userId`
- [x] Extract `reviewerId` from `req.user`
- [x] Extract `status` from request body
- [x] Call service function: `setStudentStatus({ userId, reviewerId, status })`
- [x] Return success message
- [x] Handle errors appropriately

### **Testing Requirements:**
- [ ] Test GET /api/v1/students with query filters
- [ ] Test POST /api/v1/students to create a new student
- [ ] Test PUT /api/v1/students/:id to update a student
- [ ] Test GET /api/v1/students/:id to get student details
- [ ] Test POST /api/v1/students/:id/status to change status
- [ ] Verify proper error handling (404, 500, validation errors)
- [ ] Test authentication and authorization
- [ ] Check database constraints and relationships

### **Files Modified:**
- ✅ `backend/src/modules/students/students-controller.js` - Implemented all 5 handlers

---

## 📝 Submission Requirements

### **3.1 Push to Public Repository**
- [ ] Create a new public repository (GitHub/Bitbucket/GitLab)
- [ ] Push all code changes to the repository
- [ ] Ensure repository is public and accessible
- [ ] Include a README with setup instructions (optional but recommended)

### **3.2 Create Loom Video**
- [ ] Record a short video demonstrating:
  - [ ] Frontend fix: Show creating a notice with description and verifying it saves
  - [ ] Backend fix: Show testing all CRUD endpoints (GET, POST, PUT, DELETE)
  - [ ] Show the fixes working end-to-end
- [ ] Keep video concise (2-5 minutes recommended)
- [ ] Upload to Loom and get shareable link

### **3.3 Submit Results**
- [ ] Share the repository link
- [ ] Share the Loom video link
- [ ] Follow any additional submission instructions from the challenge

---

## 🔍 Verification Checklist

### Frontend Fix Verification:
- [ ] Notice form has `description` field properly registered
- [ ] Initial state uses `description` not `content`
- [ ] Form submission includes `description` in payload
- [ ] Backend receives and saves `description` correctly
- [ ] Saved notice shows description when viewed

### Backend Fix Verification:
- [ ] All 5 handler functions are implemented
- [ ] GET /api/v1/students returns list of students
- [ ] POST /api/v1/students creates a new student
- [ ] PUT /api/v1/students/:id updates a student
- [ ] GET /api/v1/students/:id returns student details
- [ ] POST /api/v1/students/:id/status updates student status
- [ ] All endpoints handle errors properly
- [ ] All endpoints require authentication (if applicable)

---

## 📚 API Endpoints Reference

### Student Management Endpoints:
```
GET    /api/v1/students              - List all students
POST   /api/v1/students              - Create new student
GET    /api/v1/students/:id          - Get student detail
PUT    /api/v1/students/:id           - Update student
POST   /api/v1/students/:id/status  - Update student status
```

### Notice Management Endpoints:
```
GET    /api/v1/notices               - List notices
POST   /api/v1/notices               - Create notice (description field must work)
PUT    /api/v1/notices/:id           - Update notice
DELETE /api/v1/notices/:id           - Delete notice
```

---

## 🎯 Current Status

### ✅ Completed:
1. Frontend: Fixed notice description field binding
2. Backend: Implemented all student CRUD operations
3. Database: Set up and seeded
4. Configuration: Fixed API URL and database connection

### ⏳ Remaining:
1. Testing: Verify all fixes work end-to-end
2. Submission: Push to repository and create Loom video

---

## 🚀 Next Steps

1. **Test Everything:**
   - Test notice creation with description
   - Test all student CRUD endpoints
   - Verify error handling

2. **Prepare Submission:**
   - Push code to public repository
   - Record Loom video demonstration
   - Submit repository and video links

---

**Good luck with your submission! 🎉**
