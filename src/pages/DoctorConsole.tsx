import React, { useState } from 'react';
import { 
  Users, 
  Stethoscope, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Video, 
  Printer, 
  Building2,
  Volume2
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useApp } from '../context/AppContext';
import type { Appointment, PrescriptionItem, MealTiming } from '../types';

export const DoctorConsole: React.FC = () => {
  const { appointments, doctors, currentUser, updateAppointmentStatus, createPrescription } = useApp();

  const currentDoctor = currentUser?.role === 'DOCTOR' ? (currentUser as any) : doctors[0];

  // Active Queue Filter
  const [selectedQueueFilter, setSelectedQueueFilter] = useState<'ALL' | 'WAITING' | 'IN_PROGRESS' | 'COMPLETED'>('ALL');
  const [activeAppointment, setActiveAppointment] = useState<Appointment | null>(appointments[0] || null);

  // Prescription Form State (Rx Engine)
  const [diagnosis, setDiagnosis] = useState<string>('Type-2 Diabetes Mellitus with Mild Hypertension');
  const [symptomsInput, setSymptomsInput] = useState<string>('Fatigue, Post-prandial hyperglycemia');
  const [clinicalNotes, setClinicalNotes] = useState<string>('BP: 130/84 mmHg, Pulse: 76 bpm. Patient advised low-carb diet and regular walking.');
  const [investigationsInput, setInvestigationsInput] = useState<string>('HbA1c, Serum Creatinine');
  const [adviceInput, setAdviceInput] = useState<string>('30 mins morning walk daily. Avoid refined sugars.');
  const [nextFollowUpDate, setNextFollowUpDate] = useState<string>('2026-09-30');

  // Medicine List
  const [medicineItems, setMedicineItems] = useState<PrescriptionItem[]>([
    {
      id: 'm1',
      medicineName: 'Tab. Metformin HCl SR',
      dosage: '500 mg',
      frequency: '1-0-1',
      durationDays: 30,
      timing: 'AFTER_MEAL',
      timeOfDay: { morning: true, afternoon: false, night: true },
      specialInstructions: 'Take after breakfast and dinner.'
    },
    {
      id: 'm2',
      medicineName: 'Tab. Telmisartan',
      dosage: '40 mg',
      frequency: '1-0-0',
      durationDays: 30,
      timing: 'BEFORE_MEAL',
      timeOfDay: { morning: true, afternoon: false, night: false },
      specialInstructions: 'Take early morning.'
    }
  ]);

  // Temporary item form
  const [medName, setMedName] = useState<string>('');
  const [medDosage, setMedDosage] = useState<string>('500 mg');
  const [medFreq, setMedFreq] = useState<string>('1-0-1');
  const [medDays, setMedDays] = useState<number>(7);
  const [medTiming] = useState<MealTiming>('AFTER_MEAL');
  const [medNote, setMedNote] = useState<string>('');

  const quickMedicines = [
    'Tab. Metformin 500mg', 'Tab. Telmisartan 40mg', 'Tab. Paracetamol 650mg',
    'Cap. Amoxicillin 500mg', 'Tab. Pantoprazole 40mg', 'Syrup Crocin 120mg'
  ];

  // Speech Announcement Simulator for OPD Queue
  const handleAnnounceToken = (appt: Appointment) => {
    updateAppointmentStatus(appt.id, 'IN_PROGRESS');
    if ('speechSynthesis' in window) {
      const text = `Token number ${appt.tokenNumber}, ${appt.patientName}, please proceed to ${currentDoctor.name}'s OPD room.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAddMedicine = () => {
    if (!medName.trim()) return;
    const newItem: PrescriptionItem = {
      id: `m-${Date.now()}`,
      medicineName: medName,
      dosage: medDosage,
      frequency: medFreq,
      durationDays: medDays,
      timing: medTiming,
      timeOfDay: {
        morning: medFreq.startsWith('1'),
        afternoon: medFreq.includes('-1-'),
        night: medFreq.endsWith('1')
      },
      specialInstructions: medNote
    };
    setMedicineItems(prev => [...prev, newItem]);
    setMedName('');
    setMedNote('');
  };

  const handleRemoveMedicine = (id: string) => {
    setMedicineItems(prev => prev.filter(item => item.id !== id));
  };

  // Generate & Download Branded PDF Prescription
  const handleExportPdf = () => {
    const doc = new jsPDF();
    const patientName = activeAppointment ? activeAppointment.patientName : 'Rameshwar Prasad Yadav';
    const patientAge = activeAppointment ? activeAppointment.patientAge : 54;
    const patientGender = activeAppointment ? activeAppointment.patientGender : 'Male';
    const patientPhone = activeAppointment ? activeAppointment.patientPhone : '9826198261';

    // Header Branding
    doc.setFillColor(15, 76, 129); // Deep Teal #0F4C81
    doc.rect(0, 0, 210, 32, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('SEVASADAN HEALTHCARE NETWORK', 14, 15);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Sarangpur • Shujalpur • Rajgarh & Virtual Telemedicine OPD', 14, 22);
    doc.text('Emergency Helpline: 1800-SEVA-CLINIC | Web: www.sevasadanclinic.in', 14, 27);

    // Doctor info box (Top right)
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(currentDoctor.name, 130, 42);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(currentDoctor.qualification, 130, 47);
    doc.text(`Reg No: ${currentDoctor.regNumber}`, 130, 51);
    doc.text(currentDoctor.specialization, 130, 55);

    // Patient info banner
    doc.setFillColor(245, 247, 250);
    doc.roundedRect(14, 60, 182, 22, 3, 3, 'F');

    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.text(`Patient Name: ${patientName}`, 18, 67);
    doc.text(`Age/Gender: ${patientAge} Yrs / ${patientGender}`, 18, 73);
    doc.text(`Phone: +91 ${patientPhone}`, 18, 79);

    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 130, 67);
    doc.text(`Token No: ${activeAppointment?.tokenNumber || 'SAR-014'}`, 130, 73);
    doc.text(`Mode: ${activeAppointment?.appointmentMode || 'IN_CLINIC'}`, 130, 79);

    // Clinical Diagnosis & Symptoms
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 76, 129);
    doc.text('CLINICAL DIAGNOSIS & OBSERVATIONS', 14, 90);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`Diagnosis: ${diagnosis}`, 14, 97);
    doc.setFont('helvetica', 'normal');
    doc.text(`Clinical Notes: ${clinicalNotes}`, 14, 103);

    // Rx Symbol
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 76, 129);
    doc.text('Rx', 14, 115);

    // Table of Medicines
    const tableData = medicineItems.map((item, index) => [
      (index + 1).toString(),
      item.medicineName,
      item.dosage,
      item.frequency,
      `${item.durationDays} Days`,
      item.timing.replace('_', ' '),
      item.specialInstructions || '-'
    ]);

    autoTable(doc, {
      startY: 120,
      head: [['#', 'Medicine Name', 'Dosage', 'Frequency', 'Duration', 'Timing', 'Instructions']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [15, 76, 129], textColor: [255, 255, 255], fontSize: 8 },
      bodyStyles: { fontSize: 8, textColor: [30, 41, 59] }
    });

    const finalY = (doc as any).lastAutoTable.finalY || 180;

    // Advice & Investigations
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 76, 129);
    doc.text('INVESTIGATIONS ORDERED:', 14, finalY + 10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(investigationsInput || 'None', 65, finalY + 10);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 76, 129);
    doc.text('ADVICE & LIFESTYLE:', 14, finalY + 16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(adviceInput || 'None', 65, finalY + 16);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 76, 129);
    doc.text('NEXT FOLLOW-UP DATE:', 14, finalY + 22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129);
    doc.text(nextFollowUpDate || 'As Needed', 65, finalY + 22);

    // Digital Signature Stamp
    doc.setFillColor(240, 253, 244);
    doc.rect(130, finalY + 10, 66, 20, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129);
    doc.text('DIGITALLY SIGNED & VERIFIED', 134, finalY + 16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.text(currentDoctor.name, 134, 21 + finalY);
    doc.text(`Reg: ${currentDoctor.regNumber}`, 134, 26 + finalY);

    // Save PDF
    doc.save(`SEVASADAN_Rx_${activeAppointment?.tokenNumber || 'SAR014'}.pdf`);
  };

  const handleSavePrescription = () => {
    if (!activeAppointment) return;
    createPrescription({
      appointmentId: activeAppointment.id,
      patientId: activeAppointment.patientId,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      doctorSpecialization: currentDoctor.specialization,
      doctorRegNumber: currentDoctor.regNumber,
      patientName: activeAppointment.patientName,
      patientAge: activeAppointment.patientAge,
      patientGender: activeAppointment.patientGender,
      patientPhone: activeAppointment.patientPhone,
      clinicName: activeAppointment.clinicName,
      diagnosis,
      symptoms: symptomsInput.split(',').map(s => s.trim()),
      clinicalNotes,
      investigationsOrdered: [investigationsInput],
      adviceList: [adviceInput],
      items: medicineItems,
      nextFollowUpDate
    });
    handleExportPdf();
  };

  const filteredAppointments = appointments.filter(a => {
    if (selectedQueueFilter === 'ALL') return true;
    if (selectedQueueFilter === 'WAITING') return a.status === 'CONFIRMED' || a.status === 'PENDING';
    if (selectedQueueFilter === 'IN_PROGRESS') return a.status === 'IN_PROGRESS';
    if (selectedQueueFilter === 'COMPLETED') return a.status === 'COMPLETED';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Doctor Console Top Header */}
      <div className="bg-gradient-to-r from-[#0B2545] via-[#0F4C81] to-[#0A365C] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10">
        <div className="flex items-center gap-4">
          <img 
            src={currentDoctor.avatarUrl} 
            alt={currentDoctor.name} 
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black">{currentDoctor.name}</h2>
              <span className="bg-emerald-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded">
                Active OPD
              </span>
            </div>
            <p className="text-xs text-emerald-300 font-medium">{currentDoctor.specialization}</p>
            <p className="text-[11px] text-slate-300">Reg: {currentDoctor.regNumber} • Sarangpur & Video Desk</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10 text-xs">
          <div className="text-center px-3 border-r border-white/20">
            <p className="text-lg font-black text-amber-300">{appointments.length}</p>
            <p className="text-[10px] text-slate-300">Total Today</p>
          </div>
          <div className="text-center px-3 border-r border-white/20">
            <p className="text-lg font-black text-emerald-400">
              {appointments.filter(a => a.status === 'COMPLETED').length}
            </p>
            <p className="text-[10px] text-slate-300">Completed</p>
          </div>
          <div className="text-center px-3">
            <p className="text-lg font-black text-sky-300">
              {appointments.filter(a => a.status === 'IN_PROGRESS' || a.status === 'CONFIRMED').length}
            </p>
            <p className="text-[10px] text-slate-300">In Queue</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Queue (Col 4) vs Right Rx Engine (Col 8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Live Queue Manager */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col max-h-[840px]">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#0F4C81]" />
              <span>Live Patient Queue</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Real-time Sync</span>
          </div>

          {/* Queue Filter Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
            {(['ALL', 'WAITING', 'IN_PROGRESS', 'COMPLETED'] as const).map(f => (
              <button
                key={f}
                onClick={() => setSelectedQueueFilter(f)}
                className={`flex-1 py-1.5 rounded-lg transition ${
                  selectedQueueFilter === f ? 'bg-white text-[#0F4C81] shadow-xs font-black' : 'text-slate-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Patient Queue Cards */}
          <div className="space-y-3 overflow-y-auto grow pr-1">
            {filteredAppointments.map(appt => (
              <div
                key={appt.id}
                onClick={() => setActiveAppointment(appt)}
                className={`p-4 rounded-2xl border cursor-pointer transition space-y-2 ${
                  activeAppointment?.id === appt.id 
                    ? 'border-[#0F4C81] bg-sky-50/70 shadow-sm ring-2 ring-[#0F4C81]/20' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-sm text-[#0F4C81]">
                    {appt.tokenNumber}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                    appt.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                    appt.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {appt.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{appt.patientName}</h4>
                  <p className="text-xs text-slate-500">{appt.patientAge} Yrs, {appt.patientGender} • +91 {appt.patientPhone}</p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                  <span className="flex items-center gap-1 font-medium">
                    {appt.appointmentMode === 'VIDEO' ? <Video className="w-3.5 h-3.5 text-emerald-600" /> : <Building2 className="w-3.5 h-3.5 text-[#0F4C81]" />}
                    {appt.clinicName}
                  </span>
                  <span className="font-bold text-slate-700">{appt.timeSlot}</span>
                </div>

                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAnnounceToken(appt); }}
                    className="flex-1 bg-[#0F4C81] hover:bg-[#0A365C] text-white py-1.5 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1"
                    title="Audio OPD Announcement"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>Call Token</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); updateAppointmentStatus(appt.id, 'COMPLETED'); }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-lg text-[10px] font-bold transition"
                  >
                    Mark Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Digital Prescription Pad (Rx Creator) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          
          {/* Active Patient Details Banner */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-[#0F4C81] text-lg">{activeAppointment?.tokenNumber || 'SAR-014'}</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  {activeAppointment?.patientType || 'EXISTING'} PATIENT
                </span>
              </div>
              <h3 className="font-black text-xl text-slate-900 mt-0.5">
                {activeAppointment?.patientName || 'Rameshwar Prasad Yadav'}
              </h3>
              <p className="text-xs text-slate-600">
                {activeAppointment?.patientAge || 54} Yrs, {activeAppointment?.patientGender || 'Male'} • Phone: +91 {activeAppointment?.patientPhone || '9826198261'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportPdf}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
              <button
                onClick={handleSavePrescription}
                className="bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-extrabold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sign & Issue Rx</span>
              </button>
            </div>
          </div>

          {/* Rx Pad Sections */}
          <div className="space-y-6">
            
            {/* Diagnosis & Symptoms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Clinical Diagnosis
                </label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Type-2 Diabetes Mellitus"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Symptoms & Complaints
                </label>
                <input
                  type="text"
                  value={symptomsInput}
                  onChange={(e) => setSymptomsInput(e.target.value)}
                  placeholder="e.g. Fatigue, High sugar levels"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                />
              </div>
            </div>

            {/* Quick Medicine Pill Tagger */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Quick Medicine Autocomplete
              </label>
              <div className="flex flex-wrap gap-1.5">
                {quickMedicines.map(qm => (
                  <button
                    key={qm}
                    type="button"
                    onClick={() => setMedName(qm)}
                    className="text-[11px] bg-slate-100 hover:bg-[#0F4C81] hover:text-white px-2.5 py-1 rounded-lg font-medium text-slate-700 transition"
                  >
                    + {qm}
                  </button>
                ))}
              </div>
            </div>

            {/* Medicine Autocomplete & Add Block */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-[#0F4C81]" />
                <span>Prescribed Medicines (Rx)</span>
              </h4>

              {/* Add Medicine Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Medicine Name</label>
                  <input
                    type="text"
                    value={medName}
                    onChange={(e) => setMedName(e.target.value)}
                    placeholder="Search e.g. Metformin"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Dosage</label>
                  <input
                    type="text"
                    value={medDosage}
                    onChange={(e) => setMedDosage(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Frequency</label>
                  <select
                    value={medFreq}
                    onChange={(e) => setMedFreq(e.target.value)}
                    className="w-full px-2 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                  >
                    <option value="1-0-1">1-0-1 (Morning & Night)</option>
                    <option value="1-0-0">1-0-0 (Morning Only)</option>
                    <option value="0-0-1">0-0-1 (Night Only)</option>
                    <option value="1-1-1">1-1-1 (Thrice Daily)</option>
                    <option value="Once Weekly">Once Weekly</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Days</label>
                  <input
                    type="number"
                    value={medDays}
                    onChange={(e) => setMedDays(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={handleAddMedicine}
                    className="w-full bg-[#0F4C81] hover:bg-[#0A365C] text-white py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Added Medicines Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Medicine Name</th>
                      <th className="p-3">Dosage</th>
                      <th className="p-3">Frequency</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3">Timing</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {medicineItems.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">{item.medicineName}</td>
                        <td className="p-3 text-slate-600">{item.dosage}</td>
                        <td className="p-3 font-mono font-bold text-[#0F4C81]">{item.frequency}</td>
                        <td className="p-3 text-slate-600">{item.durationDays} Days</td>
                        <td className="p-3 text-slate-600">{item.timing.replace('_', ' ')}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleRemoveMedicine(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
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

            {/* Advice & Clinical Notes & Investigations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Investigations Ordered
                </label>
                <textarea
                  rows={2}
                  value={investigationsInput}
                  onChange={(e) => setInvestigationsInput(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Clinical Examination Notes
                </label>
                <textarea
                  rows={2}
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Advice & Lifestyle
                </label>
                <textarea
                  rows={2}
                  value={adviceInput}
                  onChange={(e) => setAdviceInput(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                />
              </div>
            </div>

            {/* Follow-up Date */}
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
              <span className="text-xs font-bold text-emerald-900">Next Scheduled Follow-up Date:</span>
              <input
                type="date"
                value={nextFollowUpDate}
                onChange={(e) => setNextFollowUpDate(e.target.value)}
                className="px-3 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs font-bold text-emerald-900"
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
