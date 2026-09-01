import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  Video, 
  CreditCard, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  Smartphone,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import type { AppointmentMode, PatientType, PaymentMethod, Appointment } from '../../types';

export const BookingWizardModal: React.FC = () => {
  const { 
    isBookingModalOpen, 
    closeBookingModal, 
    preselectedDoctorId, 
    preselectedClinicId, 
    clinics, 
    doctors, 
    currentUser,
    bookAppointment,
    language 
  } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [appointmentMode, setAppointmentMode] = useState<AppointmentMode>('IN_CLINIC');
  const [selectedClinicId, setSelectedClinicId] = useState<string>('sarangpur');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [appointmentDate, setAppointmentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('10:30 AM');
  const [patientType, setPatientType] = useState<PatientType>('EXISTING');
  const [patientName, setPatientName] = useState<string>('');
  const [patientAge, setPatientAge] = useState<number>(45);
  const [patientGender, setPatientGender] = useState<string>('Male');
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  
  // Confirmation output
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedDoctorId) {
      setSelectedDoctorId(preselectedDoctorId);
      const doc = doctors.find(d => d.id === preselectedDoctorId);
      if (doc && doc.clinicsCovered.length > 0) {
        setSelectedClinicId(doc.clinicsCovered[0]);
      }
    } else if (doctors.length > 0) {
      setSelectedDoctorId(doctors[0].id);
    }

    if (preselectedClinicId) {
      setSelectedClinicId(preselectedClinicId);
    }

    if (currentUser && currentUser.role === 'PATIENT') {
      setPatientName((currentUser as any).name || '');
      setPatientAge((currentUser as any).age || 40);
      setPatientGender((currentUser as any).gender || 'Male');
    }
  }, [preselectedDoctorId, preselectedClinicId, isBookingModalOpen]);

  if (!isBookingModalOpen) return null;

  const currentDoctor = doctors.find(d => d.id === selectedDoctorId) || doctors[0];
  const currentClinic = clinics.find(c => c.id === selectedClinicId) || clinics[0];

  const availableSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '04:00 PM', '04:30 PM', '05:30 PM', '06:30 PM'
  ];

  const commonSymptoms = [
    'Fever / Chills', 'Cold & Cough', 'Diabetes Check', 'Hypertension / BP',
    'Joint Pain / Stiffness', 'Skin Rash / Allergy', 'Pediatric Vaccination', 'Chest Pain / ECG'
  ];

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]
    );
  };

  const handleNextStep = () => {
    if (step === 2 && !selectedDoctorId) return;
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const appt = bookAppointment({
        doctorId: selectedDoctorId,
        clinicId: appointmentMode === 'IN_CLINIC' ? selectedClinicId : null,
        appointmentMode,
        appointmentDate,
        timeSlot,
        patientNotes,
        symptoms: selectedSymptoms,
        paymentMethod,
        patientType,
        patientName: patientName || 'Patient',
        patientAge,
        patientGender
      });
      setCreatedAppointment(appt);
      setIsSubmitting(false);
      setStep(6); // Step 6: Confirmation

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 800);
  };

  const resetAndClose = () => {
    setStep(1);
    setCreatedAppointment(null);
    closeBookingModal();
  };

  const feeAmount = appointmentMode === 'VIDEO' 
    ? (currentDoctor?.consultationFeeOnline || 450) 
    : (currentDoctor?.consultationFeeClinic || 300);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header with Stepper Progress */}
        <div className="bg-gradient-to-r from-[#0B2545] via-[#0F4C81] to-[#0A365C] text-white p-6 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded bg-emerald-400/20 uppercase tracking-wider">
                {language === 'en' ? `Step ${step} of 6` : `चरण ${step} / 6`}
              </span>
              <h3 className="font-black text-xl tracking-tight mt-1">
                {step === 1 && (language === 'en' ? 'Select Booking Mode' : 'परामर्श प्रकार चुनें')}
                {step === 2 && (language === 'en' ? 'Select Branch & Doctor' : 'शाखा एवं डॉक्टर चुनें')}
                {step === 3 && (language === 'en' ? 'Date & Time Slot' : 'तारीख एवं समय का चयन')}
                {step === 4 && (language === 'en' ? 'Medical Intake & Symptoms' : 'लक्षण एवं स्वास्थ्य जानकारी')}
                {step === 5 && (language === 'en' ? 'Payment Gateway' : 'भुगतान विधि')}
                {step === 6 && (language === 'en' ? 'Booking Confirmed!' : 'अपॉइंटमेंट की पुष्टि हो गई!')}
              </h3>
            </div>
            <button 
              onClick={resetAndClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper bar */}
          <div className="flex items-center gap-1.5 pt-1">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  i <= step ? 'bg-[#10B981]' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 grow">

          {/* STEP 1: Mode Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <p className="text-sm font-semibold text-slate-600 text-center">
                {language === 'en' 
                  ? 'Choose how you would like to consult with our specialized doctors:' 
                  : 'कृपया चुनें कि आप हमारे विशेषज्ञों से परामर्श कैसे लेना चाहते हैं:'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Physical In-Clinic Option */}
                <div 
                  onClick={() => setAppointmentMode('IN_CLINIC')}
                  className={`cursor-pointer border-2 p-5 rounded-3xl transition-all relative flex flex-col justify-between ${
                    appointmentMode === 'IN_CLINIC' 
                      ? 'border-[#0F4C81] bg-sky-50/70 shadow-md ring-2 ring-[#0F4C81]/20' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  {appointmentMode === 'IN_CLINIC' && (
                    <span className="absolute top-4 right-4 bg-[#0F4C81] text-white p-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  )}
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-[#0F4C81]/10 text-[#0F4C81] rounded-2xl flex items-center justify-center">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-base text-slate-900">In-Clinic Physical Visit</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        Physical doctor consultation at Sarangpur, Shujalpur, or Rajgarh branches with sequential Token Generation & OPD Queue tracking.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#0F4C81]">
                    <span>Token System Enabled</span>
                    <span>Fee: ₹300 - ₹500</span>
                  </div>
                </div>

                {/* Virtual Video OPD Option */}
                <div 
                  onClick={() => setAppointmentMode('VIDEO')}
                  className={`cursor-pointer border-2 p-5 rounded-3xl transition-all relative flex flex-col justify-between ${
                    appointmentMode === 'VIDEO' 
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-600/20' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  {appointmentMode === 'VIDEO' && (
                    <span className="absolute top-4 right-4 bg-emerald-600 text-white p-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  )}
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
                      <Video className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-base text-slate-900">Virtual Video Consultation</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        Consult live with doctors from home over HD WebRTC video. Includes digital prescription PDF download & live whiteboard chat.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>Direct Magic Join Link</span>
                    <span>Fee: ₹400 - ₹600</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Branch & Doctor Selection */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Branch Selector if In-Clinic */}
              {appointmentMode === 'IN_CLINIC' && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    1. Select Clinic Branch
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {clinics.map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedClinicId(c.id)}
                        className={`p-3.5 rounded-2xl border text-left transition ${
                          selectedClinicId === c.id 
                            ? 'border-[#0F4C81] bg-[#0F4C81]/10 text-[#0F4C81] font-extrabold' 
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                        }`}
                      >
                        <p className="text-xs font-black truncate">{c.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{c.city}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Doctor Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. Choose Specialist Doctor
                </label>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {doctors
                    .filter(d => appointmentMode === 'VIDEO' || d.clinicsCovered.includes(selectedClinicId))
                    .map(doc => (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-4 ${
                          selectedDoctorId === doc.id 
                            ? 'border-[#0F4C81] bg-sky-50/70 shadow-xs ring-2 ring-[#0F4C81]/20' 
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <img 
                          src={doc.avatarUrl} 
                          alt={doc.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200" 
                        />
                        <div className="grow">
                          <div className="flex items-center justify-between">
                            <h5 className="font-black text-sm text-slate-900">{doc.name}</h5>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              ₹{appointmentMode === 'VIDEO' ? doc.consultationFeeOnline : doc.consultationFeeClinic}
                            </span>
                          </div>
                          <p className="text-xs text-[#0F4C81] font-bold">{doc.specialization}</p>
                          <p className="text-[11px] text-slate-500">{doc.qualification} • {doc.experienceYears} Yrs Exp</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Slot Picker */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select Preferred Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Patient Classification
                  </label>
                  <select
                    value={patientType}
                    onChange={(e) => setPatientType(e.target.value as PatientType)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                  >
                    <option value="EXISTING">Existing Patient (Registered)</option>
                    <option value="NEW">New Patient First Visit</option>
                    <option value="FOLLOW_UP">Follow-up Consultation</option>
                  </select>
                </div>
              </div>

              {/* Patient Basic Details */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Patient Name</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Name"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Age (Years)</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Gender</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Available Time Slots
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                        timeSlot === slot 
                          ? 'border-[#10B981] bg-[#10B981] text-slate-950 font-black shadow-sm' 
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Symptoms & Notes */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Common Symptoms (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map(sym => (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`text-xs px-3.5 py-1.5 rounded-xl border font-bold transition ${
                        selectedSymptoms.includes(sym)
                          ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {sym}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Medical Intake & Specific Concerns
                </label>
                <textarea
                  rows={3}
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  placeholder="Describe your health issue, duration, or any current medications..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                />
              </div>

              {/* Upload Report Mock */}
              <div className="border-2 border-dashed border-slate-200 p-4 rounded-2xl text-center bg-slate-50">
                <FileText className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <p className="text-xs font-bold text-slate-700">Attach Lab Reports / Past Prescription (Optional)</p>
                <p className="text-[10px] text-slate-500">PDF, JPG, PNG up to 10MB supported</p>
              </div>
            </div>
          )}

          {/* STEP 5: Payment Gateway Selection */}
          {step === 5 && (
            <div className="space-y-6">
              {/* Fee Summary */}
              <div className="bg-[#0B2545] text-white p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-300">Consultation Fee</p>
                  <p className="text-lg font-black">{currentDoctor?.name}</p>
                  <p className="text-xs text-emerald-300">{appointmentMode === 'VIDEO' ? 'Virtual Video OPD' : `${currentClinic?.name}`}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-300">Total Payable</span>
                  <p className="text-2xl font-black text-emerald-400">₹{feeAmount}</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Choose Payment Gateway / Method
                </label>

                {appointmentMode === 'VIDEO' && (
                  <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3.5 rounded-xl mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-amber-700" />
                    <span className="font-semibold">Online payment is mandatory for video consultations to reserve room tokens.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* UPI */}
                  <div 
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 ${
                      paymentMethod === 'UPI' ? 'border-[#0F4C81] bg-sky-50 font-bold' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-xs font-extrabold text-slate-900">UPI / GooglePay / PhonePe</p>
                      <p className="text-[10px] text-slate-500">Razorpay Direct Instant UPI</p>
                    </div>
                  </div>

                  {/* CARD */}
                  <div 
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 ${
                      paymentMethod === 'CARD' ? 'border-[#0F4C81] bg-sky-50 font-bold' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs font-extrabold text-slate-900">Debit / Credit Card</p>
                      <p className="text-[10px] text-slate-500">Cashfree Gateway</p>
                    </div>
                  </div>

                  {/* Cash at Clinic (Only for physical visit) */}
                  {appointmentMode === 'IN_CLINIC' && (
                    <div 
                      onClick={() => setPaymentMethod('CASH_AT_CLINIC')}
                      className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 sm:col-span-2 ${
                        paymentMethod === 'CASH_AT_CLINIC' ? 'border-[#10B981] bg-emerald-50 font-bold' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-emerald-700" />
                      <div>
                        <p className="text-xs font-extrabold text-slate-900">Pay Cash at Clinic OPD Counter</p>
                        <p className="text-[10px] text-slate-500">Generate token now & pay cash upon arrival</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* QR Code Scanner Simulation for UPI */}
                {paymentMethod === 'UPI' && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-2">
                    <div className="w-24 h-24 bg-white p-2 border border-slate-300 rounded-xl mx-auto flex items-center justify-center">
                      <QrCode className="w-20 h-20 text-slate-800" />
                    </div>
                    <p className="text-[11px] font-bold text-slate-700">Scan UPI QR Code with GooglePay / PhonePe / Paytm</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 6: Confirmation Receipt */}
          {step === 6 && createdAppointment && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="font-black text-2xl text-slate-900">
                  {language === 'en' ? 'Appointment Confirmed!' : 'अपॉइंटमेंट पक्की हो गई!'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Confirmation token dispatched via SMS to <strong>+91 {createdAppointment.patientPhone}</strong>
                </p>
              </div>

              {/* Token Ticket Card */}
              <div className="bg-gradient-to-br from-[#0B2545] to-[#0F4C81] text-white p-6 rounded-3xl shadow-xl text-left space-y-4 relative overflow-hidden border border-white/10">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-black text-emerald-400 tracking-wider">
                      {createdAppointment.appointmentMode === 'IN_CLINIC' ? 'Physical Token Pass' : 'Video Room Pass'}
                    </span>
                    <p className="text-3xl font-black text-amber-300 tracking-wider font-mono">
                      {createdAppointment.tokenNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-emerald-500/20 text-emerald-200 px-3 py-1 rounded-full font-extrabold border border-emerald-500/30">
                      {createdAppointment.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-300 text-[11px]">Doctor</span>
                    <p className="font-black text-white text-sm">{createdAppointment.doctorName}</p>
                    <p className="text-[10px] text-slate-300">{createdAppointment.doctorSpecialization}</p>
                  </div>
                  <div>
                    <span className="text-slate-300 text-[11px]">Branch / Venue</span>
                    <p className="font-black text-white text-sm">{createdAppointment.clinicName}</p>
                    <p className="text-[10px] text-slate-300">{createdAppointment.appointmentDate} at {createdAppointment.timeSlot}</p>
                  </div>
                </div>

                {/* Direct Video Join Button if Video mode */}
                {createdAppointment.appointmentMode === 'VIDEO' && (
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="text-xs text-emerald-300 font-bold">
                      <span>30-Min Pre-call Magic Room Link Ready</span>
                    </div>
                    <a
                      href={`#/telemedicine?room=${createdAppointment.id}&token=${createdAppointment.roomJoinToken}`}
                      onClick={resetAndClose}
                      className="bg-[#10B981] hover:bg-emerald-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
                    >
                      <Video className="w-4 h-4" />
                      <span>Enter Video Room</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetAndClose}
                  className="bg-slate-900 text-white font-black px-8 py-3 rounded-2xl text-xs hover:bg-slate-800 transition"
                >
                  Done & Close
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer with Stepper Controls */}
        {step < 6 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-1 bg-[#0F4C81] hover:bg-[#0A365C] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmBooking}
                className="flex items-center gap-1.5 bg-[#10B981] hover:bg-emerald-600 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-black shadow-md transition"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Confirm & Pay ₹{feeAmount}</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
