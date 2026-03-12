import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
// 1. นำเข้า ChatWidget
import ChatWidget from './ChatWidget';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      
      {/* 2. วางกล่องแชทไว้ตรงนี้ เพื่อให้มันลอยอยู่ทุกหน้า */}
      <ChatWidget />
    </div>
  );
}