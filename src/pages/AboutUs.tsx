import React from 'react';
import { 
  Award, 
  Heart, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  PhoneCall, 
  Stethoscope, 
  ArrowRight,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutUs: React.FC = () => {
  const { doctors, openBookingModal, openDoctorProfileModal } = useApp();

  const values = [
    {
      icon: Heart,
      title: 'Compassionate Patient Care',
      desc: 'Every patient is treated with empathy, dignity, and personalized attention by our dedicated medical team.'
    },
    {
      icon: ShieldCheck,
      title: 'NABH Clinical Excellence',
      desc: 'Adhering strictly to national accreditation standards for patient safety, hygiene, and clinical protocol.'
    },
    {
      icon: Building2,
      title: 'Regional Accessibility',
      desc: 'Bringing multi-specialty healthcare closer to semi-urban and rural communities across Sarangpur, Shujalpur, and Rajgarh.'
    },
    {
      icon: Stethoscope,
      title: 'Hybrid Physical & Digital OPD',
      desc: 'Combining physical OPD consultations with instant digital video telemedicine for 24/7 healthcare access.'
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'Inception in Sarangpur',
      desc: 'SEVASADAN opened its first flagship super specialty OPD center in Sarangpur, serving local communities with quality diagnostics.'
    },
    {
      year: '2021',
      title: 'Shujalpur Expansion',
      desc: 'Expanded physical operations to Shujalpur Mandi with advanced Pediatrics, Dermatology, and Daycare Pathology.'
    },
    {
      year: '2024',
      title: 'Rajgarh Multi-Specialty Hub & Tele-OPD',
      desc: 'Established Rajgarh Multi-Specialty Hospital with Modular OTs and introduced Virtual Video OPD consultations across MP.'
    },
    {
      year: '2025',
      title: 'NABH Accreditation',
      desc: 'Received official NABH accreditation for high standards in healthcare quality and clinical safety.'
    },
    {
      year: '2026',
      title: '50,000+ Cured Patients',
      desc: 'Achieved the milestone of serving over 50,000 satisfied patients across Malwa region with digital token tracking & online Rx.'
    }
  ];

  return (
    <div className="space-y-10 pb-16 text-slate-900">
      
      {/* 1. HERO BANNER */}
      <section className="relative bg-gradient-to-br from-[#0B2545] via-[#0F4C81] to-slate-950 text-white py-10 sm:py-12 rounded-b-[2rem] shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0F4C81]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center max-w-3xl">
          
          <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-300" />
            <span>NABH Accredited Healthcare Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Transforming Healthcare Across <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300 bg-clip-text text-transparent">
              Sarangpur, Shujalpur & Rajgarh
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
            SEVASADAN is committed to bridging the gap in quality healthcare by delivering world-class medical consultation, digital token tracking, state-of-the-art diagnostics, and seamless video telemedicine.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openBookingModal()}
              className="bg-gradient-to-r from-[#10B981] to-emerald-500 hover:opacity-95 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs shadow-xl transition hover:scale-105 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book OPD Appointment</span>
            </button>
            <a
              href="tel:1800-7382-723"
              className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs border border-white/20 flex items-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4 text-emerald-300" />
              <span>24x7 Helpline: 1800-SEVA-CLINIC</span>
            </a>
          </div>

        </div>
      </section>

      {/* 2. STATS OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          
          <div className="space-y-1 border-r border-slate-100 last:border-0">
            <p className="text-3xl sm:text-4xl font-black text-[#0F4C81]">3</p>
            <p className="text-xs font-bold text-slate-700">Physical Branches</p>
            <p className="text-[11px] text-slate-400">Sarangpur • Shujalpur • Rajgarh</p>
          </div>

          <div className="space-y-1 border-r border-slate-100 last:border-0">
            <p className="text-3xl sm:text-4xl font-black text-emerald-600">15+</p>
            <p className="text-xs font-bold text-slate-700">Senior Medical Specialists</p>
            <p className="text-[11px] text-slate-400">MD, MS, DM & DNB Board Doctors</p>
          </div>

          <div className="space-y-1 border-r border-slate-100 last:border-0">
            <p className="text-3xl sm:text-4xl font-black text-purple-600">50,000+</p>
            <p className="text-xs font-bold text-slate-700">Patients Cured</p>
            <p className="text-[11px] text-slate-400">Across Malwa & Digital Telemedicine</p>
          </div>

          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-amber-500">4.9 / 5</p>
            <p className="text-xs font-bold text-slate-700">Patient Satisfaction</p>
            <p className="text-[11px] text-slate-400">Based on 2,500+ Verified Reviews</p>
          </div>

        </div>
      </section>

      {/* 3. OUR MISSION & CORE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-[#0F4C81] uppercase tracking-wider bg-[#0F4C81]/10 px-3.5 py-1 rounded-full">
            Our Guiding Pillars
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Mission, Vision & Core Values
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
            We are driven by a commitment to healthcare excellence, clinical safety, and transparent patient care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const IconComp = v.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#0F4C81] flex items-center justify-center">
                  <IconComp className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-base text-slate-900">{v.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. GROWTH MILESTONES TIMELINE */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-emerald-800 uppercase tracking-wider bg-emerald-100 px-3.5 py-1 rounded-full">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              SEVASADAN Growth Timeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
              From a single clinic in Sarangpur to a multi-branch accredited healthcare ecosystem.
            </p>
          </div>

          <div className="relative border-l-2 border-[#0F4C81]/30 ml-4 md:ml-32 space-y-10 pl-6 sm:pl-8">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative group">
                {/* Bullet */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#0F4C81] border-4 border-white shadow-md group-hover:scale-125 transition-transform" />
                
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition space-y-2">
                  <span className="bg-[#0F4C81] text-white text-[11px] font-black px-3 py-1 rounded-full inline-block">
                    {m.year}
                  </span>
                  <h3 className="font-black text-base text-slate-900">{m.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. MEDICAL BOARD & LEADERSHIP SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-[#0F4C81] uppercase tracking-wider bg-[#0F4C81]/10 px-3.5 py-1 rounded-full">
            Clinical Leadership
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Meet Our Senior Medical Directors
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
            Experienced board doctors guiding SEVASADAN’s clinical standards and patient outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.slice(0, 3).map(doc => (
            <div 
              key={doc.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all space-y-4 text-center flex flex-col justify-between"
            >
              <div className="space-y-4">
                <img 
                  src={doc.avatarUrl} 
                  alt={doc.name} 
                  className="w-24 h-24 rounded-3xl object-cover mx-auto shadow-md border-2 border-slate-100"
                />
                <div>
                  <h3 className="font-black text-lg text-slate-900">{doc.name}</h3>
                  <p className="text-xs font-extrabold text-[#0F4C81]">{doc.specialization}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{doc.qualification}</p>
                </div>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                  {doc.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{doc.rating} / 5.0</span>
                </span>
                <button
                  onClick={() => openDoctorProfileModal(doc)}
                  className="text-xs font-black text-[#0F4C81] hover:underline flex items-center gap-1"
                >
                  View Profile <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B2545] via-[#0F4C81] to-[#0A365C] text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">Experience World-Class Healthcare Today</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium">
              Book your physical OPD token or start an instant 30-minute video telemedicine consultation with senior specialists.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => openBookingModal()}
              className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-black px-6 py-3.5 rounded-xl text-xs shadow-lg transition hover:scale-105"
            >
              Book Appointment Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
