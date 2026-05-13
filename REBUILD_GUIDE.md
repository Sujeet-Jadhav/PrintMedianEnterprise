# Code Changes & Rebuild Guide

## When Code Changes Don't Appear

Docker containers are **isolated environments** with their own copy of your code. Changes to your local files won't automatically appear in running containers - you need to rebuild!

---

## 🔄 Rebuilding After Code Changes

### Frontend (Angular) Changes

```bash
# Rebuild and restart frontend only
cd /f/PrintMedianEnterprise
docker compose -f docker-compose.dev.yml up -d --build frontend

# View build progress
docker compose -f docker-compose.dev.yml logs -f frontend
```

**Build time:** ~2-3 minutes (cached dependencies)  
**When needed:** After changes to any file in `Frontend/src/`

---

### Backend (Spring Boot) Changes

```bash
# Step 1: Build JAR locally
cd /f/PrintMedianEnterprise/Backend/printmedianenterprise
./mvnw clean package -DskipTests

# Step 2: Rebuild Docker container
cd /f/PrintMedianEnterprise
docker compose -f docker-compose.dev.yml up -d --build backend

# View logs
docker logs -f printmedian-backend
```

**Build time:**

- Maven build: ~1-2 minutes
- Docker rebuild: ~30 seconds

**When needed:** After changes to any file in `Backend/printmedianenterprise/src/`

---

### Database Schema Changes

If you change database schema, you may need to:

```bash
# Restart backend to apply migrations
docker compose -f docker-compose.dev.yml restart backend

# OR reset database (deletes all data!)
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up -d
```

---

## 🚀 Faster Development Workflow

### Development Mode (Recommended)

**Frontend with Hot Reload:**

```bash
# Stop Docker frontend
docker compose -f docker-compose.dev.yml stop frontend

# Run locally with hot reload
cd Frontend
npm start
```

Access at: http://localhost:4200  
✅ Changes auto-refresh instantly!

**Backend & Database in Docker:**

```bash
docker compose -f docker-compose.dev.yml up -d backend
```

Access at: http://localhost:8080  
⚠️ Still requires rebuild after changes

---

## 📋 Common Scenarios

### Scenario 1: Changed a Component HTML/CSS

```bash
# In Docker:
docker compose -f docker-compose.dev.yml up -d --build frontend

# Or use hot reload (faster):
npm start  # in Frontend directory
```

### Scenario 2: Changed Backend Service Logic

```bash
cd Backend/printmedianenterprise
./mvnw clean package -DskipTests
cd ../..
docker compose -f docker-compose.dev.yml up -d --build backend
```

### Scenario 3: Changed Both Frontend and Backend

```bash
# Build backend JAR
cd Backend/printmedianenterprise
./mvnw clean package -DskipTests
cd ../..

# Rebuild both containers
docker compose -f docker-compose.dev.yml up -d --build
```

### Scenario 4: Changed docker-compose.dev.yml

```bash
# Recreate containers with new config
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up -d
```

### Scenario 5: Changed Dockerfile

```bash
# Force rebuild without cache
docker compose -f docker-compose.dev.yml build --no-cache frontend
docker compose -f docker-compose.dev.yml up -d frontend
```

---

## 🔍 Debugging Tips

### Check if changes are in the container:

```bash
# View frontend files in container
docker exec printmedian-frontend ls -la /usr/share/nginx/html

# View backend JAR timestamp
docker exec printmedian-backend ls -lh /app/app.jar

# Check container creation time
docker ps --filter "name=printmedian" --format "table {{.Names}}\t{{.Status}}\t{{.CreatedAt}}"
```

### View real-time logs:

```bash
# All services
docker compose -f docker-compose.dev.yml logs -f

# Specific service
docker logs -f printmedian-frontend
docker logs -f printmedian-backend
```

### Force complete rebuild:

```bash
# Remove everything and rebuild from scratch
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml build --no-cache
docker compose -f docker-compose.dev.yml up -d
```

---

## ⚡ Development Workflow Comparison

### Docker Only (Slower but Production-like)

```
Make changes → Rebuild Docker → Wait 2-3 min → Test
```

**Pros:** Matches production environment  
**Cons:** Slow iteration cycle

### Hybrid Mode (Faster Development)

```
Make changes → Auto-refresh (instant) → Test
```

**Pros:** Instant feedback, faster development  
**Cons:** Frontend runs outside Docker

**Recommended:** Use hybrid mode for development, Docker for testing/deployment

---

## 📚 Related Files

- `docker-compose.dev.yml` - Development configuration
- `docker-compose.yml` - Production configuration
- `Frontend/Dockerfile` - Frontend container definition
- `Backend/printmedianenterprise/Dockerfile` - Backend container definition

---

## 💡 Pro Tips

1. **Use Docker for final testing** before committing code
2. **Run locally** (`npm start`) for faster frontend development
3. **Rebuild backend** only when changing Java code, not properties
4. **Use `--build` flag** to ensure latest code is used
5. **Check logs** if something doesn't work after rebuild
6. **Clear browser cache** if changes don't appear in browser

---

## 🆘 Need Help?

```bash
# Check container status
docker ps

# View detailed logs
docker compose -f docker-compose.dev.yml logs

# Restart everything
docker compose -f docker-compose.dev.yml restart

# Full reset (nuclear option)
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up -d --build
```
