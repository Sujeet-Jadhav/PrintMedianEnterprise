# 🐳 Docker Deployment Guide for PrintMedian Enterprise

This guide will help you understand Docker and deploy your application step by step.

---

## 📚 **What is Docker?**

Docker is a platform that packages your application and all its dependencies into **containers**. Think of containers as lightweight, portable boxes that contain everything your app needs to run.

### **Key Concepts:**

1. **Docker Image**: A blueprint/template for your application (like a recipe)
2. **Docker Container**: A running instance of an image (like the actual dish made from the recipe)
3. **Dockerfile**: Instructions to build a Docker image
4. **docker-compose.yml**: A file to run multiple containers together
5. **Multi-stage Build**: Building your app in one container, then copying only the necessary files to a smaller container

---

## 🏗️ **Project Architecture**

Your application has 3 components:
- **Frontend**: Angular application (runs on port 80)
- **Backend**: Spring Boot API (runs on port 8080)
- **Database**: MySQL (runs on port 3306)

All three will run in separate containers but communicate with each other.

---

## 📋 **Prerequisites**

1. **Install Docker Desktop**:
   - Download from: https://www.docker.com/products/docker-desktop
   - Install and restart your computer
   - Open Docker Desktop and make sure it's running

2. **Verify Installation**:
   ```cmd
   docker --version
   docker-compose --version
   ```

---

## 🚀 **Deployment Steps**

### **Step 1: Prepare Your Application**

Make sure your backend can connect to MySQL using the hostname `mysql` instead of `localhost`.

The `application-docker.properties` file has been created for Docker environment.

### **Step 2: Build and Run with Docker Compose**

Open Command Prompt in the project root (`F:\PrintMedianEnterprise`) and run:

```cmd
docker-compose up --build
```

**What this does:**
- Builds Docker images for frontend and backend
- Downloads MySQL image
- Creates a network for all containers to communicate
- Starts all three containers
- Shows logs from all containers

### **Step 3: Wait for Everything to Start**

Watch the logs. Wait until you see:
- ✅ MySQL: "ready for connections"
- ✅ Backend: "Started PrintmedianenterpriseApplication"
- ✅ Frontend: nginx started

This may take 5-10 minutes the first time.

### **Step 4: Access Your Application**

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080
- **Database**: localhost:3306

---

## 🛠️ **Common Docker Commands**

### **Start All Services**
```cmd
docker-compose up
```

### **Start in Background (Detached Mode)**
```cmd
docker-compose up -d
```

### **Stop All Services**
```cmd
docker-compose down
```

### **Stop and Remove Data**
```cmd
docker-compose down -v
```

### **View Logs**
```cmd
docker-compose logs
```

### **View Logs for Specific Service**
```cmd
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

### **Rebuild After Code Changes**
```cmd
docker-compose up --build
```

### **List Running Containers**
```cmd
docker ps
```

### **Access Container Shell**
```cmd
docker exec -it printmedian-backend sh
docker exec -it printmedian-mysql bash
```

---

## 🔧 **Understanding the Files Created**

### **1. Backend Dockerfile** (`Backend/printmedianenterprise/Dockerfile`)

```dockerfile
# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-17 AS build
# Uses Maven to compile your Java code

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
# Uses smaller Java runtime to run the compiled app
```

**Why 2 stages?** 
- Build stage has Maven (large) - we only need it to compile
- Runtime stage has only Java (small) - we only need it to run
- Final image is much smaller!

### **2. Frontend Dockerfile** (`Frontend/Dockerfile`)

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS build
# Uses Node.js to build your Angular app

# Stage 2: Serve
FROM nginx:alpine
# Uses Nginx web server to serve static files
```

**Why Nginx?** Angular builds to static HTML/CSS/JS files. Nginx is a fast web server for serving these files.

### **3. docker-compose.yml** (Root directory)

This orchestrates all services:
- Defines 3 services: mysql, backend, frontend
- Sets up networking so they can talk to each other
- Configures environment variables
- Manages startup order (database → backend → frontend)

### **4. .dockerignore Files**

Like `.gitignore` but for Docker - tells Docker which files to ignore when building images (node_modules, build artifacts, etc.)

---

## 🌐 **Deployment to Production**

### **Option 1: Deploy to Cloud (AWS, Azure, Google Cloud)**

1. Push images to Docker Hub:
   ```cmd
   docker tag printmedianenterprise-backend:latest yourusername/printmedian-backend:latest
   docker push yourusername/printmedian-backend:latest
   ```

2. Deploy using cloud services like:
   - AWS ECS (Elastic Container Service)
   - Google Cloud Run
   - Azure Container Instances

### **Option 2: Deploy to VPS (Virtual Private Server)**

1. Get a VPS (DigitalOcean, Linode, AWS EC2)
2. Install Docker on the server
3. Copy your code to the server
4. Run `docker-compose up -d`

### **Option 3: Deploy to Kubernetes**

For large-scale applications, you can convert docker-compose to Kubernetes manifests.

---

## 🐛 **Troubleshooting**

### **Container Won't Start**
```cmd
docker-compose logs [service-name]
```

### **Port Already in Use**
Change ports in `docker-compose.yml`:
```yaml
ports:
  - "8081:8080"  # Use 8081 instead of 8080
```

### **Database Connection Issues**
- Make sure MySQL container is healthy
- Check environment variables in docker-compose.yml
- Backend must use `mysql` as hostname, not `localhost`

### **Frontend Can't Connect to Backend**
Update Angular environment files to use correct backend URL:
```typescript
apiUrl: 'http://localhost:8080'
```

### **Out of Disk Space**
Clean up unused Docker resources:
```cmd
docker system prune -a
```

---

## 📊 **What Happens When You Deploy?**

1. **Build Phase**:
   - Frontend: `npm install` → `ng build` → Copy to Nginx
   - Backend: `mvn package` → Create JAR → Copy to runtime
   - Database: Pull official MySQL image

2. **Run Phase**:
   - MySQL starts and initializes database
   - Backend waits for MySQL, then connects and starts
   - Frontend starts and serves on port 80

3. **Networking**:
   - All containers are on the same network: `printmedian-network`
   - They can find each other by service name (mysql, backend, frontend)

---

## ✅ **Next Steps**

1. Test locally with `docker-compose up`
2. Make sure all features work
3. Set up environment variables for production (passwords, API keys)
4. Choose a cloud provider or hosting service
5. Set up CI/CD (automated deployment) using GitHub Actions or Jenkins

---

## 📞 **Need Help?**

- Docker Documentation: https://docs.docker.com/
- Docker Hub: https://hub.docker.com/
- Docker Compose Docs: https://docs.docker.com/compose/

---

**Good luck with your deployment! 🚀**
# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application (skip tests for faster builds)
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image
FROM eclipse-temurin:17-jre-alpine

# Set working directory
WORKDIR /app

# Copy the JAR file from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

