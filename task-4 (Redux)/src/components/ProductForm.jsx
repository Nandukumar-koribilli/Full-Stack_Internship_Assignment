import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct, deleteProduct } from '../store/productsSlice';
import axios from 'axios';

const ProductForm = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    stock: '',
    image: '📦',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    try {
      const token = user.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (product && product._id) {
        // Update existing product in MongoDB
        const response = await axios.put(
          `http://localhost:5001/api/products/${product._id}`,
          productData,
          config
        );
        dispatch(updateProduct({ ...productData, _id: product._id, id: product._id }));
      } else {
        // Create new product in MongoDB
        const response = await axios.post(
          'http://localhost:5001/api/products',
          productData,
          config
        );
        // Add to Redux with MongoDB _id
        dispatch(addProduct({ ...productData, _id: response.data._id, id: response.data._id }));
      }
      
      onClose();
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (product && window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = user.token;
        
        if (product._id) {
          // Delete from MongoDB
          await axios.delete(
            `http://localhost:5001/api/products/${product._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
        
        // Delete from Redux
        dispatch(deleteProduct(product.id || product._id));
        onClose();
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const emojiOptions = ['📦', '🎧', '⌚', '☕', '🧘', '💡', '📱', '💻', '🎮', '📷', '🎨', '📚'];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="section-title">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product Icon</label>
            <div className="flex gap-2 flex-wrap">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: emoji })}
                  className={`text-3xl p-2 rounded-lg transition-all ${
                    formData.image === emoji 
                      ? 'bg-purple-600 scale-110' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`input-field w-full ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Product name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`input-field w-full ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Product description"
              rows="3"
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price (₹) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={`input-field w-full ${errors.price ? 'border-red-500' : ''}`}
                placeholder="0.00"
              />
              {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Stock *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className={`input-field w-full ${errors.stock ? 'border-red-500' : ''}`}
                placeholder="0"
              />
              {errors.stock && <p className="text-red-400 text-sm mt-1">{errors.stock}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field w-full"
              style={{ colorScheme: 'dark' }}
            >
              <option value="Electronics" className="bg-gray-800 text-white">Electronics</option>
              <option value="Home" className="bg-gray-800 text-white">Home</option>
              <option value="Sports" className="bg-gray-800 text-white">Sports</option>
              <option value="Books" className="bg-gray-800 text-white">Books</option>
              <option value="Clothing" className="bg-gray-800 text-white">Clothing</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn-primary flex-1">
              {product ? 'Update Product' : 'Add Product'}
            </button>
            {product && (
              <button 
                type="button" 
                onClick={handleDelete} 
                className="btn-danger"
              >
                Delete
              </button>
            )}
            <button 
              type="button" 
              onClick={onClose} 
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
