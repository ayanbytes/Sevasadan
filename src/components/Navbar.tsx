import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  Video,
  Home,
  Info,
  Award,
  GraduationCap,
  Share2,
  ArrowRight
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
    openAdminAuthModal,
    isAdminAuthenticated, 
    logout,
    openBookingModal,
    setActiveBranchId
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Prevent background scrolling (hero section bleed) when sidebar menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
            SevaArogyam
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
                  <span>SevaArogyam Overview</span>
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

          {/* SevaArogyam Care Services */}
          <div className="relative group">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                ['pharmacy', 'diagnostics', 'laboratory'].includes(currentTab)
                  ? 'bg-gradient-to-r from-[#0F4C81] to-[#0B2545] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
              }`}
            >
              <span>{language === 'en' ? 'Care Services' : 'देखभाल सेवाएं'}</span>
              <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180 opacity-70" />
            </button>
            <div className={`${servicesOpen ? 'block' : 'hidden'} absolute top-full left-0 pt-2 w-52 z-50`}>
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-slate-200/90 space-y-1">
                {[
                  ['pharmacy', language === 'en' ? 'Pharmacy' : 'फार्मेसी'],
                  ['diagnostics', language === 'en' ? 'Diagnostics' : 'डायग्नोस्टिक्स'],
                  ['laboratory', language === 'en' ? 'Laboratory' : 'प्रयोगशाला']
                ].map(([tab, label]) => (
                  <button key={tab} onClick={() => setCurrentTab(tab)} className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50/80 text-xs font-bold text-slate-800 transition cursor-pointer">
                    {label}
                  </button>
                ))}
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

      {/* REALISTIC HIGH-END HOSPITAL SIDEBAR DRAWER (Rendered via React Portal to document.body) */}
      {mobileMenuOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex justify-end animate-in fade-in duration-150">
          {/* Opaque Backdrop Blur Overlay (Locks scroll & completely covers viewport) */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity" 
          />

          {/* Realistic Clean Sidebar Panel */}
          <aside className="relative w-full max-w-sm sm:max-w-md h-full bg-white text-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-l border-slate-200">
            
            {/* Realistic Top Header: Deep Navy Hospital Branding */}
            <div className="bg-[#0B2545] text-white p-5 flex items-center justify-between shadow-md shrink-0">
              <div 
                onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                  <Stethoscope className="w-5.5 h-5.5 text-white" />
                </div>
                <div>
                  <span className="font-black text-lg text-white tracking-tight block leading-tight">
                    SevaArogyam
                  </span>
                  <span className="text-[10px] text-emerald-300 font-bold tracking-wider uppercase block">
                    Multi-Specialty Hospital
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                title="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Main Content Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">

              {/* Realistic User Profile Section (If Logged In) */}
              {currentUser && (
                <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0F4C81] text-white font-bold text-base flex items-center justify-center shadow-xs">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
                        {currentUser.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {activeRole || 'Patient'}
                        </span>
                        {currentUser.phone && (
                          <span className="text-[11px] text-slate-500 font-medium">
                            {currentUser.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Active Session" />
                </div>
              )}

              {/* Main Navigation Links */}
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 mb-2">
                  {language === 'en' ? 'Main Menu' : 'मुख्य मेनू'}
                </p>

                {[
                  { id: 'home', labelEn: 'Home', labelHi: 'मुख्य पृष्ठ', icon: Home },
                  { id: 'about', labelEn: 'About Us', labelHi: 'हमारे बारे में', icon: Info },
                  { id: 'specialties', labelEn: 'Specialties', labelHi: 'विशेषज्ञताएँ', icon: Award },
                  { id: 'locations', labelEn: 'Locations & Facilities', labelHi: 'शाखाएँ एवं सुविधाएं', icon: Building2 },
                  { id: 'training', labelEn: 'Training & Courses', labelHi: 'प्रशिक्षण और कोर्स', icon: GraduationCap },
                  { id: 'referrals', labelEn: 'Refer & Earn', labelHi: 'रेफर करें और कमाएं', icon: Share2 },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setCurrentTab(item.id); setMobileMenuOpen(false); }}
                      className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-sky-50 text-[#0F4C81] border-l-4 border-[#0F4C81] shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#0F4C81]' : 'text-slate-400'}`} />
                        <span>{language === 'en' ? item.labelEn : item.labelHi}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#0F4C81] translate-x-1' : 'text-slate-300'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Realistic Primary Callout: Book OPD Appointment */}
              <div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBookingModal();
                  }}
                  className="w-full bg-gradient-to-r from-[#0F4C81] to-[#0B2545] hover:from-[#0B2545] hover:to-[#081B33] text-white p-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-emerald-300" />
                    </div>
                    <span>{language === 'en' ? 'Book OPD Appointment' : 'ओपीडी अपॉइंटमेंट बुक करें'}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-300" />
                </button>
              </div>

              {/* Realistic Portal Shortcuts Section */}
              <div className="pt-3 space-y-2 border-t border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 mb-1">
                  {language === 'en' ? 'Hospital Portals' : 'अस्पताल पोर्टल'}
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => { setCurrentTab('doctor-console'); setMobileMenuOpen(false); }}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-center transition cursor-pointer"
                  >
                    <span className="block text-xs font-bold text-slate-800">Doctor</span>
                    <span className="block text-[10px] text-slate-500">Portal</span>
                  </button>
                  <button
                    onClick={() => { setCurrentTab('desk-staff-dashboard'); setMobileMenuOpen(false); }}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-center transition cursor-pointer"
                  >
                    <span className="block text-xs font-bold text-slate-800">Desk Staff</span>
                    <span className="block text-[10px] text-slate-500">Portal</span>
                  </button>
                  <button
                    onClick={() => { 
                      setMobileMenuOpen(false); 
                      if (!isAdminAuthenticated) {
                        openAdminAuthModal();
                      } else {
                        setCurrentTab('admin'); 
                      }
                    }}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-center transition cursor-pointer"
                  >
                    <span className="block text-xs font-bold text-slate-800">Admin</span>
                    <span className="block text-[10px] text-slate-500">Panel</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Actions & Footer Block */}
            <div className="p-5 border-t border-slate-200 bg-slate-50/80 space-y-3.5 shrink-0">
              {currentUser ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{language === 'en' ? 'Logout' : 'लॉगआउट'}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full bg-[#0F4C81] hover:bg-[#0B2545] text-white py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <User className="w-4 h-4" />
                  <span>{language === 'en' ? 'OTP Login' : 'ओटीपी लॉगिन'}</span>
                </button>
              )}

              {/* 24x7 Helpline Info Badge */}
              <div className="flex items-center justify-between text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="flex items-center gap-1.5 text-rose-600 font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
                  <span>24x7 Helpline:</span>
                </span>
                <a href="tel:1800-7382-723" className="font-extrabold text-slate-900 hover:text-[#0F4C81] underline">
                  1800-SEVA-CLINIC
                </a>
              </div>

              <div className="text-center text-[11px] text-slate-400 font-medium">
                NABH Accredited • Sarangpur • Shujalpur • Rajgarh
              </div>
            </div>

          </aside>
        </div>,
        document.body
      )}

    </header>
  );
};
