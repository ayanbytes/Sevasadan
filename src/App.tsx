import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OtpAuthModal } from './components/OtpAuthModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { BookingWizardModal } from './components/booking/BookingWizardModal';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { PublicPortal } from './pages/PublicPortal';
import { AboutUs } from './pages/AboutUs';
import { Specialties } from './pages/Specialties';
import { LocationsFacilities } from './pages/LocationsFacilities';
import { TelemedicineRoom } from './pages/TelemedicineRoom';
import { PatientDashboard } from './pages/PatientDashboard';
import { DoctorConsole } from './pages/DoctorConsole';
import { AdminDashboard } from './pages/AdminDashboard';
import { ArticleDetail } from './pages/ArticleDetail';
import { TermsConditions } from './pages/TermsConditions';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { DeskStaffPortal } from './pages/DeskStaffPortal';
import { ServiceCatalog } from './pages/ServiceCatalog';
import { Training } from './pages/Training';
import { Referrals } from './pages/Referrals';

const getTabFromPath = (path: string): string => {
  const cleanPath = path.toLowerCase().replace(/\/$/, '');
  if (cleanPath === '/adminp' || cleanPath === '/admin') return 'admin';
  if (cleanPath === '/doctor' || cleanPath === '/doctor-console') return 'doctor-console';
  if (cleanPath === '/support' || cleanPath === '/desk-staff') return 'desk-staff-dashboard';
  if (cleanPath === '/about') return 'about';
  if (cleanPath === '/specialties') return 'specialties';
  if (cleanPath === '/locations') return 'locations';
  if (cleanPath === '/telemedicine') return 'telemedicine';
  if (cleanPath === '/doctors') return 'doctors';
  if (cleanPath === '/patient-dashboard') return 'patient-dashboard';
  if (cleanPath === '/terms') return 'terms';
  if (cleanPath === '/privacy') return 'privacy';
  if (cleanPath === '/pharmacy') return 'pharmacy';
  if (cleanPath === '/diagnostics') return 'diagnostics';
  if (cleanPath === '/laboratory') return 'laboratory';
  if (cleanPath === '/training') return 'training';
  if (cleanPath === '/referrals') return 'referrals';
  return 'home';
};

const MainContent: React.FC = () => {
  const { activeRole, switchRole, language, isAdminAuthenticated, openAdminAuthModal } = useApp();

  const [currentTab, setCurrentTabState] = useState<string>(() => {
    return getTabFromPath(window.location.pathname);
  });

  const handleSetCurrentTab = (tab: string, pushHistory = true) => {
    setCurrentTabState(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
    let newPath = '/';
    if (tab === 'admin') {
      newPath = '/admin';
      if (!isAdminAuthenticated) {
        openAdminAuthModal();
      } else if (activeRole !== 'ADMIN') {
        switchRole('ADMIN');
      }
    } else if (tab === 'about') {
      newPath = '/about';
    } else if (tab === 'specialties') {
      newPath = '/specialties';
    } else if (tab === 'locations') {
      newPath = '/locations';
    } else if (tab === 'telemedicine') {
      newPath = '/telemedicine';
    } else if (tab === 'doctors') {
      newPath = '/doctors';
    } else if (tab === 'patient-dashboard') {
      newPath = '/patient-dashboard';
    } else if (tab === 'doctor-console') {
      newPath = '/doctor';
      if (activeRole !== 'DOCTOR') {
        switchRole('DOCTOR');
      }
    } else if (tab === 'desk-staff-dashboard') {
      newPath = '/support';
      if (activeRole !== 'DESK_STAFF') {
        switchRole('DESK_STAFF');
      }
    } else if (tab === 'terms') {
      newPath = '/terms';
    } else if (tab === 'privacy') {
      newPath = '/privacy';
    } else if (['pharmacy', 'diagnostics', 'laboratory', 'training', 'referrals'].includes(tab)) {
      newPath = '/' + tab;
    } else {
      newPath = '/';
    }

    if (pushHistory && window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  };

  // Synchronize role when initially loaded at /admin, /doctor, /support
  useEffect(() => {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    if (path === '/adminp' || path === '/admin') {
      if (!isAdminAuthenticated) {
        openAdminAuthModal();
      } else {
        switchRole('ADMIN');
      }
    } else if (path === '/doctor' || path === '/doctor-console') {
      switchRole('DOCTOR');
    } else if (path === '/support' || path === '/desk-staff') {
      switchRole('DESK_STAFF');
    }
  }, [isAdminAuthenticated]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Listen for browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromPath(window.location.pathname);
      handleSetCurrentTab(tab, false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#10B981] selection:text-slate-950 overflow-x-hidden w-full max-w-full">
      {/* Top Navbar */}
      <Navbar currentTab={currentTab} setCurrentTab={handleSetCurrentTab} />

      {/* Main View Router */}
      <main className="grow w-full max-w-full overflow-x-hidden">
        {currentTab === 'home' && <PublicPortal onNavigate={handleSetCurrentTab} />}
        {currentTab === 'about' && <AboutUs onNavigate={handleSetCurrentTab} />}
        {currentTab === 'specialties' && <Specialties />}
        {currentTab === 'locations' && <LocationsFacilities />}
        {currentTab === 'doctors' && <PublicPortal onNavigate={handleSetCurrentTab} />}
        {currentTab === 'telemedicine' && <TelemedicineRoom />}
        {currentTab === 'patient-dashboard' && <PatientDashboard />}
        {currentTab === 'doctor-console' && <DoctorConsole />}
        {currentTab === 'desk-staff-dashboard' && <DeskStaffPortal />}
        {currentTab === 'admin' && <AdminDashboard />}
        {currentTab === 'article-detail' && <ArticleDetail onBack={() => handleSetCurrentTab('home')} />}
        {currentTab === 'terms' && <TermsConditions onBack={() => handleSetCurrentTab('home')} />}
        {currentTab === 'privacy' && <PrivacyPolicy onBack={() => handleSetCurrentTab('home')} />}
        {currentTab === 'pharmacy' && <ServiceCatalog kind="pharmacy" />}
        {currentTab === 'diagnostics' && <ServiceCatalog kind="diagnostics" />}
        {currentTab === 'laboratory' && <ServiceCatalog kind="laboratory" />}
        {currentTab === 'training' && <Training />}
        {currentTab === 'referrals' && <Referrals />}
      </main>

      {/* Footer */}
      <Footer setCurrentTab={handleSetCurrentTab} />

      {/* Global Modals */}
      <OtpAuthModal />
      <AdminAuthModal />
      <BookingWizardModal />
      <DoctorProfileModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
