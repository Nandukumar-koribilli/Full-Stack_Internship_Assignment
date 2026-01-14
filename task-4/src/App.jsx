import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductList from './components/ProductList';
import AuthPage from './components/AuthPage';
import UserDetailsPage from './components/UserDetailsPage';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import OrdersModal from './components/OrdersModal';
import AdminOrdersModal from './components/AdminOrdersModal';

function App() {
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const [showAuth, setShowAuth] = useState(false);
  const [currentView, setCurrentView] = useState('shop'); // 'shop' or 'profile'
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [showAdminOrdersModal, setShowAdminOrdersModal] = useState(false);

  // Reset to shop view when user logs in
  useEffect(() => {
    if (user) {
      setCurrentView('shop');
    }
  }, [user]);

  const handleCheckout = () => {
    setShowCartModal(false);
    setShowCheckoutModal(true);
  };

  const handleOrderSuccess = () => {
    setShowCheckoutModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
  };

  // Landing page for non-authenticated users
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Redux Shop
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8">
            Your Complete E-Commerce Solution
          </p>
          <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
            Experience seamless online shopping with Redux state management. 
            Join as a <span className="text-purple-400 font-semibold">User</span> to buy amazing products, 
            or sign up as an <span className="text-pink-400 font-semibold">Admin</span> to sell your items.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button onClick={() => setShowAuth(true)} className="btn-primary text-lg px-8 py-4">
              Get Started
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div className="card">
              <div className="text-5xl mb-4">🛍️</div>
              <h3 className="text-2xl font-bold mb-3 text-purple-300">For Buyers</h3>
              <ul className="text-left space-y-2 text-white/70">
                <li>✓ Browse amazing products</li>
                <li>✓ Add items to cart</li>
                <li>✓ Secure checkout</li>
                <li>✓ Track your orders</li>
              </ul>
            </div>

            <div className="card">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-2xl font-bold mb-3 text-pink-300">For Sellers</h3>
              <ul className="text-left space-y-2 text-white/70">
                <li>✓ List your products</li>
                <li>✓ Manage inventory</li>
                <li>✓ Track sales</li>
                <li>✓ Grow your business</li>
              </ul>
            </div>
          </div>
        </div>

        {showAuth && <AuthPage onClose={() => setShowAuth(false)} />}
      </div>
    );
  }

  // User Details / Profile View
  if (currentView === 'profile') {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <header className="mb-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentView('shop')}
              className="btn-secondary"
            >
              ← Back to Shop
            </button>
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                My Profile
              </span>
            </h1>
            <div className="w-32"></div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto">
          <UserDetailsPage />
        </main>
      </div>
    );
  }

  // Main Shop View (for both users and admins)
  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Redux Shop
              </span>
            </h1>
            
            <div className="flex items-center gap-4">
              {/* Orders Dashboard - Only for admins */}
              {user.role === 'admin' && (
                <button
                  onClick={() => setShowAdminOrdersModal(true)}
                  className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg hover:shadow-lg transition-all"
                  title="Orders Dashboard"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </button>
              )}

              {/* Orders Icon - Only for users */}
              {user.role === 'user' && (
                <button
                  onClick={() => setShowOrdersModal(true)}
                  className="relative bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all"
                  title="My Orders"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </button>
              )}

              {/* Cart Icon - Only for users */}
              {user.role === 'user' && (
                <button
                  onClick={() => setShowCartModal(true)}
                  className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg hover:shadow-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </button>
              )}

              {/* User Profile Button */}
              <button
                onClick={() => setCurrentView('profile')}
                className="btn-secondary"
              >
                👤 {user.name}
              </button>
            </div>
          </div>
          <p className="text-white/70 text-lg max-w-3xl">
            {user.role === 'admin' 
              ? '🏪 Admin Dashboard - Manage your products and inventory' 
              : '🛍️ Welcome! Browse and shop from our amazing collection'}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <ProductList />
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-white/50 pb-8">
        <p className="text-sm">
          Built with React, Redux Toolkit, Express, and MongoDB
        </p>
        <p className="text-xs mt-2">
          Logged in as: <span className="text-purple-400 capitalize">{user.role}</span>
        </p>
      </footer>

      {/* Modals */}
      <CartModal 
        isOpen={showCartModal} 
        onClose={() => setShowCartModal(false)}
        onCheckout={handleCheckout}
      />
      <CheckoutModal 
        isOpen={showCheckoutModal} 
        onClose={() => setShowCheckoutModal(false)}
        onSuccess={handleOrderSuccess}
      />
      <OrderSuccessModal 
        isOpen={showSuccessModal} 
        onClose={handleSuccessClose}
      />
      <OrdersModal 
        isOpen={showOrdersModal} 
        onClose={() => setShowOrdersModal(false)}
      />
      <AdminOrdersModal 
        isOpen={showAdminOrdersModal} 
        onClose={() => setShowAdminOrdersModal(false)}
      />
    </div>
  );
}

export default App;
