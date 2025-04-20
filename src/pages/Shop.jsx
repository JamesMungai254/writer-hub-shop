
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "../App";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Shop = () => {
  const { toast } = useToast();
  const { user, cart } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceSort, setPriceSort] = useState("default");
  
  // Mock products data
  const products = [
    {
      id: 101,
      name: "Premium Laptop",
      price: 899.99,
      category: "laptops",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      description: "High-performance laptop for all your computing needs with fast processor and ample storage.",
    },
    {
      id: 102,
      name: "Wireless Headphones",
      price: 129.99,
      category: "accessories",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      description: "Noise-cancelling wireless headphones with premium sound quality and long battery life.",
    },
    {
      id: 103,
      name: "Smart Tablet",
      price: 349.99,
      category: "tablets",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20",
      description: "Versatile tablet for productivity and entertainment with a crisp display and responsive touch.",
    },
    {
      id: 104,
      name: "Ergonomic Mouse",
      price: 49.99,
      category: "accessories",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
      description: "Comfortable and precise mouse designed for extended use with customizable buttons.",
    },
    {
      id: 105,
      name: "4K Monitor",
      price: 299.99,
      category: "monitors",
      image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282",
      description: "Ultra-high definition monitor with vibrant colors and adjustable stand for optimal viewing angles.",
    },
    {
      id: 106,
      name: "Mechanical Keyboard",
      price: 79.99,
      category: "accessories",
      image: "https://images.unsplash.com/photo-1561112078-7d24e04c3407",
      description: "Tactile mechanical keyboard with customizable RGB lighting and programmable keys.",
    },
    {
      id: 107,
      name: "Desktop Computer",
      price: 799.99,
      category: "desktops",
      image: "https://images.unsplash.com/photo-1593640408182-31c2bd3f3e86",
      description: "Powerful desktop computer for intensive tasks like gaming, video editing, and 3D rendering.",
    },
    {
      id: 108,
      name: "Wireless Earbuds",
      price: 89.99,
      category: "accessories",
      image: "https://images.unsplash.com/photo-1606741965429-02919c1a0e29",
      description: "Compact wireless earbuds with crystal clear sound and convenient charging case.",
    },
    {
      id: 109,
      name: "External Hard Drive",
      price: 119.99,
      category: "storage",
      image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58",
      description: "Large capacity external storage for backups and media with fast data transfer rates.",
    },
    {
      id: 110,
      name: "Wi-Fi Router",
      price: 69.99,
      category: "networking",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      description: "High-speed router with extended range for reliable home or office internet connectivity.",
    },
    {
      id: 111,
      name: "Smart Watch",
      price: 199.99,
      category: "wearables",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
      description: "Feature-rich smartwatch with health monitoring, notifications, and customizable watch faces.",
    },
    {
      id: 112,
      name: "Bluetooth Speaker",
      price: 59.99,
      category: "audio",
      image: "https://images.unsplash.com/photo-1589003511513-eefa2626182a",
      description: "Portable speaker with rich sound and water-resistant design for indoor and outdoor use.",
    }
  ];

  // Filter products
  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (categoryFilter === "all") return matchesSearch;
    return matchesSearch && product.category === categoryFilter;
  });

  // Sort products
  if (priceSort === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (priceSort === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Add to cart function
  const handleAddToCart = (product) => {
    cart.addToCart(product);
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">IT Products Shop</h1>
      <p className="text-gray-600 mb-8">Browse our selection of high-quality IT products and accessories</p>
      
      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="laptops">Laptops</SelectItem>
            <SelectItem value="desktops">Desktop Computers</SelectItem>
            <SelectItem value="tablets">Tablets</SelectItem>
            <SelectItem value="monitors">Monitors</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
            <SelectItem value="networking">Networking</SelectItem>
            <SelectItem value="storage">Storage</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="wearables">Wearables</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={priceSort} onValueChange={setPriceSort}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Featured</SelectItem>
            <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
            <SelectItem value="highToLow">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-2xl font-bold text-accent mb-2">${product.price.toFixed(2)}</p>
                <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                <div className="mt-3">
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <Button onClick={() => {
            setSearchTerm("");
            setCategoryFilter("all");
          }}>
            View All Products
          </Button>
        </div>
      )}
    </div>
  );
};

export default Shop;
