import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';
import { useCart } from '../contexts/CartContext';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulation d'un chargement API
      setTimeout(() => {
        const foundProduct = mockProducts.find(p => p.id === id);
        setProduct(foundProduct || null);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // Optionnel: afficher une notification
      alert('Produit ajouté au panier !');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex space-x-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h2>
        <p className="text-gray-600 mb-8">Le produit que vous recherchez n'existe pas.</p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-1 hover:text-primary-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour</span>
        </button>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? 'border-primary-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Informations produit */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Évaluation */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews} avis)
            </span>
          </div>

          {/* Prix */}
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary-600">
              {product.price.toFixed(2)}€
            </div>
            <div className="text-sm text-gray-600">
              Commande minimum: {product.minOrder} pièces
            </div>
          </div>

          {/* Fournisseur */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Fournisseur</h3>
            <p className="text-gray-700">{product.supplier}</p>
          </div>

          {/* Quantité */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantité
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(product.minOrder, quantity - 1))}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder))}
                min={product.minOrder}
                className="w-20 text-center border border-gray-300 rounded-lg py-2"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Ajouter au panier</span>
            </button>
            <div className="flex space-x-3">
              <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Favoris</span>
              </button>
              <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                <Share2 className="w-5 h-5" />
                <span>Partager</span>
              </button>
            </div>
          </div>

          {/* Garanties */}
          <div className="space-y-3 pt-6 border-t">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">Garantie qualité</span>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-700">Livraison rapide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spécifications */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Spécifications</h2>
        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">{key}:</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
