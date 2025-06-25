export const products = [
  {
    id: 1,
    name: "Royal Golden Cutlery Set",
    description: "Handcrafted 24-piece cutlery set fit for royal dining",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    category: "dining-essentials",
    rating: 4.8,
    reviews: 127,
    inStock: true,
    tags: ["luxury", "cutlery", "dining", "gold"],
    discount: 25,
    featured: true
  },
  {
    id: 2,
    name: "Crystal Wine Decanter",
    description: "Elegant lead crystal decanter for the finest wines",
    price: 189.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    category: "wine-accessories",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    tags: ["crystal", "wine", "decanter", "elegant"],
    discount: 24,
    featured: true
  },
  {
    id: 3,
    name: "Artisan Cheese Board Set",
    description: "Premium bamboo cheese board with serving tools",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop",
    category: "serving-accessories",
    rating: 4.6,
    reviews: 203,
    inStock: true,
    tags: ["bamboo", "cheese", "serving", "entertaining"],
    discount: 20,
    featured: false
  },
  {
    id: 4,
    name: "Gourmet Spice Collection",
    description: "Curated selection of 12 premium spices from around the world",
    price: 149.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
    category: "ingredients",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    tags: ["spices", "gourmet", "international", "cooking"],
    discount: 17,
    featured: true
  },
  {
    id: 5,
    name: "Royal Tea Service Set",
    description: "Fine porcelain tea set with gold trim details",
    price: 249.99,
    originalPrice: 329.99,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
    category: "tea-coffee",
    rating: 4.8,
    reviews: 94,
    inStock: false,
    tags: ["porcelain", "tea", "royal", "elegant"],
    discount: 24,
    featured: false
  },
  {
    id: 6,
    name: "Professional Chef Knife Set",
    description: "German steel knife set with wooden block",
    price: 199.99,
    originalPrice: 279.99,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=300&fit=crop",
    category: "kitchen-tools",
    rating: 4.9,
    reviews: 312,
    inStock: true,
    tags: ["knives", "german", "professional", "cooking"],
    discount: 29,
    featured: true
  },
  {
    id: 7,
    name: "Vintage Wine Glasses Set",
    description: "Set of 6 handblown crystal wine glasses",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?w=400&h=300&fit=crop",
    category: "wine-accessories",
    rating: 4.5,
    reviews: 78,
    inStock: true,
    tags: ["crystal", "wine", "glasses", "handblown"],
    discount: 19,
    featured: false
  },
  {
    id: 8,
    name: "Luxury Dining Plates Set",
    description: "Fine bone china dinner plates with gold rim",
    price: 179.99,
    originalPrice: 229.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    category: "dining-essentials",
    rating: 4.7,
    reviews: 145,
    inStock: true,
    tags: ["bone-china", "plates", "luxury", "gold"],
    discount: 22,
    featured: false
  }
];

export const categories = [
  { id: 'dining-essentials', name: 'Dining Essentials', icon: 'FiStar' },
  { id: 'wine-accessories', name: 'Wine & Spirits', icon: 'FiWine' },
  { id: 'serving-accessories', name: 'Serving Accessories', icon: 'FiGrid' },
  { id: 'ingredients', name: 'Gourmet Ingredients', icon: 'FiPackage' },
  { id: 'tea-coffee', name: 'Tea & Coffee', icon: 'FiCoffee' },
  { id: 'kitchen-tools', name: 'Kitchen Tools', icon: 'FiTool' }
];

// Recommendation engine
export const getRecommendations = (userId, viewedProducts = [], preferences = {}) => {
  // Simulate personalized recommendations based on user behavior
  const featuredProducts = products.filter(p => p.featured);
  const highRatedProducts = products.filter(p => p.rating >= 4.7);
  const discountedProducts = products.filter(p => p.discount > 20);
  
  return {
    featured: featuredProducts.slice(0, 4),
    trending: highRatedProducts.slice(0, 4),
    deals: discountedProducts.slice(0, 4),
    similar: products.filter(p => !viewedProducts.includes(p.id)).slice(0, 4)
  };
};