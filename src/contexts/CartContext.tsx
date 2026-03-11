import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../lib/supabase';

// ขยาย Type ของ Product ให้มีจำนวนสินค้าในตะกร้าด้วย
export interface CartItem extends Product {
  cartQuantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // โหลดข้อมูลตะกร้าจาก Local Storage (ถ้ามี)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // บันทึกลง Local Storage อัตโนมัติทุกครั้งที่ตะกร้ามีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        );
      }
      return [...prev, { ...product, cartQuantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item => (item.id === productId ? { ...item, cartQuantity: quantity } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((total, item) => total + item.cartQuantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.cartQuantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};