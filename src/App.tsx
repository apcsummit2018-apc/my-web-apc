import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Shop from './pages/Shop';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import Login from './pages/Login';

// นำเข้า CartContext และหน้าใหม่ที่เราเพิ่งสร้าง
import { CartProvider } from './contexts/CartContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/shop" element={<Layout><Shop /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          
          {/* เปิดใช้งาน Route ตะกร้าสินค้า และ หน้าชำระเงิน */}
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;