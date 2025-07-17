import { Product, Category } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Premium 5G',
    description: 'Smartphone haut de gamme avec écran OLED 6.7" et processeur dernière génération',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    category: 'electronics',
    stock: 150,
    rating: 4.5,
    reviews: 89,
    supplier: 'TechCorp International',
    minOrder: 10,
    specifications: {
      'Écran': '6.7" OLED',
      'Processeur': 'Snapdragon 8 Gen 2',
      'RAM': '8GB',
      'Stockage': '256GB',
      'Batterie': '4500mAh'
    },
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop'
    ]
  },
  {
    id: '2',
    name: 'Ordinateur Portable Business',
    description: 'Laptop professionnel 15.6" avec processeur Intel i7 et SSD 512GB',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    category: 'electronics',
    stock: 75,
    rating: 4.3,
    reviews: 156,
    supplier: 'CompuTech Solutions',
    minOrder: 5,
    specifications: {
      'Écran': '15.6" Full HD',
      'Processeur': 'Intel i7-12700H',
      'RAM': '16GB DDR4',
      'Stockage': '512GB SSD',
      'Graphique': 'Intel Iris Xe'
    },
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=300&fit=crop'
    ]
  },
  {
    id: '3',
    name: 'Casque Audio Bluetooth',
    description: 'Casque sans fil avec réduction de bruit active et autonomie 30h',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    category: 'electronics',
    stock: 200,
    rating: 4.7,
    reviews: 234,
    supplier: 'AudioMax Ltd',
    minOrder: 20,
    specifications: {
      'Type': 'Circum-aural',
      'Connectivité': 'Bluetooth 5.0',
      'Autonomie': '30 heures',
      'Réduction de bruit': 'Active ANC',
      'Poids': '250g'
    },
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop'
    ]
  },
  {
    id: '4',
    name: 'Montre Connectée Sport',
    description: 'Montre intelligente avec GPS, moniteur cardiaque et étanchéité IP68',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    category: 'electronics',
    stock: 120,
    rating: 4.4,
    reviews: 178,
    supplier: 'WearTech Industries',
    minOrder: 15,
    specifications: {
      'Écran': '1.4" AMOLED',
      'GPS': 'Intégré',
      'Étanchéité': 'IP68',
      'Capteurs': 'Cardiaque, Gyroscope, Accéléromètre',
      'Autonomie': '7 jours'
    },
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=300&fit=crop'
    ]
  },
  {
    id: '5',
    name: 'Tablette Graphique Professionnelle',
    description: 'Tablette digitale pour designers avec stylet sensible à la pression',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1587814969489-6ac3c6c8e4c1?w=400&h=300&fit=crop',
    category: 'electronics',
    stock: 45,
    rating: 4.6,
    reviews: 92,
    supplier: 'DesignTech Pro',
    minOrder: 5,
    specifications: {
      'Surface': '10x6 pouces',
      'Niveaux de pression': '8192',
      'Résolution': '5080 LPI',
      'Connectivité': 'USB-C',
      'Compatibilité': 'Windows, macOS, Android'
    },
    images: [
      'https://images.unsplash.com/photo-1587814969489-6ac3c6c8e4c1?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1609743251419-95c3c1b2b3ef?w=400&h=300&fit=crop'
    ]
  },
  {
    id: '6',
    name: 'Projecteur LED 4K',
    description: 'Projecteur ultra-portable avec résolution 4K et luminosité 3000 lumens',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    category: 'electronics',
    stock: 30,
    rating: 4.2,
    reviews: 67,
    supplier: 'ProjectVision Co',
    minOrder: 3,
    specifications: {
      'Résolution': '4K UHD',
      'Luminosité': '3000 lumens',
      'Contraste': '10000:1',
      'Connectivité': 'HDMI, USB, WiFi',
      'Poids': '1.2kg'
    },
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=300&fit=crop'
    ]
  },
  {
    id: '7',
    name: 'Enceinte Bluetooth Portable',
    description: 'Enceinte étanche avec son 360° et autonomie 20 heures',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop',
    category: 'electronics',
    stock: 180,
    rating: 4.3,
    reviews: 145,
    supplier: 'SoundWave Tech',
    minOrder: 25,
    specifications: {
      'Puissance': '20W',
      'Connectivité': 'Bluetooth 5.0',
      'Autonomie': '20 heures',
      'Étanchéité': 'IPX7',
      'Poids': '650g'
    },
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'
    ]
  },
  {
    id: '8',
    name: 'Caméra de Surveillance WiFi',
    description: 'Caméra IP avec vision nocturne et détection de mouvement',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    category: 'electronics',
    stock: 95,
    rating: 4.1,
    reviews: 203,
    supplier: 'SecureTech Systems',
    minOrder: 10,
    specifications: {
      'Résolution': '1080p Full HD',
      'Vision nocturne': 'Infrarouge 10m',
      'Connectivité': 'WiFi 2.4GHz',
      'Stockage': 'Cloud + MicroSD',
      'Champ de vision': '110°'
    },
    images: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d09?w=400&h=300&fit=crop'
    ]
  }
];

export const mockCategories: Category[] = [
  {
    id: 'electronics',
    name: 'Électronique',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop',
    productCount: 1247
  },
  {
    id: 'fashion',
    name: 'Mode & Vêtements',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    productCount: 856
  },
  {
    id: 'home',
    name: 'Maison & Jardin',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
    productCount: 623
  },
  {
    id: 'sports',
    name: 'Sports & Loisirs',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    productCount: 445
  },
  {
    id: 'automotive',
    name: 'Automobile',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=200&fit=crop',
    productCount: 789
  },
  {
    id: 'industrial',
    name: 'Industriel',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
    productCount: 1342
  }
];
