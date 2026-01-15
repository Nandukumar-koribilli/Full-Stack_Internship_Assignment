import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import axios from "axios";

const CheckoutModal = ({ isOpen, onClose, onSuccess }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    zipCode: user?.address?.zipCode || "",
    paymentMethod: "cod",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create order - works with both Redux and MongoDB products
      const orderData = {
        items: cartItems.map((item) => {
          const orderItem = {
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            image: item.image,
          };

          // Only include product ID if it looks like a MongoDB ObjectId (24 hex chars)
          if (
            item._id &&
            typeof item._id === "string" &&
            item._id.length === 24
          ) {
            orderItem.product = item._id;
          }

          return orderItem;
        }),
        totalAmount: totalPrice,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        paymentMethod: formData.paymentMethod,
        customerName: formData.name,
        customerPhone: formData.phone,
      };

      const token = user.token;
      const response = await axios.post(
        "http://localhost:5001/api/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Clear cart and show success
      dispatch(clearCart());
      onSuccess();
    } catch (error) {
      console.error("Order failed:", error.response?.data || error.message);

      // Show more specific error message
      const errorMessage =
        error.response?.data?.message ||
        "Failed to place order. Please try again.";
      alert(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title mb-0">Checkout</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
            <div className="space-y-2 mb-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/20 pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span className="text-xl text-purple-400">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Shipping Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="input-field w-full"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="input-field w-full"
                  placeholder="Street address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                  className="input-field w-full"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 bg-white/5 p-4 rounded-lg cursor-pointer hover:bg-white/10">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-white/60">
                    Pay when you receive your order
                  </p>
                </div>
              </label>
              <label className="flex items-center gap-3 bg-white/5 p-4 rounded-lg cursor-pointer hover:bg-white/10">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-white/60">
                    Pay securely with your card
                  </p>
                </div>
              </label>
              <label className="flex items-center gap-3 bg-white/5 p-4 rounded-lg cursor-pointer hover:bg-white/10">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === "upi"}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-medium">UPI Payment</p>
                  <p className="text-sm text-white/60">Pay using UPI apps</p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
