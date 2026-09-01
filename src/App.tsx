import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OtpAuthModal } from './components/OtpAuthModal';
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

const getTabFromPath = (path: string): string => {
  const cleanPath = path.toLowerCase().replace(/\/$/, '');
  if (cleanPath === '/adminp') return 'admin';
  if (cleanPath === '/about') return 'about';
  if (cleanPath === '/specialties') return 'specialties';
  if (cleanPath === '/locations') return 'locations';
  if (cleanPath === '/telemedicine') return 'telemedicine';
  if (cleanPath === '/doctors') return 'doctors';
  if (cleanPath === '/patient-dashboard') return 'patient-dashboard';
  if (cleanPath === '/doctor-console') return 'doctor-console';
  return 'home';
};

const MainContent: React.FC = () => {
  const { activeRole, switchRole } = useApp();

  const [currentTab, setCurrentTabState] = useState<string>(() => {
    return getTabFromPath(window.location.pathname);
  });

  const handleSetCurrentTab = (tab: string, pushHistory = true) => {
    setCurrentTabState(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
    let newPath = '/';
    if (tab === 'admin') {
      newPath = '/adminp';
      if (activeRole !== 'ADMIN') {
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
      newPath = '/doctor-console';
      if (activeRole !== 'DOCTOR') {
        switchRole('DOCTOR');
      }
    } else {
      newPath = '/';
    }

    if (pushHistory && window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  };

  // Synchronize role when initially loaded at /adminp
  useEffect(() => {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    if (path === '/adminp') {
      switchRole('ADMIN');
    }
  }, []);

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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#10B981] selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar currentTab={currentTab} setCurrentTab={handleSetCurrentTab} />

      {/* Main View Router */}
      <main className="grow">
        {currentTab === 'home' && <PublicPortal />}
        {currentTab === 'about' && <AboutUs />}
        {currentTab === 'specialties' && <Specialties />}
        {currentTab === 'locations' && <LocationsFacilities />}
        {currentTab === 'doctors' && <PublicPortal />}
        {currentTab === 'telemedicine' && <TelemedicineRoom />}
        {currentTab === 'patient-dashboard' && <PatientDashboard />}
        {currentTab === 'doctor-console' && <DoctorConsole />}
        {currentTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer setCurrentTab={handleSetCurrentTab} />

      {/* Global Modals */}
      <OtpAuthModal />
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
