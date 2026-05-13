@echo off
echo ================================================
echo ALTERNATIVE BUILD - Fixes Cloudflare CDN Issues
echo ================================================
echo.
echo This uses Amazon Corretto images instead of Eclipse Temurin
echo to avoid the Cloudflare CDN DNS resolution error.
echo.
echo Building Docker image...
echo.

docker build -f Dockerfile.alternative -t printmedian-backend .

if errorlevel 1 (
    echo.
    echo ================================================
    echo BUILD FAILED!
    echo ================================================
    echo.
    echo If this also fails, try the LOCAL build method:
    echo   1. Run: mvnw.cmd clean package -DskipTests
    echo   2. Run: docker build -f Dockerfile.local -t printmedian-backend .
    echo.
    pause
    exit /b 1
)

echo.
echo ================================================
echo BUILD SUCCESSFUL!
echo ================================================
echo.
echo Image created: printmedian-backend
echo.
echo Next steps:
echo   To run with database: docker-compose up -d
echo   To view logs: docker logs -f print-median-backend
echo.
pause

