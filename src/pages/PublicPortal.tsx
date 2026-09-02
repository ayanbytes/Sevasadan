import React, { useState } from 'react';
import { 
  Building2, 
  Video, 
  MapPin, 
  Phone, 
  Clock,
  Calendar,
  ChevronDown,
  HeartPulse,
  Baby,
  Activity,
  Sparkle,
  Award,
  Stethoscope,
  PhoneCall,
  FileText,
  ChevronRight,
  ShieldAlert,
  Navigation
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PublicPortalProps {
  onNavigate?: (tab: string) => void;
}

export const PublicPortal: React.FC<PublicPortalProps> = ({ onNavigate }) => {
  const { 
    clinics, 
    doctors, 
    healthBlogs, 
    openBookingModal,
    setSelectedBlogId,
    language
  } = useApp();

  // Filtering State
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const specialtiesList = [
    { id: 'all', labelEn: 'All Specialties', labelHi: 'सभी विभाग', icon: Activity, desc: 'Complete multi-specialty care' },
    { id: 'General', labelEn: 'General & Diabetes', labelHi: 'जनरल मेडिसिन', icon: HeartPulse, desc: 'Internal medicine, fever & chronic disease' },
    { id: 'Pediatric', labelEn: 'Pediatrics & Child Care', labelHi: 'बाल रोग विशेषज्ञ', icon: Baby, desc: 'Newborn care, growth & immunization' },
    { id: 'Ortho', labelEn: 'Orthopedics & Joint Care', labelHi: 'हड्डी एवं जोड़ रोग', icon: Activity, desc: 'Joint replacement, fracture & pain' },
    { id: 'Derm', labelEn: 'Dermatology & Cosmetology', labelHi: 'त्वचा एवं सौंदर्य', icon: Sparkle, desc: 'Skin allergies, hair fall & cosmetics' },
    { id: 'Cardio', labelEn: 'Cardiology & Heart Health', labelHi: 'हृदय रोग विशेषज्ञ', icon: HeartPulse, desc: 'ECG, Echo & cardiac wellness' }
  ];

  const faqs = [
    {
      qEn: 'How does the physical clinic Token System work at Sarangpur, Shujalpur, and Rajgarh?',
      qHi: 'सारंगपुर, शुजालपुर और राजगढ़ में इन-क्लीनिक टोकन प्रणाली कैसे काम करती है?',
      aEn: 'When you book an in-clinic visit, a sequential daily token (e.g., SAR-014 or RAJ-022) is generated automatically. You can track your queue live and arrive at the OPD counter without waiting in long manual lines.',
      aHi: 'जब आप इन-क्लीनिक अपॉइंटमेंट बुक करते हैं, तो एक टोकन नंबर जारी किया जाता है। आप अपने फोन से लाइव कतार स्थिति देख सकते हैं।'
    },
    {
      qEn: 'What do I need for a virtual video telemedicine consultation?',
      qHi: 'वीडियो टेलीमेडिसिन परामर्श के लिए क्या आवश्यक है?',
      aEn: 'You only need a smartphone, tablet, or laptop with a camera and microphone. You will receive an SMS with a direct 30-minute magic join link requiring no app downloads.',
      aHi: 'आपको केवल कैमरा और माइक वाले स्मार्टफोन या लैपटॉप की आवश्यकता है। आपको एसएमएस द्वारा एक डायरेक्ट जॉइन लिंक मिलेगा।'
    },
    {
      qEn: 'Can I download an official digital prescription after my video consult?',
      qHi: 'क्या मैं वीडियो परामर्श के बाद डिजिटल प्रिस्क्रिप्शन डाउनलोड कर सकता हूँ?',
      aEn: 'Yes! Doctors sign standardized digital prescriptions with official letterheads and digital signature stamps instantly after consults, available for 1-click PDF download.',
      aHi: 'जी हाँ! डॉक्टर परामर्श के बाद डिजिटल प्रिस्क्रिप्शन साइन करते हैं जिसे आप 1-क्लिक में पीडीएफ के रूप में डाउनलोड कर सकते हैं।'
    },
    {
      qEn: 'What payment options are supported?',
      qHi: 'भुगतान के कौन-कौन से विकल्प उपलब्ध हैं?',
      aEn: 'We support Razorpay & Cashfree (UPI, Google Pay, PhonePe, Cards, NetBanking) alongside "Pay Cash at Counter" for physical clinic visits.',
      aHi: 'हम यूपीआई, गूगल पे, कार्ड और क्लीनिक पर नकद भुगतान दोनों का समर्थन करते हैं।'
    }
  ];

  return (
    <div className="pb-24 overflow-x-hidden w-full max-w-full">
      
      {/* 1. CLINIC FACILITIES & KEY HIGHLIGHTS MARQUEE RIBBON */}
      <div className="bg-gradient-to-r from-[#0B2545] via-[#0F4C81] to-[#0A365C] text-white py-2.5 border-b border-emerald-500/30 overflow-hidden relative shadow-md">
        <div className="flex items-center whitespace-nowrap animate-marquee gap-8 text-xs">
          <span className="font-black text-amber-300 flex items-center gap-2 shrink-0 px-4 uppercase tracking-wider bg-amber-400/10 py-1 rounded-full border border-amber-400/20">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            SEVASADAN CLINIC HIGHLIGHTS & FACILITIES:
          </span>

          <span className="inline-flex items-center gap-2 bg-slate-900/80 px-3.5 py-1 rounded-full border border-white/10 font-medium text-slate-200">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <strong className="text-rose-300 font-extrabold">24x7 Emergency & ICU:</strong>
            <span>ACLS Ambulance Helpline: 1800-SEVA-CLINIC</span>
          </span>

          <span className="inline-flex items-center gap-2 bg-slate-900/80 px-3.5 py-1 rounded-full border border-white/10 font-medium text-slate-200">
            <FileText className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <strong className="text-sky-300 font-extrabold">High-Tech Pathology Lab:</strong>
            <span>Automated Testing & Doorstep WhatsApp PDF Reports</span>
          </span>

          <span className="inline-flex items-center gap-2 bg-slate-900/80 px-3.5 py-1 rounded-full border border-white/10 font-medium text-slate-200">
            <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <strong className="text-amber-300 font-extrabold">NABH Accredited OPD:</strong>
            <span>Sarangpur • Shujalpur • Rajgarh Multi-Specialty Network</span>
          </span>

          <span className="inline-flex items-center gap-2 bg-slate-900/80 px-3.5 py-1 rounded-full border border-white/10 font-medium text-slate-200">
            <Stethoscope className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <strong className="text-emerald-300 font-extrabold">15+ Board Doctors:</strong>
            <span>General Medicine, Pediatrics, Ortho, Derm, Cardio & Gynae</span>
          </span>

          <span className="inline-flex items-center gap-2 bg-slate-900/80 px-3.5 py-1 rounded-full border border-white/10 font-medium text-slate-200">
            <Video className="w-3.5 h-3.5 text-teal-300 shrink-0" />
            <strong className="text-teal-200 font-extrabold">Digital Video Tele-OPD:</strong>
            <span>Consult Doctors Online with Verified Digital Prescriptions</span>
          </span>

          <span className="inline-flex items-center gap-2 bg-slate-900/80 px-3.5 py-1 rounded-full border border-white/10 font-medium text-slate-200">
            <Activity className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <strong className="text-purple-300 font-extrabold">Modular Clean-Air OTs:</strong>
            <span>HEPA Filtered Surgical Suites & Joint Replacement</span>
          </span>

          <span className="inline-flex items-center gap-2 bg-slate-900/80 px-3.5 py-1 rounded-full border border-white/10 font-medium text-slate-200">
            <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <strong className="text-emerald-300 font-extrabold">24/7 Pharmacy & Cold-Chain:</strong>
            <span>100% Certified Genuine Medicines & Vaccines</span>
          </span>

          <span className="inline-flex items-center gap-2 bg-slate-900/80 px-3.5 py-1 rounded-full border border-white/10 font-medium text-slate-200">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <strong className="text-amber-300 font-extrabold">Live Token Queue Tracking:</strong>
            <span>Track OPD Tokens Real-Time from Mobile</span>
          </span>
        </div>
      </div>

      {/* 2. HERO SECTION — DR. ANKUR DESHWALI */}
      <section className="relative bg-gradient-to-br from-[#0B2545] via-[#0F4C81] to-slate-950 text-white pt-10 sm:pt-14 pb-14 sm:pb-16 rounded-b-[2.5rem] shadow-2xl overflow-hidden">
        {/* Ambient Glow & Background Lighting */}
        <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[650px] h-[650px] bg-[#0F4C81]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2 bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 px-3.5 py-1 rounded-full text-[11px] font-black tracking-widest uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>PEDIATRIC SURGERY • NEONATAL SURGERY • GENERAL SURGERY</span>
              </div>

              {/* Main Heading & Subheading */}
              <div className="space-y-1.5">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                  Dr. Ankur Deshwali
                </h1>
                <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                  Pediatric Surgeon | Neonatal Surgeon | General Surgeon
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-200/90 max-w-2xl leading-relaxed font-normal">
                Providing specialized surgical care for newborns, children, and adolescents, with expertise in pediatric surgical conditions, congenital anomalies, pediatric urology, laparoscopic surgery, and antenatal diagnosis and management.
              </p>

              {/* Qualifications Badge */}
              <div className="inline-flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-white/15 text-xs font-mono font-bold text-amber-300 shadow-sm">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>MBBS | MS (General Surgery) | MCh (Pediatric Surgery)</span>
              </div>

              {/* Location Badge */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-slate-300 pt-0.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Civil Hospital, Sarangpur & District Hospital, Rajgarh, Madhya Pradesh</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                <button
                  onClick={() => openBookingModal()}
                  className="bg-[#10B981] hover:bg-emerald-500 text-slate-950 px-6 py-3.5 rounded-2xl text-xs font-black shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>Book a Consultation</span>
                </button>

                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('specialties');
                    else {
                      const el = document.getElementById('branches-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-2xl text-xs font-black shadow-md backdrop-blur-md transition flex items-center gap-2 cursor-pointer hover:scale-105"
                >
                  <Stethoscope className="w-4 h-4 text-emerald-400" />
                  <span>View Specialities</span>
                </button>
              </div>

            </div>

            {/* Right Column: Doctor Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group max-w-md w-full">
                {/* Decorative background glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-[2.5rem] blur-xl opacity-25 group-hover:opacity-40 transition duration-500" />
                
                {/* Image Container */}
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 bg-slate-900/40 backdrop-blur-sm">
                  <img
                    src="/hero-doctor.png"
                    alt="Dr. Ankur Deshwali - Pediatric & Neonatal Surgeon"
                    className="w-full h-[460px] object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Doctor Title Card Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-5 text-white">
                    <h3 className="font-black text-lg text-white">Dr. Ankur Deshwali</h3>
                    <p className="text-xs text-emerald-300 font-bold">MCh Pediatric Surgery Specialist</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. QUICK SERVICES ACTION GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-6 pb-4">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
          
          <button
            onClick={() => openBookingModal(undefined, undefined)}
            className="p-4 rounded-2xl hover:bg-sky-50 transition border border-transparent hover:border-sky-200 space-y-2 group"
          >
            <div className="w-12 h-12 bg-sky-100 text-[#0F4C81] rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">Book In-Clinic OPD</h4>
            <p className="text-[10px] text-slate-500 font-medium">Physical Visit Token</p>
          </button>

          <button
            onClick={() => openBookingModal(undefined, undefined, 'VIDEO')}
            className="p-4 rounded-2xl hover:bg-emerald-50 transition border border-transparent hover:border-emerald-200 space-y-2 group"
          >
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">Video Telemedicine</h4>
            <p className="text-[10px] text-slate-500 font-medium">Consult From Home</p>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('branches-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-4 rounded-2xl hover:bg-purple-50 transition border border-transparent hover:border-purple-200 space-y-2 group"
          >
            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">Find Clinic Location</h4>
            <p className="text-[10px] text-slate-500 font-medium">Sarangpur, Shujalpur, Rajgarh</p>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('doctors-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-4 rounded-2xl hover:bg-[#0F4C81]/10 transition border border-transparent hover:border-[#0F4C81]/30 space-y-2 group"
          >
            <div className="w-12 h-12 bg-[#0F4C81]/10 text-[#0F4C81] rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">Our Specialists</h4>
            <p className="text-[10px] text-slate-500 font-medium">15+ Board Doctors</p>
          </button>

          <a
            href="tel:1800-7382-723"
            className="p-4 rounded-2xl hover:bg-rose-50 transition border border-transparent hover:border-rose-200 space-y-2 group block"
          >
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">Emergency Helpline</h4>
            <p className="text-[10px] text-rose-600 font-bold">1800-SEVA-CLINIC</p>
          </a>

        </div>
      </section>

      {/* 5. CENTERS OF EXCELLENCE / SPECIALTIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-10 sm:pt-14 pb-12 sm:pb-16">
        <div className="text-center space-y-3 pb-2">
          <span className="text-xs font-black text-[#0F4C81] uppercase tracking-wider bg-[#0F4C81]/10 px-4 py-1.5 rounded-full border border-[#0F4C81]/20">
            Clinical Departments
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Centers of Excellence & Specialty OPDs
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 pt-2">
          {specialtiesList.map(sp => {
            const IconComp = sp.icon;
            const count = sp.id === 'all' 
              ? doctors.length 
              : doctors.filter(d => d.specialization.toLowerCase().includes(sp.id.toLowerCase())).length;

            return (
              <button
                key={sp.id}
                onClick={() => setSelectedSpecialty(sp.id)}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-3 ${
                  selectedSpecialty === sp.id
                    ? 'border-[#0F4C81] bg-[#0F4C81] text-white shadow-xl scale-105'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800 hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  selectedSpecialty === sp.id ? 'bg-white/20 text-white' : 'bg-sky-50 text-[#0F4C81]'
                }`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs leading-tight">
                    {language === 'en' ? sp.labelEn : sp.labelHi}
                  </h4>
                  <p className={`text-[10px] mt-1 font-semibold ${selectedSpecialty === sp.id ? 'text-emerald-300' : 'text-slate-500'}`}>
                    {count} Specialists
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. PHYSICAL CLINIC LOCATIONS */}
      <section id="branches-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-10 sm:py-14">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-[#0F4C81] uppercase tracking-wider bg-[#0F4C81]/10 px-3.5 py-1 rounded-full">
            Our Physical OPD Network
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Clinic Branches in Sarangpur, Shujalpur & Rajgarh
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {clinics.map(c => (
            <div 
              key={c.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={c.imageUrl} 
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      OPD Active Today
                    </span>
                    <h3 className="font-black text-xl mt-1">{c.name}</h3>
                    <p className="text-xs text-slate-300 font-medium">{c.city}, Madhya Pradesh</p>
                  </div>
                </div>

                <div className="p-6 space-y-4 text-xs">
                  <div className="flex items-start gap-2.5 text-slate-600">
                    <MapPin className="w-4 h-4 text-[#0F4C81] shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{c.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-600 font-mono">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-bold">{c.phone}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-600">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-semibold">{c.operatingHours}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.name} ${c.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-[#0F4C81] border border-slate-200 font-extrabold px-3.5 py-2 rounded-xl text-xs shadow-2xs transition"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Get Directions</span>
                </a>

                <button
                  onClick={() => openBookingModal(undefined, c.id)}
                  className="bg-[#0F4C81] hover:bg-[#0A365C] text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-xs transition cursor-pointer"
                >
                  Book Token
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. DOCTOR DIRECTORY SHOWCASE REMOVED */}

      {/* 8. HEALTH BLOGS & ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-10 sm:py-14">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-[#0F4C81] uppercase tracking-wider bg-[#0F4C81]/10 px-3.5 py-1 rounded-full">
            Health Knowledge Hub
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Medical Insights & Health Tips from Our Doctors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {healthBlogs.map(blog => (
            <div 
              key={blog.id}
              onClick={() => {
                setSelectedBlogId(blog.id);
                if (onNavigate) onNavigate('article-detail');
              }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition space-y-4 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src={blog.imageUrl} 
                    alt={blog.title} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0B2545] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    {blog.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <p className="text-[10px] text-slate-400 font-bold flex items-center gap-2">
                    <span>{blog.date}</span> • <span>{blog.readTimeMinutes} min read</span>
                  </p>
                  <h4 className="font-black text-base text-slate-900 leading-snug">{blog.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">{blog.excerpt}</p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F4C81]">{blog.authorName}</span>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  Read Article <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 space-y-6 py-10 sm:py-14">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Everything you need to know about SEVASADAN clinics & telehealth.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full text-left p-5 font-bold text-sm text-slate-900 flex items-center justify-between gap-4"
              >
                <span>{language === 'en' ? faq.qEn : faq.qHi}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaqIndex === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-medium">
                  {language === 'en' ? faq.aEn : faq.aHi}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. MOTHERHOOD STYLE STICKY FLOATING ACTION BAR AT BOTTOM */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B2545]/95 backdrop-blur-xl border-t border-white/10 py-3 px-4 shadow-2xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          
          <div className="hidden sm:flex items-center gap-2 text-white text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SEVASADAN 24x7 OPD Assistance</span>
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-2.5">
            <a
              href="tel:1800-7382-723"
              className="flex-1 sm:flex-initial bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Helpline</span>
            </a>

            <button
              onClick={() => openBookingModal(undefined, undefined)}
              className="flex-1 sm:flex-initial bg-[#10B981] hover:bg-emerald-500 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg transition hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            <button
              onClick={() => openBookingModal(undefined, undefined)}
              className="flex-1 sm:flex-initial bg-white/10 hover:bg-white/20 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs border border-white/20 flex items-center justify-center gap-1.5"
            >
              <Video className="w-4 h-4 text-emerald-400" />
              <span>Video OPD</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
