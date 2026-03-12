import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Eye, X, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function MyOrders() {
  const { user, loading: authLoading } = useAuth(); 
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]); // ปรับเป็น any ชั่วคราวเพื่อป้องกัน Type Error
  const [loading, setLoading] = useState(true);
  
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);

  // ตรวจสอบสิทธิ์การล็อกอิน
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    } else if (user) {
      fetchMyOrders();
    }
  }, [user, authLoading, navigate]);

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      if (data) setOrders(data || []);
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = async (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
    setLoadingItems(true);

    try {
      const { data, error } = await supabase
        .from('order_items')
        .select('quantity, unit_price, products(name, image_url)')
        .eq('order_id', order?.id);

      if (error) throw error;
      if (data) setOrderItems(data || []);
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการดึงรายการสินค้า:", err);
    } finally {
      setLoadingItems(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    const s = status?.toLowerCase() || 'unknown';
    switch(s) {
      case 'pending': return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">รอดำเนินการ</span>;
      case 'paid': return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">ชำระเงินแล้ว</span>;
      case 'shipped': return <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">จัดส่งแล้ว</span>;
      case 'completed': return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">เสร็จสิ้น</span>;
      case 'cancelled': return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">ยกเลิก</span>;
      default: return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">{s}</span>;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-xl text-gray-500 font-semibold animate-pulse">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  if (!user) return null; // ป้องกันการเรนเดอร์ก่อนเด้งไปหน้า login

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 min-h-[70vh]">
      <div className="flex items-center space-x-3 mb-8">
        <ShoppingBag className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-blue-900">ประวัติการสั่งซื้อของฉัน</h1>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">กำลังดึงข้อมูลใบสั่งซื้อ...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">คุณยังไม่มีประวัติการสั่งซื้อ</h2>
          <p className="text-gray-500">ไปเลือกดูสินค้าที่หน้า Shop ได้เลยครับ!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">รหัสคำสั่งซื้อ / วันที่</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">ยอดรวม</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-center">สถานะ</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-center">ดูรายละเอียด</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <tr key={order?.id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm text-gray-500 mb-1">
                        #{order?.id ? String(order.id).split('-')[0] : 'Unknown'}
                      </div>
                      <div className="text-gray-900 font-medium">
                        {order?.created_at ? new Date(order.created_at).toLocaleDateString('th-TH') : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-green-600">
                      ฿{Number(order?.total_amount || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(order?.status)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleViewOrder(order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      >
                        <Eye className="h-5 w-5 mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal ดูรายละเอียดสินค้า */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b bg-gray-50">
              <h2 className="text-xl font-bold text-blue-900">รายละเอียดใบสั่งซื้อ</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500"><X className="h-6 w-6" /></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                <p className="text-sm font-semibold mb-1">ที่อยู่จัดส่ง:</p>
                <p className="text-sm text-gray-700 whitespace-pre-line">{selectedOrder?.shipping_address || '-'}</p>
              </div>

              <h3 className="font-bold text-gray-900 mb-4">รายการสินค้า</h3>
              {loadingItems ? (
                <div className="text-center py-4 text-gray-500">กำลังโหลดข้อมูล...</div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 font-semibold text-gray-700">สินค้า</th>
                        <th className="px-4 py-2 text-center font-semibold text-gray-700">ราคา</th>
                        <th className="px-4 py-2 text-center font-semibold text-gray-700">จำนวน</th>
                        <th className="px-4 py-2 text-right font-semibold text-gray-700">รวม</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {orderItems.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 flex items-center space-x-3">
                            <img src={item?.products?.image_url || 'https://via.placeholder.com/40'} alt="product" className="w-10 h-10 rounded object-cover border" />
                            <span className="font-medium">{item?.products?.name || 'อุปกรณ์ไม่ทราบชื่อ'}</span>
                          </td>
                          <td className="px-4 py-3 text-center">฿{Number(item?.unit_price || 0).toLocaleString()}</td>
                          <td className="px-4 py-3 text-center">{item?.quantity || 0}</td>
                          <td className="px-4 py-3 text-right font-semibold text-blue-700">
                            ฿{(Number(item?.unit_price || 0) * Number(item?.quantity || 0)).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}