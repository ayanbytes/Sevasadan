import type { Clinic, DoctorUser, PatientUser, Appointment, Prescription, PaymentRecord, HealthPackage, HealthBlog } from '../types';

export const INITIAL_CLINICS: Clinic[] = [
  {
    id: 'sarangpur',
    name: 'Sarangpur Branch',
    fullName: 'SEVASADAN Super Specialty OPD & Diagnostic Center - Sarangpur',
    address: 'Station Road, Near Bus Stand, Sarangpur, District Rajgarh',
    city: 'Sarangpur',
    state: 'Madhya Pradesh',
    pincode: '465661',
    coordinates: { lat: 23.5684, lng: 76.4682 },
    phone: '+91 7371 224400',
    email: 'sarangpur@sevasadanclinic.in',
    operatingHours: 'Mon - Sat: 08:00 AM - 08:00 PM | Sun: 09:00 AM - 01:00 PM',
    emergencyHelpline: '+91 98260 11223',
    activeDoctorCount: 4,
    googleMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14638.123!2d76.4682!3d23.5684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM0JzA2LjIiTiA3NsKwMjgnMDUuNSJF!5e0!3m2!1sen!2sin!4v1600000000000',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'shujalpur',
    name: 'Shujalpur Branch',
    fullName: 'SEVASADAN Health Care & Tele-OPD Center - Shujalpur',
    address: 'City Plaza, 2nd Floor, Main Market Road, Shujalpur Mandi',
    city: 'Shujalpur',
    state: 'Madhya Pradesh',
    pincode: '465333',
    coordinates: { lat: 23.3645, lng: 76.7198 },
    phone: '+91 7360 242211',
    email: 'shujalpur@sevasadanclinic.in',
    operatingHours: 'Mon - Sat: 09:00 AM - 07:30 PM | Sun: Closed',
    emergencyHelpline: '+91 98260 22334',
    activeDoctorCount: 3,
    googleMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14640.123!2d76.7198!3d23.3645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDIxJzUyLjIiTiA3NsKwNDMnMTEuMyJF!5e0!3m2!1sen!2sin!4v1600000000000',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'rajgarh',
    name: 'Rajgarh Branch',
    fullName: 'SEVASADAN Multi-Specialty Hospital & Telemedicine Hub - Rajgarh',
    address: 'Hospital Road, Near District Collectorate, Rajgarh',
    city: 'Rajgarh',
    state: 'Madhya Pradesh',
    pincode: '465661',
    coordinates: { lat: 24.0102, lng: 76.7265 },
    phone: '+91 7372 255100',
    email: 'rajgarh@sevasadanclinic.in',
    operatingHours: 'Mon - Sun: 24x7 Emergency | OPD: 08:00 AM - 09:00 PM',
    emergencyHelpline: '+91 98260 33445',
    activeDoctorCount: 5,
    googleMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14610.123!2d76.7265!3d24.0102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDAwJzM2LjciTiA3NsKwNDMnMzUuNCJF!5e0!3m2!1sen!2sin!4v1600000000000',
    imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_DOCTORS: DoctorUser[] = [
  {
    id: 'doc-rajesh',
    userId: 'user-doc-1',
    name: 'Dr. Rajesh Sharma',
    qualification: 'MD (General Medicine), MBBS',
    specialization: 'General Physician & Diabetes Specialist',
    regNumber: 'MP-34892/2010',
    bio: 'Senior Consultant Physician with over 16 years of experience in managing lifestyle diseases, diabetes, hypertension, and chronic respiratory disorders across Malwa region.',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    clinicsCovered: ['sarangpur', 'rajgarh'],
    consultationFeeClinic: 300,
    consultationFeeOnline: 400,
    rating: 4.9,
    totalReviews: 420,
    experienceYears: 16,
    role: 'DOCTOR'
  },
  {
    id: 'doc-anjali',
    userId: 'user-doc-2',
    name: 'Dr. Anjali Verma',
    qualification: 'MD (Pediatrics), DCH',
    specialization: 'Pediatrician & Neonatology Specialist',
    regNumber: 'MP-41209/2014',
    bio: 'Compassionate child specialist dedicated to neonatal care, childhood immunizations, developmental growth monitoring, and pediatric nutrition guidance.',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&q=80&w=400',
    clinicsCovered: ['shujalpur', 'sarangpur'],
    consultationFeeClinic: 350,
    consultationFeeOnline: 450,
    rating: 4.8,
    totalReviews: 310,
    experienceYears: 12,
    role: 'DOCTOR'
  },
  {
    id: 'doc-vikram',
    userId: 'user-doc-3',
    name: 'Dr. Vikramaditya Singh',
    qualification: 'MS (Orthopedics), D.Ortho',
    specialization: 'Orthopedic Surgeon & Joint Replacement',
    regNumber: 'MP-29841/2006',
    bio: 'Renowned orthopedic surgeon specializing in knee and hip joint pain management, fracture trauma care, arthritis treatment, and spinal rehabilitation.',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    clinicsCovered: ['rajgarh', 'sarangpur'],
    consultationFeeClinic: 400,
    consultationFeeOnline: 500,
    rating: 4.95,
    totalReviews: 540,
    experienceYears: 20,
    role: 'DOCTOR'
  },
  {
    id: 'doc-meenakshi',
    userId: 'user-doc-4',
    name: 'Dr. Meenakshi Joshi',
    qualification: 'MD (Dermatology, Venereology & Leprosy)',
    specialization: 'Dermatologist & Cosmetologist',
    regNumber: 'MP-51044/2017',
    bio: 'Expert dermatologist providing advanced treatment for acne, eczema, psoriasis, hair fall loss therapies, and tele-dermatology skin assessments.',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    clinicsCovered: ['shujalpur'],
    consultationFeeClinic: 350,
    consultationFeeOnline: 450,
    rating: 4.75,
    totalReviews: 280,
    experienceYears: 9,
    role: 'DOCTOR'
  },
  {
    id: 'doc-suresh',
    userId: 'user-doc-5',
    name: 'Dr. Suresh Kulkarni',
    qualification: 'DM (Cardiology), MD (Internal Medicine)',
    specialization: 'Consultant Interventional Cardiologist',
    regNumber: 'MP-18902/2002',
    bio: 'Leading cardiologist with 22+ years experience in ECG interpretation, echocardiography, hypertension risk scoring, and post-cardiac surgery follow-ups.',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    clinicsCovered: ['sarangpur', 'rajgarh'],
    consultationFeeClinic: 500,
    consultationFeeOnline: 600,
    rating: 4.98,
    totalReviews: 680,
    experienceYears: 22,
    role: 'DOCTOR'
  }
];

export const DEMO_PATIENTS: PatientUser[] = [
  {
    id: 'pat-101',
    phone: '9826198261',
    name: 'Rameshwar Prasad Yadav',
    age: 54,
    gender: 'Male',
    bloodGroup: 'B+',
    address: 'Near Narmada Colony, Sarangpur',
    patientType: 'EXISTING',
    emergencyContact: '9826198262',
    createdAt: '2026-01-15T10:00:00Z',
    email: 'rameshwar.yadav@gmail.com',
    role: 'PATIENT'
  },
  {
    id: 'pat-102',
    phone: '9425094250',
    name: 'Sunita Sharma',
    age: 38,
    gender: 'Female',
    bloodGroup: 'O+',
    address: 'Civil Lines, Shujalpur',
    patientType: 'FOLLOW_UP',
    emergencyContact: '9425094251',
    createdAt: '2026-02-10T11:30:00Z',
    email: 'sunita.sharma@yahoo.com',
    role: 'PATIENT'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-2026-001',
    patientId: 'pat-101',
    patientName: 'Rameshwar Prasad Yadav',
    patientPhone: '9826198261',
    patientAge: 54,
    patientGender: 'Male',
    patientType: 'EXISTING',
    doctorId: 'doc-rajesh',
    doctorName: 'Dr. Rajesh Sharma',
    doctorSpecialization: 'General Physician & Diabetes Specialist',
    clinicId: 'sarangpur',
    clinicName: 'Sarangpur Branch',
    appointmentMode: 'IN_CLINIC',
    appointmentDate: '2026-08-31',
    timeSlot: '10:30 AM',
    tokenNumber: 'SAR-014',
    tokenSequence: 14,
    status: 'IN_PROGRESS',
    symptoms: ['Fever', 'Fatigue', 'High blood sugar levels'],
    patientNotes: 'Routine quarterly diabetes checkup and blood sugar evaluation.',
    consentAccepted: true,
    paymentStatus: 'SUCCESS',
    paymentMethod: 'CASH_AT_CLINIC',
    amountPaid: 300,
    transactionId: 'CASH-SAR-9982',
    createdAt: '2026-08-31T08:30:00Z',
    prescriptionId: 'RX-2026-8801'
  },
  {
    id: 'APT-2026-002',
    patientId: 'pat-102',
    patientName: 'Sunita Sharma',
    patientPhone: '9425094250',
    patientAge: 38,
    patientGender: 'Female',
    patientType: 'FOLLOW_UP',
    doctorId: 'doc-anjali',
    doctorName: 'Dr. Anjali Verma',
    doctorSpecialization: 'Pediatrician & Neonatology Specialist',
    clinicId: null,
    clinicName: 'Virtual Telemedicine Room',
    appointmentMode: 'VIDEO',
    appointmentDate: '2026-08-31',
    timeSlot: '11:30 AM',
    tokenNumber: 'VID-008',
    tokenSequence: 8,
    status: 'CONFIRMED',
    symptoms: ['Pediatric skin rash', 'Mild fever in 4yo child'],
    patientNotes: 'Child experiencing mild allergic rash post seasonal change.',
    consentAccepted: true,
    consentTimestamp: '2026-08-31T09:15:00Z',
    paymentStatus: 'SUCCESS',
    paymentMethod: 'UPI',
    amountPaid: 450,
    transactionId: 'PAY-UPI-77412093',
    roomJoinToken: 'ROOM-VID-8812',
    createdAt: '2026-08-31T09:00:00Z'
  },
  {
    id: 'APT-2026-003',
    patientId: 'pat-101',
    patientName: 'Rameshwar Prasad Yadav',
    patientPhone: '9826198261',
    patientAge: 54,
    patientGender: 'Male',
    patientType: 'NEW',
    doctorId: 'doc-vikram',
    doctorName: 'Dr. Vikramaditya Singh',
    doctorSpecialization: 'Orthopedic Surgeon & Joint Replacement',
    clinicId: 'rajgarh',
    clinicName: 'Rajgarh Branch',
    appointmentMode: 'IN_CLINIC',
    appointmentDate: '2026-09-01',
    timeSlot: '04:00 PM',
    tokenNumber: 'RAJ-022',
    tokenSequence: 22,
    status: 'CONFIRMED',
    symptoms: ['Knee joint stiffness', 'Difficulty in stair climbing'],
    patientNotes: 'Experiencing right knee pain for past 3 weeks.',
    consentAccepted: true,
    paymentStatus: 'PENDING',
    paymentMethod: 'CASH_AT_CLINIC',
    amountPaid: 400,
    createdAt: '2026-08-31T11:00:00Z'
  }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'RX-2026-8801',
    appointmentId: 'APT-2026-001',
    patientId: 'pat-101',
    doctorId: 'doc-rajesh',
    doctorName: 'Dr. Rajesh Sharma',
    doctorSpecialization: 'General Physician & Diabetes Specialist',
    doctorRegNumber: 'MP-34892/2010',
    patientName: 'Rameshwar Prasad Yadav',
    patientAge: 54,
    patientGender: 'Male',
    patientPhone: '9826198261',
    clinicName: 'Sarangpur Branch - SEVASADAN',
    diagnosis: 'Type-2 Diabetes Mellitus with Mild Hypertension',
    symptoms: ['Fatigue', 'Increased thirst', 'Post-prandial hyperglycemia'],
    clinicalNotes: 'Blood Pressure: 138/86 mmHg, Fasting Blood Sugar: 148 mg/dL, HbA1c: 7.2%. Patient advised low-glycemic diet.',
    investigationsOrdered: ['HbA1c lipid profile (Serum)', 'Serum Creatinine & Electrolytes'],
    adviceList: [
      '30 minutes morning walk daily.',
      'Strictly avoid refined sugars, deep fried foods & sweetened beverages.',
      'Hydrate with at least 3 liters of water per day.'
    ],
    items: [
      {
        id: 'pi-1',
        medicineName: 'Tab. Metformin HCl SR',
        dosage: '500 mg',
        frequency: '1-0-1',
        durationDays: 30,
        timing: 'AFTER_MEAL',
        timeOfDay: { morning: true, afternoon: false, night: true },
        specialInstructions: 'Take immediately after morning breakfast and dinner.'
      },
      {
        id: 'pi-2',
        medicineName: 'Tab. Telmisartan',
        dosage: '40 mg',
        frequency: '1-0-0',
        durationDays: 30,
        timing: 'BEFORE_MEAL',
        timeOfDay: { morning: true, afternoon: false, night: false },
        specialInstructions: 'Take early morning with plain water.'
      },
      {
        id: 'pi-3',
        medicineName: 'Cap. Vitamin D3 (Cholecalciferol)',
        dosage: '60,000 IU',
        frequency: 'Once Weekly',
        durationDays: 28,
        timing: 'AFTER_MEAL',
        timeOfDay: { morning: false, afternoon: true, night: false },
        specialInstructions: 'Take every Sunday after lunch with milk.'
      }
    ],
    nextFollowUpDate: '2026-09-30',
    createdAt: '2026-08-31T10:45:00Z',
    digitalSignatureStamp: 'Dr. Rajesh Sharma [Digitally Verified MD-34892]'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'PAY-REC-9001',
    appointmentId: 'APT-2026-001',
    patientId: 'pat-101',
    patientName: 'Rameshwar Prasad Yadav',
    doctorName: 'Dr. Rajesh Sharma',
    clinicName: 'Sarangpur Branch',
    amount: 300,
    currency: 'INR',
    paymentMethod: 'CASH_AT_CLINIC',
    paymentGateway: 'OFFLINE',
    transactionId: 'CASH-SAR-9982',
    paymentStatus: 'SUCCESS',
    createdAt: '2026-08-31T08:30:00Z'
  },
  {
    id: 'PAY-REC-9002',
    appointmentId: 'APT-2026-002',
    patientId: 'pat-102',
    patientName: 'Sunita Sharma',
    doctorName: 'Dr. Anjali Verma',
    clinicName: 'Virtual Telemedicine Room',
    amount: 450,
    currency: 'INR',
    paymentMethod: 'UPI',
    paymentGateway: 'RAZORPAY',
    transactionId: 'PAY-UPI-77412093',
    paymentStatus: 'SUCCESS',
    receiptUrl: 'https://razorpay.com/receipt/sample-77412093',
    createdAt: '2026-08-31T09:00:00Z'
  }
];

export const INITIAL_HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'pkg-1',
    title: 'SEVASADAN Executive Full Body Checkup',
    titleHi: 'एग्जीक्यूटिव फुल बॉडी चेकअप',
    category: 'Full Body',
    originalPrice: 3499,
    discountedPrice: 1899,
    testCount: 52,
    popular: true,
    badge: 'MOST POPULAR',
    description: 'Comprehensive health screening including Complete Blood Count (CBC), Lipid Profile, Fasting Sugar, Liver Function, Kidney Function & ECG.',
    testsIncluded: ['CBC (24 Parameters)', 'Fasting Blood Sugar & HbA1c', 'Lipid Profile (Cholesterol)', 'Liver Function Test (LFT)', 'Kidney Function Test (KFT)', 'ECG & Doctor Consultation']
  },
  {
    id: 'pkg-[#2]',
    title: 'Advanced Cardiac Care & Heart Screening',
    titleHi: 'कार्डियक एवं हार्ट केयर पैकेज',
    category: 'Cardiac',
    originalPrice: 4200,
    discountedPrice: 2499,
    testCount: 28,
    popular: false,
    badge: 'SPECIALTY CARE',
    description: 'Targeted cardiovascular evaluation for hypertension, cholesterol management, lipid sub-fractions, Trop-I marker & 2D Echo screening.',
    testsIncluded: ['2D Echocardiogram', 'Resting ECG', 'High Sensitivity CRP', 'Lipid Profile', 'Troponin-I', 'Consultation with Dr. Suresh Kulkarni']
  },
  {
    id: 'pkg-3',
    title: 'Well Woman Comprehensive Care Package',
    titleHi: 'महिला स्वास्थ्य एवं वेलनेस पैकेज',
    category: 'Women Care',
    originalPrice: 2999,
    discountedPrice: 1599,
    testCount: 38,
    popular: true,
    badge: 'WOMEN SPECIAL',
    description: 'Tailored for women of all ages including Thyroid profile, Calcium, Vitamin D3, Haemoglobin, Pap Smear & Breast Wellness screening.',
    testsIncluded: ['Thyroid Profile (T3, T4, TSH)', 'Vitamin D3 & B12', 'Serum Calcium & Phosphorus', 'Pap Smear Assessment', 'Haemogram & Iron Profile']
  },
  {
    id: 'pkg-4',
    title: 'Comprehensive Diabetes & Metabolic Care',
    titleHi: 'डायबिटीज एवं मेटाबॉलिक पैकेज',
    category: 'Diabetes',
    originalPrice: 2499,
    discountedPrice: 1299,
    testCount: 18,
    popular: false,
    badge: 'CHRONIC CARE',
    description: 'Complete glycemic evaluation including HbA1c, Urine Microalbumin, Fundus Eye screening referral, and Nephrology markers.',
    testsIncluded: ['HbA1c & Average Blood Glucose', 'Fasting & Post-Prandial Sugar', 'Urine Microalbumin', 'Renal Function Panel', 'Consultation with Dr. Rajesh Sharma']
  }
];

export const INITIAL_HEALTH_BLOGS: HealthBlog[] = [
  {
    id: 'blog-1',
    title: 'Understanding Diabetes & Managing Blood Sugar in Malwa Summers',
    category: 'General Medicine',
    authorName: 'Dr. Rajesh Sharma',
    authorRole: 'Senior Physician',
    readTimeMinutes: 5,
    date: '28 Aug 2026',
    excerpt: 'Learn essential tips on hydration, glycemic index foods, and medication adjustments during hot summer months in Madhya Pradesh.',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'blog-2',
    title: 'Childhood Immunization Schedule: Why Timely Vaccines Matter',
    category: 'Pediatrics',
    authorName: 'Dr. Anjali Verma',
    authorRole: 'Pediatric Specialist',
    readTimeMinutes: 4,
    date: '22 Aug 2026',
    excerpt: 'A complete guide for parents in Sarangpur and Rajgarh regarding essential vaccinations from birth to age 5.',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'blog-3',
    title: 'Preventing Joint Stiffness & Osteoarthritis in Senior Citizens',
    category: 'Orthopedics',
    authorName: 'Dr. Vikramaditya Singh',
    authorRole: 'Orthopedic Surgeon',
    readTimeMinutes: 6,
    date: '15 Aug 2026',
    excerpt: 'Effective exercises, dietary calcium intake, and modern non-surgical therapies for joint mobility.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600'
  }
];
