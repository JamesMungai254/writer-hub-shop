
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, BookUser, ShoppingCart } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  // Mock featured writers
  const featuredWriters = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Academic Research & Essays",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      id: 2,
      name: "Michael Chen",
      specialty: "Technical Writing & Documentation",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
    {
      id: 3,
      name: "Olivia Martinez",
      specialty: "Creative Writing & Literature",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    },
  ];

  // Mock featured products
  const featuredProducts = [
    {
      id: 101,
      name: "Premium Laptop",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    },
    {
      id: 102,
      name: "Wireless Headphones",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 103,
      name: "Smart Tablet",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Connect With Expert Writers</h1>
          <p className="text-xl md:text-2xl mb-8">Get the professional help you need for your academic and technical writing projects</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => navigate("/writers")} 
              className="bg-white text-primary hover:bg-gray-100"
              size="lg"
            >
              <BookUser className="mr-2" />
              Find Writers
            </Button>
            <Button 
              onClick={() => navigate("/shop")} 
              className="bg-accent hover:bg-accent/90" 
              size="lg"
            >
              <ShoppingCart className="mr-2" />
              Browse Shop
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4 max-w-6xl">
    <h2 className="text-4xl font-bold text-center mb-16">Why Choose WriterHub?</h2>

    <div className="space-y-12">
      {/* Expert Writers */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-8 rounded-xl shadow-lg">
        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
          <Star className="text-primary h-8 w-8" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">Expert Writers</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            WriterHub connects you with a diverse network of professional writers. Whether you need assistance in science, business, humanities, or creative writing, our vetted experts bring proven expertise to every project.
          </p>
        </div>
      </div>

      {/* Quality Assurance */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-8 rounded-xl shadow-lg">
        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
          <svg className="text-primary h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">Quality Assurance</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Each writer on our platform is carefully vetted and consistently reviewed by students. Your satisfaction is our priority, and we maintain high standards through honest feedback and transparent ratings.
          </p>
        </div>
      </div>

      {/* Fast Turnaround */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-8 rounded-xl shadow-lg">
        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
          <svg className="text-primary h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">Fast Turnaround</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Deadlines are important. WriterHub’s responsive platform ensures that you get the help you need right on time — without compromising on quality. We're here when you need us most.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Featured Writers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Writers</h2>
            <Button variant="outline" onClick={() => navigate("/writers")}>View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWriters.map((writer) => (
              <div key={writer.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <img 
                  src={writer.image} 
                  alt={writer.name} 
                  className="w-12 h-12 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{writer.name}</h3>
                  <p className="text-gray-600 mb-4">{writer.specialty}</p>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(writer.rating)
                            ? "text-yellow-500 fill-yellow-500"
                            : i < writer.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">{writer.rating}/5</span>
                  </div>
                  <Button 
                    onClick={() => navigate(`/writers/${writer.id}`)}
                    className="w-full"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured IT Products</h2>
            <Button variant="outline" onClick={() => navigate("/shop")}>Visit Shop</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-14 h-12 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-accent mb-4">${product.price}</p>
                  <Button 
                    onClick={() => navigate("/shop")}
                    className="w-full"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join our community today and connect with professional writers or browse our IT products shop.</p>
          <Button 
            onClick={() => navigate("/register")}
            className="bg-white text-secondary hover:bg-gray-100"
            size="lg"
          >
            Register Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
