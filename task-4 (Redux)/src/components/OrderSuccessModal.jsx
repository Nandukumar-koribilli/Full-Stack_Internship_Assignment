import React from 'react';

const OrderSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Thank You!
          </h2>
          <p className="text-xl text-white/80 mb-4">Your order has been placed successfully</p>
          <p className="text-white/60">
            We've received your order and will start processing it right away. 
            You can track your order status in the Orders section.
          </p>
        </div>

        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Order Confirmation</span>
          </div>
          <p className="text-white/80">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>

        <button onClick={onClose} className="btn-primary w-full">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
