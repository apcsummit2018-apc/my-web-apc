import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface ChatMessage {
  id: string;
  session_id: string;
  sender: 'customer' | 'admin';
  message: string;
  created_at: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      setSessionId(user.id);
    } else {
      let localSession = localStorage.getItem('chat_session_id');
      if (!localSession) {
        localSession = 'guest_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('chat_session_id', localSession);
      }
      setSessionId(localSession);
    }
  }, [user]);

  useEffect(() => {
    if (!sessionId) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });
        
      if (error) {
        console.error("Error fetching messages:", error);
      } else if (data) {
        setMessages(data);
      }
    };

    fetchMessages();

    const subscription = supabase
      .channel(`chat_${sessionId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages',
        filter: `session_id=eq.${sessionId}` 
      }, (payload) => {
        setMessages((current) => {
          const exists = current.find(m => m.id === payload.new.id);
          if (exists) return current;
          return [...current, payload.new as ChatMessage];
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [sessionId]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !sessionId) return;

    const msgText = newMessage.trim();
    setNewMessage(''); 

    const { data, error } = await supabase.from('chat_messages').insert([{
      session_id: sessionId,
      sender: 'customer',
      message: msgText
    }]).select();

    if (error) {
      console.error("Chat insert error:", error);
      alert(`ไม่สามารถส่งข้อความได้: ${error.message}`);
    } else if (data) {
      setMessages((current) => {
        const exists = current.find(m => m.id === data[0].id);
        if (exists) return current;
        return [...current, data[0] as ChatMessage];
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl mb-4 flex flex-col overflow-hidden border border-gray-200" style={{ height: '450px' }}>
          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold">Chat Support</h3>
              <p className="text-xs text-blue-100">ทีมงานพร้อมให้บริการครับ</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-blue-700 p-1 rounded-full transition">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 text-sm mt-10">
                สอบถามข้อมูล หรือแจ้งปัญหาการใช้งานได้เลยครับ
              </div>
            ) : (
              messages.map((msg) => (
                // --- ส่วนที่ปรับแก้: ใส่ flex-col และแบ่งชื่อผู้ส่ง ---
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'customer' ? 'items-end' : 'items-start'}`}>
                  
                  {/* ระบุชื่อผู้ส่ง */}
                  <span className="text-[10px] text-gray-500 mb-1 px-1 font-medium">
                    {msg.sender === 'customer' ? 'คุณ (You)' : 'ทีมงาน (Admin)'}
                  </span>
                  
                  {/* กล่องข้อความ */}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    msg.sender === 'customer' 
                      ? 'bg-blue-600 text-white rounded-br-sm' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-sm'
                  }`}>
                    {msg.message}
                  </div>

                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="พิมพ์ข้อความ..."
              className="flex-1 bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-full px-4 py-2 text-sm outline-none transition"
            />
            <button 
              type="submit" 
              disabled={!newMessage.trim()}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Send className="h-4 w-4 ml-0.5" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-gray-800' : 'bg-blue-600'} hover:scale-105 transform transition-all text-white p-4 rounded-full shadow-lg flex items-center justify-center`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
      </button>
    </div>
  );
}