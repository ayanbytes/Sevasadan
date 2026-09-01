import React from 'react';
import { 
  Stethoscope, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Heart,
  Video
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { clinics, language, openBookingModal } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F4C81] to-[#10B981] flex items-center justify-center text-white font-bold shadow-md">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">SEVASADAN</span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              {language === 'en' 
                ? 'SEVASADAN Clinic & Telemedicine Network is dedicated to providing high-quality, compassionate physical outpatient care and virtual video consultations across Sarangpur, Shujalpur, and Rajgarh.'
                : 'सेवासदन क्लीनिक एवं टेलीमेडिसिन नेटवर्क सारंगपुर, शुजालपुर और राजगढ़ क्षेत्र में उच्च गुणवत्ता वाली इन-क्लीनिक एवं वीडियो परामर्श सेवाएं प्रदान करने हेतु प्रतिबद्ध है।'}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 p-3 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>NABH Accredited & Telemedicine Practice Guidelines 2020 Compliant</span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button 
                onClick={() => openBookingModal(undefined, undefined)}
                className="bg-[#10B981] hover:bg-emerald-600 text-slate-900 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
              >
                <span>{language === 'en' ? 'Book Physical OPD' : 'ओपीडी अपॉइंटमेंट बुक करें'}</span>
              </button>
              <button 
                onClick={() => openBookingModal(undefined, undefined)}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
              >
                <Video className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'en' ? 'Start Video Call' : 'वीडियो परामर्श शुरू करें'}</span>
              </button>
            </div>
          </div>

          {/* Branch Locations */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{language === 'en' ? 'Physical Branches' : 'क्लीनिक शाखाएँ'}</span>
            </h4>
            <ul className="space-y-3 text-xs">
              {clinics.map(c => (
                <li key={c.id} className="space-y-0.5 border-b border-slate-800/80 pb-2">
                  <p className="font-bold text-white flex items-center justify-between">
                    <span>{c.name}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded font-normal">Active</span>
                  </p>
                  <p className="text-slate-400 truncate">{c.address}</p>
                  <p className="text-slate-500 font-mono flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{c.phone}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialities & Timings */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>{language === 'en' ? 'OPD Hours & Specialties' : 'ओपीडी समय एवं विभाग'}</span>
            </h4>
            <div className="text-xs space-y-2 text-slate-400">
              <p><strong className="text-slate-200">OPD Timings:</strong> 08:00 AM - 08:00 PM</p>
              <p><strong className="text-slate-200">Specialties Covered:</strong></p>
              <ul className="grid grid-cols-1 gap-1 pl-2 text-slate-300">
                <li>• General Medicine & Diabetes</li>
                <li>• Pediatrics & Child Health</li>
                <li>• Orthopedics & Joint Care</li>
                <li>• Dermatology & Cosmetology</li>
                <li>• Cardiology & ECG Consults</li>
              </ul>
            </div>
          </div>

          {/* Emergency & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{language === 'en' ? 'Help & Support' : 'सहायता एवं संपर्क'}</span>
            </h4>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-2">
              <p className="text-xs text-slate-400">{language === 'en' ? 'Toll-Free Emergency Helpline:' : 'टोल-फ्री इमरजेंसी नंबर:'}</p>
              <p className="font-extrabold text-white text-sm font-mono text-emerald-400">1800-SEVA-CLINIC</p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>support@sevasadanclinic.in</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SEVASADAN Health Care Network. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Serving Sarangpur, Shujalpur & Rajgarh with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
