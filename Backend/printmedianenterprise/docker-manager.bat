@echo off
echo ========================================
echo Print Median Enterprise - Docker Build
echo ========================================
echo.

echo Checking if Docker is running...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not installed or not running!
    echo Please install Docker Desktop and start it.
    pause
    exit /b 1
)

echo Docker is running!
echo.

echo Choose an option:
echo 1. Build and run locally (with MySQL)
echo 2. Build Docker image only
echo 3. Stop all services
echo 4. View logs
echo 5. Clean up (remove containers and images)
echo 6. Build using LOCAL method (fixes network errors)
echo 7. Test Docker internet connection
echo.

set /p choice="Enter your choice (1-7): "

if "%choice%"=="1" (
    echo.
    echo Building and starting all services...
    docker-compose up --build
)

if "%choice%"=="2" (
    echo.
    echo Building Docker image...
    docker build -t printmedian-backend .
    echo.
    echo Build complete! Image: printmedian-backend
)

if "%choice%"=="3" (
    echo.
    echo Stopping all services...
    docker-compose down
    echo Services stopped!
)

if "%choice%"=="4" (
    echo.
    echo Showing logs (Press Ctrl+C to exit)...
    docker-compose logs -f
)

if "%choice%"=="5" (
    echo.
    echo WARNING: This will remove all containers and volumes (including database data)
    set /p confirm="Are you sure? (yes/no): "
    if /i "%confirm%"=="yes" (
        docker-compose down -v
        docker rmi printmedian-backend 2>nul
        echo Cleanup complete!
    ) else (
        echo Cancelled.
    )
)

if "%choice%"=="6" (
    echo.
    echo ========================================
    echo LOCAL BUILD METHOD (Fixes Network Issues)
    echo ========================================
    echo.
    echo Step 1: Building application locally with Maven...
    call mvnw.cmd clean package -DskipTests
    if errorlevel 1 (
        echo.
        echo ERROR: Maven build failed!
        echo Please check the error messages above.
        pause
        exit /b 1
    )
    echo.
    echo Step 2: Building Docker image with local jar...
    docker build -f Dockerfile.local -t printmedian-backend .
    if errorlevel 1 (
        echo.
        echo ERROR: Docker build failed!
        pause
        exit /b 1
    )
    echo.
    echo ========================================
    echo SUCCESS! Image built: printmedian-backend
    echo ========================================
    echo.
    echo To run the application, use docker-compose:
    echo   docker-compose up -d
    echo.
)

if "%choice%"=="7" (
    echo.
    echo Testing Docker internet connection...
    echo.
    echo Test 1: Pulling hello-world image...
    docker pull hello-world
    if errorlevel 1 (
        echo.
        echo FAILED: Docker cannot access the internet.
        echo.
        echo Possible solutions:
        echo 1. Restart Docker Desktop
        echo 2. Check firewall settings
        echo 3. Try different network/disable VPN
        echo 4. Use option 6 (Local build method)
        echo.
        echo See DOCKER_TROUBLESHOOTING.md for more help.
    ) else (
        echo.
        echo SUCCESS: Docker can access the internet!
        echo You can use the normal build method.
    )
    echo.
)

echo.
pause
