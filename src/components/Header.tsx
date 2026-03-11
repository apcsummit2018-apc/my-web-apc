import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Monitor, ShoppingCart, UserCircle, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/shop', label: 'Shop' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Monitor className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-900">ASOKE PRASANMIT</h1>
              <p className="text-sm text-green-600 font-semibold">COMPUTER</p>
            </div>
          </Link>

          {/* เมนูสำหรับหน้าจอ Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
               <Link key={link.to} to={link.to} className={`font-medium transition-colors ${isActive(link.to) ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                {link.label}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 border-l pl-4">
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
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {user.email?.split('@')[0]}
                  </span>
                  <button onClick={() => signOut()} className="p-2 text-gray-500 hover:text-red-600 transition-colors" title="ออกจากระบบ">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  <UserCircle className="h-6 w-6" />
                  <span>Login</span>
                </Link>
              )}

              {/* ปุ่ม Admin ที่หายไป (เอากลับมาแล้ว) */}
              <Link to="/admin" className="flex items-center space-x-1 text-gray-500 hover:text-blue-900 font-medium transition-colors border-l pl-4 ml-2">
                <Settings className="h-5 w-5" />
                <span>Admin</span>
              </Link>
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
                className={`block py-2 px-4 font-medium ${isActive(link.to) ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between py-2 px-4 font-medium text-gray-700 hover:bg-gray-50 border-t mt-2 pt-2">
              <span>Cart</span>
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">{totalItems}</span>}
              </div>
            </Link>
            
            {user ? (
              <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="w-full text-left py-2 px-4 font-medium text-red-600 hover:bg-red-50">
                Logout ({user.email?.split('@')[0]})
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 font-medium text-blue-600 hover:bg-blue-50">
                Login / Register
              </Link>
            )}

            {/* ปุ่ม Admin มือถือ */}
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 font-medium text-gray-500 hover:bg-gray-50 border-t">
              Admin Dashboard
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}