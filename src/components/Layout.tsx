import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {/* นำ <ChatWidget /> ออกเรียบร้อยแล้ว เพื่อเพิ่มความเร็วระบบ */}
    </div>
  );
}