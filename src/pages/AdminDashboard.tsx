import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  CreditCard,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  DollarSign,
  Calendar
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { Product, Order } from '../types';

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');

  const isActive = (path: string) => location.pathname.includes(path);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/admin' },
    { id: 'products', label: 'Produits', icon: Package, path: '/admin/products' },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart, path: '/admin/orders' },
    { id: 'payments', label: 'Paiements', icon: CreditCard, path: '/admin/payments' },
    { id: 'users', label: 'Utilisateurs', icon: Users, path: '/admin/users' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                  isActive(item.path) ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/products" element={<ProductsManagement />} />
          <Route path="/orders" element={<OrdersManagement />} />
          <Route path="/payments" element={<PaymentsManagement />} />
          <Route path="/users" element={<UsersManagement />} />
        </Routes>
      </div>
    </div>
  );
};

// Dashboard Overview
const DashboardOverview: React.FC = () => {
  const stats = [
    {
      label: 'Ventes totales',
      value: '€125,430',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      label: 'Commandes',
      value: '1,234',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      label: 'Produits',
      value: '567',
      change: '+3.1%',
      icon: Package,
      color: 'text-purple-600'
    },
    {
      label: 'Utilisateurs',
      value: '8,945',
      change: '+15.3%',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Vue d'ensemble</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    {stat.change}
                  </p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Commandes récentes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Commande</th>
                <th className="text-left py-2">Client</th>
                <th className="text-left py-2">Statut</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">#ORD-{1000 + index}</td>
                  <td className="py-2">Client {index + 1}</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Livré
                    </span>
                  </td>
                  <td className="py-2">€{(Math.random() * 1000 + 100).toFixed(2)}</td>
                  <td className="py-2">
                    {new Date(Date.now() - index * 86400000).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Products Management
const ProductsManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des produits</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Ajouter un produit</span>
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Produit</th>
                <th className="text-left p-4">Catégorie</th>
                <th className="text-left p-4">Prix</th>
                <th className="text-left p-4">Stock</th>
                <th className="text-left p-4">Statut</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.supplier}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 capitalize">{product.category}</td>
                  <td className="p-4">€{product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock > 50 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Actif
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Orders Management
const OrdersManagement: React.FC = () => {
  const mockOrders = [
    {
      id: 'ORD-1001',
      customer: 'Jean Dupont',
      status: 'pending',
      total: 299.99,
      date: '2024-01-15',
      paymentMethod: 'cod'
    },
    {
      id: 'ORD-1002',
      customer: 'Marie Martin',
      status: 'processing',
      total: 599.99,
      date: '2024-01-14',
      paymentMethod: 'credit_card'
    },
    {
      id: 'ORD-1003',
      customer: 'Pierre Dubois',
      status: 'shipped',
      total: 149.99,
      date: '2024-01-13',
      paymentMethod: 'bank_transfer'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'processing': return 'En cours';
      case 'shipped': return 'Expédié';
      default: return status;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des commandes</h2>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">N° Commande</th>
                <th className="text-left p-4">Client</th>
                <th className="text-left p-4">Statut</th>
                <th className="text-left p-4">Total</th>
                <th className="text-left p-4">Paiement</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="p-4">€{order.total.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="capitalize text-sm">
                      {order.paymentMethod === 'cod' ? 'À la réception' : 
                       order.paymentMethod === 'credit_card' ? 'Carte' : 'Virement'}
                    </span>
                  </td>
                  <td className="p-4">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Payments Management
const PaymentsManagement: React.FC = () => {
  const mockPayments = [
    {
      id: 'PAY-1001',
      orderId: 'ORD-1001',
      amount: 299.99,
      method: 'cod',
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 'PAY-1002',
      orderId: 'ORD-1002',
      amount: 599.99,
      method: 'credit_card',
      status: 'completed',
      date: '2024-01-14'
    },
    {
      id: 'PAY-1003',
      orderId: 'ORD-1003',
      amount: 149.99,
      method: 'bank_transfer',
      status: 'completed',
      date: '2024-01-13'
    }
  ];

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des paiements</h2>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">N° Paiement</th>
                <th className="text-left p-4">Commande</th>
                <th className="text-left p-4">Montant</th>
                <th className="text-left p-4">Méthode</th>
                <th className="text-left p-4">Statut</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{payment.id}</td>
                  <td className="p-4">{payment.orderId}</td>
                  <td className="p-4">€{payment.amount.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="capitalize text-sm">
                      {payment.method === 'cod' ? 'À la réception' : 
                       payment.method === 'credit_card' ? 'Carte' : 'Virement'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(payment.status)}`}>
                      {payment.status === 'pending' ? 'En attente' : 
                       payment.status === 'completed' ? 'Terminé' : 'Échoué'}
                    </span>
                  </td>
                  <td className="p-4">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      {payment.status === 'pending' && (
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                          <span className="text-xs">Valider</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Users Management
const UsersManagement: React.FC = () => {
  const mockUsers = [
    { id: '1', name: 'Jean Dupont', email: 'jean@example.com', role: 'user', status: 'active' },
    { id: '2', name: 'Marie Martin', email: 'marie@example.com', role: 'user', status: 'active' },
    { id: '3', name: 'Admin', email: 'admin@example.com', role: 'admin', status: 'active' }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des utilisateurs</h2>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Nom</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Rôle</th>
                <th className="text-left p-4">Statut</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {user.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
