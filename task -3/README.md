# Full-Stack CI/CD Application

![CI/CD Pipeline](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/CI/CD%20Pipeline/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Docker](https://img.shields.io/badge/docker-ready-brightgreen.svg)

A production-ready full-stack application with automated CI/CD pipeline using GitHub Actions, Docker, and MongoDB.

## 🚀 Features

- **Backend**: Python Flask REST API
- **Frontend**: React with Vite
- **Database**: MongoDB
- **Containerization**: Docker with multi-stage builds
- **CI/CD**: GitHub Actions with automated testing and deployment
- **Security**: Vulnerability scanning with Trivy
- **Monitoring**: Health checks and logging

## 📋 Table of Contents

- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development](#development)
- [Deployment](#deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## 🏗️ Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │─────▶│   Backend   │─────▶│   MongoDB   │
│   (React)   │      │   (Flask)   │      │  (Database) │
│   Port 80   │      │  Port 5000  │      │ Port 27017  │
└─────────────┘      └─────────────┘      └─────────────┘
```

## 🔧 Prerequisites

- **Docker** (v20.10+)
- **Docker Compose** (v2.0+)
- **Node.js** (v18+) - for local development
- **Python** (v3.11+) - for local development
- **Git**

## ⚡ Quick Start

### Using Docker Compose (Recommended)

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start all services**

   ```bash
   docker-compose up -d
   ```

4. **Access the application**

   - Frontend: http://localhost
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

5. **Stop services**
   ```bash
   docker-compose down
   ```

### Local Development

#### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your MongoDB URI
python app.py
```

#### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

## 🛠️ Development

### Project Structure

```
.
├── .github/
│   └── workflows/
│       ├── main.yml          # Main CI/CD pipeline
│       ├── pr-check.yml      # Pull request validation
│       └── deploy.yml        # Production deployment
├── backend/
│   ├── app.py                # Flask application
│   ├── requirements.txt      # Python dependencies
│   ├── Dockerfile            # Backend Docker image
│   └── .dockerignore
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Styles
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile            # Frontend Docker image
│   ├── nginx.conf            # Nginx configuration
│   └── .dockerignore
├── docker-compose.yml        # Multi-container orchestration
├── .env.example              # Environment template
└── README.md
```

### Running Tests

#### Backend Tests

```bash
cd backend
pytest
```

#### Frontend Tests

```bash
cd frontend
npm run test
```

### Linting

#### Backend

```bash
cd backend
flake8 .
```

#### Frontend

```bash
cd frontend
npm run lint
```

## 🚢 Deployment

### Docker Hub Setup

1. **Create Docker Hub account** at https://hub.docker.com

2. **Create repositories**

   - `fullstack-backend`
   - `fullstack-frontend`

3. **Configure GitHub Secrets**
   Go to your repository → Settings → Secrets and variables → Actions

   Add the following secrets:

   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password or access token
   - `MONGODB_URI`: Your MongoDB connection string

### Manual Deployment

#### Build and Push Images

```bash
# Backend
docker build -t YOUR_USERNAME/fullstack-backend:latest ./backend
docker push YOUR_USERNAME/fullstack-backend:latest

# Frontend
docker build -t YOUR_USERNAME/fullstack-frontend:latest ./frontend
docker push YOUR_USERNAME/fullstack-frontend:latest
```

#### Deploy to Server

```bash
# SSH to your server
ssh user@your-server.com

# Pull images
docker pull YOUR_USERNAME/fullstack-backend:latest
docker pull YOUR_USERNAME/fullstack-frontend:latest

# Run with docker-compose
docker-compose up -d
```

### Cloud Deployment Options

#### AWS ECS

- Use the provided workflow in `.github/workflows/deploy.yml`
- Configure AWS credentials in GitHub Secrets
- Update task definitions and service names

#### Azure Container Instances

- Use Azure CLI or Portal
- Deploy containers from Docker Hub
- Configure environment variables

#### Google Cloud Run

- Deploy directly from Docker Hub
- Set up Cloud SQL for MongoDB alternative
- Configure environment variables

#### DigitalOcean App Platform

- Connect GitHub repository
- Configure build and run commands
- Set environment variables

## 🔄 CI/CD Pipeline

### Workflow Overview

1. **Code Push/PR** → Triggers pipeline
2. **Linting** → Code quality checks
3. **Testing** → Unit and integration tests
4. **Build** → Docker images creation
5. **Security Scan** → Vulnerability detection
6. **Push** → Images to Docker Hub
7. **Deploy** → To staging/production
8. **Verify** → Health checks
9. **Notify** → Team notification

### Pipeline Stages

#### Main Pipeline (`main.yml`)

- Runs on push to main/master
- Full testing and deployment
- Security scanning
- Automated deployment

#### PR Check (`pr-check.yml`)

- Runs on pull requests
- Code quality analysis
- Build verification
- Automated PR comments

#### Production Deploy (`deploy.yml`)

- Manual trigger
- Environment selection
- Rollback capability
- Deployment verification

### Workflow Status

Check the Actions tab in your GitHub repository to monitor pipeline execution.

## 🔐 Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
PORT=5000
FLASK_ENV=production
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

### Docker Compose (.env)

```env
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your_secure_password
MONGODB_URI=mongodb://admin:password@mongodb:27017/
VITE_API_URL=http://localhost:5000/api
```

## 📚 API Documentation

### Health Check

```
GET /health
Response: { "status": "healthy", "database": "connected" }
```

### Get All Items

```
GET /api/items
Response: [{ "_id": "...", "name": "...", "description": "..." }]
```

### Get Single Item

```
GET /api/items/:id
Response: { "_id": "...", "name": "...", "description": "..." }
```

### Create Item

```
POST /api/items
Body: { "name": "Item name", "description": "Description" }
Response: { "message": "Item created successfully", "id": "..." }
```

### Update Item

```
PUT /api/items/:id
Body: { "name": "Updated name", "description": "Updated description" }
Response: { "message": "Item updated successfully" }
```

### Delete Item

```
DELETE /api/items/:id
Response: { "message": "Item deleted successfully" }
```

## 🐛 Troubleshooting

### Common Issues

**Docker build fails**

- Check Docker daemon is running
- Verify Dockerfile syntax
- Clear Docker cache: `docker system prune -a`

**MongoDB connection error**

- Verify MONGODB_URI is correct
- Check network connectivity
- Ensure MongoDB is running

**Frontend can't connect to backend**

- Check VITE_API_URL is correct
- Verify backend is running
- Check CORS configuration

**GitHub Actions failing**

- Verify all secrets are set
- Check workflow syntax
- Review action logs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - [GitHub Profile](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- Flask documentation
- React documentation
- Docker documentation
- GitHub Actions documentation

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Made with ❤️ using React, Python, Docker, and GitHub Actions**
