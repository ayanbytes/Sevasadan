import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OtpAuthModal } from './components/OtpAuthModal';
import { BookingWizardModal } from './components/booking/BookingWizardModal';
import { PublicPortal } from './pages/PublicPortal';
import { TelemedicineRoom } from './pages/TelemedicineRoom';
import { PatientDashboard } from './pages/PatientDashboard';
import { DoctorConsole } from './pages/DoctorConsole';
import { AdminDashboard } from './pages/AdminDashboard';

const MainContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#10B981] selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main View Router */}
      <main className="grow">
        {currentTab === 'home' && <PublicPortal />}
        {currentTab === 'doctors' && <PublicPortal />}
        {currentTab === 'telemedicine' && <TelemedicineRoom />}
        {currentTab === 'patient-dashboard' && <PatientDashboard />}
        {currentTab === 'doctor-console' && <DoctorConsole />}
        {currentTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <OtpAuthModal />
      <BookingWizardModal />
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
