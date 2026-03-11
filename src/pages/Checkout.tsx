import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../lib/supabase';

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    shipping_address: '',
    notes: ''
  });

  if (cartItems.length === 0) {
    navigate('/shop');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          ...formData,
          total_amount: totalPrice,
          status: 'pending'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.cartQuantity,
        unit_price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      alert('Order Placed Successfully! We will contact you soon.');
      navigate('/');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Checkout Detail</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name / Company Name *</label>
          <input required type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shipping / Billing Address *</label>
          <textarea required name="shipping_address" value={formData.shipping_address} onChange={handleChange} rows={3} className="w-full px-4 py-2 border rounded-md"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} className="w-full px-4 py-2 border rounded-md"></textarea>
        </div>

        <div className="pt-4 border-t mt-6">
          <div className="flex justify-between font-bold text-xl text-blue-900 mb-6">
            <span>Total Payment:</span>
            <span>฿{totalPrice.toLocaleString()}</span>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors">
            {loading ? 'Processing...' : 'Confirm Order'}
          </button>
        </div>
      </form>
    </div>
  );
}