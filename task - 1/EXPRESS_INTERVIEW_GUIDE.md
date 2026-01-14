# 🎯 INTERVIEW QUICK REFERENCE - Express.js Files

## ⚡ Main Express.js Files (SHOW THESE!)

### 1️⃣ **EXPRESS SERVER** (Main File)

📁 **File:** `server/express-server.js`

**What to say:**

> "This is my main Express.js server file. It initializes the Express app, connects to MongoDB, configures middleware like CORS and JSON parser, mounts the API routes, and starts the server on port 5001."

**Key Lines to Point Out:**

- Line 1-4: Importing Express and other dependencies
- Line 6: Creating Express app instance
- Line 9-11: Middleware setup (CORS, body parsing)
- Line 16: MongoDB connection
- Line 27: Importing API routes
- Line 30: Mounting routes at `/api/todos`
- Line 64: Starting the server

---

### 2️⃣ **EXPRESS API ROUTES** (CRUD Operations)

📁 **File:** `server/routes/express-api-routes.js`

**What to say:**

> "This file contains all my RESTful API endpoints using Express Router. I've implemented all 5 CRUD operations with proper HTTP methods, status codes, and error handling."

**All 5 Endpoints:**

| Operation    | HTTP Method | Endpoint         | Line | What It Does                      |
| ------------ | ----------- | ---------------- | ---- | --------------------------------- |
| **CREATE**   | POST        | `/api/todos`     | 61   | Creates new todo in database      |
| **READ ALL** | GET         | `/api/todos`     | 10   | Fetches all todos, sorted by date |
| **READ ONE** | GET         | `/api/todos/:id` | 32   | Fetches single todo by ID         |
| **UPDATE**   | PUT         | `/api/todos/:id` | 92   | Updates existing todo             |
| **DELETE**   | DELETE      | `/api/todos/:id` | 134  | Deletes todo from database        |

---

### 3️⃣ **EXPRESS MIDDLEWARE**

📁 **File:** `server/middleware/validation.js`

**What to say:**

> "This is custom Express middleware I created for input validation. It validates the request body before processing to ensure data integrity."

**Key Features:**

- Validates required fields (title)
- Checks status enum values (pending/completed)
- Returns 400 Bad Request for invalid data

---

## 📊 Complete Express.js Architecture

```
server/
├── express-server.js           ← Main Express App
├── routes/
│   └── express-api-routes.js   ← Express Router (5 endpoints)
├── middleware/
│   └── validation.js           ← Express Middleware
├── models/
│   └── Todo.js                 ← Mongoose ODM (used by Express)
└── package.json                ← Express listed as dependency
```

---

## 🎤 Interview Script

**Question: "Tell me about your Express.js implementation"**

**Answer:**

> "I built a RESTful API using Express.js. My main server file is `express-server.js` which sets up the Express application with middleware for CORS and JSON parsing.
>
> I organized my API endpoints in `express-api-routes.js` using Express Router, implementing all 5 CRUD operations - Create with POST, Read with GET, Update with PUT, and Delete with DELETE.
>
> I also created custom Express middleware for request validation to ensure data integrity before processing.
>
> The Express app connects to MongoDB using Mongoose and serves on port 5001. All routes follow RESTful conventions with proper HTTP status codes."

---

## 🚀 Show It Running

1. **Backend running:** http://localhost:5001/
2. **API endpoint:** http://localhost:5001/api/todos
3. **Full app:** http://localhost:3001/

---

## ✨ Express.js Features You Implemented

✅ **Express App Setup** (`express-server.js`)
✅ **Express Router** (`express-api-routes.js`)
✅ **Express Middleware** (CORS, body-parser, validation)
✅ **RESTful Routing** (GET, POST, PUT, DELETE)
✅ **Error Handling Middleware**
✅ **Environment Variables** (dotenv)
✅ **Database Integration** (Mongoose with Express)
✅ **Async/Await** with Express route handlers

---

**🎯 Remember: These 2 files show ALL your Express.js skills:**

1. `server/express-server.js`
2. `server/routes/express-api-routes.js`

Good luck! 🚀
