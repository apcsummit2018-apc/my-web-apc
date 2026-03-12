import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, UserCircle, LogOut, Settings, Clock } from 'lucide-react'; 
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false); // State สำหรับเปิด/ปิดเมนู Admin
  const dropdownRef = useRef<HTMLDivElement>(null); // ใช้สำหรับตรวจจับการคลิกนอกเมนู
  const location = useLocation();
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About Us' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // ฟังก์ชันสำหรับปิด Dropdown เมื่อคลิกพื้นที่อื่นบนหน้าเว็บ
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAdminDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24"> 
          
          {/* โลโก้ */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://isxrydkjptevrusbfcvu.supabase.co/storage/v1/object/public/product/Picture/Logo%20APC.jpg" 
              alt="ASOKE PRASANMIT COMPUTER Logo" 
              className="h-20 w-auto object-contain" 
            />
          </Link>

          {/* เมนูสำหรับหน้าจอ Desktop */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navLinks.map((link) => (
               <Link 
                key={link.to} 
                to={link.to} 
                className={`font-medium transition-colors pb-1 ${
                  isActive(link.to) 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex items-center space-x-3 lg:space-x-4 border-l pl-4 lg:pl-6">
              {/* ตะกร้าสินค้า */}
              <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* ระบบบัญชีลูกค้า */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full hidden lg:block">
                    {user.email?.split('@')[0]}
                  </span>
                  <Link to="/my-orders" className="p-2 text-gray-600 hover:text-blue-600 transition-colors" title="ประวัติการสั่งซื้อ">
                    <Clock className="h-5 w-5" />
                  </Link>
                  <button onClick={() => signOut()} className="p-2 text-gray-500 hover:text-red-600 transition-colors" title="ออกจากระบบ">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  <UserCircle className="h-6 w-6" />
                  <span className="hidden lg:block">Login</span>
                </Link>
              )}

              {/* ----- ปุ่มเฟือง Admin แบบ Dropdown ----- */}
              <div className="relative border-l pl-4 ml-2" ref={dropdownRef}>
                <button
                  onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                  className={`flex items-center justify-center p-2 rounded-full transition-colors focus:outline-none ${
                    isAdminDropdownOpen ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                  title="Admin Settings"
                >
                  <Settings className="h-5 w-5" />
                </button>

                {/* เมนู Dropdown ที่จะเด้งลงมาเมื่อกดปุ่มเฟือง */}
                {isAdminDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 animate-fadeIn">
                    <Link
                      to="/admin"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
                      onClick={() => setIsAdminDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2 text-gray-400" />
                      Admin
                    </Link>
                  </div>
                )}
              </div>
              {/* ------------------------------------- */}

            </div>
          </nav>

          {/* ปุ่มเบอร์เกอร์เมนูสำหรับมือถือ */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* เมนูสำหรับหน้าจอมือถือ */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-2 px-4 font-medium ${
                  isActive(link.to) 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <Link 
              to="/cart" 
              onClick={() => setIsMenuOpen(false)} 
              className="flex items-center justify-between py-2 px-4 font-medium text-gray-700 hover:bg-gray-50 border-t mt-2 pt-2"
            >
              <span>Cart</span>
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
            
            {user ? (
              <>
                <Link to="/my-orders" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 font-medium text-blue-600 hover:bg-blue-50">
                  ประวัติการสั่งซื้อของฉัน
                </Link>
                <button 
                  onClick={() => { signOut(); setIsMenuOpen(false); }} 
                  className="w-full text-left py-2 px-4 font-medium text-red-600 hover:bg-red-50"
                >
                  Logout ({user.email?.split('@')[0]})
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)} 
                className="block py-2 px-4 font-medium text-blue-600 hover:bg-blue-50"
              >
                Login / Register
              </Link>
            )}

            {/* ปุ่ม Admin สำหรับมือถือ (แสดงเป็นข้อความปกติ) */}
            <Link 
              to="/admin" 
              onClick={() => setIsMenuOpen(false)} 
              className="flex items-center py-2 px-4 font-medium text-gray-500 hover:bg-gray-50 border-t mt-2 pt-2"
            >
              <Settings className="h-5 w-5 mr-2" />
              Admin Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}