# 🎓 Complete Setup Guide

This guide will walk you through the entire setup process from start to finish.

---

## 📚 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Local Development Setup](#local-development-setup)
4. [Docker Setup](#docker-setup)
5. [GitHub Setup](#github-setup)
6. [CI/CD Pipeline Setup](#cicd-pipeline-setup)
7. [Deployment](#deployment)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

### Required Software

Install the following software on your machine:

#### Windows

```powershell
# Install Chocolatey (package manager)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install required software
choco install git docker-desktop nodejs python -y
```

#### Mac

```bash
# Install Homebrew (package manager)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install required software
brew install git docker node python@3.11
```

#### Linux (Ubuntu/Debian)

```bash
# Update package list
sudo apt update

# Install required software
sudo apt install git docker.io docker-compose nodejs npm python3.11 python3-pip -y

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### Required Accounts

1. **GitHub Account**: https://github.com/signup
2. **Docker Hub Account**: https://hub.docker.com/signup
3. **MongoDB Atlas Account**: https://www.mongodb.com/cloud/atlas/register

---

## 2. Project Overview

### What You're Building

A production-ready full-stack application with:

- **Frontend**: React application with modern UI
- **Backend**: Python Flask REST API
- **Database**: MongoDB (cloud-hosted)
- **CI/CD**: Automated testing and deployment
- **Containerization**: Docker for consistent environments

### Architecture

```
User Browser
     ↓
Frontend (React + Nginx) ← Port 80
     ↓
Backend (Flask API) ← Port 5000
     ↓
MongoDB Atlas (Cloud Database)
```

---

## 3. Local Development Setup

### Step 1: Navigate to Project

```bash
cd "c:\Users\nandu\OneDrive\Desktop\full stack inten\task -3 (Docker)"
```

### Step 2: Verify Project Structure

```bash
# Windows
tree /F /A

# Linux/Mac
tree -L 2
```

You should see:

- `.github/workflows/` - CI/CD workflows
- `backend/` - Python Flask API
- `frontend/` - React application
- `docker-compose.yml` - Container orchestration
- Documentation files

### Step 3: Configure Environment Variables

The `.env` files are already configured with your MongoDB URI. Verify:

```bash
# Check root .env
cat .env

# Check backend .env
cat backend/.env

# Check frontend .env
cat frontend/.env
```

### Step 4: Test Backend Locally (Optional)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run backend
python app.py

# Test in another terminal
curl http://localhost:5000/health
```

### Step 5: Test Frontend Locally (Optional)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

---

## 4. Docker Setup

### Step 1: Verify Docker Installation

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker-compose --version

# Test Docker
docker run hello-world
```

### Step 2: Login to Docker Hub

```bash
# Login to Docker Hub
docker login

# Enter your Docker Hub username and password
```

### Step 3: Create Docker Hub Repositories

1. Go to https://hub.docker.com
2. Click "Create Repository"
3. Create repository: `fullstack-backend`
   - Name: `fullstack-backend`
   - Visibility: Public
   - Click "Create"
4. Create repository: `fullstack-frontend`
   - Name: `fullstack-frontend`
   - Visibility: Public
   - Click "Create"

### Step 4: Test Docker Compose

```bash
# Navigate to project root
cd "c:\Users\nandu\OneDrive\Desktop\full stack inten\task -3 (Docker)"

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Test backend
curl http://localhost:5000/health

# Test frontend
# Open http://localhost in browser

# Stop services
docker-compose down
```

---

## 5. GitHub Setup

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `fullstack-cicd-app` (or your choice)
3. Description: "Full-stack application with CI/CD pipeline"
4. Choose Public or Private
5. **Do NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Initialize Git Locally

```bash
# Navigate to project
cd "c:\Users\nandu\OneDrive\Desktop\full stack inten\task -3 (Docker)"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Full-stack CI/CD pipeline with Docker and GitHub Actions"

# Add remote (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/fullstack-cicd-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Configure GitHub Secrets

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

**Secret 1: DOCKER_USERNAME**

- Name: `DOCKER_USERNAME`
- Value: Your Docker Hub username
- Click "Add secret"

**Secret 2: DOCKER_PASSWORD**

- Name: `DOCKER_PASSWORD`
- Value: Your Docker Hub access token (not password!)
  - Get token: Docker Hub → Account Settings → Security → New Access Token
- Click "Add secret"

**Secret 3: MONGODB_URI** (Optional)

- Name: `MONGODB_URI`
- Value: Your MongoDB connection string
- Click "Add secret"

---

## 6. CI/CD Pipeline Setup

### Step 1: Verify Workflows

Check that these files exist:

- `.github/workflows/main.yml` - Main CI/CD pipeline
- `.github/workflows/pr-check.yml` - Pull request checks
- `.github/workflows/deploy.yml` - Production deployment

### Step 2: Test CI/CD Pipeline

```bash
# Make a small change
echo "# Test" >> README.md

# Commit and push
git add .
git commit -m "Test CI/CD pipeline"
git push origin main
```

### Step 3: Monitor Pipeline

1. Go to your GitHub repository
2. Click **Actions** tab
3. You should see "CI/CD Pipeline" running
4. Click on the workflow to see details
5. Watch each job complete:
   - Backend - Lint & Test
   - Frontend - Lint & Test
   - Build Docker Images
   - Security Scan
   - Deploy

### Step 4: Verify Docker Hub

1. Go to https://hub.docker.com
2. Check your repositories
3. You should see new images:
   - `fullstack-backend:latest`
   - `fullstack-frontend:latest`

---

## 7. Deployment

### Option A: AWS ECS

#### Prerequisites

- AWS Account
- AWS CLI installed
- ECS Cluster created

#### Steps

1. **Install AWS CLI**

   ```bash
   # Windows
   choco install awscli -y

   # Mac
   brew install awscli

   # Linux
   sudo apt install awscli -y
   ```

2. **Configure AWS**

   ```bash
   aws configure
   # Enter: Access Key ID, Secret Access Key, Region, Output format
   ```

3. **Create ECS Task Definition**

   Create `backend-task-def.json`:

   ```json
   {
     "family": "fullstack-backend",
     "networkMode": "awsvpc",
     "requiresCompatibilities": ["FARGATE"],
     "cpu": "256",
     "memory": "512",
     "containerDefinitions": [
       {
         "name": "backend",
         "image": "YOUR_USERNAME/fullstack-backend:latest",
         "portMappings": [
           {
             "containerPort": 5000,
             "protocol": "tcp"
           }
         ],
         "environment": [
           {
             "name": "MONGODB_URI",
             "value": "YOUR_MONGODB_URI"
           }
         ]
       }
     ]
   }
   ```

4. **Deploy**

   ```bash
   # Register task definition
   aws ecs register-task-definition --cli-input-json file://backend-task-def.json

   # Create service
   aws ecs create-service \
     --cluster your-cluster \
     --service-name backend \
     --task-definition fullstack-backend \
     --desired-count 1 \
     --launch-type FARGATE
   ```

### Option B: Heroku

#### Steps

1. **Install Heroku CLI**

   ```bash
   # Windows
   choco install heroku-cli -y

   # Mac
   brew tap heroku/brew && brew install heroku

   # Linux
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Login to Heroku**

   ```bash
   heroku login
   ```

3. **Deploy Backend**

   ```bash
   # Create app
   heroku create your-backend-app

   # Set environment variables
   heroku config:set MONGODB_URI="your-mongodb-uri" -a your-backend-app

   # Deploy
   heroku container:push web -a your-backend-app
   heroku container:release web -a your-backend-app

   # Open app
   heroku open -a your-backend-app
   ```

4. **Deploy Frontend**

   ```bash
   # Create app
   heroku create your-frontend-app

   # Deploy
   heroku container:push web -a your-frontend-app
   heroku container:release web -a your-frontend-app

   # Open app
   heroku open -a your-frontend-app
   ```

### Option C: Self-Hosted VPS

#### Steps

1. **SSH to Server**

   ```bash
   ssh user@your-server-ip
   ```

2. **Install Docker**

   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```

3. **Install Docker Compose**

   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

4. **Clone Repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/fullstack-cicd-app.git
   cd fullstack-cicd-app
   ```

5. **Configure Environment**

   ```bash
   cp .env.example .env
   nano .env  # Edit with your values
   ```

6. **Deploy**
   ```bash
   docker-compose up -d
   ```

---

## 8. Testing

### Test Locally

```bash
# Start services
docker-compose up -d

# Test backend health
curl http://localhost:5000/health

# Test creating an item
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","description":"Test Description"}'

# Test getting items
curl http://localhost:5000/api/items

# Test frontend
# Open http://localhost in browser
# Try creating, viewing, and deleting items

# Stop services
docker-compose down
```

### Test CI/CD

```bash
# Create feature branch
git checkout -b feature/test

# Make a change
echo "# Test" >> README.md

# Commit and push
git add .
git commit -m "Test feature"
git push origin feature/test

# Create pull request on GitHub
# Watch PR checks run automatically
```

---

## 9. Troubleshooting

### Issue: Docker Compose fails

**Error**: `Cannot connect to Docker daemon`

**Solution**:

```bash
# Start Docker Desktop
# Wait for it to fully start
# Try again
docker-compose up -d
```

### Issue: MongoDB connection error

**Error**: `MongoServerError: Authentication failed`

**Solution**:

1. Check MongoDB URI in `.env` files
2. Verify username and password
3. Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0)
4. Ensure cluster is running

### Issue: GitHub Actions failing

**Error**: `Error: Unable to push to Docker Hub`

**Solution**:

1. Verify Docker Hub secrets in GitHub
2. Check Docker Hub repositories exist
3. Verify access token is valid
4. Check repository permissions

### Issue: Port already in use

**Error**: `Bind for 0.0.0.0:80 failed: port is already allocated`

**Solution**:

```bash
# Find process using port
# Windows:
netstat -ano | findstr :80

# Linux/Mac:
lsof -i :80

# Kill the process or change port in docker-compose.yml
```

---

## 🎉 Success!

If you've completed all steps, you now have:

✅ A full-stack application running locally
✅ Docker containers for all services
✅ Automated CI/CD pipeline
✅ Docker images on Docker Hub
✅ Production deployment (optional)

### Next Steps

1. **Customize**: Modify the application to fit your needs
2. **Add Features**: Implement new functionality
3. **Monitor**: Set up monitoring and alerts
4. **Scale**: Configure auto-scaling
5. **Secure**: Implement additional security measures

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

**Congratulations on setting up your CI/CD pipeline! 🚀**
