# 🚀 Quick Start Guide - Docker Deployment

## Access Your Application

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080

## Common Commands

### Start/Stop Services

```bash
# Start all services
docker compose -f docker-compose.dev.yml up -d

# Stop all services
docker compose -f docker-compose.dev.yml down

# Restart a specific service
docker compose -f docker-compose.dev.yml restart frontend
docker compose -f docker-compose.dev.yml restart backend
```

### View Logs

```bash
# Follow all logs
docker compose -f docker-compose.dev.yml logs -f

# Frontend logs only
docker logs -f printmedian-frontend

# Backend logs only
docker logs -f printmedian-backend

# Last 50 lines
docker logs --tail 50 printmedian-backend
```

### Rebuild After Code Changes

```bash
# Rebuild and restart frontend
docker compose -f docker-compose.dev.yml up -d --build frontend

# Rebuild and restart backend (after building JAR)
cd Backend/printmedianenterprise
./mvnw clean package -DskipTests
cd ../..
docker compose -f docker-compose.dev.yml up -d --build backend
```

### Check Container Status

```bash
# List running containers
docker ps

# View resource usage
docker stats printmedian-frontend printmedian-backend

# Inspect container
docker inspect printmedian-frontend
```

### Cleanup

```bash
# Stop and remove containers
docker compose -f docker-compose.dev.yml down

# Remove images
docker rmi printmedianenterprise-frontend:latest
docker rmi printmedianenterprise-backend:latest

# Clean up everything (careful!)
docker system prune -a
```

## Troubleshooting

### Frontend not loading?

```bash
# Check if container is running
docker ps | grep frontend

# View logs for errors
docker logs printmedian-frontend

# Restart the container
docker compose -f docker-compose.dev.yml restart frontend
```

### Backend errors?

```bash
# Check database connection
docker logs printmedian-backend | grep -i error

# Ensure local MySQL is running
netstat -ano | grep :3306

# Restart backend
docker compose -f docker-compose.dev.yml restart backend
```

### Port conflicts?

```bash
# Check what's using ports
netstat -ano | grep :80    # Frontend
netstat -ano | grep :8080  # Backend
netstat -ano | grep :3306  # MySQL

# Change ports in docker-compose.dev.yml if needed
```

### Need to rebuild from scratch?

```bash
# Remove everything and rebuild
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml build --no-cache
docker compose -f docker-compose.dev.yml up -d
```

## Development Workflow

### 1. Frontend Changes

```bash
# Make your changes in Frontend/src/...
# Then rebuild:
docker compose -f docker-compose.dev.yml up -d --build frontend
```

### 2. Backend Changes

```bash
# Make your changes in Backend/printmedianenterprise/src/...
# Build the JAR:
cd Backend/printmedianenterprise
./mvnw clean package -DskipTests
cd ../..
# Rebuild Docker:
docker compose -f docker-compose.dev.yml up -d --build backend
```

### 3. Configuration Changes

```bash
# For docker-compose.dev.yml changes:
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up -d

# For Dockerfile changes:
docker compose -f docker-compose.dev.yml up -d --build
```

## Production Deployment

### Using Full Docker Compose (with MySQL container)

```bash
# Stop local MySQL first
# Then run:
docker compose up -d

# All three services will start:
# - MySQL (port 3306)
# - Backend (port 8080)
# - Frontend (port 80)
```

## Need Help?

- Check `DOCKER_SUCCESS_REPORT.md` for detailed success report
- Check `DOCKER_GUIDE.md` for comprehensive documentation
- View logs for debugging: `docker compose -f docker-compose.dev.yml logs -f`
