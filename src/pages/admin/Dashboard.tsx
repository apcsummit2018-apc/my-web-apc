import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, Package, MessageSquare, ShoppingCart, Eye, X } from 'lucide-react'; 
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Product, Category, Order } from '../../lib/supabase'; 
import ProductModal from '../../components/ProductModal';

interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function AdminDashboard() {
  const { user, role, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // เปลี่ยนหน้าแรกให้ไปที่ Orders แทน
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'messages'>('orders');

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [loadingOrderDetails, setLoadingOrderDetails] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user || role !== 'admin') {
        navigate('/');
      } else {
        fetchProducts();
        fetchCategories();
        fetchMessages();
        fetchOrders();
      }
    }
  }, [user, role, authLoading, navigate]);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('name');
    if (data) setCategories(data);
  };

  const fetchMessages = async () => {
    const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    if (data) setMessages(data);
  };

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) setOrders(data);
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    if (!error) {
      alert('อัปเดตสถานะสำเร็จ!');
      fetchOrders();
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบคำสั่งซื้อนี้?')) return;
    const { error } = await supabase.from('orders').delete().eq('id', orderId);
    if (!error) {
      alert('ลบคำสั่งซื้อสำเร็จ!');
      fetchOrders(); 
    }
  };

  const handleViewOrder = async (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
    setLoadingOrderDetails(true);

    const { data } = await supabase
      .from('order_items')
      .select(`id, quantity, unit_price, product_id, products (name, image_url)`)
      .eq('order_id', order.id);

    if (data) setOrderItems(data);
    setLoadingOrderDetails(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'N/A';
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-semibold">รอดำเนินการ</span>;
      case 'paid': return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-semibold">ชำระเงินแล้ว</span>;
      case 'shipped': return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm font-semibold">จัดส่งแล้ว</span>;
      case 'completed': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">เสร็จสิ้น</span>;
      case 'cancelled': return <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-semibold">ยกเลิก</span>;
      default: return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm font-semibold">{status}</span>;
    }
  };

  if (authLoading) return <div className="p-8 text-center">กำลังตรวจสอบสิทธิ์...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
              <p className="text-blue-200">จัดการร้านค้า คำสั่งซื้อ และข้อความติดต่อ</p>
            </div>
            <button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors">
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
          
          <div className="flex space-x-4 mt-8 border-b border-blue-800 pb-[-1px] overflow-x-auto">
            <button onClick={() => setActiveTab('orders')} className={`pb-3 px-4 text-lg font-medium flex items-center space-x-2 border-b-4 transition-colors ${activeTab === 'orders' ? 'border-white text-white' : 'border-transparent text-blue-300 hover:text-white'}`}>
              <ShoppingCart className="h-5 w-5" />
              <span>Orders</span>
            </button>
            <button onClick={() => setActiveTab('products')} className={`pb-3 px-4 text-lg font-medium flex items-center space-x-2 border-b-4 transition-colors ${activeTab === 'products' ? 'border-white text-white' : 'border-transparent text-blue-300 hover:text-white'}`}>
              <Package className="h-5 w-5" />
              <span>Products</span>
            </button>
            <button onClick={() => setActiveTab('messages')} className={`pb-3 px-4 text-lg font-medium flex items-center space-x-2 border-b-4 transition-colors ${activeTab === 'messages' ? 'border-white text-white' : 'border-transparent text-blue-300 hover:text-white'}`}>
              <MessageSquare className="h-5 w-5" />
              <span>Form Messages</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* คอนเทนต์ของแต่ละแท็บ (เหมือนเดิม) */}
        {activeTab === 'orders' && (
          <div>
            <div className="mb-8 flex items-center space-x-3">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">การจัดการคำสั่งซื้อ</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
               <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ลูกค้า</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ยอดรวม</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">สถานะ</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id.split('-')[0]}</td>
                          <td className="px-6 py-4 text-sm">
                            <div className="font-bold">{order.customer_name}</div>
                            <div className="text-gray-500">{order.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">฿{order.total_amount.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select value={order.status} onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)} className="border rounded px-2 py-1 text-sm mr-2">
                                <option value="pending">รอดำเนินการ</option>
                                <option value="paid">ชำระเงินแล้ว</option>
                                <option value="shipped">จัดส่งแล้ว</option>
                                <option value="completed">เสร็จสิ้น</option>
                                <option value="cancelled">ยกเลิก</option>
                            </select>
                            {getStatusBadge(order.status)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button onClick={() => handleViewOrder(order)} className="text-blue-600 hover:bg-blue-50 p-2 rounded"><Eye className="h-5 w-5" /></button>
                            <button onClick={() => handleDeleteOrder(order.id)} className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash2 className="h-5 w-5" /></button>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
            <div>
                <div className="mb-8 flex justify-between items-center">
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Package className="text-blue-600"/>จัดการสินค้า</h2>
                    <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Plus className="h-5 w-5"/>เพิ่มสินค้า</button>
                </div>
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อสินค้า</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ราคา</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สต็อก</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.map(p => (
                                <tr key={p.id}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">{p.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-bold">฿{p.price.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{p.stock_quantity}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => handleEdit(p)} className="text-blue-600 mx-2"><Edit className="h-5 w-5"/></button>
                                        <button onClick={() => handleDelete(p.id)} className="text-red-600 mx-2"><Trash2 className="h-5 w-5"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
             <table className="w-full">
               <thead className="bg-gray-50 border-b">
                 <tr>
                    <th className="px-6 py-4 text-left">ลูกค้า</th>
                    <th className="px-6 py-4 text-left">หัวข้อ</th>
                    <th className="px-6 py-4 text-left">ข้อความ</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-200">
                 {messages.map(m => (
                   <tr key={m.id}>
                      <td className="px-6 py-4"><div>{m.name}</div><div className="text-xs text-gray-500">{m.email}</div></td>
                      <td className="px-6 py-4 font-medium">{m.subject}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{m.message}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        )}
      </main>

      {isModalOpen && <ProductModal product={editingProduct} categories={categories} onClose={handleModalClose} />}
      
      {isOrderModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6">
            <div className="flex justify-between mb-4 border-b pb-2">
              <h2 className="text-xl font-bold">รายละเอียดคำสั่งซื้อ</h2>
              <button onClick={() => setIsOrderModalOpen(false)}><X /></button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
               <div className="bg-gray-50 p-3 rounded">
                 <p><strong>ชื่อ:</strong> {selectedOrder.customer_name}</p>
                 <p><strong>เบอร์โทร:</strong> {selectedOrder.phone}</p>
                 <p><strong>อีเมล:</strong> {selectedOrder.email}</p>
               </div>
               <div className="bg-gray-50 p-3 rounded">
                 <p><strong>ที่อยู่:</strong> {selectedOrder.shipping_address}</p>
               </div>
            </div>
            {/* รายการสินค้า */}
            <div className="border rounded overflow-hidden mb-4">
               <table className="w-full text-sm">
                 <thead className="bg-gray-100">
                   <tr><th className="p-2">สินค้า</th><th className="p-2 text-right">จำนวน</th><th className="p-2 text-right">รวม</th></tr>
                 </thead>
                 <tbody>
                    {orderItems.map((item, idx) => (
                      <tr key={idx} className="border-t"><td className="p-2">{item.products?.name}</td><td className="p-2 text-right">{item.quantity}</td><td className="p-2 text-right">฿{(item.unit_price * item.quantity).toLocaleString()}</td></tr>
                    ))}
                 </tbody>
               </table>
            </div>
            <div className="text-right text-xl font-bold text-green-600">ยอดรวมสุทธิ: ฿{selectedOrder.total_amount.toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
}