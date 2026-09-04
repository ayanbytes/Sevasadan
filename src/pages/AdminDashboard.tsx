import React, { useState } from 'react';
import { 
  Building2, 
  Settings, 
  Search, 
  Plus, 
  UserPlus, 
  Edit3, 
  Trash2, 
  DollarSign, 
  Stethoscope, 
  Phone, 
  MapPin, 
  X, 
  FileText,
  Clock,
  Lock,
  ShieldCheck,
  Mail
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { DoctorUser, Clinic } from '../types';
import { CredentialsDispatchedModal } from '../components/CredentialsDispatchedModal';

export const AdminDashboard: React.FC = () => {
  const { 
    clinics, 
    doctors, 
    appointments, 
    payments,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    addClinic,
    updateClinic,
    deleteClinic,
    deskStaffMembers,
    addDeskStaffMember,
    deleteDeskStaffMember,
    isAdminAuthenticated,
    openAdminAuthModal,
    activeRole
  } = useApp();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'BRANCHES' | 'DOCTORS' | 'STAFF' | 'REVENUE' | 'EMR'>('OVERVIEW');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Doctor Form Modal State
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<DoctorUser | null>(null);
  const [doctorFormData, setDoctorFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: 'General Physician & Diabetologist',
    qualification: 'MD (Internal Medicine)',
    experienceYears: 10,
    regNumber: 'MPMC-2026-999',
    consultationFeeClinic: 300,
    consultationFeeOnline: 450,
    bio: 'Dedicated medical specialist with extensive clinical experience.',
    clinicsCovered: ['sarangpur', 'shujalpur', 'rajgarh'],
    languagesSpoken: ['Hindi', 'English'],
    opdScheduleSummary: 'Mon-Sat: 09:00 AM - 02:00 PM',
    avatarUrl: '/hero-doctor.png'
  });

  // Desk Staff Form Modal State
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [staffFormData, setStaffFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branchId: 'sarangpur'
  });

  // Credentials Dispatcher Modal State
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);
  const [dispatchedCredentials, setDispatchedCredentials] = useState<{
    name: string;
    email: string;
    loginId: string;
    password: string;
    role: 'DOCTOR' | 'DESK_STAFF';
    phone?: string;
  } | null>(null);

  // Branch Form Modal State
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Clinic | null>(null);
  const [branchFormData, setBranchFormData] = useState({
    name: '',
    fullName: '',
    city: '',
    address: '',
    phone: '',
    emergencyPhone: '',
    operatingHours: 'Mon-Sat: 08:00 AM - 08:00 PM',
    activeDoctorCount: 5,
    slotDurationMinutes: 15
  });

  // Revenue metrics
  const totalRevenue = payments.reduce((acc, p) => acc + (p.paymentStatus === 'SUCCESS' ? p.amount : 0), 0);
  const onlineRevenue = payments.reduce((acc, p) => acc + (p.paymentGateway !== 'OFFLINE' && p.paymentStatus === 'SUCCESS' ? p.amount : 0), 0);
  const cashRevenue = payments.reduce((acc, p) => acc + (p.paymentGateway === 'OFFLINE' && p.paymentStatus === 'SUCCESS' ? p.amount : 0), 0);

  const filteredAppointments = appointments.filter(a => 
    a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.patientPhone.includes(searchTerm) ||
    a.tokenNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open Doctor Modal for Add / Edit
  const openDoctorModal = (doc?: DoctorUser) => {
    if (doc) {
      setEditingDoctor(doc);
      setDoctorFormData({
        name: doc.name,
        email: doc.email || '',
        phone: doc.phone || '',
        specialization: doc.specialization,
        qualification: doc.qualification,
        experienceYears: doc.experienceYears,
        regNumber: doc.regNumber,
        consultationFeeClinic: doc.consultationFeeClinic,
        consultationFeeOnline: doc.consultationFeeOnline,
        bio: doc.bio || '',
        clinicsCovered: doc.clinicsCovered || ['sarangpur'],
        languagesSpoken: doc.languagesSpoken || ['Hindi', 'English'],
        opdScheduleSummary: doc.opdScheduleSummary || 'Mon-Sat: 09:00 AM - 02:00 PM',
        avatarUrl: doc.avatarUrl || '/hero-doctor.png'
      });
    } else {
      setEditingDoctor(null);
      setDoctorFormData({
        name: 'Dr. ',
        email: '',
        phone: '',
        specialization: 'General Physician & Diabetologist',
        qualification: 'MBBS, MD',
        experienceYears: 8,
        regNumber: `MPMC-${Math.floor(10000 + Math.random() * 90000)}`,
        consultationFeeClinic: 300,
        consultationFeeOnline: 400,
        bio: 'Board-certified medical specialist dedicated to compassionate patient care.',
        clinicsCovered: ['sarangpur', 'shujalpur'],
        languagesSpoken: ['Hindi', 'English'],
        opdScheduleSummary: 'Mon-Sat: 09:00 AM - 02:00 PM',
        avatarUrl: '/hero-doctor.png'
      });
    }
    setIsDoctorModalOpen(true);
  };

  // Save Doctor Submit
  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedLoginId = editingDoctor?.loginId || `DOC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const generatedPassword = editingDoctor?.password || `SevaDoc#${Math.floor(1000 + Math.random() * 9000)}`;
    const doctorEmail = doctorFormData.email || `dr.${doctorFormData.name.toLowerCase().replace(/[^a-z]/g, '')}@sevasadanclinic.in`;

    const docPayload = {
      userId: editingDoctor?.userId || 'user-doc-' + Date.now(),
      role: 'DOCTOR' as const,
      rating: editingDoctor?.rating || 4.9,
      totalReviews: editingDoctor?.totalReviews || 12,
      phone: doctorFormData.phone || '98260' + Math.floor(10000 + Math.random() * 90000),
      email: doctorEmail,
      loginId: generatedLoginId,
      password: generatedPassword,
      name: doctorFormData.name,
      specialization: doctorFormData.specialization,
      qualification: doctorFormData.qualification,
      experienceYears: Number(doctorFormData.experienceYears),
      regNumber: doctorFormData.regNumber,
      consultationFeeClinic: Number(doctorFormData.consultationFeeClinic),
      consultationFeeOnline: Number(doctorFormData.consultationFeeOnline),
      bio: doctorFormData.bio,
      clinicsCovered: doctorFormData.clinicsCovered,
      languagesSpoken: doctorFormData.languagesSpoken,
      opdScheduleSummary: doctorFormData.opdScheduleSummary,
      awards: editingDoctor?.awards || ['Excellence in Clinical Care 2025'],
      educationDetails: editingDoctor?.educationDetails || [`${doctorFormData.qualification} - AIIMS / MGMC`],
      clinicalInterests: editingDoctor?.clinicalInterests || [doctorFormData.specialization],
      consultationsCount: editingDoctor?.consultationsCount || 150,
      satisfactionRate: editingDoctor?.satisfactionRate || 98,
      avatarUrl: doctorFormData.avatarUrl || '/hero-doctor.png'
    };

    if (editingDoctor) {
      updateDoctor(editingDoctor.id, docPayload);
    } else {
      addDoctor(docPayload);

      // Trigger Email Credentials Modal
      setDispatchedCredentials({
        name: doctorFormData.name,
        email: doctorEmail,
        loginId: generatedLoginId,
        password: generatedPassword,
        role: 'DOCTOR',
        phone: doctorFormData.phone
      });
      setIsCredentialsModalOpen(true);
    }
    setIsDoctorModalOpen(false);
  };

  // Save Desk Staff Submit
  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedLoginId = `STAFF-2026-${Math.floor(100 + Math.random() * 900)}`;
    const generatedPassword = `SevaStaff#${Math.floor(1000 + Math.random() * 9000)}`;

    addDeskStaffMember({
      name: staffFormData.name,
      email: staffFormData.email,
      loginId: generatedLoginId,
      password: generatedPassword,
      phone: staffFormData.phone || '98261' + Math.floor(10000 + Math.random() * 90000),
      branchId: staffFormData.branchId,
      role: 'DESK_STAFF'
    });

    setDispatchedCredentials({
      name: staffFormData.name,
      email: staffFormData.email,
      loginId: generatedLoginId,
      password: generatedPassword,
      role: 'DESK_STAFF',
      phone: staffFormData.phone
    });
    setIsCredentialsModalOpen(true);
    setIsStaffModalOpen(false);
    setStaffFormData({ name: '', email: '', phone: '', branchId: 'sarangpur' });
  };

  // Open Branch Modal for Add / Edit
  const openBranchModal = (clinic?: Clinic) => {
    if (clinic) {
      setEditingBranch(clinic);
      setBranchFormData({
        name: clinic.name,
        fullName: clinic.fullName,
        city: clinic.city,
        address: clinic.address,
        phone: clinic.phone,
        emergencyPhone: clinic.emergencyPhone || '1800-7382-723',
        operatingHours: clinic.operatingHours,
        activeDoctorCount: clinic.activeDoctorCount,
        slotDurationMinutes: clinic.slotDurationMinutes || 15
      });
    } else {
      setEditingBranch(null);
      setBranchFormData({
        name: 'New Branch',
        fullName: 'SEVASADAN Multi-Specialty Clinic',
        city: 'Malwa Region',
        address: 'Main Hospital Road',
        phone: '+91 7382-723000',
        emergencyPhone: '1800-7382-723',
        operatingHours: 'Mon-Sat: 08:00 AM - 08:00 PM',
        activeDoctorCount: 4,
        slotDurationMinutes: 15
      });
    }
    setIsBranchModalOpen(true);
  };

  // Save Branch Submit
  const handleBranchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBranch) {
      updateClinic(editingBranch.id, branchFormData);
    } else {
      addClinic({
        name: branchFormData.name,
        fullName: branchFormData.fullName,
        city: branchFormData.city,
        state: 'Madhya Pradesh',
        pincode: '465681',
        coordinates: { lat: 23.5976, lng: 76.6049 },
        address: branchFormData.address,
        phone: branchFormData.phone,
        email: 'info@sevasadanclinic.org',
        emergencyHelpline: '1800-7382-723',
        googleMapEmbedUrl: 'https://www.google.com/maps',
        imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800',
        emergencyPhone: branchFormData.emergencyPhone,
        operatingHours: branchFormData.operatingHours,
        activeDoctorCount: Number(branchFormData.activeDoctorCount),
        slotDurationMinutes: Number(branchFormData.slotDurationMinutes)
      });
    }
    setIsBranchModalOpen(false);
  };

  if (!isAdminAuthenticated || activeRole !== 'ADMIN') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full rounded-3xl p-8 shadow-2xl border border-slate-200 text-center space-y-6 animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center mx-auto shadow-xl shadow-slate-950/20">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Restricted Area
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              Admin Email Authentication Required
            </h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
              Access to the Central Hospital Administration Console is restricted. Please authenticate with your authorized hospital admin email ID and password.
            </p>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 text-left text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Mail className="w-4 h-4 text-[#0F4C81]" />
              <span>Official Admin Mail Verification</span>
            </div>
            <p className="text-slate-500 text-[11px] font-medium">
              Authorized domain accounts (<code className="text-[#0F4C81] font-bold">@sevasadanclinic.in</code>) with 2FA email verification.
            </p>
          </div>

          <button
            onClick={openAdminAuthModal}
            className="w-full bg-[#0B2545] hover:bg-[#0F4C81] text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
            <span>Login with Admin Email</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] via-[#0F4C81] to-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Central Control Console
            </span>
            <span className="text-xs text-slate-300 font-semibold">SEVASADAN Multi-Branch Network Admin</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1.5">
            Administrative Management Hub
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl font-normal">
            Manage hospital branches, doctor profiles, consultation fee structures, live OPD tokens, and financial revenue.
          </p>
        </div>

        {/* Tab Navigation Segment */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 text-xs font-extrabold w-full lg:w-auto">
          {(['OVERVIEW', 'BRANCHES', 'DOCTORS', 'STAFF', 'REVENUE', 'EMR'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === tab ? 'bg-white text-[#0B2545] shadow-md font-black' : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab === 'OVERVIEW' && 'Overview'}
              {tab === 'BRANCHES' && 'Branches & OPD'}
              {tab === 'DOCTORS' && 'Doctors Roster'}
              {tab === 'STAFF' && 'Desk Staff'}
              {tab === 'REVENUE' && 'Revenue Audit'}
              {tab === 'EMR' && 'EMR Logs'}
            </button>
          ))}
        </div>
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-8">
          
          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Total Network Revenue</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-[#0F4C81]">₹{totalRevenue.toLocaleString()}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1 font-semibold">
                <span className="text-emerald-600">Online: ₹{onlineRevenue}</span>
                <span>•</span>
                <span className="text-amber-600">Cash: ₹{cashRevenue}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Total Consultations</span>
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-emerald-600">{appointments.length}</p>
              <p className="text-xs text-slate-500 font-medium">In-Clinic Tokens & Digital Video OPDs</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Active Hospital Branches</span>
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-amber-600">{clinics.length}</p>
              <p className="text-xs text-slate-500 font-medium">Sarangpur, Shujalpur, Rajgarh & Expansion</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Board Certified Doctors</span>
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-purple-600">{doctors.length}</p>
              <p className="text-xs text-slate-500 font-medium">Across 8 Medical Departments</p>
            </div>

          </div>

          {/* Quick Admin Actions & Management Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-[#0F4C81]" />
                  <span>Doctors Management</span>
                </span>
                <button
                  onClick={() => openDoctorModal()}
                  className="bg-[#0F4C81] hover:bg-[#0B2545] text-white text-xs font-black px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-emerald-300" />
                  <span>Add New Doctor</span>
                </button>
              </h3>
              <p className="text-xs text-slate-600">
                Quickly add, edit credentials, adjust clinic consultation fees, or assign doctors to Sarangpur, Shujalpur, and Rajgarh OPD branches.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('DOCTORS')}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black py-2.5 rounded-xl transition cursor-pointer"
                >
                  Manage All {doctors.length} Doctors & Roster →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-600" />
                  <span>Hospital Branches Management</span>
                </span>
                <button
                  onClick={() => openBranchModal()}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-black px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-200" />
                  <span>Add New Branch</span>
                </button>
              </h3>
              <p className="text-xs text-slate-600">
                Configure physical OPD operating hours, helpline numbers, address details, and slot interval timings for each hospital branch.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('BRANCHES')}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black py-2.5 rounded-xl transition cursor-pointer"
                >
                  Manage All {clinics.length} Branches & Timings →
                </button>
              </div>
            </div>

          </div>

          {/* Branch Revenue Breakdown Cards */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#0F4C81]" />
              <span>Branch Revenue & OPD Performance Overview</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clinics.map(c => {
                const branchAppts = appointments.filter(a => a.clinicId === c.id);
                const branchRev = branchAppts.reduce((acc, a) => acc + (a.paymentStatus === 'SUCCESS' ? a.amountPaid : 0), 0);

                return (
                  <div key={c.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-sm">{c.name}</h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                        Active Branch
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <p className="flex justify-between text-slate-600">
                        <span>Total Revenue:</span>
                        <strong className="text-[#0F4C81] font-extrabold">₹{branchRev}</strong>
                      </p>
                      <p className="flex justify-between text-slate-600">
                        <span>Appointments Count:</span>
                        <strong className="text-slate-900 font-bold">{branchAppts.length}</strong>
                      </p>
                      <p className="flex justify-between text-slate-600">
                        <span>Doctors Assigned:</span>
                        <strong className="text-slate-900 font-bold">{doctors.filter(d => d.clinicsCovered.includes(c.id)).length}</strong>
                      </p>
                      <p className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
                        <span>OPD Slot Interval:</span>
                        <span className="font-mono text-slate-700 font-bold">{c.slotDurationMinutes} mins</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* 2. BRANCHES MANAGEMENT TAB */}
      {activeTab === 'BRANCHES' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h3 className="font-black text-xl text-slate-900">Hospital Branches & OPD Schedules</h3>
              <p className="text-xs text-slate-500 font-medium">Add new physical hospital branches, configure slot duration intervals, and emergency phone lines.</p>
            </div>
            <button
              onClick={() => openBranchModal()}
              className="bg-[#0F4C81] hover:bg-[#0B2545] text-white font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-emerald-300" />
              <span>Add New Branch</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {clinics.map(c => (
              <div key={c.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-black text-slate-900 text-lg">{c.fullName} ({c.name})</h4>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
                      OPERATIONAL
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0F4C81]" />
                      <span>{c.address}, {c.city}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Reception: {c.phone} | Emergency: {c.emergencyPhone}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Hours: {c.operatingHours}</span>
                    </p>
                    <p className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Settings className="w-3.5 h-3.5 text-purple-600" />
                      <span>Slot Interval: {c.slotDurationMinutes} mins / token</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full lg:w-auto">
                  <button
                    onClick={() => openBranchModal(c)}
                    className="bg-white hover:bg-slate-100 text-[#0F4C81] border border-[#0F4C81]/30 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Branch</span>
                  </button>
                  {clinics.length > 1 && (
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${c.name}?`)) {
                          deleteClinic(c.id);
                        }
                      }}
                      className="bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 font-bold px-3 py-2 rounded-xl text-xs transition cursor-pointer"
                      title="Delete Branch"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. DOCTORS ROSTER MANAGEMENT TAB */}
      {activeTab === 'DOCTORS' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h3 className="font-black text-xl text-slate-900">Doctor Roster & Credentials Management</h3>
              <p className="text-xs text-slate-500 font-medium">Add doctors, edit consultation fees, medical council registration, and clinic assignments.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter doctor name or specialty..."
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                />
              </div>

              <button
                onClick={() => openDoctorModal()}
                className="bg-[#0F4C81] hover:bg-[#0B2545] text-white font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-md shrink-0"
              >
                <UserPlus className="w-4 h-4 text-emerald-300" />
                <span>Add Doctor</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDoctors.map(doc => (
              <div key={doc.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between gap-4">
                
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.avatarUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'}
                        alt={doc.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="font-black text-slate-900 text-base">{doc.name}</h4>
                        <p className="text-xs font-extrabold text-[#0F4C81]">{doc.specialization}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{doc.regNumber}</p>
                      </div>
                    </div>

                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                      Verified NABH
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold">In-Clinic Fee:</span>
                      <p className="font-black text-slate-900">₹{doc.consultationFeeClinic}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold">Video Consult Fee:</span>
                      <p className="font-black text-emerald-600">₹{doc.consultationFeeOnline}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold">Qualification:</span>
                      <p className="font-bold text-slate-800 truncate">{doc.qualification}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold">Experience:</span>
                      <p className="font-bold text-slate-800">{doc.experienceYears} Years</p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-800">Assigned OPD Branches: </strong>
                    <span>{doc.clinicsCovered.map(cId => clinics.find(c => c.id === cId)?.name || cId).join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                  <button
                    onClick={() => openDoctorModal(doc)}
                    className="flex-1 bg-white hover:bg-slate-100 text-[#0F4C81] border border-[#0F4C81]/30 font-extrabold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profile & Fees</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Remove Dr. ${doc.name} from roster?`)) {
                        deleteDoctor(doc.id);
                      }
                    }}
                    className="bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 font-extrabold p-2 rounded-xl text-xs transition cursor-pointer"
                    title="Delete Doctor"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. REVENUE AUDIT TAB */}
      {activeTab === 'REVENUE' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-black text-xl text-slate-900">Financial Revenue & Payment Audit</h3>
            <p className="text-xs text-slate-500 font-medium">Breakdown of online gateway collections (Razorpay/UPI) versus counter cash transactions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">Total Gross Revenue</span>
              <p className="text-3xl font-black text-emerald-700">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-emerald-700 font-medium">100% Reconciliation Complete</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-black text-blue-800 uppercase tracking-wider">Online Digital Collections</span>
              <p className="text-3xl font-black text-[#0F4C81]">₹{onlineRevenue.toLocaleString()}</p>
              <p className="text-xs text-blue-700 font-medium">Razorpay, UPI & NetBanking</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-black text-amber-800 uppercase tracking-wider">OPD Counter Cash</span>
              <p className="text-3xl font-black text-amber-700">₹{cashRevenue.toLocaleString()}</p>
              <p className="text-xs text-amber-700 font-medium">In-Clinic Token Desk Collections</p>
            </div>
          </div>

          {/* Payment Transactions Table */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm text-slate-900">Detailed Transaction Records ({payments.length})</h4>
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Payment ID</th>
                    <th className="p-3">Patient Name</th>
                    <th className="p-3">Doctor</th>
                    <th className="p-3">Branch</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Gateway</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-black text-[#0F4C81]">{p.id}</td>
                      <td className="p-3 font-bold text-slate-900">{p.patientName}</td>
                      <td className="p-3 text-slate-700">{p.doctorName}</td>
                      <td className="p-3 text-slate-600">{p.clinicName}</td>
                      <td className="p-3 font-semibold">{p.paymentMethod}</td>
                      <td className="p-3 text-slate-600">{p.paymentGateway}</td>
                      <td className="p-3 font-black text-emerald-700">₹{p.amount}</td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          p.paymentStatus === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. EMR AUDIT LOG TAB */}
      {activeTab === 'EMR' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-black text-xl text-slate-900">Searchable EMR Audit Log</h3>
              <p className="text-xs text-slate-500 font-medium">Real-time tracking of all patient OPD registrations and video room tokens.</p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search patient, token, doctor..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
              />
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Token #</th>
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Branch</th>
                  <th className="p-3">Mode</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAppointments.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-black text-[#0F4C81]">{a.tokenNumber}</td>
                    <td className="p-3 font-bold text-slate-900">{a.patientName} ({a.patientPhone})</td>
                    <td className="p-3 text-slate-700">{a.doctorName}</td>
                    <td className="p-3 text-slate-600">{a.clinicName}</td>
                    <td className="p-3 font-semibold">{a.appointmentMode}</td>
                    <td className="p-3 font-bold text-emerald-700">₹{a.amountPaid}</td>
                    <td className="p-3">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DOCTOR ADD / EDIT MODAL */}
      {isDoctorModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto border border-slate-100 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#0F4C81]" />
                <span>{editingDoctor ? `Edit Profile: ${editingDoctor.name}` : 'Add New Doctor to Roster'}</span>
              </h3>
              <button onClick={() => setIsDoctorModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDoctorSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Doctor Name *</label>
                  <input
                    type="text"
                    required
                    value={doctorFormData.name}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                    placeholder="Dr. Full Name"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Doctor Official Email * (For Credentials)</label>
                  <input
                    type="email"
                    required
                    value={doctorFormData.email}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-700 focus:ring-2 focus:ring-[#0F4C81] outline-none"
                    placeholder="dr.name@sevasadanclinic.in"
                  />
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">Protected login credentials will be emailed to this address.</span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Mobile Number</label>
                  <input
                    type="tel"
                    value={doctorFormData.phone}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                    placeholder="98260 XXXXX"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    required
                    value={doctorFormData.specialization}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, specialization: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                    placeholder="e.g. Pediatrics & Child Specialist"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qualifications</label>
                  <input
                    type="text"
                    required
                    value={doctorFormData.qualification}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, qualification: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                    placeholder="e.g. MBBS, MD, DNB"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Medical Reg Number</label>
                  <input
                    type="text"
                    required
                    value={doctorFormData.regNumber}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, regNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                    placeholder="MPMC-XXXXXX"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">In-Clinic Consultation Fee (₹)</label>
                  <input
                    type="number"
                    required
                    value={doctorFormData.consultationFeeClinic}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, consultationFeeClinic: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Video Tele-OPD Fee (₹)</label>
                  <input
                    type="number"
                    required
                    value={doctorFormData.consultationFeeOnline}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, consultationFeeOnline: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Clinical Bio & Achievements</label>
                <textarea
                  rows={3}
                  value={doctorFormData.bio}
                  onChange={(e) => setDoctorFormData({ ...doctorFormData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal focus:ring-2 focus:ring-[#0F4C81] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">OPD Schedule Summary</label>
                <input
                  type="text"
                  value={doctorFormData.opdScheduleSummary}
                  onChange={(e) => setDoctorFormData({ ...doctorFormData, opdScheduleSummary: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                  placeholder="Mon-Sat: 09:00 AM - 02:00 PM"
                />
              </div>

              {/* Single Doctor Image Upload */}
              <div className="space-y-1.5 pt-1">
                <label className="block font-bold text-slate-700">Upload Doctor Profile Photo (Single Image)</label>
                <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  {doctorFormData.avatarUrl ? (
                    <div className="relative group w-16 h-16 shrink-0 rounded-2xl overflow-hidden border-2 border-[#0F4C81] shadow-xs">
                      <img src={doctorFormData.avatarUrl} alt="Doctor Avatar Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setDoctorFormData({ ...doctorFormData, avatarUrl: '' })}
                        className="absolute inset-0 bg-slate-950/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-[10px] font-black cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-[11px] font-extrabold shrink-0">
                      No Photo
                    </div>
                  )}

                  <div className="space-y-1 grow">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setDoctorFormData({ ...doctorFormData, avatarUrl: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-[#0F4C81] file:text-white hover:file:bg-[#0B2545] cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-400 font-medium">Select a single JPG or PNG photo. Uploading a new image automatically replaces the current one.</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDoctorModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0F4C81] hover:bg-[#0B2545] text-white font-black shadow-md flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-emerald-300" />
                  <span>Save & Email Login Credentials</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DESK STAFF MANAGEMENT TAB CONTENT */}
      {activeTab === 'STAFF' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">Hospital Reception & Desk Staff</h2>
              <p className="text-xs text-slate-500 font-medium">Manage receptionists, desk operators, and dispatch email login credentials.</p>
            </div>
            <button
              onClick={() => setIsStaffModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-black shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Desk Staff</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-black uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Member Name</th>
                    <th className="py-4 px-6">Email Address</th>
                    <th className="py-4 px-6">Login ID</th>
                    <th className="py-4 px-6">Assigned Branch</th>
                    <th className="py-4 px-6">Phone Number</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                  {deskStaffMembers.map(staff => (
                    <tr key={staff.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center text-xs">
                          {staff.name.charAt(0)}
                        </div>
                        <span>{staff.name}</span>
                      </td>
                      <td className="py-4 px-6 font-mono text-emerald-700">{staff.email}</td>
                      <td className="py-4 px-6 font-mono font-bold text-[#0F4C81]">{staff.loginId}</td>
                      <td className="py-4 px-6">
                        <span className="bg-sky-50 text-[#0F4C81] px-2.5 py-1 rounded-md font-bold uppercase text-[10px]">
                          {staff.branchId}
                        </span>
                      </td>
                      <td className="py-4 px-6">{staff.phone}</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => deleteDeskStaffMember(staff.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REGISTER DESK STAFF MODAL */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                <span>Register New Desk Staff</span>
              </h3>
              <button onClick={() => setIsStaffModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStaffSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Staff Member Name *</label>
                <input
                  type="text"
                  required
                  value={staffFormData.name}
                  onChange={(e) => setStaffFormData({ ...staffFormData, name: e.target.value })}
                  placeholder="e.g. Anjali Sharma"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Email Address * (For Credentials Email)</label>
                <input
                  type="email"
                  required
                  value={staffFormData.email}
                  onChange={(e) => setStaffFormData({ ...staffFormData, email: e.target.value })}
                  placeholder="staff.name@sevasadanclinic.in"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-700 focus:ring-2 focus:ring-[#0F4C81] outline-none"
                />
                <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">Protected login credentials will be emailed to this inbox.</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Phone Number</label>
                <input
                  type="tel"
                  value={staffFormData.phone}
                  onChange={(e) => setStaffFormData({ ...staffFormData, phone: e.target.value })}
                  placeholder="98261 XXXXX"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Branch</label>
                <select
                  value={staffFormData.branchId}
                  onChange={(e) => setStaffFormData({ ...staffFormData, branchId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                >
                  <option value="sarangpur">Sarangpur Branch</option>
                  <option value="shujalpur">Shujalpur Branch</option>
                  <option value="rajgarh">Rajgarh Branch</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsStaffModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Register & Email Credentials</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREDENTIALS DISPATCHED EMAIL MODAL */}
      <CredentialsDispatchedModal
        isOpen={isCredentialsModalOpen}
        onClose={() => setIsCredentialsModalOpen(false)}
        credentials={dispatchedCredentials}
      />

      {/* BRANCH ADD / EDIT MODAL */}
      {isBranchModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto border border-slate-100 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-600" />
                <span>{editingBranch ? `Edit Branch: ${editingBranch.name}` : 'Add New Hospital Branch'}</span>
              </h3>
              <button onClick={() => setIsBranchModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBranchSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Branch Name</label>
                  <input
                    type="text"
                    required
                    value={branchFormData.name}
                    onChange={(e) => setBranchFormData({ ...branchFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                    placeholder="e.g. Sarangpur Branch"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Clinic Title</label>
                  <input
                    type="text"
                    required
                    value={branchFormData.fullName}
                    onChange={(e) => setBranchFormData({ ...branchFormData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                    placeholder="SEVASADAN Multi-Specialty Clinic"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">City / Region</label>
                  <input
                    type="text"
                    required
                    value={branchFormData.city}
                    onChange={(e) => setBranchFormData({ ...branchFormData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                    placeholder="e.g. Sarangpur"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reception Phone</label>
                  <input
                    type="text"
                    required
                    value={branchFormData.phone}
                    onChange={(e) => setBranchFormData({ ...branchFormData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">24x7 Emergency Phone</label>
                  <input
                    type="text"
                    required
                    value={branchFormData.emergencyPhone}
                    onChange={(e) => setBranchFormData({ ...branchFormData, emergencyPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">OPD Slot Interval (Mins)</label>
                  <input
                    type="number"
                    required
                    value={branchFormData.slotDurationMinutes}
                    onChange={(e) => setBranchFormData({ ...branchFormData, slotDurationMinutes: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Street Address</label>
                <input
                  type="text"
                  required
                  value={branchFormData.address}
                  onChange={(e) => setBranchFormData({ ...branchFormData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal focus:ring-2 focus:ring-[#0F4C81] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Operating Hours</label>
                <input
                  type="text"
                  required
                  value={branchFormData.operatingHours}
                  onChange={(e) => setBranchFormData({ ...branchFormData, operatingHours: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#0F4C81] outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBranchModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black shadow-md"
                >
                  Save Branch Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
