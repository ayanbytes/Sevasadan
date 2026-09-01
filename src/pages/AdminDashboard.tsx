import React, { useState } from 'react';
import { 
  Building2, 
  Settings, 
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { clinics, doctors, appointments, payments } = useApp();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'BRANCHES' | 'DOCTORS' | 'REVENUE' | 'EMR'>('OVERVIEW');
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase">
              Central Control Console
            </span>
            <span className="text-xs text-slate-400">SEVASADAN Multi-Branch Admin</span>
          </div>
          <h1 className="text-2xl font-black mt-1">Administrative Dashboard</h1>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-800 p-1.5 rounded-2xl text-xs font-bold">
          {(['OVERVIEW', 'BRANCHES', 'DOCTORS', 'REVENUE', 'EMR'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-xl transition ${
                activeTab === tab ? 'bg-[#0F4C81] text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-8">
          
          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Total Revenue</span>
              <p className="text-3xl font-black text-[#0F4C81]">₹{totalRevenue.toLocaleString()}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <span className="text-emerald-600 font-bold">Online: ₹{onlineRevenue}</span>
                <span>•</span>
                <span className="text-amber-600 font-bold">Cash: ₹{cashRevenue}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Total Consultations</span>
              <p className="text-3xl font-black text-emerald-600">{appointments.length}</p>
              <p className="text-xs text-slate-500">In-Clinic Tokens & Video Rooms</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Active Physical Clinics</span>
              <p className="text-3xl font-black text-amber-600">{clinics.length}</p>
              <p className="text-xs text-slate-500">Sarangpur, Shujalpur, Rajgarh</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Active Doctors</span>
              <p className="text-3xl font-black text-purple-600">{doctors.length}</p>
              <p className="text-xs text-slate-500">Covering All Specialties</p>
            </div>
          </div>

          {/* Branch Revenue Breakdown Cards */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#0F4C81]" />
              <span>Branch Revenue & OPD Performance</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clinics.map(c => {
                const branchAppts = appointments.filter(a => a.clinicId === c.id);
                const branchRev = branchAppts.reduce((acc, a) => acc + (a.paymentStatus === 'SUCCESS' ? a.amountPaid : 0), 0);

                return (
                  <div key={c.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-sm">{c.name}</h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Active
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <p className="flex justify-between text-slate-600">
                        <span>Total Revenue:</span>
                        <strong className="text-[#0F4C81] font-extrabold">₹{branchRev}</strong>
                      </p>
                      <p className="flex justify-between text-slate-600">
                        <span>Appointments Count:</span>
                        <strong className="text-slate-900 font-bold">{branchAppts.length}</strong>
                      </p>
                      <p className="flex justify-between text-slate-600">
                        <span>Doctors on Duty:</span>
                        <strong className="text-slate-900 font-bold">{c.activeDoctorCount}</strong>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* BRANCHES TAB */}
      {activeTab === 'BRANCHES' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg text-slate-900">Branch Configuration & Schedules</h3>
          </div>

          <div className="space-y-4">
            {clinics.map(c => (
              <div key={c.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-base">{c.fullName}</h4>
                  <p className="text-xs text-slate-600">{c.address} • Phone: {c.phone}</p>
                  <p className="text-xs text-[#0F4C81] font-bold">OPD Timings: {c.operatingHours}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Schedule slot editor opened for ${c.name}`)}
                    className="bg-[#0F4C81] hover:bg-[#0A365C] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configure Slot Intervals</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EMR & SEARCHABLE AUDIT LOGS TAB */}
      {activeTab === 'EMR' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-black text-lg text-slate-900">Searchable EMR Audit Log</h3>

            <div className="relative w-full sm:w-72">
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

    </div>
  );
};
