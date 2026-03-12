import { Award, Users, Target, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      
      {/* Header Section */}
      <section className="bg-blue-900 text-white py-16 text-center shadow-inner">
        <h1 className="text-4xl font-bold mb-4">เกี่ยวกับเรา</h1>
        <p className="text-xl text-blue-200">ผู้นำด้านบริการไอทีและโซลูชันคอมพิวเตอร์ที่เชื่อถือได้</p>
      </section>

      {/* ---------------- เรื่องราวของเรา (Our Story) ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-6">เรื่องราวของเรา</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                จากจุดเริ่มต้นเล็กๆ ในฐานะร้านซ่อมคอมพิวเตอร์ เราได้เติบโตขึ้นเป็นผู้ให้บริการโซลูชันไอทีแบบครบวงจร ที่ได้รับความไว้วางใจจากธุรกิจและลูกค้าทั่วไปหลายร้อยรายทั่วภูมิภาค
              </p>
              <p>
                ทีมช่างเทคนิคที่ผ่านการรับรองของเรา ผสมผสานความเชี่ยวชาญทางเทคนิคเข้ากับความมุ่งมั่นในการสร้างความพึงพอใจให้กับลูกค้า เพื่อให้มั่นใจว่าลูกค้าทุกคนจะได้รับการดูแลอย่างใกล้ชิดและได้รับโซลูชันที่แก้ปัญหาได้อย่างตรงจุด
              </p>
              <p>
                เราภูมิใจที่ได้ก้าวทันเทรนด์เทคโนโลยีใหม่ๆ อยู่เสมอ ในขณะเดียวกันก็ยังคงรักษาการบริการที่ใส่ใจและเป็นกันเอง ซึ่งทำให้เราเป็นที่ไว้วางใจของคนในชุมชนตลอดมา
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
              alt="Our Story"
              className="rounded-lg shadow-lg w-full object-cover h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* ---------------- ค่านิยมของเรา (Our Values) ---------------- */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900">ค่านิยมของเรา</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="text-center px-4">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-blue-900 mb-3">ความเป็นเลิศ</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                เรามุ่งมั่นสู่ความเป็นเลิศในทุกบริการ เพื่อส่งมอบมาตรฐานคุณภาพสูงสุดให้กับลูกค้าของเรา
              </p>
            </div>

            <div className="text-center px-4">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl text-blue-900 mb-3">ความซื่อสัตย์</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                ให้คำปรึกษาอย่างจริงใจและราคาที่โปร่งใส เราสร้างความสัมพันธ์บนพื้นฐานของความไว้วางใจ
              </p>
            </div>

            <div className="text-center px-4">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-blue-900 mb-3">นวัตกรรม</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                ก้าวล้ำนำเทรนด์เทคโนโลยี เพื่อส่งมอบโซลูชันที่ทันสมัยและตอบโจทย์ที่สุดให้กับคุณ
              </p>
            </div>

            <div className="text-center px-4">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl text-blue-900 mb-3">ความใส่ใจ</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                ลูกค้าทุกคนคือคนสำคัญ เราดูแลเทคโนโลยีและอุปกรณ์ของคุณเหมือนเป็นของเราเอง
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- สถิติของเรา (By the Numbers) ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900">ความสำเร็จของเรา</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-3">15+</div>
              <div className="text-gray-600 font-medium">ปีที่เปิดให้บริการ</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-500 mb-3">5000+</div>
              <div className="text-gray-600 font-medium">ลูกค้าที่ไว้วางใจ</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-3">10+</div>
              <div className="text-gray-600 font-medium">ช่างผู้เชี่ยวชาญ</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-500 mb-3">98%</div>
              <div className="text-gray-600 font-medium">อัตราความพึงพอใจ</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}