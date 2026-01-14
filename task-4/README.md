# Redux Shopping Application - Full-Stack E-Commerce Platform

A complete, production-ready e-commerce application demonstrating Redux state management, authentication, role-based access control, and full-stack development with React, Redux Toolkit, Express.js, and MongoDB.

## 🎯 Project Overview

This project showcases a comprehensive understanding of modern web development, featuring:

- **Frontend**: React 18 with Redux Toolkit for state management
- **Backend**: Express.js RESTful API with MongoDB
- **Authentication**: JWT-based authentication with role-based access
- **UI/UX**: Modern design with Tailwind CSS and glassmorphism effects

## ✨ Key Features

### 🔐 Authentication & Authorization

- User registration and login with JWT tokens
- Role-based access control (User/Admin)
- Secure password hashing with bcryptjs
- Protected routes and API endpoints
- Persistent authentication with localStorage

### 👥 User Features (Buyers)

- Browse and search products
- Filter products by category
- Add items to shopping cart
- Manage cart quantities (increment/decrement)
- View and edit profile details
- Save shipping address information
- Place orders

### 🏪 Admin Features (Sellers)

- Add new products with details
- Edit existing products
- Delete products from catalog
- Manage inventory and stock levels
- Product management dashboard

### 🔄 Redux State Management

- **Auth Slice**: User authentication and profile management
- **Products Slice**: Product catalog with CRUD operations
- **Cart Slice**: Shopping cart with quantity management
- **User Slice**: User preferences and settings

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern UI library
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Vite** - Build tool and dev server

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
task-4_Redux/
├── server/                     # Backend API
│   ├── models/                # MongoDB models
│   │   ├── User.js           # User model with auth
│   │   ├── Product.js        # Product model
│   │   └── Order.js          # Order model
│   ├── routes/               # API routes
│   │   ├── auth.js          # Authentication endpoints
│   │   ├── products.js      # Product CRUD endpoints
│   │   └── orders.js        # Order endpoints
│   ├── middleware/          # Custom middleware
│   │   └── auth.js         # JWT verification
│   ├── .env                # Environment variables
│   └── server.js           # Express server setup
│
├── src/                      # Frontend React app
│   ├── components/          # React components
│   │   ├── AuthPage.jsx    # Login/Signup modal
│   │   ├── UserDetailsPage.jsx  # User profile
│   │   ├── ProductList.jsx      # Product catalog
│   │   ├── ProductForm.jsx      # Add/Edit products
│   │   ├── Cart.jsx            # Shopping cart
│   │   └── UserProfile.jsx     # User preferences
│   ├── store/              # Redux store
│   │   ├── store.js       # Store configuration
│   │   ├── authSlice.js   # Auth state & async thunks
│   │   ├── userSlice.js   # User preferences
│   │   ├── productsSlice.js   # Product catalog
│   │   └── cartSlice.js       # Shopping cart
│   ├── App.jsx            # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
│
├── README.md             # This file

└── package.json         # Dependencies
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Step 1: Clone and Install

```bash
# Navigate to project directory
cd task-4_Redux

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 2: Environment Configuration

The backend is already configured with MongoDB connection in `server/.env`:

```env
MONGODB_URI=mongodb+srv://nandukumar9980:kumar456@cluster0.ecnna5x.mongodb.net/redux-shop
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

### Step 3: Start the Application

**Terminal 1 - Backend Server:**

```bash
cd server
npm start
```

✅ Server will run on `http://localhost:5000`

**Terminal 2 - Frontend App:**

```bash
npm run dev
```

✅ App will run on `http://localhost:5173`

## 📖 Usage Guide

### First Time Setup

1. **Visit the Application**

   - Open `http://localhost:5173` in your browser
   - You'll see a beautiful landing page

2. **Create an Account**

   - Click "Get Started"
   - Choose account type:
     - **User** - For buying products
     - **Admin** - For selling/managing products
   - Fill in name, email, and password
   - Click "Sign Up"

3. **Explore Features**
   - Browse products
   - Add items to cart
   - Manage your profile
   - (Admin) Add/edit/delete products

## 🎨 Redux Implementation Details

### Store Configuration

```javascript
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});
```

### Creating Slices

```javascript
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      // Immutable update with Redux Toolkit
      state.items.push(action.payload);
    },
  },
});
```

### Using Redux in Components

```javascript
// Reading state
const cartItems = useSelector((state) => state.cart.items);

// Dispatching actions
const dispatch = useDispatch();
dispatch(addToCart(product));
```

### Async Operations

```javascript
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    const response = await axios.post("/api/auth/login", userData);
    return response.data;
  }
);
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders

- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)

## 🎓 Learning Outcomes

This project demonstrates:

1. **Redux Toolkit Mastery**

   - Store configuration with `configureStore`
   - Creating slices with `createSlice`
   - Async thunks with `createAsyncThunk`
   - Using `useSelector` and `useDispatch` hooks
   - Immutable state updates

2. **Full-Stack Development**

   - RESTful API design
   - MongoDB database integration
   - JWT authentication
   - Role-based authorization
   - Error handling and validation

3. **Modern React Patterns**

   - Functional components with hooks
   - Conditional rendering
   - Form handling and validation
   - Component composition
   - State management

4. **Professional UI/UX**
   - Responsive design
   - Glassmorphism effects
   - Gradient styling
   - Loading states
   - Form validation feedback

## 🌟 Interview Talking Points

### Redux Concepts Demonstrated

✅ **Store Setup**: Centralized state management with `configureStore`  
✅ **Slices**: Modular state organization with `createSlice`  
✅ **Reducers**: Pure functions for state updates  
✅ **Actions**: Dispatching actions with `useDispatch`  
✅ **Selectors**: Reading state with `useSelector`  
✅ **Async Thunks**: Handling API calls with `createAsyncThunk`  
✅ **Immutability**: Safe state updates with Immer (built into Redux Toolkit)

### Architecture Decisions

- **Separation of Concerns**: Clear separation between UI, state, and API
- **Scalability**: Modular structure allows easy feature additions
- **Security**: JWT tokens, password hashing, protected routes
- **User Experience**: Loading states, error handling, responsive design

## 📊 Database Schema

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  phone: String,
  address: Object,
  preferences: Object,
  createdAt: Date
}
```

### Product Model

```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  image: String,
  seller: ObjectId (ref: User),
  createdAt: Date
}
```

## 🔒 Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT token authentication
- Protected API routes
- Role-based access control
- Input validation
- CORS configuration

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:

- Desktop (1024px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🎯 Future Enhancements

- Payment gateway integration
- Order tracking system
- Product reviews and ratings
- Email notifications
- Admin analytics dashboard
- Image upload for products
- Advanced search and filters

## 📝 Notes for Interview

- **State Management**: Explain why Redux was chosen over Context API
- **Performance**: Discuss memoization and optimization strategies
- **Scalability**: How the architecture supports growth
- **Best Practices**: Code organization, naming conventions, error handling

## 🤝 Contributing

This is a demonstration project for educational purposes.

## 📄 License

MIT License - Free to use for learning and portfolio purposes.

---

**Built with ❤️ for learning and demonstration purposes**

_Showcasing: React • Redux Toolkit • Express.js • MongoDB • JWT • Tailwind CSS_
