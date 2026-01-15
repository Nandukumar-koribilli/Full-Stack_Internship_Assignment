@echo off
REM Quick Start Script for Windows
REM This script helps you get started with the application

echo ========================================
echo Full-Stack CI/CD Application Setup
echo ========================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed or not in PATH
    echo Please install Docker Desktop from https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo [OK] Docker is installed
echo.

REM Check if Docker Compose is available
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Compose is not installed
    pause
    exit /b 1
)

echo [OK] Docker Compose is installed
echo.

REM Check if .env file exists
if not exist .env (
    echo [INFO] Creating .env file from template...
    copy .env.example .env
    echo [WARNING] Please edit .env file with your configuration
    echo.
)

echo ========================================
echo Choose an option:
echo ========================================
echo 1. Start all services (Docker Compose)
echo 2. Stop all services
echo 3. View logs
echo 4. Rebuild and restart
echo 5. Clean up (remove containers and volumes)
echo 6. Exit
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto start
if "%choice%"=="2" goto stop
if "%choice%"=="3" goto logs
if "%choice%"=="4" goto rebuild
if "%choice%"=="5" goto cleanup
if "%choice%"=="6" goto end

echo Invalid choice
pause
exit /b 1

:start
echo.
echo [INFO] Starting all services...
docker-compose up -d
echo.
echo [SUCCESS] Services started!
echo.
echo Access the application:
echo - Frontend: http://localhost
echo - Backend API: http://localhost:5000
echo - Backend Health: http://localhost:5000/health
echo.
pause
goto end

:stop
echo.
echo [INFO] Stopping all services...
docker-compose down
echo [SUCCESS] Services stopped!
pause
goto end

:logs
echo.
echo [INFO] Showing logs (Press Ctrl+C to exit)...
docker-compose logs -f
goto end

:rebuild
echo.
echo [INFO] Rebuilding and restarting services...
docker-compose down
docker-compose build --no-cache
docker-compose up -d
echo [SUCCESS] Services rebuilt and restarted!
pause
goto end

:cleanup
echo.
echo [WARNING] This will remove all containers, volumes, and images!
set /p confirm="Are you sure? (yes/no): "
if /i "%confirm%"=="yes" (
    docker-compose down -v
    docker system prune -a -f
    echo [SUCCESS] Cleanup completed!
) else (
    echo [INFO] Cleanup cancelled
)
pause
goto end

:end
echo.
echo Thank you for using the application!
