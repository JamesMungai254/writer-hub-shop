
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../App";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, BookUser, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Layout = () => {
  const { user, logout, cart } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-primary py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold">WriterHub</Link>
          
          {/* Mobile menu toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? "✕" : "☰"}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
            <Link to="/writers" className="text-white hover:text-gray-200">Writers</Link>
            <Link to="/shop" className="text-white hover:text-gray-200">Shop</Link>
            
            <div className="flex items-center space-x-3">
              <Link to="/cart" className="text-white relative">
                <ShoppingCart size={24} />
                {cart.cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.cart.length}
                  </span>
                )}
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-white">{user.name}</span>
                  <Button onClick={handleLogout} variant="ghost" size="icon" className="text-white">
                    <LogOut size={20} />
                  </Button>
                </div>
              ) : (
                <div className="space-x-2">
                  <Button asChild variant="ghost" className="text-white">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild className="bg-accent hover:bg-accent/90">
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {mobileNavOpen && (
          <nav className="md:hidden bg-primary py-4 px-6 flex flex-col space-y-4 animate-fade-in">
            <Link 
              to="/" 
              className="text-white hover:text-gray-200"
              onClick={() => setMobileNavOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/writers" 
              className="text-white hover:text-gray-200"
              onClick={() => setMobileNavOpen(false)}
            >
              Writers
            </Link>
            <Link 
              to="/shop" 
              className="text-white hover:text-gray-200"
              onClick={() => setMobileNavOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/cart" 
              className="text-white hover:text-gray-200 flex items-center"
              onClick={() => setMobileNavOpen(false)}
            >
              <ShoppingCart size={20} className="mr-2" />
              Cart {cart.cart.length > 0 && `(${cart.cart.length})`}
            </Link>
            
            {user ? (
              <>
                <span className="text-white">Signed in as: {user.name}</span>
                <Button 
                  onClick={() => {
                    handleLogout();
                    setMobileNavOpen(false);
                  }} 
                  variant="destructive" 
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <Button 
                  asChild variant="outline" 
                  className="w-full"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  asChild className="w-full bg-accent hover:bg-accent/90"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">WriterHub</h3>
              <p className="text-gray-300">Connecting students with professional writers since 2023.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/writers" className="text-gray-300 hover:text-white">Writers</Link></li>
                <li><Link to="/shop" className="text-gray-300 hover:text-white">Shop</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-300">contact@writerhub.com</p>
              <p className="text-gray-300">+1 (555) 123-4567</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
            <p>&copy; 2023 WriterHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
