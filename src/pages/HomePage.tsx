import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Truck, Users } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { mockProducts, mockCategories } from '../data/mockData';
import { Product, Category } from '../types';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation d'un chargement API
    setTimeout(() => {
      setFeaturedProducts(mockProducts.slice(0, 8));
      setCategories(mockCategories);
      setLoading(false);
    }, 1000);
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Paiement sécurisé',
      description: 'Transactions protégées et paiement à la réception',
    },
    {
      icon: Truck,
      title: 'Livraison rapide',
      description: 'Expédition mondiale avec suivi en temps réel',
    },
    {
      icon: Users,
      title: 'Support 24/7',
      description: 'Assistance dédiée pour tous vos besoins',
    },
    {
      icon: TrendingUp,
      title: 'Meilleurs prix',
      description: 'Tarifs compétitifs et remises en volume',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Votre Marketplace B2B
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Connectez-vous avec des milliers de fournisseurs mondiaux
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Commencer à acheter
              </Link>
              <Link
                to="/signup"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Devenir fournisseur
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Parcourir par catégorie
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez notre large gamme de produits
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group text-center"
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.productCount.toLocaleString()} produits
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Produits en vedette
              </h2>
              <p className="text-lg text-gray-600">
                Découvrez les produits les plus populaires
              </p>
            </div>
            <Link
              to="/products"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
            >
              <span>Voir tout</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <ProductGrid products={featuredProducts} loading={loading} />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-lg text-gray-600">
              Des services conçus pour votre succès
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à développer votre business ?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Rejoignez des milliers d&apos;entreprises qui nous font confiance
          </p>
          <Link
            to="/signup"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
