import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const OrdersModal = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchOrders();
    }
  }, [isOpen, user]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const token = user.token;
      const response = await axios.get('http://localhost:5001/api/orders/myorders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500',
      processing: 'bg-blue-500/20 text-blue-300 border-blue-500',
      shipped: 'bg-purple-500/20 text-purple-300 border-purple-500',
      delivered: 'bg-green-500/20 text-green-300 border-green-500',
      cancelled: 'bg-red-500/20 text-red-300 border-red-500',
    };
    return colors[status] || colors.pending;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title mb-0">My Orders</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white text-2xl">
            ×
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-white/60 text-lg mb-2">No orders yet</p>
            <p className="text-white/40 text-sm">Start shopping to see your orders here</p>
            <button onClick={onClose} className="btn-primary mt-4">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white/5 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-white/60">Order ID</p>
                    <p className="font-mono text-sm">{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Date</p>
                    <p className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-4">
                  <p className="text-sm text-white/60 mb-2">Items:</p>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.image && <span className="mr-2">{item.image}</span>}
                          {item.name} × {item.quantity}
                        </span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-white/60">Shipping Address</p>
                      <p className="text-sm">
                        {order.shippingAddress?.street}, {order.shippingAddress?.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/60">Total Amount</p>
                      <p className="text-2xl font-bold text-purple-400">
                        ₹{order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersModal;
