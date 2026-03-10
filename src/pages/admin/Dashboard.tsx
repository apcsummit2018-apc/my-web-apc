import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, Package, MessageSquare } from 'lucide-react'; // เพิ่ม MessageSquare icon
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Product, Category } from '../../lib/supabase';
import ProductModal from '../../components/ProductModal';

// 1. เพิ่ม Interface สำหรับข้อความ
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
  
  // State เดิมสำหรับสินค้า
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // 2. State ใหม่สำหรับข้อความ และระบบ Tab
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'messages'>('products'); // ค่าเริ่มต้นให้แสดงหน้าสินค้า

  useEffect(() => {
    if (!user) {
      navigate('/admin');
    } else {
      fetchProducts();
      fetchCategories();
      fetchMessages(); // สั่งให้ดึงข้อความมาเตรียมไว้ด้วย
    }
  }, [user, navigate]);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (data) setCategories(data);
  };

  // 3. ฟังก์ชันดึงข้อมูลข้อความจากลูกค้า
  const fetchMessages = async () => {
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setMessages(data);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
              <p className="text-blue-200">Manage your products and view customer messages</p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
          
          {/* 4. สร้างปุ่มเมนู Tabs */}
          <div className="flex space-x-4 mt-8 border-b border-blue-800 pb-[-1px]">
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-3 px-4 text-lg font-medium flex items-center space-x-2 border-b-4 transition-colors ${
                activeTab === 'products' ? 'border-white text-white' : 'border-transparent text-blue-300 hover:text-white'
              }`}
            >
              <Package className="h-5 w-5" />
              <span>Products</span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`pb-3 px-4 text-lg font-medium flex items-center space-x-2 border-b-4 transition-colors ${
                activeTab === 'messages' ? 'border-white text-white' : 'border-transparent text-blue-300 hover:text-white'
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
              {/* โชว์จำนวนข้อความ */}
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
        
        {/* 5. แสดงผลตาม Tab ที่เลือก */}
        
        {/* ------------ TAB: สินค้า (Products) ------------ */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-8 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Package className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
              </div>
              <button
                onClick={handleAdd}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
              >
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
                        <td className="px-6 py-4">
                          <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{getCategoryName(product.category_id)}</td>
                        <td className="px-6 py-4 font-semibold text-green-600">฿{product.price.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-sm ${product.stock_quantity === 0 ? 'bg-red-100 text-red-800' : product.stock_quantity < 5 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                            {product.stock_quantity}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {product.is_featured ? <span className="text-green-600 font-semibold">Yes</span> : <span className="text-gray-400">No</span>}
                        </td>
                        <td className="px-6 py-4">
                          {product.is_active ? <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Active</span> : <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">Inactive</span>}
                        </td>
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
              {products.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No products yet. Add your first product!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------ TAB: ข้อความจากลูกค้า (Messages) ------------ */}
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
                    {messages.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                          No messages yet.
                        </td>
                      </tr>
                    ) : (
                      messages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(msg.created_at).toLocaleDateString('th-TH')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {msg.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>{msg.email}</div>
                            <div className="text-xs text-gray-400 mt-1">{msg.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {msg.subject}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-md">
                            {msg.message}
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

      </main>

      {/* Modal จัดการสินค้า */}
      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          categories={categories}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}