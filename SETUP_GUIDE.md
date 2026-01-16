# Setup Guide - Quick Answers

## ✅ PostgreSQL Setup

**YES, you need PostgreSQL running locally!**

### Steps to set up PostgreSQL:

1. **Install PostgreSQL** (if not already installed)
   - Download from: https://www.postgresql.org/download/
   - Or use: `choco install postgresql` (if you have Chocolatey)

2. **Create the database:**
   ```bash
   createdb school_mgmt
   ```


\i C:/Users/HP/CursorProjects/anvelo/seed_db/tables.sql
\i C:/Users/HP/CursorProjects/anvelo/seed_db/seed-db.sql
\i C:/Users/HP/CursorProjects/anvelo/seed_db/seed-classes.sql
\i C:/Users/HP/CursorProjects/anvelo/seed_db/seed-sections.sql

3. **Run the database migrations:**
   ```bash
   # From the project root
   psql -d school_mgmt -f seed_db/tables.sql
   psql -d school_mgmt -f seed_db/seed-db.sql
   ```

4. **Verify your DATABASE_URL in backend/.env:**
   ```env
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/school_mgmt
   ```
   Replace `your_password` with your PostgreSQL password.

---

## ✅ API Port Configuration

### Backend Port: **5007** ✅
- Backend runs on: `http://localhost:5007`
- API base URL: `http://localhost:5007/api/v1`

### Frontend Port: **5173** ✅
- Frontend runs on: `http://localhost:5173`

### Frontend API URL Configuration:

The frontend uses `VITE_API_URL` environment variable. Check your `frontend/.env` file:

```env
VITE_API_URL=http://localhost:5007
```

**This should match your backend port!**

---

## 🔍 How to Verify Everything is Correct

### 1. Check Backend .env (backend/.env):
```env
PORT=5007
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/school_mgmt
API_URL=http://localhost:5007
UI_URL=http://localhost:5173
# ... other variables
```

### 2. Check Frontend .env (frontend/.env):
```env
VITE_API_URL=http://localhost:5007
```

### 3. Verify the API call in code:
The frontend API is configured in `frontend/src/api/api.ts`:
```typescript
baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`
```

This means:
- If `VITE_API_URL=http://localhost:5007`
- Then API calls go to: `http://localhost:5007/api/v1`

---

## 🚀 Quick Start Commands

### 1. Start PostgreSQL (if not running as service):
```bash
# Windows (if installed as service, it should auto-start)
# Or manually:
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start
```

### 2. Start Backend:
```bash
cd backend
npm install  # if not done already
npm start
# Should see: "Server running on port 5007"
```

### 3. Start Frontend:
```bash
cd frontend
npm install  # if not done already
npm run dev
# Should see: "Local: http://localhost:5173"
```

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to database"
- ✅ Check PostgreSQL is running: `pg_isready`
- ✅ Verify DATABASE_URL in backend/.env
- ✅ Check database exists: `psql -l | grep school_mgmt`

### Issue: "API calls failing / CORS errors"
- ✅ Verify `VITE_API_URL=http://localhost:5007` in frontend/.env
- ✅ Verify backend CORS is configured to allow `http://localhost:5173`
- ✅ Check backend is running on port 5007

### Issue: "Port already in use"
- ✅ Check what's using port 5007: `netstat -ano | findstr :5007`
- ✅ Or change PORT in backend/.env to another port (e.g., 5008)
- ✅ Update frontend/.env `VITE_API_URL` to match

---

## 📝 Summary

✅ **PostgreSQL**: Required locally - create `school_mgmt` database  
✅ **Backend Port**: 5007 (configured in backend/.env)  
✅ **Frontend Port**: 5173 (default Vite port)  
✅ **API URL**: Frontend should call `http://localhost:5007` (set in frontend/.env as `VITE_API_URL`)

The configuration is correct if:
- Backend runs on port 5007
- Frontend runs on port 5173  
- Frontend/.env has `VITE_API_URL=http://localhost:5007`
- PostgreSQL is running with `school_mgmt` database created
