import { useEffect, useState } from 'react';
import { ShoppingCart, Search, Filter, X, CheckCircle } from 'lucide-react';
import { supabase, Product, Category } from '../lib/supabase';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    // โหลดข้อมูลทั้งหมดให้เสร็จทีเดียว แล้วค่อยปิดการหมุน (Loading)
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchProducts(), fetchCategories()]);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลหน้า Shop:", error);
      } finally {
        setLoading(false); // บังคับหยุดหมุนเสมอ 100% ไม่ว่าจะเกิดอะไรขึ้น
      }
    };
    
    loadData();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching products:", error.message);
      throw error;
    }
    if (data) setProducts(data);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (error) {
      console.error("Error fetching categories:", error.message);
      throw error;
    }
    if (data) setCategories(data);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? product.category_id === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`เพิ่ม ${product.name} ลงตะกร้าแล้ว! 🛒`);
    setSelectedProduct(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-green-500 py-16 text-white text-center shadow-inner">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">ร้านคอมพิวเตอร์</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto px-4 text-green-50">
          ฮาร์ดแวร์และอุปกรณ์เสริมที่มีคุณภาพสำหรับทุกความต้องการด้านคอมพิวเตอร์ของคุณ
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">สินค้าทั้งหมด</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none w-full sm:w-64"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none appearance-none bg-white"
              >
                <option value="">ทุกหมวดหมู่</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">กำลังโหลดสินค้า...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border">
            <p className="text-gray-500 text-lg">ไม่พบสินค้าที่คุณค้นหา หรือยังไม่มีสินค้าในระบบ</p>
            <button onClick={() => {setSearchTerm(''); setSelectedCategory('');}} className="mt-4 text-green-600 hover:underline">
              ดูสินค้าทั้งหมด
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                <div className="relative overflow-hidden aspect-square bg-white">
                  <img
                    src={product.image_url || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.stock_quantity === 0 && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px]">
                      <span className="text-white font-bold px-4 py-2 bg-red-500 rounded-md shadow-sm">สินค้าหมด</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1 border-t border-gray-50">
                  <div className="text-xs text-green-600 font-semibold mb-1 uppercase tracking-wider">
                    {categories.find(c => c.id === product.category_id)?.name || 'General'}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-green-600">฿{product.price.toLocaleString()}</span>
                    
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal รายละเอียดสินค้า */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative">
            
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-gray-100 rounded-full text-gray-500 hover:text-red-500 transition-colors shadow-sm"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="md:w-1/2 bg-white flex items-center justify-center p-8 border-r border-gray-100">
              <img 
                src={selectedProduct.image_url || 'https://via.placeholder.com/500'} 
                alt={selectedProduct.name} 
                className="max-w-full max-h-[40vh] md:max-h-[60vh] object-contain"
              />
            </div>

            <div className="md:w-1/2 p-8 md:p-10 overflow-y-auto flex flex-col bg-gray-50">
              <div className="mb-2">
                <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  {categories.find(c => c.id === selectedProduct.category_id)?.name || 'General'}
                </span>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h2>
              
              <div className="text-3xl font-extrabold text-green-600 mb-6">
                ฿{selectedProduct.price.toLocaleString()}
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-2">รายละเอียดสินค้า</h3>
                <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">
                  {selectedProduct.description || 'ไม่มีรายละเอียดสำหรับสินค้านี้'}
                </p>
              </div>

              <div className="mt-auto space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm">
                  {selectedProduct.stock_quantity > 0 ? (
                    <div className="flex items-center text-green-600 font-medium">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      มีสินค้าพร้อมส่ง ({selectedProduct.stock_quantity} ชิ้น)
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600 font-medium">
                      <X className="h-5 w-5 mr-2" />
                      สินค้าหมดชั่วคราว
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(selectedProduct)}
                  disabled={selectedProduct.stock_quantity === 0}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg ${
                    selectedProduct.stock_quantity > 0 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:-translate-y-1' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>{selectedProduct.stock_quantity > 0 ? 'เพิ่มลงตะกร้าเลย' : 'สินค้าหมด'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}