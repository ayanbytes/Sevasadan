import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  AppUser, 
  UserRole, 
  Language, 
  Clinic, 
  DoctorUser, 
  Appointment, 
  Prescription, 
  PaymentRecord,
  PatientUser,
  AppointmentStatus,
  PatientType,
  HealthPackage,
  HealthBlog
} from '../types';
import { 
  INITIAL_CLINICS, 
  INITIAL_DOCTORS, 
  DEMO_PATIENTS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_PRESCRIPTIONS, 
  INITIAL_PAYMENTS,
  INITIAL_HEALTH_PACKAGES,
  INITIAL_HEALTH_BLOGS
} from '../data/mockData';

interface AppContextType {
  currentUser: AppUser | null;
  activeRole: UserRole;
  language: Language;
  activeBranchId: string;
  clinics: Clinic[];
  doctors: DoctorUser[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  payments: PaymentRecord[];
  healthPackages: HealthPackage[];
  healthBlogs: HealthBlog[];
  isAuthModalOpen: boolean;
  isBookingModalOpen: boolean;
  preselectedDoctorId?: string;
  preselectedClinicId?: string;
  loginWithPhoneOtp: (phone: string, otp: string, role?: UserRole, name?: string) => Promise<{ user: AppUser; isNew: boolean }>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  setLanguage: (lang: Language) => void;
  setActiveBranchId: (branchId: string) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openBookingModal: (doctorId?: string, clinicId?: string) => void;
  closeBookingModal: () => void;
  bookAppointment: (data: {
    doctorId: string;
    clinicId: string | null;
    appointmentMode: 'IN_CLINIC' | 'VIDEO';
    appointmentDate: string;
    timeSlot: string;
    patientNotes?: string;
    symptoms?: string[];
    paymentMethod: 'UPI' | 'CARD' | 'NETBANKING' | 'CASH_AT_CLINIC';
    patientType: PatientType;
    patientName?: string;
    patientAge?: number;
    patientGender?: string;
  }) => Appointment;
  updateAppointmentStatus: (appointmentId: string, status: AppointmentStatus) => void;
  createPrescription: (rxData: Omit<Prescription, 'id' | 'createdAt'>) => Prescription;
  updateDoctor: (doctorId: string, updates: Partial<DoctorUser>) => void;
  updateClinic: (clinicId: string, updates: Partial<Clinic>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'SEVASADAN_STATE_V1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_USER`);
    return saved ? JSON.parse(saved) : DEMO_PATIENTS[0];
  });

  const [activeRole, setActiveRole] = useState<UserRole>(() => currentUser?.role || 'PATIENT');
  const [language, setLanguage] = useState<Language>('en');
  const [activeBranchId, setActiveBranchId] = useState<string>('all');
  
  const [clinics, setClinics] = useState<Clinic[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_CLINICS`);
    return saved ? JSON.parse(saved) : INITIAL_CLINICS;
  });

  const [doctors, setDoctors] = useState<DoctorUser[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_DOCTORS`);
    return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_APPOINTMENTS`);
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_PRESCRIPTIONS`);
    return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_PAYMENTS`);
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [healthPackages] = useState<HealthPackage[]>(INITIAL_HEALTH_PACKAGES);
  const [healthBlogs] = useState<HealthBlog[]>(INITIAL_HEALTH_BLOGS);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | undefined>(undefined);
  const [preselectedClinicId, setPreselectedClinicId] = useState<string | undefined>(undefined);

  // Sync state to LocalStorage
  useEffect(() => {
    if (currentUser) localStorage.setItem(`${LOCAL_STORAGE_KEY}_USER`, JSON.stringify(currentUser));
    else localStorage.removeItem(`${LOCAL_STORAGE_KEY}_USER`);
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_APPOINTMENTS`, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_PRESCRIPTIONS`, JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_PAYMENTS`, JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_CLINICS`, JSON.stringify(clinics));
  }, [clinics]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_DOCTORS`, JSON.stringify(doctors));
  }, [doctors]);

  // Real-time multi-tab synchronization via BroadcastChannel
  useEffect(() => {
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('sevasadan_sync_channel');
      channel.onmessage = (event) => {
        if (event.data?.type === 'STATE_UPDATED') {
          const savedAppts = localStorage.getItem(`${LOCAL_STORAGE_KEY}_APPOINTMENTS`);
          const savedRxs = localStorage.getItem(`${LOCAL_STORAGE_KEY}_PRESCRIPTIONS`);
          const savedPays = localStorage.getItem(`${LOCAL_STORAGE_KEY}_PAYMENTS`);
          if (savedAppts) setAppointments(JSON.parse(savedAppts));
          if (savedRxs) setPrescriptions(JSON.parse(savedRxs));
          if (savedPays) setPayments(JSON.parse(savedPays));
        }
      };
      return () => channel.close();
    }
  }, []);

  const notifyOtherTabs = () => {
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('sevasadan_sync_channel');
      channel.postMessage({ type: 'STATE_UPDATED', timestamp: Date.now() });
      channel.close();
    }
  };

  const loginWithPhoneOtp = async (phone: string, _otp: string, rolePreference?: UserRole, nameInput?: string) => {
    if (phone === '9900000001' || rolePreference === 'DOCTOR') {
      const doc = doctors[0];
      setCurrentUser(doc);
      setActiveRole('DOCTOR');
      return { user: doc, isNew: false };
    }

    if (phone === '9900000000' || rolePreference === 'ADMIN') {
      const adminUser: AppUser = {
        id: 'admin-1',
        name: 'Super Admin (SEVASADAN Central)',
        email: 'admin@sevasadanclinic.in',
        role: 'ADMIN',
        managedBranches: ['sarangpur', 'shujalpur', 'rajgarh']
      };
      setCurrentUser(adminUser);
      setActiveRole('ADMIN');
      return { user: adminUser, isNew: false };
    }

    const existingPatient = DEMO_PATIENTS.find(p => p.phone === phone);
    if (existingPatient) {
      setCurrentUser(existingPatient);
      setActiveRole('PATIENT');
      return { user: existingPatient, isNew: false };
    }

    const newPatient: PatientUser = {
      id: `pat-${Date.now().toString().slice(-4)}`,
      phone,
      name: nameInput || `Patient (${phone.slice(-4)})`,
      age: 32,
      gender: 'Male',
      bloodGroup: 'O+',
      address: 'Sarangpur, MP',
      patientType: 'NEW',
      emergencyContact: phone,
      createdAt: new Date().toISOString(),
      role: 'PATIENT'
    };

    setCurrentUser(newPatient);
    setActiveRole('PATIENT');
    return { user: newPatient, isNew: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_USER`);
  };

  const switchRole = (role: UserRole) => {
    setActiveRole(role);
    if (role === 'DOCTOR' && currentUser?.role !== 'DOCTOR') {
      setCurrentUser(doctors[0]);
    } else if (role === 'ADMIN' && currentUser?.role !== 'ADMIN') {
      setCurrentUser({
        id: 'admin-1',
        name: 'Central Admin',
        email: 'admin@sevasadanclinic.in',
        role: 'ADMIN',
        managedBranches: ['sarangpur', 'shujalpur', 'rajgarh']
      });
    } else if (role === 'PATIENT' && currentUser?.role !== 'PATIENT') {
      setCurrentUser(DEMO_PATIENTS[0]);
    }
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openBookingModal = (doctorId?: string, clinicId?: string) => {
    setPreselectedDoctorId(doctorId);
    setPreselectedClinicId(clinicId);
    setIsBookingModalOpen(true);
  };
  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setPreselectedDoctorId(undefined);
    setPreselectedClinicId(undefined);
  };

  const bookAppointment = (data: {
    doctorId: string;
    clinicId: string | null;
    appointmentMode: 'IN_CLINIC' | 'VIDEO';
    appointmentDate: string;
    timeSlot: string;
    patientNotes?: string;
    symptoms?: string[];
    paymentMethod: 'UPI' | 'CARD' | 'NETBANKING' | 'CASH_AT_CLINIC';
    patientType: PatientType;
    patientName?: string;
    patientAge?: number;
    patientGender?: string;
  }): Appointment => {
    const doc = doctors.find(d => d.id === data.doctorId) || doctors[0];
    const clinic = data.clinicId ? clinics.find(c => c.id === data.clinicId) : null;
    
    const prefix = data.appointmentMode === 'IN_CLINIC' 
      ? (data.clinicId ? data.clinicId.slice(0, 3).toUpperCase() : 'CLN') 
      : 'VID';
    
    const countSameType = appointments.filter(a => 
      a.appointmentMode === data.appointmentMode && a.appointmentDate === data.appointmentDate
    ).length + 1;
    
    const tokenSeqStr = countSameType.toString().padStart(3, '0');
    const tokenNumber = `${prefix}-${tokenSeqStr}`;

    const newApptId = `APT-2026-${Math.floor(100 + Math.random() * 900)}`;
    const fee = data.appointmentMode === 'VIDEO' ? doc.consultationFeeOnline : doc.consultationFeeClinic;
    const isPaidOnline = data.paymentMethod !== 'CASH_AT_CLINIC';

    const newAppointment: Appointment = {
      id: newApptId,
      patientId: currentUser?.id || 'pat-guest',
      patientName: data.patientName || (currentUser as PatientUser)?.name || 'Guest Patient',
      patientPhone: (currentUser as PatientUser)?.phone || '9826000000',
      patientAge: data.patientAge || (currentUser as PatientUser)?.age || 35,
      patientGender: data.patientGender || (currentUser as PatientUser)?.gender || 'Male',
      patientType: data.patientType,
      doctorId: doc.id,
      doctorName: doc.name,
      doctorSpecialization: doc.specialization,
      clinicId: data.clinicId,
      clinicName: clinic ? clinic.name : 'Virtual Telemedicine Room',
      appointmentMode: data.appointmentMode,
      appointmentDate: data.appointmentDate,
      timeSlot: data.timeSlot,
      tokenNumber,
      tokenSequence: countSameType,
      status: 'CONFIRMED',
      patientNotes: data.patientNotes,
      symptoms: data.symptoms || [],
      consentAccepted: true,
      consentTimestamp: new Date().toISOString(),
      paymentStatus: isPaidOnline ? 'SUCCESS' : 'PENDING',
      paymentMethod: data.paymentMethod,
      amountPaid: fee,
      transactionId: isPaidOnline ? `PAY-${data.paymentMethod}-${Date.now().toString().slice(-6)}` : `CASH-${Date.now().toString().slice(-6)}`,
      roomJoinToken: data.appointmentMode === 'VIDEO' ? `ROOM-${newApptId}` : undefined,
      createdAt: new Date().toISOString()
    };

    const newPayment: PaymentRecord = {
      id: `PAY-REC-${Date.now().toString().slice(-5)}`,
      appointmentId: newApptId,
      patientId: newAppointment.patientId,
      patientName: newAppointment.patientName,
      doctorName: doc.name,
      clinicName: newAppointment.clinicName,
      amount: fee,
      currency: 'INR',
      paymentMethod: data.paymentMethod,
      paymentGateway: isPaidOnline ? 'RAZORPAY' : 'OFFLINE',
      transactionId: newAppointment.transactionId || 'TXN-GEN',
      paymentStatus: isPaidOnline ? 'SUCCESS' : 'PENDING',
      createdAt: new Date().toISOString()
    };

    setAppointments(prev => [newAppointment, ...prev]);
    setPayments(prev => [newPayment, ...prev]);
    notifyOtherTabs();
    return newAppointment;
  };

  const updateAppointmentStatus = (appointmentId: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => a.id === appointmentId ? { ...a, status } : a));
    notifyOtherTabs();
  };

  const createPrescription = (rxData: Omit<Prescription, 'id' | 'createdAt'>): Prescription => {
    const newRx: Prescription = {
      ...rxData,
      id: `RX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      digitalSignatureStamp: `${rxData.doctorName} [Digitally Verified ${rxData.doctorRegNumber}]`
    };

    setPrescriptions(prev => [newRx, ...prev]);
    
    setAppointments(prev => prev.map(a => 
      a.id === rxData.appointmentId 
        ? { ...a, prescriptionId: newRx.id, status: 'COMPLETED' } 
        : a
    ));

    notifyOtherTabs();
    return newRx;
  };

  const updateDoctor = (doctorId: string, updates: Partial<DoctorUser>) => {
    setDoctors(prev => prev.map(d => d.id === doctorId ? { ...d, ...updates } : d));
    notifyOtherTabs();
  };

  const updateClinic = (clinicId: string, updates: Partial<Clinic>) => {
    setClinics(prev => prev.map(c => c.id === clinicId ? { ...c, ...updates } : c));
    notifyOtherTabs();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeRole,
        language,
        activeBranchId,
        clinics,
        doctors,
        appointments,
        prescriptions,
        payments,
        healthPackages,
        healthBlogs,
        isAuthModalOpen,
        isBookingModalOpen,
        preselectedDoctorId,
        preselectedClinicId,
        loginWithPhoneOtp,
        logout,
        switchRole,
        setLanguage,
        setActiveBranchId,
        openAuthModal,
        closeAuthModal,
        openBookingModal,
        closeBookingModal,
        bookAppointment,
        updateAppointmentStatus,
        createPrescription,
        updateDoctor,
        updateClinic
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
