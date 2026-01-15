# Testing Guide

## 🧪 Testing Strategy

This project implements a comprehensive testing strategy covering:

- Unit tests
- Integration tests
- End-to-end tests
- Docker build tests
- Security scanning

## 📋 Backend Testing

### Setup Test Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
pip install pytest pytest-cov pytest-mock
```

### Create Test Files

Create `backend/tests/test_app.py`:

```python
import pytest
from app import app
import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    """Test health check endpoint"""
    response = client.get('/health')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['status'] == 'healthy'

def test_get_items(client):
    """Test getting all items"""
    response = client.get('/api/items')
    assert response.status_code == 200
    assert isinstance(json.loads(response.data), list)

def test_create_item(client):
    """Test creating an item"""
    item = {
        'name': 'Test Item',
        'description': 'Test Description'
    }
    response = client.post('/api/items',
                          data=json.dumps(item),
                          content_type='application/json')
    assert response.status_code == 201
    data = json.loads(response.data)
    assert 'id' in data
```

### Run Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=. --cov-report=html --cov-report=term

# Run specific test file
pytest tests/test_app.py

# Run with verbose output
pytest -v

# Run and show print statements
pytest -s
```

### Coverage Report

```bash
# Generate HTML coverage report
pytest --cov=. --cov-report=html

# Open coverage report
# Windows: start htmlcov/index.html
# Mac: open htmlcov/index.html
# Linux: xdg-open htmlcov/index.html
```

## 🎨 Frontend Testing

### Setup Test Environment

```bash
cd frontend
npm install
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom
```

### Create Test Files

Create `frontend/src/App.test.jsx`:

```javascript
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// Mock axios
vi.mock("axios", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
    post: vi.fn(() => Promise.resolve({ data: { id: "123" } })),
    delete: vi.fn(() => Promise.resolve({ data: {} })),
  },
}));

describe("App Component", () => {
  it("renders the app title", () => {
    render(<App />);
    expect(
      screen.getByText(/Full-Stack CI\/CD Application/i)
    ).toBeInTheDocument();
  });

  it("renders the add item form", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Item name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
  });

  it("can submit a new item", async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByPlaceholderText(/Item name/i);
    const descInput = screen.getByPlaceholderText(/Description/i);
    const submitBtn = screen.getByText(/Add Item/i);

    await user.type(nameInput, "Test Item");
    await user.type(descInput, "Test Description");
    await user.click(submitBtn);

    await waitFor(() => {
      expect(nameInput.value).toBe("");
      expect(descInput.value).toBe("");
    });
  });
});
```

Update `frontend/vite.config.js`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
});
```

Create `frontend/src/setupTests.js`:

```javascript
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});
```

### Run Tests

```bash
# Run all tests
npm run test

# Run with coverage
npm run test -- --coverage

# Run in watch mode
npm run test -- --watch

# Run specific test file
npm run test -- App.test.jsx
```

## 🐳 Docker Testing

### Test Backend Docker Build

```bash
# Build backend image
docker build -t fullstack-backend:test ./backend

# Run backend container
docker run -d -p 5000:5000 \
  -e MONGODB_URI="your-mongodb-uri" \
  --name backend-test \
  fullstack-backend:test

# Test health endpoint
curl http://localhost:5000/health

# Check logs
docker logs backend-test

# Stop and remove
docker stop backend-test
docker rm backend-test
```

### Test Frontend Docker Build

```bash
# Build frontend image
docker build -t fullstack-frontend:test ./frontend

# Run frontend container
docker run -d -p 80:80 \
  --name frontend-test \
  fullstack-frontend:test

# Test in browser
# Open http://localhost

# Check logs
docker logs frontend-test

# Stop and remove
docker stop frontend-test
docker rm frontend-test
```

### Test Docker Compose

```bash
# Build and start all services
docker-compose up -d

# Check service status
docker-compose ps

# Test backend health
curl http://localhost:5000/health

# Test frontend
curl http://localhost

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## 🔒 Security Testing

### Vulnerability Scanning with Trivy

```bash
# Install Trivy
# Windows (using Chocolatey): choco install trivy
# Mac: brew install aquasecurity/trivy/trivy
# Linux: See https://aquasecurity.github.io/trivy/

# Scan backend image
trivy image fullstack-backend:test

# Scan frontend image
trivy image fullstack-frontend:test

# Scan with severity filter
trivy image --severity HIGH,CRITICAL fullstack-backend:test

# Generate report
trivy image --format json --output backend-scan.json fullstack-backend:test
```

### Dependency Scanning

```bash
# Backend - Check for vulnerable packages
cd backend
pip install safety
safety check

# Frontend - Check for vulnerable packages
cd frontend
npm audit
npm audit fix
```

## 🚀 Integration Testing

### Test Full Stack Locally

```bash
# Start all services
docker-compose up -d

# Wait for services to be ready
sleep 10

# Test backend health
curl http://localhost:5000/health

# Create an item
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","description":"Test Description"}'

# Get all items
curl http://localhost:5000/api/items

# Test frontend
curl http://localhost

# Stop services
docker-compose down
```

### Automated Integration Tests

Create `tests/integration/test_api.sh`:

```bash
#!/bin/bash

API_URL="http://localhost:5000/api"

echo "Testing API endpoints..."

# Test health check
echo "1. Testing health check..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/health)
if [ $response -eq 200 ]; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed"
    exit 1
fi

# Test GET items
echo "2. Testing GET /api/items..."
response=$(curl -s -o /dev/null -w "%{http_code}" $API_URL/items)
if [ $response -eq 200 ]; then
    echo "✅ GET items passed"
else
    echo "❌ GET items failed"
    exit 1
fi

# Test POST item
echo "3. Testing POST /api/items..."
response=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST $API_URL/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test"}')
if [ $response -eq 201 ]; then
    echo "✅ POST item passed"
else
    echo "❌ POST item failed"
    exit 1
fi

echo "✅ All integration tests passed!"
```

## 📊 Performance Testing

### Load Testing with Apache Bench

```bash
# Install Apache Bench
# Windows: Download from Apache website
# Mac: Pre-installed
# Linux: sudo apt-get install apache2-utils

# Test backend endpoint
ab -n 1000 -c 10 http://localhost:5000/health

# Test with POST requests
ab -n 100 -c 10 -p item.json -T application/json http://localhost:5000/api/items
```

### Load Testing with k6

```bash
# Install k6
# Windows: choco install k6
# Mac: brew install k6
# Linux: See https://k6.io/docs/getting-started/installation/

# Create load test script
cat > load-test.js << 'EOF'
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function() {
  let response = http.get('http://localhost:5000/health');
  check(response, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
EOF

# Run load test
k6 run load-test.js
```

## 🎯 CI/CD Testing

### Test GitHub Actions Locally with Act

```bash
# Install act
# Windows: choco install act-cli
# Mac: brew install act
# Linux: See https://github.com/nektos/act

# List available workflows
act -l

# Run pull request workflow
act pull_request

# Run specific job
act -j backend-test

# Run with secrets
act -s DOCKER_USERNAME=myuser -s DOCKER_PASSWORD=mypass
```

## 📝 Test Coverage Goals

- **Backend**: Minimum 80% code coverage
- **Frontend**: Minimum 70% code coverage
- **Integration**: All critical paths tested
- **Security**: Zero high/critical vulnerabilities

## 🔍 Continuous Testing

### Pre-commit Hooks

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash

echo "Running pre-commit checks..."

# Backend linting
cd backend
flake8 . || exit 1

# Frontend linting
cd ../frontend
npm run lint || exit 1

echo "✅ All pre-commit checks passed!"
```

### Automated Testing in CI

All tests run automatically on:

- Every push to any branch
- Every pull request
- Before deployment

See `.github/workflows/main.yml` for details.

## 📚 Additional Resources

- [Pytest Documentation](https://docs.pytest.org/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Docker Testing Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Trivy Documentation](https://aquasecurity.github.io/trivy/)

---

**Happy Testing! 🧪**
