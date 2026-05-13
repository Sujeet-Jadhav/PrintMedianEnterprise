# Complete Docker & Deployment Guide for Print Median Enterprise

## 🚨 Problem Summary
Your Docker cannot pull images from the internet due to network connectivity issues. This is why you see errors like "no such host" when trying to build.

## ✅ Solution: Local Build Method

Instead of building inside Docker, we build the application on your computer first, then package it into Docker.

---

## 📋 Prerequisites

1. **Java 17** - Already installed (you're using it)
2. **Maven** - Already installed (mvnw.cmd is in your project)
3. **Docker Desktop** - Already installed
4. **MySQL 8.0** - Will run in Docker

---

## 🎯 Step-by-Step: Build and Run Locally with Docker

### **Step 1: Build Your Application Locally**

**Option A - Using Windows Command Prompt (cmd.exe):**

Open Command Prompt in your project folder and run:

```cmd
mvnw.cmd clean package -DskipTests
```

**Option B - Using Git Bash (RECOMMENDED if cmd gives issues):**

Open Git Bash in your project folder and run:

```bash
./mvnw clean package -DskipTests
```

**What this does:**
- Cleans old build files
- Compiles your Java code
- Creates a JAR file in `target/` folder
- Skips tests to speed up the build

**Expected output:** 
- You'll see "BUILD SUCCESS"
- A file like `printmedianenterprise-0.0.1-SNAPSHOT.jar` will be created in the `target` folder

---

### **Step 2: Build Docker Image**

Now create a Docker image with your pre-built JAR file:

**Command Prompt:**
```cmd
docker build -f Dockerfile.local -t printmedian-backend .
```

**Git Bash:**
```bash
docker build -f Dockerfile.local -t printmedian-backend .
```

**What this does:**
- Uses `Dockerfile.local` (which doesn't need internet)
- Creates an image named `printmedian-backend`
- Copies your JAR file into the image

**Expected output:** 
- You'll see "Successfully built..." and "Successfully tagged printmedian-backend:latest"

---

### **Step 3: Start All Services (Backend + MySQL)**

```bash
docker-compose up -d
```

**What this does:**
- Starts MySQL database container
- Starts your Spring Boot backend container
- `-d` means "detached" (runs in background)

**Expected output:** 
- "Container print-median-mysql Started"
- "Container print-median-backend Started"

---

### **Step 4: Verify Everything is Running**

Check if containers are running:

```bash
docker ps
```

**You should see 2 containers:**
- `print-median-mysql` (port 3307)
- `print-median-backend` (port 8080)

Check logs to ensure no errors:

```bash
docker logs print-median-backend
```

**Good sign:** You'll see "Started PrintmedianenterpriseApplication"

---

### **Step 5: Test Your Application**

Open your browser or use Postman:

```
http://localhost:8080
```

Test an endpoint (replace with your actual endpoint):
```
http://localhost:8080/api/settings
```

---

## 🔄 Quick Reference Commands

### Build and Start Everything:

**Command Prompt:**
```cmd
mvnw.cmd clean package -DskipTests && docker build -f Dockerfile.local -t printmedian-backend . && docker-compose up -d
```

**Git Bash:**
```bash
./mvnw clean package -DskipTests && docker build -f Dockerfile.local -t printmedian-backend . && docker-compose up -d
```

### Stop Everything:
```bash
docker-compose down
```

### Restart After Code Changes:

**Command Prompt:**
```cmd
mvnw.cmd clean package -DskipTests
docker-compose down
docker-compose up -d --build
```

**Git Bash:**
```bash
./mvnw clean package -DskipTests
docker-compose down
docker-compose up -d --build
```

### View Logs:
```bash
docker logs -f print-median-backend
```

### Remove Everything (including database):
```bash
docker-compose down -v
```

---

## 🌐 Deployment to Digital Ocean

Once everything works locally, here's how to deploy to Digital Ocean:

### **Option 1: Digital Ocean App Platform (Easiest - Recommended)**

1. **Push Your Code to GitHub:**
   ```cmd
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Digital Ocean Dashboard:**
   - Click "Create" → "Apps"
   - Connect your GitHub repository
   - Digital Ocean will detect it's a Java Spring Boot app

3. **Configure Environment Variables:**
   - `SPRING_PROFILES_ACTIVE=production`
   - Database credentials (Digital Ocean can create a managed MySQL database)

4. **Deploy:**
   - Click "Deploy"
   - Digital Ocean builds and runs your app automatically
   - You get a URL like: `https://your-app.ondigitalocean.app`

**Cost:** ~$5-12/month for basic plan

---

### **Option 2: Digital Ocean Droplet (More Control)**

1. **Create a Droplet:**
   - Choose Ubuntu 22.04
   - Select plan ($6/month minimum)
   - Add SSH key for access

2. **Connect to Your Droplet:**
   ```cmd
   ssh root@your-droplet-ip
   ```

3. **Install Docker on Droplet:**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo apt install docker-compose -y
   ```

4. **Upload Your Code:**
   
   **Option A - Using Git (Recommended):**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo/Backend/printmedianenterprise
   ```
   
   **Option B - Using SCP (from your computer):**
   ```cmd
   scp -r F:\PrintMedianEnterprise\Backend\printmedianenterprise root@your-droplet-ip:/root/app
   ```

5. **Build and Run on Droplet:**
   ```bash
   cd /root/app
   
   # Install Java if building on server
   apt install openjdk-17-jdk maven -y
   
   # Build
   mvn clean package -DskipTests
   
   # Start with Docker Compose
   docker-compose up -d
   ```

6. **Configure Firewall:**
   ```bash
   ufw allow 8080
   ufw allow 80
   ufw allow 443
   ufw enable
   ```

7. **Access Your App:**
   ```
   http://your-droplet-ip:8080
   ```

---

### **Option 3: Use Pre-built Image (Upload to Docker Hub)**

1. **Create Docker Hub Account:** https://hub.docker.com

2. **Login to Docker Hub:**
   ```cmd
   docker login
   ```

3. **Tag and Push Your Image:**
   ```cmd
   docker tag printmedian-backend your-username/printmedian-backend:latest
   docker push your-username/printmedian-backend:latest
   ```

4. **On Digital Ocean Droplet, Pull and Run:**
   ```bash
   docker pull your-username/printmedian-backend:latest
   docker-compose up -d
   ```

---

## 🔧 Production Configuration

### Update `application-docker.properties` for Production:

```properties
# Production Database (use Digital Ocean Managed Database)
spring.datasource.url=jdbc:mysql://your-db-host:25060/print_median_enterprise?sslMode=REQUIRED
spring.datasource.username=doadmin
spring.datasource.password=your-secure-password

# Security
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Frontend URL
app.user.url=https://your-frontend-domain.com/login

# Server
server.address=0.0.0.0
server.port=8080
```

---

## 🐛 Troubleshooting

### "Cannot open Copilot" or "Failed to start powershell.exe" in IntelliJ

**Solution 1 - Use Git Bash Terminal in IntelliJ:**
1. Go to: **File → Settings → Tools → Terminal**
2. Change "Shell path" to: `"C:\Program Files\Git\bin\bash.exe"`
3. Click **OK** and restart the terminal

**Solution 2 - Fix PowerShell Execution Policy:**
1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Type `Y` and press Enter
4. Restart IntelliJ IDEA

**Solution 3 - Use Command Prompt:**
1. Go to: **File → Settings → Tools → Terminal**
2. Change "Shell path" to: `cmd.exe`
3. Click **OK**

### "mvnw.cmd: command not found" in Git Bash
Use `./mvnw` instead of `mvnw.cmd` when in Git Bash

### "Port 8080 already in use"

**Command Prompt:**
```cmd
netstat -ano | findstr :8080
taskkill /PID <process-id> /F
```

**Git Bash:**
```bash
netstat -ano | grep :8080
taskkill //PID <process-id> //F
```

### "Cannot connect to Docker daemon"
- Open Docker Desktop and wait for it to start
- Look for the whale icon in your system tray

### "MySQL connection refused"
```cmd
docker logs print-median-mysql
```
Wait 30 seconds for MySQL to fully start

### "Application crashes immediately"
```cmd
docker logs print-median-backend
```
Check for errors in the logs

---

## 📝 Important Notes

1. **Database Data Persistence:**
   - Your MySQL data is stored in a Docker volume named `mysql-data`
   - To backup: `docker exec print-median-mysql mysqldump -u root -proot print_median_enterprise > backup.sql`

2. **Environment Variables:**
   - For production, use environment variables instead of hardcoding passwords
   - Add to `docker-compose.yml` under `environment:` section

3. **HTTPS/SSL:**
   - For production, use a reverse proxy like Nginx
   - Get free SSL certificate from Let's Encrypt

4. **Monitoring:**
   - Add Spring Boot Actuator for health checks
   - Use Digital Ocean monitoring dashboard

---

## 🎉 Success Checklist

- [ ] Application builds successfully locally
- [ ] Docker image builds without errors
- [ ] Containers start and stay running
- [ ] Can access application at http://localhost:8080
- [ ] Database connection works
- [ ] API endpoints respond correctly
- [ ] Ready to deploy to Digital Ocean

---

## 📞 Quick Help

**Using the provided docker-manager.bat:**
- Just double-click `docker-manager.bat`
- Choose option **6** for local build method
- This automates steps 1-3 above

**Common workflow:**
1. Make code changes
2. Run `mvnw.cmd clean package -DskipTests`
3. Run `docker-compose up -d --build`
4. Test your changes

---

Good luck with your deployment! 🚀
