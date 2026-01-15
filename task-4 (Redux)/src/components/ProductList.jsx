import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, setCategory, fetchProducts } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';
import ProductForm from './ProductForm';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, filter, selectedCategory, isLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const categories = ['All', 'Electronics', 'Home', 'Sports', 'Books', 'Clothing'];

  // Fetch products from MongoDB when component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(filter.toLowerCase()) ||
                         product.description.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleCloseForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="section-title mb-0">
          {isAdmin ? 'Product Management' : 'Available Products'}
        </h2>
        
        {/* Add Product Button - Only for Admins */}
        {isAdmin && (
          <button
            onClick={() => setShowProductForm(true)}
            className="btn-primary"
          >
            + Add Product
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          className="input-field flex-1"
        />
        
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => dispatch(setCategory(category))}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all">
              <div className="text-6xl mb-4 text-center">{product.image}</div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-white/60 text-sm mb-4">{product.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-purple-400">
                  ₹{product.price.toFixed(2)}
                </span>
                <span className="text-sm bg-white/10 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Action Buttons - Different for User vs Admin */}
              {isAdmin ? (
                // Admin: Edit and Delete buttons
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="btn-secondary flex-1"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                // User: Add to Cart button
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn-primary w-full"
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Product Form Modal - Only for Admins */}
      {isAdmin && showProductForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default ProductList;
