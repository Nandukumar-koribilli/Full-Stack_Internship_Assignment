# Full-Stack Deployment Pipeline Project

![CI/CD Pipeline](https://img.shields.io/badge/Status-Completed-success.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-Active-green.svg)

Access the live application here: [Your Application URL](#) _(Replace with your deployed link)_

---

## ✅ Task Completion Verification

I have successfully implemented all the requirements for **Task 3: Deployment Pipeline**. This project now features a fully automated CI/CD pipeline, Docker containerization for both frontend and backend, and comprehensive testing workflows.

### 🖼️ Project Screenshots

#### 1. Application Interface

The full-stack application running with React frontend and Python backend.
![Application Interface](images/application.png)

#### 2. CI/CD Pipeline Success

GitHub Actions workflow showing successful build, test, and deployment jobs.
![CI/CD Pipeline](images/CICD%20pipeline%20and%20%20testing.png)

#### 3. Workflow Definitions

The `.github/workflows` configuration managing the automation.
![Workflows](images/workflows.png)

#### 4. Docker Containerization

Docker images being built and managed for the application services.
![Docker](images/docker.png)

#### 5. Database Integration

MongoDB connected and storing application data.
![MongoDB](images/mongodb.png)

---

## 🚀 Easy Start Guide

This guide will help you get the project up and running on your local machine in minutes.

### Prerequisites

Before you start, make sure you have these installed:

- **Docker Desktop**: [Download Here](https://www.docker.com/products/docker-desktop)
- **Git**: [Download Here](https://git-scm.com/downloads)

### 🛠️ Installation & Running (The Easy Way)

We use **Docker** to make running this app extremely simple. You don't need to install Python or Node.js separately!

**Step 1: Get the Code**
Open your terminal or command prompt and run:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO/task-3_Docker/
```

**Step 2: Configure Environment**
Create a `.env` file in the root directory using the content provided in the submission email. It should contain:

```env
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=password
MONGODB_URI=mongodb://admin:password@mongodb:27017/
VITE_API_URL=http://localhost:5000/api
```

**Step 3: Run the App!**
Run this single command to start everything and before that Make sure the docker Application is running in your desktop :

```bash
docker-compose up --build -d
```

_Note: The `-d` flag runs it in the background._

**Step 4: View the App**
Open your browser and visit:

- **Frontend (App):** [http://localhost](http://localhost)
- **Backend (API):** [http://localhost:5000](http://localhost:5000)

**Stopping the App**
To stop and remove the containers, run:

```bash
docker-compose down
```

---

## 📦 What's Included?

### 1. Docker & Containerization

- **Frontend Dockerfile**: Multi-stage build for React (Node.js -> Nginx).
- **Backend Dockerfile**: Secure Python Flask environment.
- **Docker Compose**: Orchestrates the Frontend, Backend, and Database together.

### 2. GitHub Actions (CI/CD)

The `.github/workflows` folder contains:

- **`main.yml`**: Runs automatically on push. It tests the code, builds Docker images, scans for security vulnerabilities, and (optionally) deploys.
- **Security**: Built-in vulnerability scanning with Trivy.

---

## 🤝 Need Help?

If you encounter any issues:

1. Ensure **Docker Desktop** is running.
2. Check if ports `80`, `5000`, or `27017` are already in use.
3. Check the logs with `docker-compose logs`.

---

**Submission for Task 3 - Deployment Pipeline**
