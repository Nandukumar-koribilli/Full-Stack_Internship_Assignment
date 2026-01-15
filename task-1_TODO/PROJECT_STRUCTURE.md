# 📁 Project Structure - Interview Guide

## 🎯 Essential Files to Show Interviewer

### **BACKEND** (Express.js + MongoDB)

#### 1️⃣ Main Server File

**File:** `server/server.js`

- Express app setup
- MongoDB connection
- Middleware (CORS, JSON parser)
- Route mounting
- Error handling

#### 2️⃣ API Routes (CRUD Operations)

**File:** `server/routes/todoRoutes.js`

- **Line 10:** GET all todos
- **Line 32:** GET single todo
- **Line 61:** POST create todo
- **Line 92:** PUT update todo
- **Line 134:** DELETE todo

#### 3️⃣ Database Model

**File:** `server/models/Todo.js`

- Mongoose schema
- Data validation
- Field definitions

#### 4️⃣ Validation Middleware

**File:** `server/middleware/validation.js`

- Input validation
- Error responses

---

### **FRONTEND** (React + Vite)

#### 1️⃣ Main App Component

**File:** `client/src/App.jsx`

- State management (useState, useEffect)
- CRUD operation handlers
- Component composition

#### 2️⃣ Components

- **`client/src/components/AddTodo.jsx`** - Create todos
- **`client/src/components/TodoList.jsx`** - Display all todos
- **`client/src/components/TodoItem.jsx`** - Single todo item
- **`client/src/components/EditTodo.jsx`** - Update todos

#### 3️⃣ API Service

**File:** `client/src/services/api.js`

- Axios HTTP client
- API endpoint calls
- Error handling

#### 4️⃣ Styling

**File:** `client/src/App.css`

- Modern responsive design
- CSS variables
- Animations

---

### **CONFIGURATION**

- **`README.md`** - Complete documentation
- **`server/package.json`** - Backend dependencies
- **`client/package.json`** - Frontend dependencies
- **`.env.example`** - Environment variables template

---

## 🗂️ Complete Project Tree

```
full-stack-todo/
│
├── 📂 server/                    ← BACKEND
│   ├── 📂 models/
│   │   └── Todo.js              ← Database Schema
│   ├── 📂 routes/
│   │   └── todoRoutes.js        ← API Endpoints (SHOW THIS!)
│   ├── 📂 middleware/
│   │   └── validation.js        ← Request Validation
│   ├── server.js                ← Main Express App (SHOW THIS!)
│   ├── package.json
│   └── .env
│
├── 📂 client/                    ← FRONTEND
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── AddTodo.jsx      ← Create Component
│   │   │   ├── TodoList.jsx     ← List Component
│   │   │   ├── TodoItem.jsx     ← Item Component
│   │   │   └── EditTodo.jsx     ← Update Component
│   │   ├── 📂 services/
│   │   │   └── api.js           ← API Calls (SHOW THIS!)
│   │   ├── App.jsx              ← Main App (SHOW THIS!)
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── README.md                     ← Documentation
├── .gitignore
├── .env.example
├── Procfile                      ← Heroku deployment
└── vercel.json                   ← Vercel deployment
```

---

## 🎤 Interview Presentation Order

### Step 1: Show Architecture (30 seconds)

> "This is a full-stack MERN application with React frontend and Express backend."

Point to: This diagram above ☝️

### Step 2: Show Backend (2 minutes)

1. **`server/server.js`** - "This is my Express server setup"
2. **`server/routes/todoRoutes.js`** - "Here are my 5 RESTful API endpoints"
3. **`server/models/Todo.js`** - "This is my Mongoose schema"

### Step 3: Show Frontend (2 minutes)

1. **`client/src/App.jsx`** - "This is my main React component"
2. **`client/src/services/api.js`** - "This handles all API communication"
3. **`client/src/components/`** - "These are my reusable components"

### Step 4: Show It Working (1 minute)

- Open browser: `http://localhost:3001`
- Demonstrate: Create, Read, Update, Delete operations

---

## 📊 Key Points to Mention

✅ **Full-stack CRUD application**
✅ **RESTful API** with 5 endpoints
✅ **MongoDB** database with Mongoose
✅ **React** with modern hooks (useState, useEffect)
✅ **Component-based architecture**
✅ **Error handling** on both frontend and backend
✅ **Responsive design** (mobile + desktop)
✅ **Production-ready** with deployment configs

---

## 🚀 Live URLs

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:5001/api/todos
- **API Documentation:** http://localhost:5001/

---

## 📝 Quick Commands

```bash
# Start Backend
cd server
npm run dev

# Start Frontend
cd client
npm run dev
```

---

**Good luck with your interview! 🎯**
