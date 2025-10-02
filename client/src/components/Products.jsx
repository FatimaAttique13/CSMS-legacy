import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

import { 
  Truck, 
  FileText, 
  Mountain, 
  Factory, 
  Search, 
  CheckCircle, 
  Clock, 
  MapPin,
  Phone,
  Mail,
  Building2,
  ArrowRight,
  Package,
  Shield,
  Zap,
  Star,
  Users,
  Calendar,
  TrendingUp,
  Award,
  Settings,
  Menu,
  X,
  ChevronDown,
  Filter,
  Grid,
  List,
  ShoppingCart,
  Plus,
  Minus,
  Eye,
  Heart,
  Share2
} from 'lucide-react';

const ProductsPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState({});

  const categories = [
    { id: 'all', name: 'All Products', count: 12 },
    { id: 'cement', name: 'Cement', count: 4 },
    { id: 'aggregate', name: 'Aggregate', count: 5 },
    { id: 'sand', name: 'Sand', count: 3 }
  ];

  const products = [
    {
      id: 1,
      name: 'Premium Portland Cement',
      category: 'cement',
      price: 75,
      unit: 'per 50kg bag',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
      reviews: 234,
      inStock: true,
      features: ['High strength grade', 'Quick setting', 'Weather resistant', 'Quality certified'],
      description: 'Premium grade Portland cement perfect for structural construction. Manufactured to international standards with consistent quality.',
      specifications: {
        'Compressive Strength': '42.5 MPa',
        'Setting Time': '30-600 minutes',
        'Fineness': '300-400 m²/kg',
        'Packaging': '50kg bags or bulk'
      }
    },
    {
      id: 2,
      name: 'Rapid Set Cement',
      category: 'cement',
      price: 85,
      unit: 'per 50kg bag',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.8,
      reviews: 189,
      inStock: true,
      features: ['Ultra-fast setting', 'High early strength', 'Cold weather ready', 'Premium quality'],
      description: 'Fast-setting cement ideal for urgent repairs and quick construction projects. Sets in just 15 minutes.',
      specifications: {
        'Compressive Strength': '52.5 MPa',
        'Setting Time': '15-45 minutes',
        'Fineness': '400-500 m²/kg',
        'Packaging': '50kg bags only'
      }
    },
    {
      id: 3,
      name: 'White Portland Cement',
      category: 'cement',
      price: 95,
      unit: 'per 50kg bag',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.7,
      reviews: 156,
      inStock: true,
      features: ['Pure white color', 'Architectural grade', 'Smooth finish', 'UV resistant'],
      description: 'Premium white cement for decorative and architectural applications. Perfect for aesthetic finishes.',
      specifications: {
        'Compressive Strength': '42.5 MPa',
        'Whiteness': '>85%',
        'Fineness': '350-450 m²/kg',
        'Packaging': '50kg bags only'
      }
    },
    {
      id: 4,
      name: 'Bulk Portland Cement',
      category: 'cement',
      price: 65,
      unit: 'per ton',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
      reviews: 445,
      inStock: true,
      features: ['Bulk delivery', 'Cost effective', 'Large projects', 'Pneumatic delivery'],
      description: 'Bulk cement delivery for large construction projects. Pneumatic delivery available for easy handling.',
      specifications: {
        'Compressive Strength': '42.5 MPa',
        'Setting Time': '30-600 minutes',
        'Minimum Order': '10 tons',
        'Delivery Method': 'Pneumatic truck'
      }
    },
    {
      id: 5,
      name: 'Crushed Granite 20mm',
      category: 'aggregate',
      price: 45,
      unit: 'per ton',
      image: 'https://images.unsplash.com/photo-1544819667-3131c8c8da2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.8,
      reviews: 312,
      inStock: true,
      features: ['Angular shape', 'High strength', 'Washed clean', 'Consistent grading'],
      description: 'Premium crushed granite aggregate ideal for concrete production and road construction.',
      specifications: {
        'Size': '20mm nominal',
        'Shape': 'Angular/Crushed',
        'Absorption': '<2%',
        'Delivery': 'Tipper trucks'
      }
    },
    {
      id: 6,
      name: 'Crushed Granite 14mm',
      category: 'aggregate',
      price: 48,
      unit: 'per ton',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.7,
      reviews: 267,
      inStock: true,
      features: ['Medium grade', 'Concrete ready', 'Clean washed', 'Quality tested'],
      description: 'Medium grade crushed granite perfect for standard concrete mixing and construction applications.',
      specifications: {
        'Size': '14mm nominal',
        'Shape': 'Angular/Crushed',
        'Absorption': '<2%',
        'Delivery': 'Tipper trucks'
      }
    },
    {
      id: 7,
      name: 'Fine Aggregate 10mm',
      category: 'aggregate',
      price: 52,
      unit: 'per ton',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.6,
      reviews: 189,
      inStock: true,
      features: ['Fine grade', 'Smooth finish', 'Multi-purpose', 'Clean material'],
      description: 'Fine aggregate suitable for plastering, fine concrete work and decorative applications.',
      specifications: {
        'Size': '10mm nominal',
        'Shape': 'Angular/Crushed',
        'Absorption': '<2.5%',
        'Delivery': 'Tipper trucks'
      }
    },
    {
      id: 8,
      name: 'Coarse Sand',
      category: 'sand',
      price: 35,
      unit: 'per ton',
      image: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.8,
      reviews: 298,
      inStock: true,
      features: ['Coarse texture', 'Concrete grade', 'Well graded', 'Low silt content'],
      description: 'Premium coarse sand perfect for concrete mixing and masonry work. Well-graded and clean.',
      specifications: {
        'Fineness Modulus': '2.6-3.2',
        'Silt Content': '<3%',
        'Moisture': '<5%',
        'Delivery': 'Tipper trucks'
      }
    },
    {
      id: 9,
      name: 'Fine Plastering Sand',
      category: 'sand',
      price: 40,
      unit: 'per ton',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.7,
      reviews: 234,
      inStock: false,
      features: ['Fine texture', 'Smooth finish', 'Low clay content', 'Sieved clean'],
      description: 'Fine sand specially processed for plastering and finishing work. Provides smooth, professional results.',
      specifications: {
        'Fineness Modulus': '1.8-2.4',
        'Silt Content': '<2%',
        'Clay Content': '<2%',
        'Delivery': 'Tipper trucks'
      }
    }
  ];

  const updateQuantity = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const ProductCard = ({ product, isListView = false }) => (
    <div className={`group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden ${isListView ? 'flex items-center p-6' : 'p-8'}`}>
      {/* Product Image */}
      <div className={`relative overflow-hidden ${isListView ? 'w-32 h-32 flex-shrink-0 mr-6' : 'w-full h-64 mb-6'} rounded-2xl`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">Out of Stock</span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200">
            <Share2 className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className={`${isListView ? 'flex-1' : ''}`}>
        {/* Product Info */}
        <div className={`${isListView ? 'flex items-start justify-between' : ''}`}>
          <div className={`${isListView ? 'flex-1 pr-6' : ''}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold capitalize">
                {product.category}
              </span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold ml-1">{product.rating}</span>
                <span className="text-gray-500 text-sm ml-1">({product.reviews})</span>
              </div>
            </div>

            <h3 className={`font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 ${isListView ? 'text-xl' : 'text-2xl'}`}>
              {product.name}
            </h3>

            <p className={`text-gray-600 mb-4 leading-relaxed ${isListView ? 'text-sm' : 'text-base'}`}>
              {product.description}
            </p>

            {!isListView && (
              <div className="mb-6 space-y-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price and Actions */}
          <div className={`${isListView ? 'text-right' : ''}`}>
            <div className="mb-4">
              <span className="text-3xl font-black text-gray-900">SAR {product.price}</span>
              <span className="text-gray-500 ml-2">{product.unit}</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mb-4">
              <button 
                onClick={() => updateQuantity(product.id, -1)}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-xl transition-colors duration-200"
                disabled={!quantities[product.id]}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-bold text-lg">
                {quantities[product.id] || 0}
              </span>
              <button 
                onClick={() => updateQuantity(product.id, 1)}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-xl transition-colors duration-200"
                disabled={!product.inStock}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className={`space-y-3 ${isListView ? 'w-48' : ''}`}>
              <button 
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-2xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center">
                <Eye className="h-5 w-5 mr-2" />
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100" style={{ fontFamily: 'Inter, Segoe UI, system-ui, sans-serif' }}>
      {/* Glassmorphic Navbar - Same as homepage */}
      <header className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <nav className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-full shadow-2xl px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 transition-all duration-500 hover:bg-white/25 hover:shadow-3xl">
            <div className="flex justify-between items-center gap-2">
              {/* Logo */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative group cursor-pointer">
                  <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-2 sm:p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <Factory className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-md animate-pulse"></div>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-black text-gray-900 tracking-tight leading-none">CSMS</span>
                  <p className="text-[10px] sm:text-xs text-black-600 font-semibold tracking-wider uppercase hidden xs:block">Supply Management</p>
                </div>
              </div>
            
              {/* Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                <Link to="/" className="px-4 py-2 text-black-800 hover:text-blue-600 font-medium transition-all duration-300 rounded-full hover:bg-white/40 text-sm">
                  Home
                </Link>
                <Link to="/products" className="px-4 py-2 text-blue-600 font-medium transition-all duration-300 rounded-full bg-white/40 text-sm">
                  Products
                </Link>
                <Link to="/place-order" className="px-4 py-2 text-black-800 hover:text-blue-600 font-medium transition-all duration-300 rounded-full hover:bg-white/40 text-sm">
                  Place Order
                </Link>
                <Link to="/track-order" className="px-4 py-2 text-black-800 hover:text-blue-600 font-medium transition-all duration-300 rounded-full hover:bg-white/40 text-sm">
                  Track Order
                </Link>
                <Link to="/admin/analytics" className="px-4 py-2 text-black-800 hover:text-blue-600 font-medium transition-all duration-300 rounded-full hover:bg-white/40 text-sm">
                  Admin
                </Link>
                <Link to="/about" className="px-4 py-2 text-black-800 hover:text-blue-600 font-medium transition-all duration-300 rounded-full hover:bg-white/40 text-sm">
                  About
                </Link>
                <Link to="/contact" className="px-4 py-2 text-black-800 hover:text-blue-600 font-medium transition-all duration-300 rounded-full hover:bg-white/40 text-sm">
                  Contact
                </Link>
              </div>

              {/* CTA Buttons (hide when authenticated) */}
              {!user && (
                <div className="hidden lg:flex items-center space-x-3">
                  <Link to="/login" className="text-black-800 hover:text-blue-600 font-medium px-4 py-2 rounded-full hover:bg-white/40 transition-all duration-300 text-sm">
                    Login
                  </Link>
                  <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm">
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-full hover:bg-white/40 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-gray-800" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-800" />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4">
              <div className="bg-white/25 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl p-6">
                <nav className="flex flex-col space-y-2">
                  <Link to="/" className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/40 rounded-2xl font-medium transition-all duration-300">
                    Home
                  </Link>
                  <Link to="/products" className="px-4 py-3 text-blue-600 bg-white/40 rounded-2xl font-medium transition-all duration-300">
                    Products
                  </Link>
                  <Link to="/place-order" className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/40 rounded-2xl font-medium transition-all duration-300">
                    Place Order
                  </Link>
                  <Link to="/track-order" className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/40 rounded-2xl font-medium transition-all duration-300">
                    Track Order
                  </Link>
                  <Link to="/about" className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/40 rounded-2xl font-medium transition-all duration-300">
                    About
                  </Link>
                  <Link to="/contact" className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/40 rounded-2xl font-medium transition-all duration-300">
                    Contact
                  </Link>
                  {!user && (
                    <div className="pt-4 space-y-3 border-t border-white/20">
                      <Link to="/login" className="w-full text-center text-gray-800 hover:text-blue-600 font-medium px-4 py-3 rounded-2xl hover:bg-white/40 transition-all duration-300 border border-white/30">
                        Login
                      </Link>
                      <Link to="/signup" className="w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-2xl font-semibold shadow-lg">
                        Get Started
                      </Link>
                    </div>
                  )}
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Products Section */}
      <section className="pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6">
              Our Products
            </h1>
            <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mb-6 sm:mb-8 rounded-full"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto font-medium px-2">
              Premium construction materials from certified suppliers, delivered with precision across Saudi Arabia.
            </p>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 sm:gap-3 w-full lg:w-auto">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="hidden sm:inline">{category.name} ({category.count})</span>
                  <span className="sm:hidden">{category.name}</span>
                </button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto justify-between lg:justify-end">
              <div className="flex bg-gray-100 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 sm:p-3 rounded-xl transition-all duration-200 ${
                    viewMode === 'grid' ? 'bg-white shadow-md' : ''
                  }`}
                >
                  <Grid className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 sm:p-3 rounded-xl transition-all duration-200 ${
                    viewMode === 'list' ? 'bg-white shadow-md' : ''
                  }`}
                >
                  <List className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              <div className="text-gray-600 font-medium text-sm sm:text-base">
                <span className="hidden sm:inline">{filteredProducts.length} products found</span>
                <span className="sm:hidden">{filteredProducts.length} items</span>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8' 
            : 'space-y-4 sm:space-y-6'
          }>
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isListView={viewMode === 'list'} 
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12 sm:mt-14 md:mt-16">
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Load More Products
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Our Products */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-6 px-2">Quality Guaranteed</h2>
            <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mb-6 sm:mb-8 rounded-full"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto font-medium px-2">
              Every product in our catalog meets the highest industry standards with full quality certification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Quality Certified</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                All materials tested and certified to international standards with quality guarantees.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Zap className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Fast Processing</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Quick order processing and automated systems ensure rapid fulfillment of your material needs.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Truck className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Express Delivery</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Same-day delivery available across Jeddah & Makkah with our modern fleet and GPS tracking.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <FileText className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Complete Documentation</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Digital invoices, quality certificates, and delivery receipts for complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 sm:py-28 md:py-32 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 sm:mb-10 px-2">Ready to Order?</h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-100/90 mb-12 sm:mb-16 max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto font-medium leading-relaxed px-2">
            Browse our complete catalog and experience the future of construction material procurement with CSMS platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center px-2">
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-2xl text-xl sm:text-2xl font-bold shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group">
              <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300" />
              Place Order Now
            </button>
            <button className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-2xl text-xl sm:text-2xl font-bold hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center justify-center group">
              <Phone className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300" />
              Contact Sales Team
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-2xl shadow-lg">
                  <Factory className="h-10 w-10 text-white" />
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl font-black tracking-tight">CSMS</span>
                  <p className="text-gray-400 font-semibold text-base sm:text-lg">Supply Management System</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 max-w-md text-base sm:text-lg">
                Saudi Arabia's premier digital platform revolutionizing construction material procurement through innovative technology and exceptional service.
              </p>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="font-medium">Proudly serving Jeddah & Makkah</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-8 text-white">Quick Access</h3>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300 text-base sm:text-lg font-medium hover:translate-x-1 transform inline-block">Place Order</a></li>
                <li><Link to="/track-order" className="hover:text-white transition-colors duration-300 text-base sm:text-lg font-medium hover:translate-x-1 transform inline-block">Track Order</Link></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 text-base sm:text-lg font-medium hover:translate-x-1 transform inline-block">Order History</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 text-base sm:text-lg font-medium hover:translate-x-1 transform inline-block">Invoice Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 text-base sm:text-lg font-medium hover:translate-x-1 transform inline-block">About CSMS</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8 text-white">Our Products</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center group">
                  <Package className="h-5 w-5 mr-3 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <a href="#" className="hover:text-white transition-colors duration-300 text-lg font-medium">Premium Cement</a>
                </li>
                <li className="flex items-center group">
                  <Mountain className="h-5 w-5 mr-3 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <a href="#" className="hover:text-white transition-colors duration-300 text-lg font-medium">Quality Aggregate</a>
                </li>
                <li className="flex items-center group">
                  <Factory className="h-5 w-5 mr-3 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <a href="#" className="hover:text-white transition-colors duration-300 text-lg font-medium">Construction Sand</a>
                </li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 text-lg font-medium hover:translate-x-1 transform inline-block">Bulk Solutions</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 text-lg font-medium hover:translate-x-1 transform inline-block">Custom Orders</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8 text-white">Contact Us</h3>
              <div className="space-y-6 text-gray-400">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 text-blue-400 mt-1" />
                  <div>
                    <p className="font-bold text-white text-lg">+966 12 123 4567</p>
                    <p className="font-medium">24/7 Customer Support</p>
                  </div>
                </div>
                <div className="flex items-start">
                <Mail className="h-6 w-6 mr-4 text-blue-400 mt-1" />
                  <div>
                    <p className="font-bold text-white text-lg">orders@csms.sa</p>
                    <p className="font-medium">Order Support & Inquiries</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 text-blue-400 mt-1" />
                  <div>
                    <p className="font-bold text-white text-lg">King Abdullah Road</p>
                    <p className="font-medium">Jeddah, Saudi Arabia 21589</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 mr-4 text-blue-400 mt-1" />
                  <div>
                    <p className="font-bold text-white text-lg">Sunday - Thursday</p>
                    <p className="font-medium">7:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 sm:mt-16 pt-8 sm:pt-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-400 text-lg font-medium">
                &copy; 2024 CSMS - Cement Supply Management System. All rights reserved.
              </p>
              <div className="flex items-center space-x-8 mt-6 md:mt-0 text-gray-400">
                <a href="#" className="hover:text-white transition-colors duration-300 font-medium text-lg">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors duration-300 font-medium text-lg">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors duration-300 font-medium text-lg">Support Center</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductsPage;