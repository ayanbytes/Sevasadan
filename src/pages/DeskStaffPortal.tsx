import React, { useState } from 'react';
import { 
  UserCheck, 
  Plus, 
  Search, 
  Printer
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Appointment } from '../types';

export const DeskStaffPortal: React.FC = () => {
  const { 
    clinics, 
    doctors, 
    appointments, 
    updateAppointmentStatus, 
    openBookingModal, 
    activeBranchId 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranchFilter, setSelectedBranchFilter] = useState(activeBranchId || 'sarangpur');
  const [activeTab, setActiveTab] = useState<'queue' | 'register' | 'doctors'>('queue');

  // Filter appointments for desk staff
  const branchAppts = appointments.filter(a => 
    (!selectedBranchFilter || a.clinicId === selectedBranchFilter || selectedBranchFilter === 'all') &&
    a.appointmentMode === 'IN_CLINIC'
  );

  const pendingQueue = branchAppts.filter(a => a.status === 'PENDING' || a.status === 'CONFIRMED');
  const inProgressQueue = branchAppts.filter(a => a.status === 'IN_PROGRESS');
  const completedQueue = branchAppts.filter(a => a.status === 'COMPLETED');

  const filteredQueue = branchAppts.filter(a => {
    const matchesSearch = !searchQuery || 
      a.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.patientName && a.patientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.patientPhone && a.patientPhone.includes(searchQuery));
    return matchesSearch;
  });

  const handleCheckIn = (apptId: string) => {
    updateAppointmentStatus(apptId, 'IN_PROGRESS');
  };

  const handleComplete = (apptId: string) => {
    updateAppointmentStatus(apptId, 'COMPLETED');
  };

  const handlePrintToken = (appt: Appointment) => {
    alert(`Printing OPD Token #${appt.tokenNumber} for ${appt.patientName || 'Patient'}`);
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* HEADER BAR */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 text-[10px] font-black px-3 py-0.5 rounded-full uppercase">
              <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>FRONT DESK RECEPTION PORTAL</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">OPD Desk & Token Management</h1>
            <p className="text-xs text-slate-500 font-medium">Manage walk-in patient registration, live token queue, and doctor availability.</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedBranchFilter}
              onChange={(e) => setSelectedBranchFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
            >
              <option value="all">All Clinic Branches</option>
              {clinics.map(c => (
                <option key={c.id} value={c.id}>{c.name} OPD Desk</option>
              ))}
            </select>

            <button
              onClick={() => openBookingModal()}
              className="bg-[#10B981] hover:bg-emerald-500 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>New OPD Token</span>
            </button>
          </div>
        </div>

        {/* METRICS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase">Waiting Queue</p>
            <p className="text-2xl font-black text-[#0F4C81]">{pendingQueue.length}</p>
            <p className="text-[11px] text-slate-500 font-medium">Patients waiting in OPD lobby</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <p className="text-[10px] font-black text-emerald-600 uppercase">Inside Consultation</p>
            <p className="text-2xl font-black text-emerald-600">{inProgressQueue.length}</p>
            <p className="text-[11px] text-slate-500 font-medium">Currently with doctor</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <p className="text-[10px] font-black text-purple-600 uppercase">Completed Today</p>
            <p className="text-2xl font-black text-purple-600">{completedQueue.length}</p>
            <p className="text-[11px] text-slate-500 font-medium">Finished OPD visits</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <p className="text-[10px] font-black text-amber-500 uppercase">Active Doctors</p>
            <p className="text-2xl font-black text-amber-500">{doctors.length}</p>
            <p className="text-[11px] text-slate-500 font-medium">OPD chambers open</p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === 'queue' ? 'bg-[#0F4C81] text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Live OPD Queue ({filteredQueue.length})
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === 'doctors' ? 'bg-[#0F4C81] text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Doctor Chamber Availability
          </button>
        </div>

        {/* LIVE QUEUE TABLE */}
        {activeTab === 'queue' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 className="font-black text-base text-slate-900">Today's In-Clinic OPD Token Queue</h3>
              
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search token #, patient name or phone..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 text-slate-900 placeholder:text-slate-400 rounded-xl text-xs font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px]">
                    <th className="p-3">Token #</th>
                    <th className="p-3">Patient Details</th>
                    <th className="p-3">Assigned Doctor</th>
                    <th className="p-3">Time Slot</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQueue.map(appt => {
                    const doc = doctors.find(d => d.id === appt.doctorId);
                    return (
                      <tr key={appt.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-3 font-mono font-black text-[#0F4C81] text-sm">
                          {appt.tokenNumber}
                        </td>
                        <td className="p-3">
                          <p className="font-bold text-slate-900">{appt.patientName || 'Walk-in Patient'}</p>
                          <p className="text-[10px] text-slate-400">{appt.patientPhone} • {appt.patientGender}, {appt.patientAge} yrs</p>
                        </td>
                        <td className="p-3 font-semibold text-slate-700">
                          {doc ? doc.name : 'Duty Doctor'}
                        </td>
                        <td className="p-3 font-mono text-slate-600 font-medium">
                          {appt.timeSlot}
                        </td>
                        <td className="p-3">
                          {appt.status === 'PENDING' || appt.status === 'CONFIRMED' ? (
                            <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                              Waiting in Lobby
                            </span>
                          ) : appt.status === 'IN_PROGRESS' ? (
                            <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2.5 py-0.5 rounded-full animate-pulse">
                              Inside Chamber
                            </span>
                          ) : (
                            <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                              Completed
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => handlePrintToken(appt)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                            title="Print Token"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                          
                          {(appt.status === 'PENDING' || appt.status === 'CONFIRMED') && (
                            <button
                              onClick={() => handleCheckIn(appt.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-black transition"
                            >
                              Call to Chamber
                            </button>
                          )}

                          {appt.status === 'IN_PROGRESS' && (
                            <button
                              onClick={() => handleComplete(appt.id)}
                              className="px-2.5 py-1 bg-[#0F4C81] hover:bg-[#0A365C] text-white rounded-lg text-[11px] font-black transition"
                            >
                              Finish Visit
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* DOCTOR AVAILABILITY TAB */}
        {activeTab === 'doctors' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map(doc => (
              <div key={doc.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <img src={doc.avatarUrl} alt={doc.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                  <div>
                    <h4 className="font-black text-sm text-slate-900">{doc.name}</h4>
                    <p className="text-xs text-[#0F4C81] font-bold">{doc.specialization}</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-xs space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Schedule Today</p>
                  <p className="font-medium text-slate-700">{doc.opdScheduleSummary || 'OPD Open 09:00 AM - 02:00 PM'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
