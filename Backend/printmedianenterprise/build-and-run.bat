@echo off
REM Build and Run Script for Command Prompt
REM This script builds your Spring Boot app and runs it with Docker

echo ==========================================
echo Print Median Enterprise - Build ^& Deploy
echo ==========================================
echo.

REM Step 1: Build the application
echo Step 1: Building Spring Boot application...
call mvnw.cmd clean package -DskipTests

if %ERRORLEVEL% EQU 0 (
    echo [32m✓ Build successful![0m
) else (
    echo [31m✗ Build failed. Please check the errors above.[0m
    exit /b 1
)

echo.

REM Step 2: Build Docker image
echo Step 2: Building Docker image...
docker build -f Dockerfile.local -t printmedian-backend .

if %ERRORLEVEL% EQU 0 (
    echo [32m✓ Docker image built successfully![0m
) else (
    echo [31m✗ Docker build failed. Please check the errors above.[0m
    exit /b 1
)

echo.

REM Step 3: Start containers
echo Step 3: Starting containers with docker-compose...
docker-compose up -d

if %ERRORLEVEL% EQU 0 (
    echo [32m✓ Containers started successfully![0m
) else (
    echo [31m✗ Failed to start containers. Please check the errors above.[0m
    exit /b 1
)

echo.
echo ==========================================
echo Deployment Complete!
echo ==========================================
echo.
echo Your application is now running at:
echo   Backend: http://localhost:8080
echo   MySQL:   localhost:3307
echo.
echo Useful commands:
echo   Check status:    docker ps
echo   View logs:       docker logs -f print-median-backend
echo   Stop all:        docker-compose down
echo.
pause

