import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, CreditCard, Truck, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CheckoutPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<
    'cod' | 'bank_transfer' | 'credit_card'
  >('cod');
  const [loading, setLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'France',
  });

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulation d'une création de commande
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Vider le panier
      clearCart();

      // Rediriger vers une page de confirmation
      navigate('/order-confirmation');
    } catch (error) {
      // TODO: Gestion d'erreur plus robuste
      // console.error('Erreur lors de la commande:', error);
    } finally {
      setLoading(false);
    }
  };

  const openPaymentForm = () => {
    setShowPaymentForm(true);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Votre panier est vide
          </h2>
          <p className="text-gray-600">
            Parcourez nos produits et ajoutez-les à votre panier
          </p>
        </div>
        <button onClick={() => navigate('/')} className="btn-primary">
          Continuer les achats
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Finaliser votre commande
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Panier */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Votre panier
          </h2>

          {items.map(item => (
            <div key={item.product.id} className="card p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.product.supplier}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-lg font-bold text-primary-600">
                      {item.product.price.toFixed(2)}€
                    </span>
                    <span className="text-sm text-gray-500">
                      x {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product.id, item.quantity - 1)
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                    disabled={item.quantity <= item.product.minOrder}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product.id, item.quantity + 1)
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <div className="card p-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-primary-600">{total.toFixed(2)}€</span>
            </div>
          </div>
        </div>

        {/* Formulaire de commande */}
        <div className="space-y-6">
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            {/* Informations de livraison */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Adresse de livraison
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nom complet"
                  value={shippingInfo.name}
                  onChange={e =>
                    setShippingInfo({ ...shippingInfo, name: e.target.value })
                  }
                  className="input-field"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={shippingInfo.email}
                  onChange={e =>
                    setShippingInfo({ ...shippingInfo, email: e.target.value })
                  }
                  className="input-field"
                  required
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={shippingInfo.phone}
                  onChange={e =>
                    setShippingInfo({ ...shippingInfo, phone: e.target.value })
                  }
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Adresse"
                  value={shippingInfo.address}
                  onChange={e =>
                    setShippingInfo({
                      ...shippingInfo,
                      address: e.target.value,
                    })
                  }
                  className="input-field md:col-span-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Ville"
                  value={shippingInfo.city}
                  onChange={e =>
                    setShippingInfo({ ...shippingInfo, city: e.target.value })
                  }
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Code postal"
                  value={shippingInfo.zipCode}
                  onChange={e =>
                    setShippingInfo({
                      ...shippingInfo,
                      zipCode: e.target.value,
                    })
                  }
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Méthode de paiement */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Mode de paiement
              </h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={e => setPaymentMethod(e.target.value as 'cod')}
                    className="w-4 h-4 text-primary-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium">Paiement à la réception</div>
                    <div className="text-sm text-gray-600">
                      Payez en espèces ou par carte à la livraison
                    </div>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="bank_transfer"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={e =>
                      setPaymentMethod(e.target.value as 'bank_transfer')
                    }
                    className="w-4 h-4 text-primary-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium">Virement bancaire</div>
                    <div className="text-sm text-gray-600">
                      Paiement par virement bancaire
                    </div>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="credit_card"
                    checked={paymentMethod === 'credit_card'}
                    onChange={e =>
                      setPaymentMethod(e.target.value as 'credit_card')
                    }
                    className="w-4 h-4 text-primary-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium">Carte de crédit</div>
                    <div className="text-sm text-gray-600">
                      Paiement sécurisé par carte
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Bouton de commande */}
            <div className="space-y-4">
              {paymentMethod === 'cod' ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 text-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Traitement...</span>
                    </div>
                  ) : (
                    'Commander avec paiement à la réception'
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={openPaymentForm}
                  className="w-full btn-primary py-3 text-lg"
                >
                  Ouvrir le formulaire de paiement
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Modal de formulaire de paiement */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              Formulaire de paiement
            </h3>
            <form onSubmit={handleSubmitOrder}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Numéro de carte"
                  className="input-field"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="input-field"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Nom sur la carte"
                  className="input-field"
                  required
                />
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="flex-1 btn-secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary"
                >
                  {loading ? 'Traitement...' : 'Payer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
