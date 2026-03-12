import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Shop from './pages/Shop';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import { CartProvider } from './contexts/CartContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// นำเข้าหน้า Login และ MyOrders
import Login from './pages/Login';
import MyOrders from './pages/MyOrders';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* ส่วนของ Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* ส่วนของหน้าเว็บทั่วไป */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/shop" element={<Layout><Shop /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          
          {/* ส่วนของระบบตะกร้าสินค้า สมาชิก และสั่งซื้อ */}
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/my-orders" element={<Layout><MyOrders /></Layout>} /> {/* <-- เส้นทางนี้ที่หายไปครับ */}
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </CartProvider>
  );
}

export default App;