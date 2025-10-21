@echo off
REM Script to pre-pull all Docker images needed for the project
REM Run this script if you encounter network/timeout issues with docker-compose

echo ========================================
echo Pulling Docker Images for PrintMedian Enterprise
echo ========================================
echo.

echo [1/4] Pulling MySQL 8.0...
docker pull mysql:8.0
if %errorlevel% neq 0 (
    echo ERROR: Failed to pull mysql:8.0
    pause
    exit /b 1
)
echo.

echo [2/4] Pulling Node 20 Alpine...
docker pull node:20-alpine
if %errorlevel% neq 0 (
    echo ERROR: Failed to pull node:20-alpine
    pause
    exit /b 1
)
echo.

echo [3/4] Pulling Nginx Alpine...
docker pull nginx:alpine
if %errorlevel% neq 0 (
    echo ERROR: Failed to pull nginx:alpine
    pause
    exit /b 1
)
echo.

echo [4/4] Pulling Alpine 3.18...
docker pull alpine:3.18
if %errorlevel% neq 0 (
    echo ERROR: Failed to pull alpine:3.18
    pause
    exit /b 1
)
echo.

echo ========================================
echo All images pulled successfully!
echo You can now run: docker compose up -d --build
echo ========================================
pause
