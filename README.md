# Full-Stack Web Development Internship Assignment

This repository contains my complete submission for the Full-Stack Web Development Internship assignment. The project is divided into four distinct tasks, each addressing specific requirements needed to demonstrate full-stack competency using the MERN stack, Docker, CI/CD, and State Management.

## 📂 Repository Structure

The assignment is organized into four folders, each corresponding to a specific task:

- **[`/task-1`](./task-1)**: Full-Stack Web Application (CRUD)
- **[`/task-2`](./task-2)**: Third-Party API Integration (Weather App)
- **[`/task-3`](./task-3)**: Deployment Pipeline (Docker & CI/CD)
- **[`/task-4`](./task-4)**: State Management (Redux E-Commerce)

---

## ✅ Task 1: Develop a Full-Stack Web Application

**Objective**: Create a web application that allows users to Create, Read, Update, and Delete (CRUD) items.

- **Status**: Completed
- **Tech Stack**: React.js, Node.js, Express.js, MongoDB (Mongoose).
- **Features**:
  - Complete RESTful API backend.
  - Responsive React frontend.
  - Full CRUD functionality for item management.
  - Deployable on Vercel/Heroku.
- **Documentation**: See [`task-1/README.md`](./task-1/README.md) for setup and details.

---

## ⛅ Task 2: Integrate a Third-Party API

**Objective**: Integrate a public API (OpenWeatherMap) into a web application.

- **Status**: Completed
- **Tech Stack**: HTML5, CSS3 (Glassmorphism), JavaScript, Node.js (Proxy Server).
- **Features**:
  - **Frontend**: Displays real-time weather data, 5-day forecast, and air quality.
  - **Backend**: Secure proxy server to handle API keys and requests.
  - **Design**: Premium Glassmorphism UI.
- **Documentation**: See [`task-2/README.md`](./task-2/README.md) for API configuration.

---

## 🚀 Task 3: Create a Deployment Pipeline

**Objective**: Set up a deployment pipeline using Docker and CI/CD tools.

- **Status**: Completed
- **Tech Stack**: Docker, GitHub Actions, Docker Compose.
- **Features**:
  - **Docker Control**: Dockerfiles for both Client and Server.
  - **CI/CD**: GitHub Actions workflow (`.github/workflows`) to automate building and testing.
  - **Orchestration**: `docker-compose.yml` for running the entire stack locally with one command.
- **Documentation**: See [`task-3/README.md`](./task-3/README.md) for deployment steps.

---

## 🛒 Task 4: Implement State Management

**Objective**: Use Redux to manage the state of an application (E-Commerce Store).

- **Status**: Completed
- **Tech Stack**: React, Redux Toolkit, React-Redux.
- **Features**:
  - **Global Store**: Centralized state management for Authentication, Cart, and Products.
  - **Authentication**: JWT-based login/register flow managed via Redux.
  - **Shopping Cart**: Add to cart, remove items, and update quantities using Redux actions/reducers.
- **Documentation**: See [`task-4/README.md`](./task-4/README.md) for implementation details.

---

## 🛠️ Combined Setup Instructions

To view any specific task, navigate to the respective directory and follow the internal `README.md`.

**General Quick Start:**

1.  **Clone the Repository**

    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Navigate to a Task**

    ```bash
    cd task-4  # Example: To run the Redux application
    ```

3.  **Install Dependencies**

    ```bash
    # For most tasks (Frontend + Backend)
    npm install
    cd client && npm install
    cd ../server && npm install
    ```

4.  **Run the Application**
    ```bash
    # Typically
    npm run dev
    ```

---

**Author**: Nandukumar-koribilli
**Role**: Full-Stack Developer Intern
