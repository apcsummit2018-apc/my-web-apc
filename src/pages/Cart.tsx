import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center min-h-[50vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <Link to="/shop" className="text-blue-600 hover:text-blue-800 font-medium underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
              <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{item.name}</h3>
                <p className="text-green-600 font-bold">฿{item.price.toLocaleString()}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button onClick={() => updateQuantity(item.id, item.cartQuantity - 1)} className="p-1 rounded-md bg-gray-100 hover:bg-gray-200">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-medium">{item.cartQuantity}</span>
                <button onClick={() => updateQuantity(item.id, item.cartQuantity + 1)} className="p-1 rounded-md bg-gray-100 hover:bg-gray-200">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors ml-4">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border h-fit sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="flex justify-between mb-4 text-gray-600">
            <span>Subtotal:</span>
            <span>฿{totalPrice.toLocaleString()}</span>
          </div>
          <div className="border-t pt-4 mb-6 flex justify-between font-bold text-xl text-blue-900">
            <span>Total:</span>
            <span>฿{totalPrice.toLocaleString()}</span>
          </div>
          
          <Link
            to="/checkout"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}