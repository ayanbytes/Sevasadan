import React, { useState } from 'react';
import { X, Phone, Lock, CheckCircle2, User, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OtpAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, openAdminAuthModal, loginWithPhoneOtp, loginWithEmailAndPassword, language } = useApp();

  const [authMode, setAuthMode] = useState<'OTP' | 'STAFF_EMAIL'>('OTP');
  const [step, setStep] = useState<'PHONE' | 'OTP' | 'PROFILE'>('PHONE');
  const [phone, setPhone] = useState<string>('9826198261');
  const [otp, setOtp] = useState<string>('123456');
  const [name, setName] = useState<string>('');
  
  // Staff Email login state
  const [emailOrLoginId, setEmailOrLoginId] = useState<string>('dr.ankur@sevasadanclinic.in');
  const [staffPassword, setStaffPassword] = useState<string>('Doc@sevasadan2026');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError(language === 'en' ? 'Please enter a valid 10-digit phone number' : 'कृपया वैध 10-अंकीय मोबाइल नंबर दर्ज करें');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('OTP');
    }, 600);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError(language === 'en' ? 'Please enter the 6-digit OTP' : 'कृपया 6-अंकीय ओटीपी दर्ज करें');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await loginWithPhoneOtp(phone, otp, undefined, name);
      setLoading(false);
      if (res.isNew && !name) {
        setStep('PROFILE');
      } else {
        closeAuthModal();
        resetForm();
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'OTP verification failed');
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await loginWithPhoneOtp(phone, otp, undefined, name);
    setLoading(false);
    closeAuthModal();
    resetForm();
  };

  const handleStaffEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginWithEmailAndPassword(emailOrLoginId, staffPassword);
      setLoading(false);
      if (res.success) {
        closeAuthModal();
        resetForm();
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Login error');
    }
  };

  const resetForm = () => {
    setAuthMode('OTP');
    setStep('PHONE');
    setPhone('9826198261');
    setOtp('123456');
    setName('');
    setEmailOrLoginId('dr.ankur@sevasadanclinic.in');
    setStaffPassword('Doc@sevasadan2026');
    setError('');
  };

  const quickFillDemo = (demoPhone: string) => {
    setPhone(demoPhone);
    setOtp('123456');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-[#0F4C81] text-white p-5 flex items-center justify-between relative">
          <div>
            <span className="bg-emerald-400/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              {language === 'en' ? 'Passwordless Mobile Auth' : 'पासवर्ड-रहित मोबाइल साइन इन'}
            </span>
            <h3 className="font-extrabold text-xl tracking-tight mt-1">SEVASADAN Portal</h3>
          </div>
          <button 
            onClick={() => { closeAuthModal(); resetForm(); }}
            className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">

          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => { setAuthMode('OTP'); setError(''); }}
              className={`flex-1 py-2 rounded-lg transition cursor-pointer ${
                authMode === 'OTP' ? 'bg-white text-[#0F4C81] shadow-xs font-black' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {language === 'en' ? 'Patient Phone OTP' : 'मरीज फोन ओटीपी'}
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('STAFF_EMAIL'); setError(''); }}
              className={`flex-1 py-2 rounded-lg transition cursor-pointer ${
                authMode === 'STAFF_EMAIL' ? 'bg-white text-emerald-800 shadow-xs font-black' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {language === 'en' ? 'Doctor / Staff Email Login' : 'डॉक्टर / स्टाफ ईमेल लॉगिन'}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Phone Input (Patient OTP) */}
          {authMode === 'OTP' && step === 'PHONE' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {language === 'en' ? 'Mobile Number' : 'मोबाइल नंबर'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs font-bold text-slate-700 ml-1.5">+91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98261 98261"
                    className="w-full pl-16 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81] focus:bg-white transition"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {language === 'en' 
                    ? 'We will send a 6-digit OTP for instant access.' 
                    : 'हम त्वरित पहुँच के लिए 6-अंकीय ओटीपी भेजेंगे।'}
                </p>
              </div>

              {/* Demo Quick Fill Buttons */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2">
                <p className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'en' ? 'Quick Demo Autofill:' : 'त्वरित डेमो ऑटो-फिल:'}</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => quickFillDemo('9826198261')}
                    className="text-[11px] bg-white border border-slate-300 hover:border-[#0F4C81] px-2.5 py-1 rounded-lg font-medium text-slate-700 hover:text-[#0F4C81] transition"
                  >
                    Patient (Rameshwar)
                  </button>
                  <button
                    type="button"
                    onClick={() => quickFillDemo('9900000001')}
                    className="text-[11px] bg-white border border-slate-300 hover:border-emerald-600 px-2.5 py-1 rounded-lg font-medium text-slate-700 hover:text-emerald-700 transition"
                  >
                    Doctor (Dr. Rajesh)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F4C81] hover:bg-[#0A365C] text-white font-bold py-3 rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>{language === 'en' ? 'Get Verification Code' : 'ओटीपी प्राप्त करें'}</span>
                  </>
                )}
              </button>

              <div className="pt-2 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => {
                    closeAuthModal();
                    openAdminAuthModal();
                  }}
                  className="text-xs font-bold text-[#0F4C81] hover:text-[#0B2545] underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'en' ? 'Hospital Administrator? Sign in with Admin Email' : 'अस्पताल प्रशासक? ईमेल आईडी से लॉगिन करें'}</span>
                </button>
              </div>
            </form>
          )}

          {/* DOCTOR / DESK STAFF EMAIL & PASSWORD LOGIN MODE */}
          {authMode === 'STAFF_EMAIL' && (
            <form onSubmit={handleStaffEmailLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {language === 'en' ? 'Email Address or Login ID' : 'ईमेल आईडी या लॉगिन आईडी'}
                </label>
                <input
                  type="text"
                  value={emailOrLoginId}
                  onChange={(e) => setEmailOrLoginId(e.target.value)}
                  placeholder="e.g. dr.ankur@sevasadanclinic.in or DOC-2026-001"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {language === 'en' ? 'Protected Password' : 'पासवर्ड'}
                </label>
                <input
                  type="password"
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              {/* Demo Fill Quick Buttons */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Demo Login Credentials:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEmailOrLoginId('dr.ankur@sevasadanclinic.in');
                      setStaffPassword('Doc@sevasadan2026');
                    }}
                    className="text-[10px] bg-white border border-emerald-300 text-emerald-800 font-bold px-2 py-1 rounded-lg"
                  >
                    Dr. Ankur (Doctor)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailOrLoginId('desk.sarangpur@sevasadanclinic.in');
                      setStaffPassword('Staff@sevasadan2026');
                    }}
                    className="text-[10px] bg-white border border-purple-300 text-purple-800 font-bold px-2 py-1 rounded-lg"
                  >
                    Desk Staff (Sarangpur)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span>{language === 'en' ? 'Log Into Portal' : 'पोर्टल में लॉगिन करें'}</span>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: OTP Entry */}
          {step === 'OTP' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800">
                  {language === 'en' ? 'Verify OTP Code' : 'ओटीपी कोड दर्ज करें'}
                </h4>
                <p className="text-xs text-slate-500">
                  Sent to <strong className="text-slate-800">+91 {phone}</strong>
                  <button 
                    type="button" 
                    onClick={() => setStep('PHONE')}
                    className="ml-2 text-xs font-bold text-[#0F4C81] hover:underline"
                  >
                    Edit
                  </button>
                </p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full text-center text-2xl font-mono tracking-widest py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81] focus:bg-white"
                  autoFocus
                />
                <p className="text-center text-[11px] text-emerald-600 font-semibold mt-2 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Demo Code: <strong>123456</strong></span>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#10B981] hover:bg-emerald-600 text-slate-900 font-extrabold py-3 rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span>{language === 'en' ? 'Verify & Continue' : 'सत्यापित करें और आगे बढ़ें'}</span>
                )}
              </button>
            </form>
          )}

          {/* STEP 3: New Patient Quick Profile */}
          {step === 'PROFILE' && (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800">
                  {language === 'en' ? 'Welcome to SEVASADAN!' : 'सेवासदन में आपका स्वागत है!'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'en' ? 'New Patient detected. Please enter your name.' : 'नया मरीज। कृपया अपना नाम दर्ज करें।'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {language === 'en' ? 'Full Name' : 'पूरा नाम'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Radheshyam Sharma"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F4C81] hover:bg-[#0A365C] text-white font-bold py-3 rounded-xl text-sm shadow-md transition"
              >
                {language === 'en' ? 'Complete Profile' : 'प्रोफाइल पूरा करें'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
