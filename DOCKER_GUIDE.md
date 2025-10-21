# Docker Deployment Guide - PrintMedian Enterprise

## Network/Timeout Issues - Solutions

If you encounter Docker image pull timeout errors like:

```
failed to do request: Head "https://registry-1.docker.io/...": context deadline exceeded
```

### Solution 1: Pre-pull Images (Recommended)

Run the provided script to pull all required images first:

```bash
# Windows
pull-images.bat

# Linux/Mac
chmod +x pull-images.sh
./pull-images.sh
```

### Solution 2: Configure Docker DNS

1. Open Docker Desktop
2. Go to **Settings** → **Docker Engine**
3. Add the following to the JSON configuration:

```json
{
  "dns": ["8.8.8.8", "8.8.4.4"]
}
```

4. Click **Apply & Restart**

### Solution 3: Manual Image Pull

```bash
docker pull mysql:8.0
docker pull node:20-alpine
docker pull nginx:alpine
docker pull alpine:3.18
```

## Quick Start

### Prerequisites

- Docker Desktop installed and running
- At least 4GB RAM available
- Ports 80, 3306, and 8080 available

### Build and Run All Services

```bash
# Build and start all services
docker compose up -d --build
docker compose -f docker-compose.dev.yml up -d --build frontend

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Stop and remove volumes (clean start)
docker compose down -v
```

### Build Individual Services

```bash
# Frontend only
docker compose up -d --build frontend

# Backend only
docker compose up -d --build backend

# Database only
docker compose up -d mysql
```

## Service Access

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080
- **MySQL**: localhost:3306
  - Database: `print_median_enterprise`
  - Username: `root`
  - Password: `root`

## Troubleshooting

### Backend fails to start

```bash
# Check if JAR file exists
ls Backend/printmedianenterprise/target/*.jar

# If not, build it first
cd Backend/printmedianenterprise
./mvnw clean package -DskipTests
cd ../..
docker compose up -d --build backend
```

### Frontend build takes too long

The first build may take 10-15 minutes to install npm dependencies. Subsequent builds will be faster.

To use a faster Dockerfile with caching:

```bash
cd Frontend
docker build -f Dockerfile.fast -t printmedian-frontend:latest .
```

### Check service health

```bash
# View all running containers
docker ps

# Check specific service logs
docker compose logs frontend
docker compose logs backend
docker compose logs mysql

# Follow logs in real-time
docker compose logs -f frontend
```

### Database connection issues

```bash
# Ensure MySQL is healthy
docker compose ps mysql

# Check MySQL logs
docker compose logs mysql

# Restart MySQL
docker compose restart mysql
```

## Development Tips

### Hot Reload for Frontend

For development with hot reload, run Angular locally instead of in Docker:

```bash
cd Frontend
npm install
npm start
```

Then only run backend and database in Docker:

```bash
docker compose up -d mysql backend
```

### Rebuild after code changes

```bash
# Rebuild specific service
docker compose up -d --build frontend

# Force rebuild without cache
docker compose build --no-cache frontend
docker compose up -d frontend
```

### Clean Docker system

```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove everything (careful!)
docker system prune -a --volumes
```

## Network Configuration

All services run on the `printmedian-network` bridge network. They can communicate using service names:

- Frontend → Backend: `http://backend:8080`
- Backend → Database: `jdbc:mysql://mysql:3306/print_median_enterprise`

## Volume Management

MySQL data is persisted in the `mysql-data` volume. To reset the database:

```bash
docker compose down -v  # Remove volumes
docker compose up -d    # Recreate with fresh data
```

## Performance Optimization

### Enable BuildKit

Add to your environment or `.bashrc`:

```bash
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1
```

### Use Dockerfile.fast for faster builds

The `Frontend/Dockerfile.fast` uses BuildKit cache mounts for significantly faster rebuilds.

## Security Notes

**⚠️ For Production:**

1. Change MySQL root password
2. Use environment variables from `.env` file
3. Enable HTTPS/SSL
4. Use secrets management
5. Implement proper CORS policies
6. Add authentication/authorization
