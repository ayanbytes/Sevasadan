import React from 'react';
import { 
  Calendar, 
  FileText, 
  Download, 
  Video, 
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PatientDashboard: React.FC = () => {
  const { appointments, prescriptions, currentUser, openBookingModal, language } = useApp();

  const patientName = (currentUser as any)?.name || 'Rameshwar Prasad Yadav';
  const patientPhone = (currentUser as any)?.phone || '9826198261';

  // Filter patient appointments
  const myAppointments = appointments.filter(a => a.patientPhone === patientPhone || a.patientId === currentUser?.id);
  const myPrescriptions = prescriptions.filter(p => p.patientPhone === patientPhone || p.patientId === currentUser?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Patient Banner */}
      <div className="bg-gradient-to-r from-[#0F4C81] to-[#0A365C] text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 text-center md:text-left z-10">
          <span className="bg-emerald-400/20 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Patient Portal & Digital Vault
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'en' ? `Welcome back, ${patientName}!` : `नमस्ते, ${patientName}!`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Registered Phone: <strong className="text-white">+91 {patientPhone}</strong> • View tokens, digital prescriptions & video rooms.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => openBookingModal(undefined, undefined)}
            className="bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-extrabold px-5 py-3 rounded-2xl text-xs shadow-lg transition flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>{language === 'en' ? 'Book New OPD Token' : 'नया टोकन बुक करें'}</span>
          </button>
        </div>
      </div>

      {/* Grid: Upcoming Tokens (Col 7) vs Prescription Vault (Col 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Upcoming & Active Appointments */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#0F4C81]" />
              <span>Active & Upcoming Appointments</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">{myAppointments.length} Bookings</span>
          </div>

          <div className="space-y-4">
            {myAppointments.map(appt => (
              <div 
                key={appt.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Token Number</span>
                    <p className="text-xl font-black text-[#0F4C81] font-mono">{appt.tokenNumber}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                      appt.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                      appt.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {appt.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500">Doctor</span>
                    <p className="font-extrabold text-slate-900 text-sm">{appt.doctorName}</p>
                    <p className="text-[11px] text-slate-500">{appt.doctorSpecialization}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Branch & Date</span>
                    <p className="font-extrabold text-slate-900 text-sm">{appt.clinicName}</p>
                    <p className="text-[11px] text-slate-500">{appt.appointmentDate} at {appt.timeSlot}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Payment Status: <strong className="text-emerald-700">{appt.paymentStatus} (₹{appt.amountPaid})</strong>
                  </span>

                  {appt.appointmentMode === 'VIDEO' ? (
                    <a
                      href={`#/telemedicine?room=${appt.id}&token=${appt.roomJoinToken}`}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
                    >
                      <Video className="w-4 h-4" />
                      <span>Enter Video Room</span>
                    </a>
                  ) : (
                    <span className="text-slate-600 font-bold bg-slate-100 px-3 py-1 rounded-lg">
                      In-Clinic Token Active
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Prescription Vault */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>Digital Prescription Vault</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">{myPrescriptions.length} Prescriptions</span>
          </div>

          <div className="space-y-4">
            {myPrescriptions.map(rx => (
              <div 
                key={rx.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold">{rx.id}</span>
                    <h5 className="font-extrabold text-sm text-slate-900">{rx.diagnosis}</h5>
                  </div>
                  <span className="text-[10px] text-slate-400">{new Date(rx.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong>Doctor:</strong> {rx.doctorName}</p>
                  <p><strong>Medicines ({rx.items.length}):</strong> {rx.items.map(i => i.medicineName).join(', ')}</p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => openBookingModal(rx.doctorId, undefined)}
                    className="text-xs text-[#0F4C81] font-bold hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Book Follow-Up</span>
                  </button>

                  <button
                    onClick={() => alert(`Prescription PDF ${rx.id} exported successfully!`)}
                    className="bg-[#0F4C81] hover:bg-[#0A365C] text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
