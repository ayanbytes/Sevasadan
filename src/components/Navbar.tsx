import React, { useState } from 'react';
import { 
  Building2, 
  Globe, 
  UserCheck, 
  Stethoscope, 
  ShieldAlert, 
  Calendar, 
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  User,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { 
    currentUser, 
    activeRole, 
    language, 
    setLanguage, 
    openAuthModal, 
    logout,
    openBookingModal
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      
      {/* Top Banner: Emergency Helpline & Language Switcher */}
      <div className="bg-gradient-to-r from-[#0B2545] via-[#0F4C81] to-[#0A365C] text-white text-xs py-1 px-3 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          {/* Emergency & Branches */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium bg-rose-500/20 text-rose-200 px-2 py-0.5 rounded-full border border-rose-500/30">
              <ShieldAlert className="w-3 h-3 text-rose-300 animate-pulse" />
              <span>{language === 'en' ? '24x7 Helpline:' : '24x7 हेल्पलाइन:'}</span>
              <a href="tel:1800-7382-723" className="font-extrabold underline text-white hover:text-amber-300">
                1800-SEVA-CLINIC (1800-7382-723)
              </a>
            </span>

            <span className="hidden lg:flex items-center gap-2 text-slate-300 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>NABH Accredited OPD • Sarangpur • Shujalpur • Rajgarh</span>
            </span>
          </div>

          {/* Controls: Language Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-lg transition text-slate-100 border border-white/10 font-semibold"
              title="Toggle Language"
            >
              <Globe className="w-3 h-3 text-teal-300" />
              <span>{language === 'en' ? 'हिन्दी (Hindi)' : 'English'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0F4C81] via-[#0B2545] to-[#10B981] flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-all">
            <Stethoscope className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl text-[#0B2545] tracking-tight group-hover:text-[#0F4C81] transition-colors">
                SEVASADAN
              </span>
              <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Clinic & Tele-OPD
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold">
              {language === 'en' ? 'Sarangpur • Shujalpur • Rajgarh & Virtual Telehealth' : 'सारंगपुर • शुजालपुर • राजगढ़ एवं डिजिटल ओपीडी'}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links - Segmented Pill Bar */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'home' 
                ? 'bg-gradient-to-r from-[#0F4C81] to-[#0B2545] text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
            }`}
          >
            <span>{language === 'en' ? 'Home' : 'मुख्य पृष्ठ'}</span>
          </button>

          {/* About Us with Hover Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setCurrentTab('about')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'about' 
                  ? 'bg-gradient-to-r from-[#0F4C81] to-[#0B2545] text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
              }`}
            >
              <span>{language === 'en' ? 'About Us' : 'हमारे बारे में'}</span>
              <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180 opacity-70" />
            </button>

            {/* Hover Menu */}
            <div className="hidden group-hover:block absolute top-full left-0 pt-2 w-60 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-slate-200/90 space-y-1">
                <button
                  onClick={() => setCurrentTab('about')}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100/90 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <span>SEVASADAN Overview</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => setCurrentTab('about')}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100/90 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <span>NABH Quality Standards</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                </button>
                <button
                  onClick={() => setCurrentTab('about')}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100/90 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <span>Clinical Leadership Board</span>
                  <UserCheck className="w-3.5 h-3.5 text-sky-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Specialties with Hover Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setCurrentTab('specialties')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'specialties' 
                  ? 'bg-gradient-to-r from-[#0F4C81] to-[#0B2545] text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
              }`}
            >
              <span>{language === 'en' ? 'Specialties' : 'विशेषज्ञताएँ'}</span>
              <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180 opacity-70" />
            </button>

            {/* Hover Menu */}
            <div className="hidden group-hover:block absolute top-full left-0 pt-2 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-slate-200/90 space-y-1">
                <button
                  onClick={() => setCurrentTab('specialties')}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50/80 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <span>General Medicine & Diabetes</span>
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                </button>
                <button
                  onClick={() => setCurrentTab('specialties')}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50/80 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <span>Pediatrics & Neonatology</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => setCurrentTab('specialties')}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50/80 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <span>Orthopedics & Joint Surgery</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => setCurrentTab('specialties')}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50/80 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <span>Dermatology & Skin Care</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => setCurrentTab('specialties')}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50/80 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <span>Cardiology & Heart Care</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Locations & Facilities with Hover Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setCurrentTab('locations')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'locations' 
                  ? 'bg-gradient-to-r from-[#0F4C81] to-[#0B2545] text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
              }`}
            >
              <span>{language === 'en' ? 'Locations & Facilities' : 'शाखाएँ एवं सुविधाएं'}</span>
              <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180 opacity-70" />
            </button>

            {/* Hover Menu */}
            <div className="hidden group-hover:block absolute top-full left-0 pt-2 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-slate-200/90 space-y-1">
                <button
                  onClick={() => setCurrentTab('locations')}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-sky-50/80 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <span>Sarangpur OPD Branch</span>
                  <Building2 className="w-3.5 h-3.5 text-[#0F4C81]" />
                </button>
                <button
                  onClick={() => setCurrentTab('locations')}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-sky-50/80 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <span>Shujalpur Mandi Branch</span>
                  <Building2 className="w-3.5 h-3.5 text-[#0F4C81]" />
                </button>
                <button
                  onClick={() => setCurrentTab('locations')}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-sky-50/80 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <span>Rajgarh Multi-Specialty Hospital</span>
                  <Building2 className="w-3.5 h-3.5 text-[#0F4C81]" />
                </button>
                <button
                  onClick={() => setCurrentTab('locations')}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-sky-50/80 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <span>24x7 Emergency & Pathology Lab</span>
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                </button>
              </div>
            </div>
          </div>

          {/* My Dashboard with Hover Dropdown (when Patient logged in) */}
          {activeRole === 'PATIENT' && (
            <div className="relative group">
              <button
                onClick={() => setCurrentTab('patient-dashboard')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'patient-dashboard' 
                    ? 'bg-gradient-to-r from-[#0F4C81] to-[#0B2545] text-white shadow-md' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
                }`}
              >
                <span>{language === 'en' ? 'My Dashboard' : 'मेरा डैशबोर्ड'}</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180 opacity-70" />
              </button>

              {/* Hover Menu */}
              <div className="hidden group-hover:block absolute top-full left-0 pt-2 w-60 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-slate-200/90 space-y-1">
                  <button
                    onClick={() => setCurrentTab('patient-dashboard')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100/90 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                  >
                    <span>My OPD Tokens</span>
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  </button>
                  <button
                    onClick={() => setCurrentTab('patient-dashboard')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100/90 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                  >
                    <span>Digital Prescriptions</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeRole === 'DOCTOR' && (
            <button
              onClick={() => setCurrentTab('doctor-console')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap bg-emerald-500/10 text-emerald-800 border border-emerald-300 hover:bg-emerald-500/20 transition cursor-pointer`}
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'en' ? 'Doctor Console' : 'डॉक्टर कंसोल'}</span>
            </button>
          )}

          {activeRole === 'ADMIN' && (
            <button
              onClick={() => setCurrentTab('admin')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap bg-amber-500/10 text-amber-900 border border-amber-300 hover:bg-amber-500/20 transition cursor-pointer`}
            >
              <span>{language === 'en' ? 'Central Admin' : 'सेंट्रल एडमिन'}</span>
            </button>
          )}
        </nav>

        {/* Action Buttons & Impressive User Logout Control */}
        <div className="flex items-center gap-3 shrink-0">
          
          <button
            onClick={() => openBookingModal()}
            className="bg-gradient-to-r from-[#0F4C81] via-[#0B2545] to-[#10B981] hover:opacity-95 text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black shadow-md hover:shadow-emerald-500/20 transition-all hover:scale-105 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-emerald-300" />
            <span>{language === 'en' ? 'Book Appointment' : 'अपॉइंटमेंट बुक करें'}</span>
          </button>

          {currentUser ? (
            <button
              onClick={logout}
              className="bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200/80 px-4 py-2 rounded-xl text-xs font-black shadow-xs hover:shadow-rose-500/20 transition-all flex items-center gap-2 group cursor-pointer"
              title="Sign Out of Account"
            >
              <LogOut className="w-4 h-4 text-rose-600 group-hover:text-white transition-colors" />
              <span>{language === 'en' ? 'Logout' : 'लॉगआउट'}</span>
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-[#0F4C81] text-[#0F4C81] hover:text-white border border-[#0F4C81]/30 px-4 py-2 rounded-xl text-xs font-black shadow-2xs transition"
            >
              <User className="w-4 h-4" />
              <span>{language === 'en' ? 'OTP Login' : 'ओटीपी लॉगिन'}</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-3 animate-fade-in">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentTab('about'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              About Us
            </button>
            <button
              onClick={() => { setCurrentTab('specialties'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              Specialties
            </button>
            <button
              onClick={() => { setCurrentTab('locations'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              Locations & Facilities
            </button>
            {activeRole === 'PATIENT' && (
              <button
                onClick={() => { setCurrentTab('patient-dashboard'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                My Patient Dashboard
              </button>
            )}
            {activeRole === 'DOCTOR' && (
              <button
                onClick={() => { setCurrentTab('doctor-console'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-lg text-xs font-bold text-emerald-900 bg-emerald-100"
              >
                Doctor Console
              </button>
            )}
            {activeRole === 'ADMIN' && (
              <button
                onClick={() => { setCurrentTab('admin'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-lg text-xs font-bold text-amber-950 bg-amber-100"
              >
                Admin Panel
              </button>
            )}

            {currentUser && (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-lg text-xs font-extrabold text-rose-600 bg-rose-50 border border-rose-200 flex items-center gap-2 mt-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout ({currentUser.name})</span>
              </button>
            )}
          </div>
        </div>
      )}

    </header>
  );
};
