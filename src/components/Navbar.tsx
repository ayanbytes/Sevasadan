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
  ShieldCheck,
  Video
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
    openBookingModal,
    setActiveBranchId
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      
      {/* Top Banner: Emergency Helpline & Language Switcher (Hidden on Mobile View) */}
      <div className="hidden sm:block bg-gradient-to-r from-[#0B2545] via-[#0F4C81] to-[#0A365C] text-white text-xs py-1 px-3 border-b border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-2">
          
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
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F4C81] via-[#0B2545] to-[#10B981] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all">
            <Stethoscope className="w-5.5 h-5.5 text-emerald-300" />
          </div>
          <span className="font-black text-2xl text-[#0B2545] tracking-tight group-hover:text-[#0F4C81] transition-colors">
            SEVASADAN
          </span>
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
                  onClick={() => { setActiveBranchId('sarangpur'); setCurrentTab('locations'); }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-sky-50/80 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <span>Sarangpur OPD Branch</span>
                  <Building2 className="w-3.5 h-3.5 text-[#0F4C81]" />
                </button>
                <button
                  onClick={() => { setActiveBranchId('shujalpur'); setCurrentTab('locations'); }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-sky-50/80 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <span>Shujalpur Mandi Branch</span>
                  <Building2 className="w-3.5 h-3.5 text-[#0F4C81]" />
                </button>
                <button
                  onClick={() => { setActiveBranchId('rajgarh'); setCurrentTab('locations'); }}
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

          {/* Video Consultation Tab Button */}
          <button
            onClick={() => {
              setCurrentTab('telemedicine');
              openBookingModal(undefined, undefined, 'VIDEO');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'telemedicine' 
                ? 'bg-gradient-to-r from-[#0F4C81] to-[#0B2545] text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-emerald-500" />
            <span>{language === 'en' ? 'Video Consultation' : 'वीडियो परामर्श'}</span>
          </button>

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
              <span>{language === 'en' ? 'Doctor Portal' : 'डॉक्टर पोर्टल'}</span>
            </button>
          )}

          {activeRole === 'DESK_STAFF' && (
            <button
              onClick={() => setCurrentTab('desk-staff-dashboard')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap bg-purple-500/10 text-purple-900 border border-purple-300 hover:bg-purple-500/20 transition cursor-pointer`}
            >
              <UserCheck className="w-4 h-4 text-purple-600" />
              <span>{language === 'en' ? 'Desk Staff Portal' : 'डेस्क स्टाफ पोर्टल'}</span>
            </button>
          )}

          {activeRole === 'ADMIN' && (
            <button
              onClick={() => setCurrentTab('admin')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap bg-amber-500/10 text-amber-900 border border-amber-300 hover:bg-amber-500/20 transition cursor-pointer`}
            >
              <span>{language === 'en' ? 'Admin Portal' : 'एडमिन पोर्टल'}</span>
            </button>
          )}
        </nav>

        {/* Professional Sidebar Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="bg-gradient-to-r from-[#0F4C81] to-[#0B2545] hover:opacity-95 text-white px-4 py-2 rounded-xl text-xs font-black shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <Menu className="w-4 h-4 text-emerald-300" />
            <span>{language === 'en' ? 'Menu' : 'मेनू'}</span>
          </button>
        </div>

      </div>

      {/* ASG SOLUTIONS STYLE CLEAN OVERLAY SIDEBAR (SOLID OPAQUE) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#E5E7EB] flex flex-col justify-between p-6 sm:p-10 animate-fade-in text-slate-800 min-h-screen overflow-y-auto">
          
          {/* Top Bar: Logo Left, Close Icon Right */}
          <div className="w-full flex items-center justify-between max-w-4xl mx-auto">
            <div 
              onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F4C81] via-[#0B2545] to-[#10B981] flex items-center justify-center text-white shadow-md">
                <Stethoscope className="w-5.5 h-5.5 text-emerald-300" />
              </div>
              <div className="text-left">
                <span className="font-black text-xl text-[#0B2545] tracking-tight block leading-tight">
                  SEVASADAN
                </span>
                <span className="text-[10px] text-slate-500 font-extrabold tracking-wider uppercase block">
                  Health Care Network
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-700 hover:text-slate-950 transition cursor-pointer"
              title="Close Menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Centered Vertical Navigation Menu List (ASG Style) */}
          <div className="my-auto flex flex-col items-center justify-center space-y-5 sm:space-y-6 text-center">
            
            <button
              onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
              className={`text-lg sm:text-2xl font-bold transition cursor-pointer ${
                currentTab === 'home' ? 'text-emerald-700 font-black scale-105' : 'text-slate-700 hover:text-[#0F4C81]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => { setCurrentTab('about'); setMobileMenuOpen(false); }}
              className={`text-lg sm:text-2xl font-bold transition cursor-pointer ${
                currentTab === 'about' ? 'text-emerald-700 font-black scale-105' : 'text-slate-700 hover:text-[#0F4C81]'
              }`}
            >
              About Dr. Ankur Deshwali
            </button>

            <button
              onClick={() => { setCurrentTab('specialties'); setMobileMenuOpen(false); }}
              className={`text-lg sm:text-2xl font-bold transition cursor-pointer ${
                currentTab === 'specialties' ? 'text-emerald-700 font-black scale-105' : 'text-slate-700 hover:text-[#0F4C81]'
              }`}
            >
              Specialties
            </button>

            <button
              onClick={() => { setCurrentTab('locations'); setMobileMenuOpen(false); }}
              className={`text-lg sm:text-2xl font-bold transition cursor-pointer ${
                currentTab === 'locations' ? 'text-emerald-700 font-black scale-105' : 'text-slate-700 hover:text-[#0F4C81]'
              }`}
            >
              Locations & Facilities
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="text-lg sm:text-2xl font-black text-emerald-800 hover:text-emerald-950 transition cursor-pointer bg-emerald-100 hover:bg-emerald-200 px-7 py-2.5 rounded-2xl border border-emerald-300 shadow-xs"
            >
              Book OPD Appointment
            </button>

            {/* Role Portals & Quick Switcher */}
            <div className="pt-5 flex flex-wrap items-center justify-center gap-4 text-xs font-extrabold border-t border-slate-300/80 w-full max-w-sm">
              <button
                onClick={() => { setCurrentTab('doctor-console'); setMobileMenuOpen(false); }}
                className="text-slate-700 hover:text-emerald-800 transition"
              >
                Doctor Portal
              </button>
              <span className="text-slate-400">•</span>
              <button
                onClick={() => { setCurrentTab('desk-staff-dashboard'); setMobileMenuOpen(false); }}
                className="text-slate-700 hover:text-purple-800 transition"
              >
                Desk Staff
              </button>
              <span className="text-slate-400">•</span>
              <button
                onClick={() => { setCurrentTab('admin'); setMobileMenuOpen(false); }}
                className="text-slate-700 hover:text-amber-800 transition"
              >
                Admin Panel
              </button>
            </div>

            {/* User Account Controls inside Sidebar Drawer */}
            {currentUser ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="mt-3 inline-flex items-center gap-2 bg-rose-100 hover:bg-rose-600 text-rose-800 hover:text-white border border-rose-300 px-6 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout ({currentUser.name})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="mt-3 inline-flex items-center gap-2 bg-[#0F4C81] hover:bg-[#0B2545] text-white px-6 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md"
              >
                <User className="w-4 h-4" />
                <span>{language === 'en' ? 'OTP Login' : 'ओटीपी लॉगिन'}</span>
              </button>
            )}

          </div>

          {/* Bottom Footer Bar */}
          <div className="w-full text-center text-xs text-slate-500 font-semibold max-w-4xl mx-auto">
            <p>© 2026 SEVASADAN Health Care Network • Sarangpur • Shujalpur • Rajgarh</p>
          </div>

        </div>
      )}

    </header>
  );
};
