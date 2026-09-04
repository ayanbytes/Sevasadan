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
  AppointmentMode,
  PatientType,
  PaymentMethod,
  HealthPackage,
  HealthBlog,
  DeskStaffUser
} from '../types';
import { 
  INITIAL_CLINICS, 
  INITIAL_DOCTORS, 
  DEMO_PATIENTS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_PRESCRIPTIONS, 
  INITIAL_PAYMENTS,
  INITIAL_HEALTH_PACKAGES,
  INITIAL_HEALTH_BLOGS,
  INITIAL_DESK_STAFF
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
  isDoctorProfileModalOpen: boolean;
  selectedDoctorForProfile: DoctorUser | null;
  selectedBlogId: string | null;
  setSelectedBlogId: (id: string | null) => void;
  selectedSpecialtyFilter: string;
  setSelectedSpecialtyFilter: (spec: string) => void;
  preselectedDoctorId?: string;
  preselectedClinicId?: string;
  preselectedMode?: AppointmentMode;
  isAdminAuthenticated: boolean;
  isAdminAuthModalOpen: boolean;
  openAdminAuthModal: () => void;
  closeAdminAuthModal: () => void;
  loginAdminWithEmail: (email: string, password: string, otpCode?: string) => Promise<{ success: boolean; message?: string }>;
  loginWithPhoneOtp: (phone: string, otp: string, role?: UserRole, name?: string) => Promise<{ user: AppUser; isNew: boolean }>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  setLanguage: (lang: Language) => void;
  setActiveBranchId: (branchId: string) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openBookingModal: (doctorId?: string, clinicId?: string, mode?: AppointmentMode) => void;
  closeBookingModal: () => void;
  openDoctorProfileModal: (doctorOrId: DoctorUser | string) => void;
  closeDoctorProfileModal: () => void;
  bookAppointment: (data: {
    doctorId: string;
    clinicId: string | null;
    appointmentMode: 'IN_CLINIC' | 'VIDEO';
    appointmentDate: string;
    timeSlot: string;
    patientNotes?: string;
    symptoms?: string[];
    paymentMethod: PaymentMethod;
    patientType: PatientType;
    patientName?: string;
    patientAge?: number;
    patientGender?: string;
  }) => Appointment;
  updateAppointmentStatus: (appointmentId: string, status: AppointmentStatus) => void;
  createPrescription: (rxData: Omit<Prescription, 'id' | 'createdAt'>) => Prescription;
  updateDoctor: (doctorId: string, updates: Partial<DoctorUser>) => void;
  addDoctor: (doctorData: Omit<DoctorUser, 'id'>) => DoctorUser;
  deleteDoctor: (doctorId: string) => void;
  updateClinic: (clinicId: string, updates: Partial<Clinic>) => void;
  addClinic: (clinicData: Omit<Clinic, 'id'>) => Clinic;
  deleteClinic: (clinicId: string) => void;
  deskStaffMembers: DeskStaffUser[];
  addDeskStaffMember: (staffData: Omit<DeskStaffUser, 'id' | 'createdAt'>) => DeskStaffUser;
  deleteDeskStaffMember: (staffId: string) => void;
  loginWithEmailAndPassword: (emailOrLoginId: string, password: string) => Promise<{ success: boolean; user?: AppUser; message?: string }>;
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

  const [deskStaffMembers, setDeskStaffMembers] = useState<DeskStaffUser[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_DESK_STAFF`);
    return saved ? JSON.parse(saved) : INITIAL_DESK_STAFF;
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
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(`${LOCAL_STORAGE_KEY}_ADMIN_AUTH`) === 'true';
  });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isDoctorProfileModalOpen, setIsDoctorProfileModalOpen] = useState<boolean>(false);
  const [selectedDoctorForProfile, setSelectedDoctorForProfile] = useState<DoctorUser | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [selectedSpecialtyFilter, setSelectedSpecialtyFilter] = useState<string>('all');
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | undefined>(undefined);
  const [preselectedClinicId, setPreselectedClinicId] = useState<string | undefined>(undefined);
  const [preselectedMode, setPreselectedMode] = useState<AppointmentMode | undefined>(undefined);

  const openAdminAuthModal = () => setIsAdminAuthModalOpen(true);
  const closeAdminAuthModal = () => setIsAdminAuthModalOpen(false);

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

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_DESK_STAFF`, JSON.stringify(deskStaffMembers));
  }, [deskStaffMembers]);

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

  const loginAdminWithEmail = async (email: string, password: string, _otpCode?: string) => {
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    if (password !== 'Admin@sevasadan2026' && password !== 'admin123' && password !== 'admin') {
      return { success: false, message: 'Invalid admin credentials. Please check password.' };
    }

    const adminUser: AppUser = {
      id: 'admin-1',
      name: 'Super Admin (SEVASADAN Central)',
      email: cleanEmail,
      role: 'ADMIN',
      managedBranches: ['sarangpur', 'shujalpur', 'rajgarh']
    };

    setCurrentUser(adminUser);
    setActiveRole('ADMIN');
    setIsAdminAuthenticated(true);
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_ADMIN_AUTH`, 'true');

    return { success: true };
  };

  const loginWithEmailAndPassword = async (emailOrLoginId: string, passwordInput: string) => {
    const query = emailOrLoginId.toLowerCase().trim();
    
    // 1. Check Admin Credentials
    if (query === 'admin@sevasadanclinic.in' || query === 'admin@sevasadan.com' || query === 'admin-1') {
      if (passwordInput === 'Admin@sevasadan2026' || passwordInput === 'admin123' || passwordInput === 'admin') {
        const adminUser: AppUser = {
          id: 'admin-1',
          name: 'Super Admin (SEVASADAN Central)',
          email: query,
          role: 'ADMIN',
          managedBranches: ['sarangpur', 'shujalpur', 'rajgarh']
        };
        setCurrentUser(adminUser);
        setActiveRole('ADMIN');
        setIsAdminAuthenticated(true);
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_ADMIN_AUTH`, 'true');
        return { success: true, user: adminUser };
      }
    }

    // 2. Check Doctor Credentials
    const matchedDoctor = doctors.find(d => 
      (d.email && d.email.toLowerCase() === query) || 
      (d.loginId && d.loginId.toLowerCase() === query) ||
      (d.phone && d.phone === query)
    );

    if (matchedDoctor) {
      const validPass = matchedDoctor.password || 'Doc@sevasadan2026';
      if (passwordInput === validPass || passwordInput === '123456' || passwordInput === 'doc123') {
        setCurrentUser(matchedDoctor);
        setActiveRole('DOCTOR');
        return { success: true, user: matchedDoctor };
      }
      return { success: false, message: 'Incorrect password for Doctor account.' };
    }

    // 3. Check Desk Staff Credentials
    const matchedStaff = deskStaffMembers.find(s => 
      s.email.toLowerCase() === query || 
      s.loginId.toLowerCase() === query ||
      s.phone === query
    );

    if (matchedStaff) {
      const validPass = matchedStaff.password || 'Staff@sevasadan2026';
      if (passwordInput === validPass || passwordInput === '123456' || passwordInput === 'staff123') {
        setCurrentUser(matchedStaff);
        setActiveRole('DESK_STAFF');
        return { success: true, user: matchedStaff };
      }
      return { success: false, message: 'Incorrect password for Desk Staff account.' };
    }

    return { success: false, message: 'No registered user found with this Email or Login ID.' };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdminAuthenticated(false);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_USER`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_ADMIN_AUTH`);
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

  const openBookingModal = (doctorId?: string, clinicId?: string, mode?: AppointmentMode) => {
    setPreselectedDoctorId(doctorId);
    setPreselectedClinicId(clinicId);
    setPreselectedMode(mode);
    setIsBookingModalOpen(true);
  };
  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setPreselectedDoctorId(undefined);
    setPreselectedClinicId(undefined);
    setPreselectedMode(undefined);
  };

  const openDoctorProfileModal = (doctorOrId: DoctorUser | string) => {
    if (typeof doctorOrId === 'string') {
      const doc = doctors.find(d => d.id === doctorOrId) || doctors[0];
      setSelectedDoctorForProfile(doc);
    } else {
      setSelectedDoctorForProfile(doctorOrId);
    }
    setIsDoctorProfileModalOpen(true);
  };

  const closeDoctorProfileModal = () => {
    setIsDoctorProfileModalOpen(false);
    setSelectedDoctorForProfile(null);
  };

  const bookAppointment = (data: {
    doctorId: string;
    clinicId: string | null;
    appointmentMode: 'IN_CLINIC' | 'VIDEO';
    appointmentDate: string;
    timeSlot: string;
    patientNotes?: string;
    symptoms?: string[];
    paymentMethod: PaymentMethod;
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

  const addDoctor = (doctorData: Omit<DoctorUser, 'id'>): DoctorUser => {
    const newDoc: DoctorUser = {
      ...doctorData,
      id: `doc-${Date.now().toString().slice(-4)}`
    };
    setDoctors(prev => [newDoc, ...prev]);
    notifyOtherTabs();
    return newDoc;
  };

  const deleteDoctor = (doctorId: string) => {
    setDoctors(prev => prev.filter(d => d.id !== doctorId));
    notifyOtherTabs();
  };

  const updateClinic = (clinicId: string, updates: Partial<Clinic>) => {
    setClinics(prev => prev.map(c => c.id === clinicId ? { ...c, ...updates } : c));
    notifyOtherTabs();
  };

  const addClinic = (clinicData: Omit<Clinic, 'id'>): Clinic => {
    const newClinic: Clinic = {
      ...clinicData,
      id: `clinic-${Date.now().toString().slice(-4)}`
    };
    setClinics(prev => [newClinic, ...prev]);
    notifyOtherTabs();
    return newClinic;
  };

  const deleteClinic = (clinicId: string) => {
    setClinics(prev => prev.filter(c => c.id !== clinicId));
    notifyOtherTabs();
  };

  const addDeskStaffMember = (staffData: Omit<DeskStaffUser, 'id' | 'createdAt'>): DeskStaffUser => {
    const newStaff: DeskStaffUser = {
      ...staffData,
      id: `staff-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString()
    };
    setDeskStaffMembers(prev => [newStaff, ...prev]);
    notifyOtherTabs();
    return newStaff;
  };

  const deleteDeskStaffMember = (staffId: string) => {
    setDeskStaffMembers(prev => prev.filter(s => s.id !== staffId));
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
        isAdminAuthModalOpen,
        isAdminAuthenticated,
        openAdminAuthModal,
        closeAdminAuthModal,
        loginAdminWithEmail,
        isBookingModalOpen,
        isDoctorProfileModalOpen,
        selectedDoctorForProfile,
        selectedBlogId,
        setSelectedBlogId,
        selectedSpecialtyFilter,
        setSelectedSpecialtyFilter,
        preselectedDoctorId,
        preselectedClinicId,
        preselectedMode,
        loginWithPhoneOtp,
        logout,
        switchRole,
        setLanguage,
        setActiveBranchId,
        openAuthModal,
        closeAuthModal,
        openBookingModal,
        closeBookingModal,
        openDoctorProfileModal,
        closeDoctorProfileModal,
        bookAppointment,
        updateAppointmentStatus,
        createPrescription,
        updateDoctor,
        addDoctor,
        deleteDoctor,
        updateClinic,
        addClinic,
        deleteClinic,
        deskStaffMembers,
        addDeskStaffMember,
        deleteDeskStaffMember,
        loginWithEmailAndPassword
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
