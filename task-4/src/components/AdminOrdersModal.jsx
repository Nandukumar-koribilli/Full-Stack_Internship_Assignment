import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AdminOrdersModal = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    if (isOpen && user) {
      fetchAllOrders();
    }
  }, [isOpen, user, selectedStatus]);

  const fetchAllOrders = async () => {
    setIsLoading(true);
    try {
      const token = user.token;
      const response = await axios.get('http://localhost:5001/api/orders/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      let filteredOrders = response.data;
      if (selectedStatus !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === selectedStatus);
      }
      
      setOrders(filteredOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = user.token;
      await axios.put(
        `http://localhost:5001/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh orders
      fetchAllOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update order status');
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

  const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="section-title mb-0">Orders Dashboard</h2>
            <p className="text-white/60 text-sm">Manage all customer orders</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white text-2xl">
            ×
          </button>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedStatus === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            All Orders ({orders.length})
          </button>
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg transition-all capitalize ${
                selectedStatus === status
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-white/60 text-lg mb-2">No orders found</p>
            <p className="text-white/40 text-sm">
              {selectedStatus === 'all' ? 'No orders have been placed yet' : `No ${selectedStatus} orders`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-white/60">Order ID</p>
                    <p className="font-mono text-sm font-semibold">{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Customer</p>
                    <p className="text-sm font-semibold">{order.user?.name || 'N/A'}</p>
                    <p className="text-xs text-white/50">{order.user?.email || ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Date</p>
                    <p className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs text-white/50">{new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-2">Status</p>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer ${getStatusColor(order.status)}`}
                      style={{ colorScheme: 'dark' }}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status} className="bg-gray-800 text-white">
                          {status.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-4">
                  <p className="text-sm text-white/60 mb-2">Items:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm bg-white/5 p-2 rounded">
                        <span>
                          {item.image && <span className="mr-2">{item.image}</span>}
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-white/60">Shipping Address</p>
                      <p className="text-sm">
                        {order.shippingAddress?.street}, {order.shippingAddress?.city}
                      </p>
                      <p className="text-sm text-white/70">
                        {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/60">Total Amount</p>
                      <p className="text-3xl font-bold text-purple-400">
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

export default AdminOrdersModal;
