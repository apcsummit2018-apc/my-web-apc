import { useEffect, useState } from 'react';
import { 
  Wrench, Cpu, Network, HardDrive, Lightbulb, Shield, ArrowRight, 
  CheckCircle2, Server, Globe, Monitor, PhoneCall 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, Service } from '../lib/supabase';

const iconMap: Record<string, React.ReactNode> = {
  wrench: <Wrench className="h-8 w-8" />,
  cpu: <Cpu className="h-8 w-8" />,
  network: <Network className="h-8 w-8" />,
  'hard-drive': <HardDrive className="h-8 w-8" />,
  lightbulb: <Lightbulb className="h-8 w-8" />,
  shield: <Shield className="h-8 w-8" />,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    if (data) setServices(data);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6">IT Solutions & Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            บริการให้คำปรึกษา ดูแลระบบเครือข่าย (Network) เซิร์ฟเวอร์ และบำรุงรักษาคอมพิวเตอร์แบบครบวงจร 
            โดยทีมงานมืออาชีพที่มีประสบการณ์สูง เพื่อให้ธุรกิจของคุณขับเคลื่อนได้อย่างไม่มีสะดุด
          </p>
        </div>
      </section>

      {/* ความเชี่ยวชาญหลัก (Core Expertise) - รายละเอียดเชิงลึก */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">ความเชี่ยวชาญของเรา (Core Expertise)</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* กล่อง 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Network className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Network Infrastructure</h3>
              <p className="text-gray-600 mb-6">ออกแบบ ติดตั้ง และดูแลระบบเครือข่ายภายในองค์กร (LAN/WAN, Wi-Fi, VPN) ให้มีความเสถียรและปลอดภัย</p>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-700"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" /> เดินสาย LAN / Fiber Optic</li>
                <li className="flex items-start text-sm text-gray-700"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" /> ติดตั้ง Router, Switch, Firewall</li>
                <li className="flex items-start text-sm text-gray-700"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" /> แก้ปัญหาระบบอินเทอร์เน็ตล่ม / ช้า</li>
              </ul>
            </div>

            {/* กล่อง 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Monitor className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Computer & IT Support</h3>
              <p className="text-gray-600 mb-6">บริการซ่อมบำรุง อัปเกรด และแก้ไขปัญหาคอมพิวเตอร์ (Hardware & Software) ทั้งในและนอกสถานที่</p>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-700"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" /> ซ่อมแซมและเปลี่ยนอะไหล่คอมพิวเตอร์</li>
                <li className="flex items-start text-sm text-gray-700"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" /> กำจัดไวรัส / กู้ข้อมูล (Data Recovery)</li>
                <li className="flex items-start text-sm text-gray-700"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" /> บริการบำรุงรักษารายเดือน (MA)</li>
              </ul>
            </div>

            {/* กล่อง 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Server className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Server & Security</h3>
              <p className="text-gray-600 mb-6">จัดหา ติดตั้ง และตั้งค่าระบบเซิร์ฟเวอร์สำหรับองค์กร พร้อมระบบสำรองข้อมูลเพื่อป้องกันความเสียหาย</p>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-700"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" /> Windows Server & Linux Setup</li>
                <li className="flex items-start text-sm text-gray-700"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" /> ระบบสำรองข้อมูล (Backup Solutions)</li>
                <li className="flex items-start text-sm text-gray-700"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" /> ติดตั้งกล้องวงจรปิด (CCTV) เชื่อมเน็ตเวิร์ก</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* แพ็กเกจบริการจากฐานข้อมูล (Dynamic Services) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-4">แพ็กเกจบริการยอดนิยม</h2>
              <p className="text-lg text-gray-600">บริการที่สามารถปรับแต่งให้เหมาะสมกับงบประมาณและขนาดธุรกิจของคุณ</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.length === 0 ? (
              <div className="col-span-2 text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                กำลังโหลดแพ็กเกจบริการ หรือยังไม่มีการเพิ่มข้อมูลในระบบ
              </div>
            ) : (
              services.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all flex flex-col sm:flex-row gap-6 items-start"
                >
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 ${
                    index % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {iconMap[service.icon] || <Wrench className="h-8 w-8" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">{service.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-lg font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
                        {service.price_range}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ขั้นตอนการให้บริการ */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">ขั้นตอนการให้บริการ (Working Process)</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* เส้นเชื่อม (แสดงเฉพาะจอใหญ่) */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-blue-200 z-0"></div>
            
            <div className="text-center relative z-10">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-blue-600 shadow-md border-4 border-blue-50">1</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">ติดต่อและให้ข้อมูล</h3>
              <p className="text-gray-600 text-sm">แจ้งปัญหาหรือความต้องการผ่านทางโทรศัพท์ แชท หรืออีเมล</p>
            </div>
            <div className="text-center relative z-10">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-blue-600 shadow-md border-4 border-blue-50">2</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">ประเมินและเสนอราคา</h3>
              <p className="text-gray-600 text-sm">ทีมงานวิเคราะห์ปัญหา เข้าดูหน้างาน และทำใบเสนอราคา</p>
            </div>
            <div className="text-center relative z-10">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-blue-600 shadow-md border-4 border-blue-50">3</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">ดำเนินการแก้ไข/ติดตั้ง</h3>
              <p className="text-gray-600 text-sm">เข้าดำเนินการด้วยความเป็นมืออาชีพตามแผนที่ตกลงไว้</p>
            </div>
            <div className="text-center relative z-10">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-green-600 shadow-md border-4 border-green-50">4</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">ส่งมอบและรับประกัน</h3>
              <p className="text-gray-600 text-sm">ทดสอบระบบอย่างละเอียดก่อนส่งมอบ พร้อมการรับประกันผลงาน</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">กำลังมองหาโซลูชัน IT ที่ตอบโจทย์ธุรกิจคุณอยู่ใช่ไหม?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            ไม่ว่าจะเป็นการวางระบบเน็ตเวิร์กใหม่ ซ่อมแซมอุปกรณ์ หรือดูแลระบบคอมพิวเตอร์รายปี ทีมวิศวกรของเราพร้อมให้คำปรึกษาฟรี!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors w-full sm:w-auto justify-center shadow-lg"
            >
              <span>ส่งข้อความถึงเรา</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="tel:02-321-9939"
              className="inline-flex items-center space-x-2 bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-semibold transition-colors w-full sm:w-auto justify-center"
            >
              <PhoneCall className="h-5 w-5" />
              <span>โทร: 02-321-9939</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}