# Database Setup and Application Startup Guide

## Problem Summary
The application was failing with an `UnsatisfiedDependencyException` because:
1. The database schema was incomplete (missing core tables like `users`, `product_category`, etc.)
2. Flyway migrations only included job serial number tables
3. Hibernate was set to `validate` mode which expects all tables to exist

## Solution Applied

### 1. Fixed Configuration Issues
- ✅ Removed inline comment from `spring.flyway.clean-disabled` property (Spring properties don't support inline comments)
- ✅ Changed `spring.jpa.hibernate.ddl-auto` from `validate` to `update` to allow table creation
- ✅ Temporarily disabled Flyway (`spring.flyway.enabled=false`) for initial setup

### 2. Created Initial Migration
Created `V0__Initial_schema.sql` with all required tables:
- users
- product_category
- product
- jobs
- master_setting
- contact_us

## Steps to Start the Application

### Option 1: Quick Start (Recommended for Development)
With the current configuration, the application will:
1. Connect to MySQL at `localhost:3306`
2. Use/create database `print_median_enterprise`
3. Let Hibernate automatically create all tables based on your entities
4. Start the application on port 8080

**Just run:**
```bash
cd F:\PrintMedianEnterprise\Backend\printmedianenterprise
.\mvnw spring-boot:run
```

### Option 2: Use MySQL Command Line (If Database Doesn't Exist)
If you get a "database doesn't exist" error:

1. Connect to MySQL:
```bash
mysql -u root -p
# Enter password: root
```

2. Create the database:
```sql
CREATE DATABASE IF NOT EXISTS print_median_enterprise CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;
```

3. Then run the application:
```bash
.\mvnw spring-boot:run
```

### Option 3: Use the Init Script
Run the initialization script I created:
```bash
mysql -u root -p < init_database.sql
# Enter password: root
```

## After First Successful Run

### Enable Flyway (Optional, for Production-Ready Setup)
Once the application runs successfully and tables are created:

1. **Stop the application**

2. **Change ddl-auto to validate** in `application.properties`:
   ```properties
   spring.jpa.hibernate.ddl-auto=validate
   ```

3. **Enable Flyway**:
   ```properties
   spring.flyway.enabled=true
   ```

4. **Baseline Flyway** to recognize existing tables:
   ```bash
   .\mvnw flyway:baseline
   ```

5. **Restart the application**

## Default Admin User
After the first run with Flyway enabled, a default admin user will be created:
- **Email:** admin@printmedian.com
- **Password:** admin123
- **Role:** ADMIN

## Common Issues and Solutions

### Issue: "Unknown database 'print_median_enterprise'"
**Solution:** Create the database manually using Option 2 above

### Issue: "Access denied for user 'root'@'localhost'"
**Solution:** Check your MySQL credentials in `application.properties`

### Issue: "Cannot create PoolableConnectionFactory"
**Solution:** Ensure MySQL is running:
```bash
# Check if MySQL is running
Get-Service -Name MySQL*
```

### Issue: Port 8080 already in use
**Solution:** Change the port in `application.properties`:
```properties
server.port=8081
```

## Verification

After the application starts successfully, you should see:
```
Started PrintmedianenterpriseApplication in X.XXX seconds
```

You can verify the API is running:
```bash
curl http://localhost:8080/api/auth/signup
```

## File Changes Made

1. ✅ `application.properties` - Fixed property format and changed settings for initial setup
2. ✅ Created `V0__Initial_schema.sql` - Initial database migration
3. ✅ Created `init_database.sql` - Database preparation script
4. ✅ Created this guide

## Next Steps

1. Start the application using Option 1
2. Verify it starts successfully
3. Test your endpoints
4. (Optional) Enable Flyway for production-ready setup

