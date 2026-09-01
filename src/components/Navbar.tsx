import React, { useState } from 'react';
import { 
  Building2, 
  Globe, 
  UserCheck, 
  Stethoscope, 
  ShieldAlert, 
  Video, 
  Calendar, 
  LogOut,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  User,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { 
    currentUser, 
    activeRole, 
    switchRole, 
    language, 
    setLanguage, 
    activeBranchId, 
    setActiveBranchId, 
    clinics, 
    openAuthModal, 
    logout,
    openBookingModal
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole;
    switchRole(newRole);
    if (newRole === 'DOCTOR') setCurrentTab('doctor-console');
    else if (newRole === 'ADMIN') setCurrentTab('admin');
    else setCurrentTab('home');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      
      {/* Top Banner: Emergency Helpline, Branches Ticker & Persona Switcher */}
      <div className="bg-gradient-to-r from-[#0B2545] via-[#0F4C81] to-[#0A365C] text-white text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          
          {/* Emergency & Branches */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium bg-rose-500/20 text-rose-200 px-2.5 py-0.5 rounded-full border border-rose-500/30">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
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

          {/* Controls: Language & Role Switcher */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition text-slate-100 border border-white/10 font-semibold"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-teal-300" />
              <span>{language === 'en' ? 'हिन्दी (Hindi)' : 'English'}</span>
            </button>

            {/* Persona Quick Switcher Pill */}
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-2.5 py-1 rounded-lg text-xs font-extrabold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden sm:inline">{language === 'en' ? 'Switch Role:' : 'रोल:'}</span>
              <select
                value={activeRole}
                onChange={handleRoleChange}
                className="bg-transparent font-black cursor-pointer outline-none text-slate-950 text-xs"
              >
                <option value="PATIENT" className="text-slate-900 bg-white">Patient Portal</option>
                <option value="DOCTOR" className="text-slate-900 bg-white">Doctor Console</option>
                <option value="ADMIN" className="text-slate-900 bg-white">Central Admin</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
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

        {/* Location Dropdown Filter */}
        <div className="hidden xl:flex items-center gap-2 bg-slate-100/90 border border-slate-200/90 rounded-xl px-3.5 py-2 hover:border-[#0F4C81] transition">
          <Building2 className="w-4 h-4 text-[#0F4C81]" />
          <span className="text-xs text-slate-500 font-semibold">{language === 'en' ? 'Clinic:' : 'शाखा:'}</span>
          <select
            value={activeBranchId}
            onChange={(e) => setActiveBranchId(e.target.value)}
            className="bg-transparent text-xs font-extrabold text-slate-900 outline-none cursor-pointer pr-1"
          >
            <option value="all">{language === 'en' ? 'All 3 Branches' : 'सभी 3 शाखाएँ'}</option>
            {clinics.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentTab === 'home' 
                ? 'bg-[#0F4C81]/10 text-[#0F4C81] border border-[#0F4C81]/20 font-black' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {language === 'en' ? 'Home' : 'मुख्य पृष्ठ'}
          </button>

          <button
            onClick={() => setCurrentTab('doctors')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentTab === 'doctors' 
                ? 'bg-[#0F4C81]/10 text-[#0F4C81] border border-[#0F4C81]/20 font-black' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {language === 'en' ? 'Doctor Directory' : 'डॉक्टर निर्देशिका'}
          </button>

          <button
            onClick={() => setCurrentTab('telemedicine')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentTab === 'telemedicine' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-black' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Video className="w-4 h-4 text-emerald-600" />
            <span>{language === 'en' ? 'Video Room' : 'वीडियो रूम'}</span>
          </button>

          {activeRole === 'PATIENT' && (
            <button
              onClick={() => setCurrentTab('patient-dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'patient-dashboard' 
                  ? 'bg-[#0F4C81]/10 text-[#0F4C81] border border-[#0F4C81]/20 font-black' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {language === 'en' ? 'My Dashboard' : 'मेरा डैशबोर्ड'}
            </button>
          )}

          {activeRole === 'DOCTOR' && (
            <button
              onClick={() => setCurrentTab('doctor-console')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-800 border border-emerald-300 hover:bg-emerald-500/20 transition`}
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'en' ? 'Doctor Console' : 'डॉक्टर कंसोल'}</span>
            </button>
          )}

          {activeRole === 'ADMIN' && (
            <button
              onClick={() => setCurrentTab('admin')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-900 border border-amber-300 hover:bg-amber-500/20 transition`}
            >
              <span>{language === 'en' ? 'Central Admin' : 'सेंट्रल एडमिन'}</span>
            </button>
          )}
        </nav>

        {/* Action Buttons & User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => openBookingModal()}
            className="bg-gradient-to-r from-[#0F4C81] via-[#0B2545] to-[#10B981] hover:opacity-95 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg hover:shadow-emerald-500/20 transition-all hover:scale-105 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-emerald-300" />
            <span>{language === 'en' ? 'Book Appointment' : 'अपॉइंटमेंट बुक करें'}</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="text-right hidden md:block">
                <p className="text-xs font-black text-slate-900 leading-tight">
                  {(currentUser as any).name || 'User'}
                </p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  {currentUser.role}
                </p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-1.5 border border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition"
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
              onClick={() => { setCurrentTab('doctors'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              Doctors & Slots
            </button>
            <button
              onClick={() => { setCurrentTab('telemedicine'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50"
            >
              Video Tele-OPD
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
          </div>
        </div>
      )}

    </header>
  );
};
