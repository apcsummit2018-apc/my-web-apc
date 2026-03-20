import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ฟังก์ชันดึงข้อมูล Role จากตาราง profiles
  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      return data?.role || 'customer';
    } catch (err) {
      console.error('Error fetching role:', err);
      return 'customer'; // ถ้าผิดพลาดให้เป็น customer ไว้ก่อน
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        // --- จุดที่แก้ไข: ดักจับ Error โทเค็นหมดอายุ (ป้องกันหน้าจอหมุนค้าง) ---
        if (error) {
          console.error('Session error:', error.message);
          // ถ้าคุกกี้/โทเค็นพัง ให้บังคับออกจากระบบทันที เพื่อเคลียร์ค่าที่ค้างอยู่
          await supabase.auth.signOut();
          return;
        }
        
        if (session?.user) {
          setUser(session.user);
          const userRole = await fetchUserRole(session.user.id);
          setRole(userRole);
        }
      } catch (err) {
        console.error('Unexpected auth error:', err);
      } finally {
        // สำคัญที่สุด: สั่งให้ "หยุดหมุน" เสมอ ไม่ว่าจะดึงข้อมูลสำเร็จหรือล้มเหลว
        setLoading(false);
      }
    };

    initializeAuth();

    // ติดตามการเปลี่ยนแปลงสถานะการล็อกอิน (Login / Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const userRole = await fetchUserRole(session.user.id);
        setRole(userRole);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}