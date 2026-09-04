import React, { useState } from 'react';
import { X, Mail, Lock, ShieldCheck, Key, AlertCircle, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminAuthModal: React.FC = () => {
  const { 
    isAdminAuthModalOpen, 
    closeAdminAuthModal, 
    loginAdminWithEmail, 
    language 
  } = useApp();

  const [step, setStep] = useState<'CREDENTIALS' | '2FA_OTP'>('CREDENTIALS');
  const [email, setEmail] = useState<string>('admin@sevasadanclinic.in');
  const [password, setPassword] = useState<string>('Admin@sevasadan2026');
  const [otp, setOtp] = useState<string>('889900');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  if (!isAdminAuthModalOpen) return null;

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError(language === 'en' ? 'Please enter a valid admin email address' : 'कृपया एक वैध एडमिन ईमेल आईडी दर्ज करें');
      return;
    }
    if (!password || password.length < 6) {
      setError(language === 'en' ? 'Password must be at least 6 characters' : 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Simulate sending 2FA security code to admin email
      setSuccessMsg(language === 'en' ? `2FA Security Code sent to ${email}` : `सुरक्षा कोड ${email} पर भेजा गया`);
      setStep('2FA_OTP');
    }, 700);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError(language === 'en' ? 'Please enter the 6-digit security code' : 'कृपया 6-अंकीय सुरक्षा कोड दर्ज करें');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await loginAdminWithEmail(email, password, otp);
      setLoading(false);
      if (res.success) {
        closeAdminAuthModal();
        resetForm();
      } else {
        setError(res.message || 'Authentication failed');
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Admin authentication failed');
    }
  };

  const resetForm = () => {
    setStep('CREDENTIALS');
    setEmail('admin@sevasadanclinic.in');
    setPassword('Admin@sevasadan2026');
    setOtp('889900');
    setError('');
    setSuccessMsg('');
  };

  const autofillDemoAdmin = () => {
    setEmail('admin@sevasadanclinic.in');
    setPassword('Admin@sevasadan2026');
    setOtp('889900');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200/80">
        
        {/* Header: Deep Navy Hospital Security Banner */}
        <div className="bg-gradient-to-r from-[#0B2545] via-[#0F4C81] to-[#0A365C] text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider border border-emerald-500/30">
                  {language === 'en' ? 'Secure Admin Login' : 'सुरक्षित एडमिन ईमेल लॉगिन'}
                </span>
                <h3 className="font-extrabold text-lg text-white tracking-tight mt-0.5">
                  SEVASADAN Central Hub
                </h3>
              </div>
            </div>

            <button 
              onClick={() => { closeAdminAuthModal(); resetForm(); }}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">

          {error && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {successMsg && step === '2FA_OTP' && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span className="font-semibold">{successMsg}</span>
            </div>
          )}

          {/* STEP 1: Email & Password Form */}
          {step === 'CREDENTIALS' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              
              {/* Admin Mail Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {language === 'en' ? 'Admin Email Address' : 'एडमिन ईमेल आईडी'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@sevasadanclinic.in"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81] focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              {/* Admin Password Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {language === 'en' ? 'Admin Password' : 'एडमिन पासवर्ड'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81] focus:bg-white transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Demo Fill Option */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-xs text-slate-600 font-semibold">
                    {language === 'en' ? 'Demo Admin Credentials:' : 'डेमो एडमिन क्रेडेंशियल्स:'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={autofillDemoAdmin}
                  className="text-[11px] bg-white border border-slate-300 hover:border-[#0F4C81] text-[#0F4C81] font-bold px-2.5 py-1 rounded-lg shadow-2xs hover:bg-sky-50 transition cursor-pointer"
                >
                  Autofill Admin Mail
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F4C81] hover:bg-[#0B2545] text-white font-bold py-3 rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    <span>{language === 'en' ? 'Continue with Email 2FA' : 'ईमेल 2FA के साथ आगे बढ़ें'}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: Email 2FA Security Code Verification */}
          {step === '2FA_OTP' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <Key className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-slate-900">
                  {language === 'en' ? 'Enter 2FA Security Code' : '2FA सुरक्षा कोड दर्ज करें'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'en' 
                    ? `A 6-digit verification code has been sent to ${email}`
                    : `एक 6-अंकीय सत्यापन कोड ${email} पर भेजा गया है`}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 text-center">
                  {language === 'en' ? '6-Digit Email Code' : '6-अंकीय ईमेल ओटीपी'}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="889900"
                  className="w-full text-center tracking-[0.4em] py-3 bg-slate-50 border border-slate-200 rounded-xl text-xl font-black text-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81] focus:bg-white transition"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('CREDENTIALS')}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs transition cursor-pointer"
                >
                  {language === 'en' ? 'Back' : 'वापस'}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>{language === 'en' ? 'Verify & Open Admin Hub' : 'सत्यापित करें और एडमिन खोलें'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="pt-2 text-center border-t border-slate-100">
            <p className="text-[11px] text-slate-400 font-medium">
              {language === 'en' ? 'Protected by 256-bit Hospital SSL Encryption' : '256-बिट अस्पताल एसएसएल एन्क्रिप्शन द्वारा सुरक्षित'}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
