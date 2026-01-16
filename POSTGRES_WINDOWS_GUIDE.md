# PostgreSQL on Windows - Quick Guide

## 🚀 How to Open PostgreSQL Tools

### Option 1: SQL Shell (psql) - Command Line
1. **Press Windows Key** and type: `SQL Shell (psql)`
2. **Click** on "SQL Shell (psql)" from the search results
3. **Or** find it in: Start Menu → PostgreSQL [version] → SQL Shell (psql)

### Option 2: pgAdmin 4 - GUI Tool (Easier!)
1. **Press Windows Key** and type: `pgAdmin 4`
2. **Click** on "pgAdmin 4" from the search results
3. This opens a web-based GUI in your browser

### Option 3: Command Prompt / PowerShell
```bash
# Open Command Prompt or PowerShell, then:
psql -U ayobami -d school_mgmt
```

---

## ✅ Your Current Connection (from the image)

Your connection parameters look correct:
- **Server**: `localhost:5432` ✅
- **Database**: `school_mgmt` ✅
- **Port**: `5432` ✅
- **Username**: `ayobami` ✅

**Just press Enter** when it asks for the password (or type your password if you set one).

---

## 📝 Next Steps: Set Up the Database

Once you're connected to `school_mgmt` database in psql, run these commands:

### 1. Create the tables:
```sql
\i C:/Users/HP/CursorProjects/anvelo/seed_db/tables.sql
```

**OR** if that doesn't work, run this in PowerShell/Command Prompt:
```bash
psql -U ayobami -d school_mgmt -f C:\Users\HP\CursorProjects\anvelo\seed_db\tables.sql
```

### 2. Seed the database with initial data:
```sql
\i C:/Users/HP/CursorProjects/anvelo/seed_db/seed-db.sql
```

**OR** in PowerShell/Command Prompt:
```bash
psql -U ayobami -d school_mgmt -f C:\Users\HP\CursorProjects\anvelo\seed_db\seed-db.sql
```

---

## 🔧 Update Your Backend .env File

Make sure your `backend/.env` file has the correct database connection:

```env
DATABASE_URL=postgresql://ayobami:your_password@localhost:5432/school_mgmt
```

Replace `your_password` with your actual PostgreSQL password for user `ayobami`.

---

## 🎯 Quick Test

After setting up, test the connection:

1. **In psql**, type:
   ```sql
   \dt
   ```
   This lists all tables. You should see tables like `users`, `notices`, `classes`, etc.

2. **Check if data was seeded**:
   ```sql
   SELECT COUNT(*) FROM users;
   ```
   Should return a number > 0 if seed data was loaded.

---

## 💡 Tips

- **pgAdmin 4** is easier for beginners - it's a visual tool
- **psql** is faster for quick commands
- If you forget your password, you can reset it in pgAdmin or use Windows authentication

---

## 🐛 Troubleshooting

### "password authentication failed"
- Check your password in `backend/.env`
- Try resetting the password in pgAdmin

### "database school_mgmt does not exist"
- Create it: `createdb -U ayobami school_mgmt`
- Or in psql: `CREATE DATABASE school_mgmt;`

### "permission denied"
- Make sure user `ayobami` has permissions
- Or use the `postgres` superuser account
