
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "../App";
import { Trash2, RefreshCw, ShoppingBag } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, cart } = useContext(AuthContext);
  const [quantities, setQuantities] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const initialQuantities = {};
    cart.cart.forEach(item => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cart.cart]);

  const updateQuantity = (id, value) => {
    const newQuantity = Math.max(1, value);
    setQuantities({
      ...quantities,
      [id]: newQuantity
    });
  };

  const removeItem = (id) => {
    cart.removeFromCart(id);
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart",
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setDiscount(10);
      toast({
        title: "Promo Code Applied",
        description: "10% discount has been applied to your order",
      });
    } else {
      setDiscount(0);
      toast({
        title: "Invalid Promo Code",
        description: "The promo code you entered is not valid",
        variant: "destructive",
      });
    }
  };

  const subtotal = cart.cart.reduce((total, item) => {
    return total + (item.price * (quantities[item.id] || 1));
  }, 0);
  
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const checkout = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to complete your purchase",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // In a real app, you would process the payment here
    toast({
      title: "Order Placed",
      description: "Thank you for your purchase!",
    });
    
    // Clear cart
    cart.cart.forEach(item => {
      cart.removeFromCart(item.id);
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      {cart.cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">Cart Items ({cart.cart.length})</h2>
              </div>
              
              <ul className="divide-y">
                {cart.cart.map((item) => (
                  <li key={item.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded"
                    />
                    
                    <div className="flex-grow">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">${item.price.toFixed(2)}</p>
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, (quantities[item.id] || 1) - 1)}
                          className="border rounded-l px-3 py-1"
                        >
                          -
                        </button>
                        <Input 
                          type="number" 
                          min="1" 
                          value={quantities[item.id] || 1}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="w-16 text-center border-y border-x-0 rounded-none"
                        />
                        <button 
                          onClick={() => updateQuantity(item.id, (quantities[item.id] || 1) + 1)}
                          className="border rounded-r px-3 py-1"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right sm:ml-4">
                      <p className="font-bold mb-2">${((item.price * (quantities[item.id] || 1)).toFixed(2))}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="p-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/shop")}
                  className="flex items-center"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="Promo code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button onClick={applyPromoCode} variant="outline">Apply</Button>
                </div>
                
                <div className="text-gray-600 text-sm">
                  <p className="mb-2">Try promo code: <strong>WELCOME10</strong></p>
                </div>
                
                <Button onClick={checkout} className="w-full bg-accent hover:bg-accent/90">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Checkout
                </Button>
                
                <p className="text-sm text-gray-500 text-center">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-4">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Button 
            onClick={() => navigate("/shop")} 
            className="bg-primary hover:bg-primary/90"
            size="lg"
          >
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
