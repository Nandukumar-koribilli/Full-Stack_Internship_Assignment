#!/bin/bash

# Quick Start Script for Linux/Mac
# This script helps you get started with the application

echo "========================================"
echo "Full-Stack CI/CD Application Setup"
echo "========================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "[ERROR] Docker is not installed"
    echo "Please install Docker from https://docs.docker.com/get-docker/"
    exit 1
fi

echo "[OK] Docker is installed"
echo ""

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "[ERROR] Docker Compose is not installed"
    exit 1
fi

echo "[OK] Docker Compose is installed"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "[INFO] Creating .env file from template..."
    cp .env.example .env
    echo "[WARNING] Please edit .env file with your configuration"
    echo ""
fi

# Function to start services
start_services() {
    echo ""
    echo "[INFO] Starting all services..."
    docker-compose up -d
    echo ""
    echo "[SUCCESS] Services started!"
    echo ""
    echo "Access the application:"
    echo "- Frontend: http://localhost"
    echo "- Backend API: http://localhost:5000"
    echo "- Backend Health: http://localhost:5000/health"
    echo ""
}

# Function to stop services
stop_services() {
    echo ""
    echo "[INFO] Stopping all services..."
    docker-compose down
    echo "[SUCCESS] Services stopped!"
}

# Function to view logs
view_logs() {
    echo ""
    echo "[INFO] Showing logs (Press Ctrl+C to exit)..."
    docker-compose logs -f
}

# Function to rebuild
rebuild_services() {
    echo ""
    echo "[INFO] Rebuilding and restarting services..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    echo "[SUCCESS] Services rebuilt and restarted!"
}

# Function to cleanup
cleanup() {
    echo ""
    echo "[WARNING] This will remove all containers, volumes, and images!"
    read -p "Are you sure? (yes/no): " confirm
    if [ "$confirm" = "yes" ]; then
        docker-compose down -v
        docker system prune -a -f
        echo "[SUCCESS] Cleanup completed!"
    else
        echo "[INFO] Cleanup cancelled"
    fi
}

# Main menu
echo "========================================"
echo "Choose an option:"
echo "========================================"
echo "1. Start all services (Docker Compose)"
echo "2. Stop all services"
echo "3. View logs"
echo "4. Rebuild and restart"
echo "5. Clean up (remove containers and volumes)"
echo "6. Exit"
echo ""

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        start_services
        ;;
    2)
        stop_services
        ;;
    3)
        view_logs
        ;;
    4)
        rebuild_services
        ;;
    5)
        cleanup
        ;;
    6)
        echo "Thank you for using the application!"
        exit 0
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac
