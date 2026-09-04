import React from 'react';
import { 
  Phone, 
  Smartphone,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const { openBookingModal, setSelectedSpecialtyFilter } = useApp();

  return (
    <footer className="bg-white text-slate-700 pt-12 pb-8 border-t border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 1. TOP SECTION: MOBILE APP DOWNLOAD & EMERGENCY HELPLINE BANNER */}
        <div className="bg-gradient-to-r from-slate-50 via-emerald-50/50 to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: App Tagline & Store Badges */}
          <div className="space-y-4 text-center md:text-left max-w-md">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Mobile OPD & Live Token Tracking</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Download Our App Now
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Book OPD tokens, consult senior doctors on video, track live queues, and download instant digital prescriptions on iOS & Android.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              {/* Google Play Store Badge */}
              <a
                href="#download-android"
                onClick={(e) => { e.preventDefault(); alert('SevaArogyam Android App link sent to your phone!'); }}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl flex items-center gap-3 transition shadow-md group cursor-pointer"
              >
                <svg className="w-6 h-6 fill-current text-emerald-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L18.81,17.12L6.15,22.84C5.78,23 5.38,22.95 5.07,22.7L15.12,12.65L16.81,15.12M16.81,8.88L15.12,11.35L5.07,1.3C5.38,1.05 5.78,1 6.15,1.16L18.81,6.88L16.81,8.88M19.97,12L17.75,9.78L15.75,11.78L17.75,13.78L19.97,12Z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[9px] text-slate-400 uppercase font-extrabold leading-none">GET IT ON</p>
                  <p className="text-xs font-black text-white leading-tight">Google Play</p>
                </div>
              </a>

              {/* Apple App Store Badge */}
              <a
                href="#download-ios"
                onClick={(e) => { e.preventDefault(); alert('SevaArogyam iOS App link sent to your phone!'); }}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl flex items-center gap-3 transition shadow-md group cursor-pointer"
              >
                <svg className="w-6 h-6 fill-current text-slate-100 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.09,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[9px] text-slate-400 uppercase font-extrabold leading-none">Download on the</p>
                  <p className="text-xs font-black text-white leading-tight">App Store</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right: 24x7 Emergency & NABH Support Card */}
          <div className="bg-gradient-to-br from-[#0B2545] to-[#0F4C81] text-white p-5 rounded-2xl border border-white/10 shadow-lg space-y-3 shrink-0 max-w-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-rose-300 animate-pulse" />
                <span>24x7 Emergency</span>
              </span>
              <span className="text-[10px] text-emerald-300 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                NABH Accredited
              </span>
            </div>

            <div>
              <p className="text-[11px] text-slate-300 font-medium">Toll-Free Emergency & Ambulance Desk:</p>
              <a href="tel:1800-7382-723" className="text-xl font-black text-amber-300 font-mono hover:underline block">
                1800-SEVA-CLINIC
              </a>
              <p className="text-[10px] text-slate-300 font-normal">Sarangpur • Shujalpur • Rajgarh Network</p>
            </div>

            <div className="pt-2 flex items-center gap-2 border-t border-white/10">
              <a
                href="tel:1800-7382-723"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Helpline</span>
              </a>
              <button
                onClick={() => openBookingModal()}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition border border-white/10 cursor-pointer"
              >
                <span>Book Slot</span>
              </button>
            </div>
          </div>

        </div>

        {/* 2. MAIN 4-COLUMN CORPORATE FOOTER LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs pb-8 border-b border-slate-200">
          
          {/* Column 1: Company Overview */}
          <div className="space-y-3">
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider">Overview</h4>
            <ul className="space-y-2 text-slate-600 font-medium">
              <li>
                <button onClick={() => setCurrentTab('about')} className="hover:text-[#0F4C81] transition cursor-pointer">About SevaArogyam</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('locations')} className="hover:text-[#0F4C81] transition cursor-pointer">Hospital Branches</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('specialties')} className="hover:text-[#0F4C81] transition cursor-pointer">NABH Accreditation</button>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-slate-600 font-medium">
              <li>
                <button onClick={() => setCurrentTab('specialties')} className="hover:text-[#0F4C81] transition cursor-pointer">Find A Specialist Doctor</button>
              </li>
              <li>
                <button onClick={() => openBookingModal()} className="hover:text-[#0F4C81] transition cursor-pointer">Book Physical OPD Token</button>
              </li>
              <li>
                <button onClick={() => openBookingModal(undefined, undefined, 'VIDEO')} className="hover:text-[#0F4C81] transition cursor-pointer">Book Video Consultation</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('pharmacy')} className="hover:text-[#0F4C81] transition cursor-pointer">24/7 Pharmacy</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('training')} className="hover:text-[#0F4C81] transition cursor-pointer">OT Training Academy</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Clinical Specialties */}
          <div className="space-y-3">
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider">Our Specialties</h4>
            <ul className="space-y-2 text-slate-600 font-medium">
              <li>
                <button onClick={() => { setSelectedSpecialtyFilter('Internal Medicine'); setCurrentTab('specialties'); }} className="hover:text-[#0F4C81] transition cursor-pointer text-left">General Medicine & Diabetes</button>
              </li>
              <li>
                <button onClick={() => { setSelectedSpecialtyFilter('Child Health'); setCurrentTab('specialties'); }} className="hover:text-[#0F4C81] transition cursor-pointer text-left">Pediatrics & Neonatology</button>
              </li>
              <li>
                <button onClick={() => { setSelectedSpecialtyFilter('Bone & Joint'); setCurrentTab('specialties'); }} className="hover:text-[#0F4C81] transition cursor-pointer text-left">Orthopedics & Joint Surgery</button>
              </li>
              <li>
                <button onClick={() => { setSelectedSpecialtyFilter('Skin & Hair'); setCurrentTab('specialties'); }} className="hover:text-[#0F4C81] transition cursor-pointer text-left">Dermatology & Skin Care</button>
              </li>
              <li>
                <button onClick={() => { setSelectedSpecialtyFilter('Cardiovascular'); setCurrentTab('specialties'); }} className="hover:text-[#0F4C81] transition cursor-pointer text-left">Cardiology & Heart Care</button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Support */}
          <div className="space-y-3">
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider">Legal & Support</h4>
            <ul className="space-y-2 text-slate-600 font-medium">
              <li>
                <button onClick={() => setCurrentTab('terms')} className="hover:text-[#0F4C81] transition cursor-pointer text-left">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('privacy')} className="hover:text-[#0F4C81] transition cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
            </ul>

            <div className="pt-2 space-y-1 border-t border-slate-200">
              <p className="font-black text-slate-900 text-xs">Helpdesk Helpline</p>
              <p className="text-[11px] font-mono text-[#0F4C81] font-bold">1800-SEVA-CLINIC (7382-723)</p>
              <p className="text-[11px] text-slate-500">support@sevasadanclinic.in</p>
            </div>
          </div>

        </div>

        {/* 3. BOTTOM COPYRIGHT BAR WITH ASG SOLUTIONS LOGO CREDIT */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-2">
          
          <p>© 2026 SevaArogyam Health Care Network. All rights reserved.</p>

          {/* Authentic Built by ASG Solutions Logo */}
          <div className="flex items-center gap-2.5">
            <span className="text-slate-500 text-xs font-medium">Built by</span>
            <a 
              href="https://asgsolutions.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-90 transition cursor-pointer"
              title="ASG Solutions"
            >
              <img 
                src="/asg-solutions-logo.svg" 
                alt="ASG Solutions Logo" 
                className="h-9 sm:h-10 w-auto object-contain" 
              />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};
