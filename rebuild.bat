@echo off
REM Quick rebuild script for PrintMedian Enterprise (Windows)
REM Usage: rebuild.bat [frontend|backend|all]

setlocal enabledelayedexpansion

set COMPOSE_FILE=docker-compose.dev.yml
set PROJECT_DIR=F:\PrintMedianEnterprise

if "%1"=="" (
    set ACTION=all
) else (
    set ACTION=%1
)

if "%ACTION%"=="frontend" goto REBUILD_FRONTEND
if "%ACTION%"=="backend" goto REBUILD_BACKEND
if "%ACTION%"=="all" goto REBUILD_ALL
goto USAGE

:REBUILD_FRONTEND
echo.
echo ========================================
echo Rebuilding Frontend...
echo ========================================
cd /d "%PROJECT_DIR%"
docker compose -f %COMPOSE_FILE% up -d --build frontend
if %errorlevel% neq 0 (
    echo ERROR: Frontend rebuild failed!
    pause
    exit /b 1
)
echo.
echo Frontend rebuilt successfully!
echo Access at: http://localhost
goto SHOW_STATUS

:REBUILD_BACKEND
echo.
echo ========================================
echo Building Backend JAR...
echo ========================================
cd /d "%PROJECT_DIR%\Backend\printmedianenterprise"
call mvnw.cmd clean package -DskipTests
if %errorlevel% neq 0 (
    echo ERROR: Maven build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Rebuilding Backend Docker container...
echo ========================================
cd /d "%PROJECT_DIR%"
docker compose -f %COMPOSE_FILE% up -d --build backend
if %errorlevel% neq 0 (
    echo ERROR: Backend rebuild failed!
    pause
    exit /b 1
)
echo.
echo Backend rebuilt successfully!
echo Access at: http://localhost:8080
goto SHOW_STATUS

:REBUILD_ALL
echo.
echo ========================================
echo Rebuilding ALL services...
echo ========================================
call :REBUILD_BACKEND
if %errorlevel% neq 0 exit /b 1
call :REBUILD_FRONTEND
if %errorlevel% neq 0 exit /b 1
echo.
echo All services rebuilt successfully!
goto SHOW_STATUS

:SHOW_STATUS
echo.
echo ========================================
echo Container Status:
echo ========================================
docker ps --filter "name=printmedian" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo.
pause
goto END

:USAGE
echo.
echo Usage: %0 [frontend^|backend^|all]
echo.
echo Examples:
echo   %0 frontend    - Rebuild only frontend
echo   %0 backend     - Rebuild only backend
echo   %0 all         - Rebuild everything
echo   %0             - Rebuild everything (default)
echo.
pause
exit /b 1

:END
endlocal
