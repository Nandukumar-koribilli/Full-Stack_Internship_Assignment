# 🚀 Quick Reference Card

## Essential Commands

### Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up -d --build

# Check status
docker-compose ps

# Remove everything
docker-compose down -v
docker system prune -a -f
```

### Git Commands

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"
git remote add origin <URL>
git push -u origin main

# Daily workflow
git add .
git commit -m "Your message"
git push

# Feature branch
git checkout -b feature/name
git push origin feature/name

# Pull latest
git pull origin main
```

### Testing Commands

```bash
# Backend
cd backend
python app.py
curl http://localhost:5000/health

# Frontend
cd frontend
npm run dev
# Open http://localhost:3000

# Docker
docker-compose up -d
curl http://localhost:5000/health
# Open http://localhost
```

## Important URLs

### Local Development

- Frontend: http://localhost
- Backend: http://localhost:5000
- Backend Health: http://localhost:5000/health
- Backend API: http://localhost:5000/api

### External Services

- GitHub: https://github.com
- Docker Hub: https://hub.docker.com
- MongoDB Atlas: https://cloud.mongodb.com

## File Locations

### Configuration Files

```
.env                          # Root environment variables
backend/.env                  # Backend environment variables
frontend/.env                 # Frontend environment variables
docker-compose.yml            # Container orchestration
```

### Application Files

```
backend/app.py                # Flask application
backend/Dockerfile            # Backend Docker image
frontend/src/App.jsx          # React main component
frontend/Dockerfile           # Frontend Docker image
```

### CI/CD Files

```
.github/workflows/main.yml    # Main CI/CD pipeline
.github/workflows/pr-check.yml # PR validation
.github/workflows/deploy.yml  # Production deployment
```

### Documentation

```
README.md                     # Main documentation
SETUP_GUIDE.md               # Step-by-step setup
DEPLOYMENT.md                # Deployment guide
TESTING.md                   # Testing guide
PROJECT_SUMMARY.md           # Project overview
CHECKLIST.md                 # Setup checklist
```

## Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb+srv://...
PORT=5000
FLASK_ENV=production
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## GitHub Secrets

Required secrets in GitHub repository:

- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub access token
- `MONGODB_URI` - MongoDB connection string (optional)

## API Endpoints

### Health Check

```bash
GET /health
Response: {"status": "healthy", "database": "connected"}
```

### Items CRUD

```bash
# Get all items
GET /api/items

# Get single item
GET /api/items/:id

# Create item
POST /api/items
Body: {"name": "...", "description": "..."}

# Update item
PUT /api/items/:id
Body: {"name": "...", "description": "..."}

# Delete item
DELETE /api/items/:id
```

## Docker Hub Repositories

- `YOUR_USERNAME/fullstack-backend`
- `YOUR_USERNAME/fullstack-frontend`

## Common Issues

### MongoDB Connection Error

```bash
# Check .env files have correct MONGODB_URI
# Add 0.0.0.0/0 to IP whitelist in MongoDB Atlas
# Verify cluster is running
```

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :80
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :80
kill -9 <PID>
```

### Docker Build Fails

```bash
# Clear cache and rebuild
docker-compose down
docker system prune -a -f
docker-compose build --no-cache
docker-compose up -d
```

### GitHub Actions Fails

```bash
# Check GitHub Secrets are set
# Verify Docker Hub repositories exist
# Check workflow logs for specific errors
```

## Quick Start

### First Time

```bash
# 1. Navigate to project
cd "c:\Users\nandu\OneDrive\Desktop\full stack inten\task 3"

# 2. Start services
docker-compose up -d

# 3. Test
curl http://localhost:5000/health
# Open http://localhost

# 4. Stop
docker-compose down
```

### Push to GitHub

```bash
# 1. Initialize
git init
git add .
git commit -m "Initial commit"

# 2. Add remote
git remote add origin <YOUR_REPO_URL>

# 3. Push
git branch -M main
git push -u origin main
```

### Deploy

```bash
# 1. Go to GitHub repository
# 2. Click "Actions" tab
# 3. Select "Production Deployment"
# 4. Click "Run workflow"
# 5. Select environment and click "Run workflow"
```

## Useful Scripts

### Windows Quick Start

```bash
start.bat
```

### Linux/Mac Quick Start

```bash
chmod +x start.sh
./start.sh
```

### Health Check

```bash
chmod +x health-check.sh
./health-check.sh http://localhost:5000/health
```

## Project Structure Summary

```
task 3/
├── .github/workflows/     # CI/CD pipelines
├── backend/               # Python Flask API
├── frontend/              # React application
├── docker-compose.yml     # Container orchestration
├── .env                   # Environment variables
└── *.md                   # Documentation
```

## CI/CD Pipeline Stages

1. **Lint & Test** - Code quality checks
2. **Build** - Docker images
3. **Scan** - Security vulnerabilities
4. **Push** - Docker Hub
5. **Deploy** - Cloud platform
6. **Verify** - Health checks

## Success Indicators

✅ `docker-compose ps` shows all services running
✅ `curl http://localhost:5000/health` returns 200 OK
✅ Frontend accessible at http://localhost
✅ Can create/read/delete items
✅ GitHub Actions pipeline passes
✅ Docker images on Docker Hub

## Support

- Documentation: Check \*.md files
- Logs: `docker-compose logs -f`
- GitHub Actions: Check Actions tab
- Issues: Open issue on GitHub

---

**Keep this card handy for quick reference! 📋**
