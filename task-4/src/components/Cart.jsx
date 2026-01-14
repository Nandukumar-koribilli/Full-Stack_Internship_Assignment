import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from '../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title mb-0">Shopping Cart</h2>
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold bg-purple-600 px-4 py-2 rounded-full">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
          {items.length > 0 && (
            <button onClick={handleClearCart} className="btn-danger text-sm">
              Clear Cart
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-white/60 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-center gap-4"
            >
              <div className="text-4xl">{item.image}</div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                <p className="text-sm text-white/60">₹{item.price.toFixed(2)} each</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrement(item.id)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-xl transition-all"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold text-lg">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item.id)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-xl transition-all"
                >
                  +
                </button>
              </div>
              
              <div className="text-right min-w-[100px]">
                <p className="text-xl font-bold text-purple-400">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-400 hover:text-red-300 transition-colors p-2"
                title="Remove from cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
          
          <div className="border-t border-white/20 pt-4 mt-6">
            <div className="flex justify-between items-center text-2xl font-bold">
              <span>Total:</span>
              <span className="text-purple-400">₹{totalPrice.toFixed(2)}</span>
            </div>
            <button className="btn-primary w-full mt-4 text-lg py-3">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
