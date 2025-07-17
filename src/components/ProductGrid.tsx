import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading = false }) => {
  const { addToCart } = useCart();

  if (loading) {
    return (
      <div className="grid-products">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="card p-4 animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid-products">
      {products.map((product) => (
        <div key={product.id} className="card group hover:shadow-lg transition-all duration-300">
          <Link to={`/product/${product.id}`}>
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                  <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {product.stock < 50 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Stock limité
                </div>
              )}
            </div>
          </Link>
          
          <div className="p-4">
            <Link to={`/product/${product.id}`}>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                ({product.reviews})
              </span>
            </div>
            
            <div className="mb-3">
              <div className="text-2xl font-bold text-primary-600">
                {product.price.toFixed(2)}€
              </div>
              <div className="text-sm text-gray-500">
                Min. commande: {product.minOrder} pcs
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mb-3">
              {product.supplier}
            </div>
            
            <button
              onClick={() => addToCart(product, product.minOrder)}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Ajouter au panier</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
