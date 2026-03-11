import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// เพิ่มนำเข้าไอคอน Eye (ดูรายละเอียด) และ X (ปิดหน้าต่าง)
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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'messages' | 'orders'>('orders');

  // State สำหรับ Modal รายละเอียดคำสั่งซื้อ
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [loadingOrderDetails, setLoadingOrderDetails] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/admin');
    } else {
      fetchProducts();
      fetchCategories();
      fetchMessages();
      fetchOrders();
    }
  }, [user, navigate]);

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
    } else {
      alert('เกิดข้อผิดพลาดในการอัปเดตสถานะ');
      console.error(error);
    }
  };

  // ฟังก์ชันสำหรับดึงรายการสินค้าในใบสั่งซื้อ เมื่อกดปุ่มดูรายละเอียด
  const handleViewOrder = async (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
    setLoadingOrderDetails(true);

    // ดึงข้อมูลรายการสินค้า (order_items) พร้อมเชื่อม (Join) กับตาราง products เพื่อเอาชื่อและรูปภาพ
    const { data, error } = await supabase
      .from('order_items')
      .select(`
        id,
        quantity,
        unit_price,
        product_id,
        products (
          name,
          image_url
        )
      `)
      .eq('order_id', order.id);

    if (data) {
      setOrderItems(data);
    } else {
      console.error('Error fetching order items:', error);
      setOrderItems([]);
    }
    
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
              <p className="text-blue-200">Manage your store, orders, and messages</p>
            </div>
            <button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors">
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
          
          <div className="flex space-x-4 mt-8 border-b border-blue-800 pb-[-1px]">
            <button onClick={() => setActiveTab('orders')} className={`pb-3 px-4 text-lg font-medium flex items-center space-x-2 border-b-4 transition-colors ${activeTab === 'orders' ? 'border-white text-white' : 'border-transparent text-blue-300 hover:text-white'}`}>
              <ShoppingCart className="h-5 w-5" />
              <span>Orders</span>
              {orders.filter(o => o.status === 'pending').length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                  {orders.filter(o => o.status === 'pending').length}
                </span>
              )}
            </button>
            <button onClick={() => setActiveTab('products')} className={`pb-3 px-4 text-lg font-medium flex items-center space-x-2 border-b-4 transition-colors ${activeTab === 'products' ? 'border-white text-white' : 'border-transparent text-blue-300 hover:text-white'}`}>
              <Package className="h-5 w-5" />
              <span>Products</span>
            </button>
            <button onClick={() => setActiveTab('messages')} className={`pb-3 px-4 text-lg font-medium flex items-center space-x-2 border-b-4 transition-colors ${activeTab === 'messages' ? 'border-white text-white' : 'border-transparent text-blue-300 hover:text-white'}`}>
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
              {messages.length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                  {messages.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ------------ TAB: ใบสั่งซื้อ (Orders) ------------ */}
        {activeTab === 'orders' && (
          <div>
            <div className="mb-8 flex items-center space-x-3">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Order ID / Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer Details</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                          ยังไม่มีคำสั่งซื้อเข้ามา
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="font-mono text-xs text-gray-500 mb-1">{order.id.split('-')[0]}...</div>
                            <div className="text-gray-900 font-medium">
                              {new Date(order.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="font-bold text-gray-900">{order.customer_name}</div>
                            <div className="text-gray-500">{order.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                            ฿{order.total_amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500 mb-2 block w-full"
                            >
                              <option value="pending">รอดำเนินการ</option>
                              <option value="paid">ชำระเงินแล้ว</option>
                              <option value="shipped">จัดส่งแล้ว</option>
                              <option value="completed">เสร็จสิ้น</option>
                              <option value="cancelled">ยกเลิก</option>
                            </select>
                            {getStatusBadge(order.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                            {/* ปุ่มสำหรับดูรายละเอียด */}
                            <button 
                              onClick={() => handleViewOrder(order)}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded inline-flex items-center justify-center transition-colors"
                              title="View Details"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------ TAB: สินค้า และ ข้อความ (ซ่อนไว้ให้สั้นลง แต่ทำงานเหมือนเดิม) ------------ */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-8 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Package className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
              </div>
              <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors">
                <Plus className="h-5 w-5" />
                <span>Add Product</span>
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Image</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Featured</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4"><img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded" /></td>
                        <td className="px-6 py-4"><div className="font-medium text-gray-900">{product.name}</div></td>
                        <td className="px-6 py-4 text-gray-700">{getCategoryName(product.category_id)}</td>
                        <td className="px-6 py-4 font-semibold text-green-600">฿{product.price.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-sm ${product.stock_quantity === 0 ? 'bg-red-100 text-red-800' : product.stock_quantity < 5 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>{product.stock_quantity}</span>
                        </td>
                        <td className="px-6 py-4">{product.is_featured ? <span className="text-green-600 font-semibold">Yes</span> : <span className="text-gray-400">No</span>}</td>
                        <td className="px-6 py-4">{product.is_active ? <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Active</span> : <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">Inactive</span>}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button onClick={() => handleEdit(product)} className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded" title="Edit"><Edit className="h-5 w-5" /></button>
                            <button onClick={() => handleDelete(product.id)} className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded" title="Delete"><Trash2 className="h-5 w-5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <div className="mb-8 flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Customer Messages</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subject</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {messages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(msg.created_at).toLocaleDateString('th-TH')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{msg.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><div>{msg.email}</div><div className="text-xs text-gray-400 mt-1">{msg.phone}</div></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{msg.subject}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-md">{msg.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Modal แก้ไขสินค้า (ของเดิม) */}
      {isModalOpen && <ProductModal product={editingProduct} categories={categories} onClose={handleModalClose} />}

      {/* ------------------------------------------------------------- */}
      {/* ---------------- Modal แสดงรายละเอียดใบสั่งซื้อ ---------------- */}
      {/* ------------------------------------------------------------- */}
      {isOrderModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            
            {/* หัวข้อ Modal */}
            <div className="flex justify-between items-center p-6 border-b bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                  <ShoppingCart className="h-6 w-6" /> รายละเอียดคำสั่งซื้อ
                </h2>
                <p className="text-sm text-gray-500 mt-1">รหัสคำสั่งซื้อ: {selectedOrder.id}</p>
              </div>
              <button onClick={() => setIsOrderModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors bg-white p-2 rounded-full shadow-sm">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              
              {/* ข้อมูลลูกค้าและที่อยู่ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-900 mb-3 border-b border-blue-200 pb-2">ข้อมูลลูกค้าติดต่อ</h3>
                  <p className="text-sm mb-1"><span className="font-semibold text-gray-700">ชื่อ-นามสกุล:</span> {selectedOrder.customer_name}</p>
                  <p className="text-sm mb-1"><span className="font-semibold text-gray-700">เบอร์โทร:</span> {selectedOrder.phone}</p>
                  <p className="text-sm"><span className="font-semibold text-gray-700">อีเมล:</span> {selectedOrder.email}</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">สถานที่จัดส่ง</h3>
                  <p className="text-sm text-gray-800 whitespace-pre-line">{selectedOrder.shipping_address}</p>
                  {selectedOrder.notes && (
                    <div className="mt-3 pt-2 border-t border-gray-200">
                      <p className="text-sm text-red-600"><span className="font-semibold">หมายเหตุ:</span> {selectedOrder.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ตารางแสดงอุปกรณ์/สินค้าที่สั่ง */}
              <h3 className="font-bold text-lg text-gray-900 mb-4">รายการสินค้า/อุปกรณ์</h3>
              {loadingOrderDetails ? (
                <div className="text-center py-8 text-gray-500">กำลังโหลดข้อมูลอุปกรณ์...</div>
              ) : (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-gray-700">อุปกรณ์</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">ราคา/ชิ้น</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">จำนวน</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">รวม</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orderItems.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-4 py-6 text-center text-gray-500">ไม่พบรายการสินค้า</td>
                        </tr>
                      ) : (
                        orderItems.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-3 flex items-center space-x-3">
                              <img 
                                src={item.products?.image_url || 'https://via.placeholder.com/50'} 
                                alt={item.products?.name} 
                                className="w-12 h-12 rounded-md object-cover border border-gray-200 shadow-sm" 
                              />
                              <span className="font-medium text-gray-800">{item.products?.name || 'อุปกรณ์ที่ถูกลบไปแล้ว'}</span>
                            </td>
                            <td className="px-4 py-3 text-center text-gray-600">฿{item.unit_price.toLocaleString()}</td>
                            <td className="px-4 py-3 text-center font-medium text-blue-600">{item.quantity}</td>
                            <td className="px-4 py-3 text-right font-semibold text-gray-900">
                              ฿{(item.unit_price * item.quantity).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* สรุปยอดรวมด้านล่าง */}
              <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg flex justify-end items-center">
                <span className="text-gray-700 font-semibold mr-4">ยอดชำระเงินสุทธิ:</span>
                <span className="text-2xl font-bold text-green-700">฿{selectedOrder.total_amount.toLocaleString()}</span>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}