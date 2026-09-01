import React, { useState } from 'react';
import { 
  Building2, 
  Video, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Calendar, 
  ChevronDown,
  HeartPulse,
  Baby,
  Activity,
  Sparkle,
  Award,
  Search,
  Stethoscope,
  PhoneCall,
  FileText,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PublicPortal: React.FC = () => {
  const { 
    clinics, 
    doctors, 
    appointments, 
    healthPackages, 
    healthBlogs, 
    openBookingModal, 
    language, 
    activeBranchId 
  } = useApp();

  // Floating Hero Booking Widget State
  const [heroMode, setHeroMode] = useState<'IN_CLINIC' | 'VIDEO'>('IN_CLINIC');
  const [heroBranch, setHeroBranch] = useState<string>('sarangpur');
  const [heroSpecialty, setHeroSpecialty] = useState<string>('all');
  const [heroDoctorId, setHeroDoctorId] = useState<string>('');

  // Filtering State
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const specialtiesList = [
    { id: 'all', labelEn: 'All Specialties', labelHi: 'सभी विभाग', icon: Activity, desc: 'Complete multi-specialty care' },
    { id: 'General', labelEn: 'General & Diabetes', labelHi: 'जनरल मेडिसिन', icon: HeartPulse, desc: 'Internal medicine, fever & chronic disease' },
    { id: 'Pediatric', labelEn: 'Pediatrics & Child Care', labelHi: 'बाल रोग विशेषज्ञ', icon: Baby, desc: 'Newborn care, growth & immunization' },
    { id: 'Ortho', labelEn: 'Orthopedics & Joint Care', labelHi: 'हड्डी एवं जोड़ रोग', icon: Activity, desc: 'Joint replacement, fracture & pain' },
    { id: 'Derm', labelEn: 'Dermatology & Cosmetology', labelHi: 'त्वचा एवं सौंदर्य', icon: Sparkle, desc: 'Skin allergies, hair fall & cosmetics' },
    { id: 'Cardio', labelEn: 'Cardiology & Heart Health', labelHi: 'हृदय रोग विशेषज्ञ', icon: HeartPulse, desc: 'ECG, Echo & cardiac wellness' }
  ];

  const filteredDoctors = doctors.filter(doc => {
    const matchesBranch = activeBranchId === 'all' || doc.clinicsCovered.includes(activeBranchId);
    const matchesSpecialty = selectedSpecialty === 'all' || doc.specialization.toLowerCase().includes(selectedSpecialty.toLowerCase());
    const matchesSearch = !searchQuery || doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBranch && matchesSpecialty && matchesSearch;
  });

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openBookingModal(heroDoctorId || undefined, heroBranch || undefined);
  };

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
    <div className="space-y-20 pb-28">
      
      {/* 1. LIVE MARQUEE QUEUE TICKER */}
      <div className="bg-[#0B2545] text-white py-2.5 border-b border-emerald-500/30 overflow-hidden relative shadow-md">
        <div className="flex items-center whitespace-nowrap animate-marquee gap-8 text-xs font-mono">
          <span className="font-extrabold text-amber-300 flex items-center gap-1.5 shrink-0 px-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            LIVE OPD QUEUE TICKER:
          </span>
          {appointments.map(a => (
            <span key={a.id} className="inline-flex items-center gap-2 bg-slate-800/90 px-3.5 py-1 rounded-full border border-slate-700">
              <strong className="text-emerald-400 font-bold">{a.tokenNumber}</strong>
              <span className="text-slate-200">{a.patientName}</span>
              <span className="text-slate-400">({a.doctorName})</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-black uppercase tracking-wider">{a.status}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. HERO SECTION WITH MOTHERHOOD STYLE QUICK BOOKING WIDGET */}
      <section className="relative bg-gradient-to-br from-[#0B2545] via-[#0F4C81] to-slate-950 text-white pt-10 pb-28 rounded-b-[3rem] shadow-2xl overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0F4C81]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          {/* Hero Banner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-300" />
                <span>{language === 'en' ? 'NABH Accredited Multi-Specialty Network' : 'एनएबीएच मान्यता प्राप्त बहुविशेषज्ञता नेटवर्क'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
                {language === 'en' ? (
                  <>
                    India’s Trusted Clinic & <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                      Virtual Telemedicine Hospital
                    </span>
                  </>
                ) : (
                  <>
                    मध्य प्रदेश का विश्वसनीय क्लीनिक एवं <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                      डिजिटल वीडियो ओपीडी नेटवर्क
                    </span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-medium">
                {language === 'en'
                  ? 'Providing world-class medical care across physical branches in Sarangpur, Shujalpur, and Rajgarh alongside instant virtual video OPDs. Automated tokens, digital Rx, and multi-gateway payments.'
                  : 'सारंगपुर, शुजालपुर एवं राजगढ़ में अत्याधुनिक ओपीडी सेवाएं तथा घर बैठे डिजिटल वीडियो परामर्श।'}
              </p>

              {/* Trust Metrics */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-center sm:text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white">3 Branches</p>
                  <p className="text-xs text-slate-300 font-semibold">Sarangpur • Shujalpur • Rajgarh</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-400">15+ Specialists</p>
                  <p className="text-xs text-slate-300 font-semibold">Cardio, Ortho, Pediatrics, Derm</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-amber-300">50,000+</p>
                  <p className="text-xs text-slate-300 font-semibold">Happy Patients Cured</p>
                </div>
              </div>

            </div>

            {/* Right: FLOATING MOTHERHOOD STYLE QUICK APPOINTMENT WIDGET */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200/80 space-y-5">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-lg text-[#0B2545] flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-[#0F4C81]" />
                      <span>Book Appointment Fast</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold">Select Mode & Reserve Slot Instantly</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    Live Slots
                  </span>
                </div>

                <form onSubmit={handleHeroSubmit} className="space-y-4">
                  
                  {/* Mode Tabs */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setHeroMode('IN_CLINIC')}
                      className={`py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                        heroMode === 'IN_CLINIC' ? 'bg-[#0F4C81] text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>In-Clinic Token</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroMode('VIDEO')}
                      className={`py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                        heroMode === 'VIDEO' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      <span>Video Consult</span>
                    </button>
                  </div>

                  {/* Branch Select (If In-Clinic) */}
                  {heroMode === 'IN_CLINIC' && (
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-600 mb-1 uppercase tracking-wider">
                        1. Select Clinic Branch
                      </label>
                      <select
                        value={heroBranch}
                        onChange={(e) => setHeroBranch(e.target.value)}
                        className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                      >
                        {clinics.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.city})</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Department Select */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 mb-1 uppercase tracking-wider">
                      2. Select Department / Specialty
                    </label>
                    <select
                      value={heroSpecialty}
                      onChange={(e) => setHeroSpecialty(e.target.value)}
                      className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                    >
                      <option value="all">All Departments & Specialties</option>
                      <option value="General">General Physician & Diabetes</option>
                      <option value="Pediatric">Pediatrics & Neonatology</option>
                      <option value="Ortho">Orthopedics & Joint Surgery</option>
                      <option value="Derm">Dermatology & Skin Care</option>
                      <option value="Cardio">Cardiology & Heart Health</option>
                    </select>
                  </div>

                  {/* Doctor Select */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 mb-1 uppercase tracking-wider">
                      3. Select Preferred Doctor
                    </label>
                    <select
                      value={heroDoctorId}
                      onChange={(e) => setHeroDoctorId(e.target.value)}
                      className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                    >
                      <option value="">Any Available Specialist</option>
                      {doctors.map(d => (
                        <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#0F4C81] via-[#0B2545] to-[#10B981] hover:opacity-95 text-white font-black py-4 rounded-2xl text-xs shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-emerald-300" />
                    <span>Reserve Token & Book Now</span>
                  </button>

                </form>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. QUICK SERVICES ACTION GRID (MOTHERHOOD ICON BAR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          
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
            onClick={() => openBookingModal(undefined, undefined)}
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
              const el = document.getElementById('packages-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-4 rounded-2xl hover:bg-amber-50 transition border border-transparent hover:border-amber-200 space-y-2 group"
          >
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">Health Packages</h4>
            <p className="text-[10px] text-slate-500 font-medium">Full Body & Cardiac Checkup</p>
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

      {/* 4. HEALTH CHECKUP & PREVENTIVE PACKAGES (MOTHERHOOD STYLE) */}
      <section id="packages-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-[#0F4C81] uppercase tracking-wider bg-[#0F4C81]/10 px-3.5 py-1 rounded-full">
            Preventive Healthcare & Diagnostics
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            SEVASADAN Comprehensive Health Packages
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
            Affordable diagnostic screening packages with 1-click booking and doorstep sample collection support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthPackages.map(pkg => (
            <div 
              key={pkg.id} 
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all space-y-5 flex flex-col justify-between relative overflow-hidden"
            >
              {pkg.badge && (
                <span className="absolute top-4 right-4 bg-emerald-500 text-slate-950 font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {pkg.badge}
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-black text-[#0F4C81] uppercase tracking-wider">{pkg.category}</span>
                  <h3 className="font-black text-base text-slate-900 mt-1">{pkg.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium line-clamp-2">
                    {pkg.description}
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2">
                  <span className="text-[11px] font-extrabold text-slate-700 block">
                    Key Tests Included ({pkg.testCount}+ Parameters):
                  </span>
                  <ul className="space-y-1">
                    {pkg.testsIncluded.slice(0, 4).map((t, idx) => (
                      <li key={idx} className="text-[11px] text-slate-600 flex items-center gap-1.5 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">₹{pkg.discountedPrice}</span>
                  <span className="text-xs text-slate-400 line-through">₹{pkg.originalPrice}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Save {Math.round(((pkg.originalPrice - pkg.discountedPrice) / pkg.originalPrice) * 100)}%
                  </span>
                </div>

                <button
                  onClick={() => openBookingModal()}
                  className="w-full bg-[#0F4C81] hover:bg-[#0A365C] text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-emerald-300" />
                  <span>Book Health Package</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 5. CENTERS OF EXCELLENCE / SPECIALTIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-[#0F4C81] uppercase tracking-wider bg-[#0F4C81]/10 px-3.5 py-1 rounded-full">
            Clinical Departments
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Centers of Excellence & Specialty OPDs
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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

      {/* 6. PHYSICAL CLINIC LOCATIONS (MOTHERHOOD BRANCH CARDS) */}
      <section id="branches-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

                  <div className="pt-1">
                    <iframe
                      title={`${c.name} Map`}
                      src={c.googleMapEmbedUrl}
                      className="w-full h-32 rounded-2xl border border-slate-200"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  {c.activeDoctorCount} Doctors On Duty
                </span>
                <button
                  onClick={() => openBookingModal(undefined, c.id)}
                  className="bg-[#0F4C81] hover:bg-[#0A365C] text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-xs transition"
                >
                  Book Token
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. DOCTOR DIRECTORY SHOWCASE */}
      <section id="doctors-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-emerald-700 uppercase tracking-wider bg-emerald-100 px-3.5 py-1 rounded-full">
              Board-Certified Medical Specialists
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              Meet Our Senior Doctors
            </h2>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctor or specialty..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doc => (
            <div 
              key={doc.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img 
                    src={doc.avatarUrl} 
                    alt={doc.name} 
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{doc.rating}</span>
                      <span className="text-slate-400 font-normal">({doc.totalReviews})</span>
                    </div>
                    <h4 className="font-black text-base text-slate-900 mt-0.5">{doc.name}</h4>
                    <p className="text-xs text-[#0F4C81] font-extrabold">{doc.specialization}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{doc.qualification}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                  {doc.bio}
                </p>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                  <p className="flex justify-between text-slate-600">
                    <span>In-Clinic OPD Fee:</span>
                    <strong className="text-slate-900 font-black">₹{doc.consultationFeeClinic}</strong>
                  </p>
                  <p className="flex justify-between text-slate-600">
                    <span>Video Consultation Fee:</span>
                    <strong className="text-emerald-700 font-black">₹{doc.consultationFeeOnline}</strong>
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => openBookingModal(doc.id, undefined)}
                  className="flex-1 bg-gradient-to-r from-[#0F4C81] to-[#10B981] hover:opacity-95 text-white font-black py-3 rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Slot</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. HEALTH BLOGS & ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition space-y-4 flex flex-col justify-between"
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
      <section className="max-w-4xl mx-auto px-4 space-y-6">
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
