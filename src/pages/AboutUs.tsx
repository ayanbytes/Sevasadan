import React from 'react';
import { 
  Award, 
  GraduationCap,
  Stethoscope, 
  BookOpen,
  FileText,
  CheckCircle2,
  MapPin,
  Calendar,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Building2,
  Activity,
  Heart,
  Baby,
  Crosshair
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AboutUsProps {
  onNavigate?: (tab: string) => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigate }) => {
  const { openBookingModal } = useApp();

  const educationTimeline = [
    {
      period: '2010 – 2016',
      degree: 'MBBS',
      institution: 'Index Medical College, Hospital & Research Centre, Indore',
      description: 'Undergraduate medical training with extensive clinical rotations in general medicine, surgery, and pediatrics.'
    },
    {
      period: '2017 – 2020',
      degree: 'MS — General Surgery',
      institution: 'Sri Aurobindo Institute of Medical Sciences (SAIMS), Indore',
      description: 'Postgraduate surgical residency mastering emergency trauma, abdominal surgeries, and surgical critical care.'
    },
    {
      period: '2023 – 2026',
      degree: 'MCh — Pediatric Surgery',
      institution: 'MGM Medical College & Super Specialty Hospital, Indore',
      description: 'Super-specialty residency focusing on newborn congenital anomalies, pediatric urology, and pediatric laparoscopy.'
    }
  ];

  const professionalRoles = [
    {
      role: 'Senior Resident',
      organization: 'Atal Bihari Vajpayee Government Medical College, Vidisha',
      highlight: 'Managed Operation Theatre (OT), emergency surgical trauma, critical care, and trained MBBS students in surgical skills.'
    },
    {
      role: 'Former Post Graduate Medical Officer (PGMO)',
      organization: 'District Hospital, Rajgarh',
      highlight: 'Provided government public healthcare service, managing outpatient departments and emergency surgical care.'
    }
  ];

  const clinicalExpertiseList = [
    {
      icon: Baby,
      title: 'Pediatric Surgery',
      desc: 'Specialized surgical care for newborns, infants, children, and adolescents, including congenital and acquired surgical conditions.',
      bg: 'bg-sky-50 border-sky-100',
      iconColor: 'text-[#0F4C81]'
    },
    {
      icon: Heart,
      title: 'Neonatal Surgery',
      desc: 'Evaluation and surgical management of congenital and complex surgical conditions affecting newborn babies in ICU environments.',
      bg: 'bg-emerald-50 border-emerald-100',
      iconColor: 'text-emerald-600'
    },
    {
      icon: Crosshair,
      title: 'Pediatric Urology',
      desc: 'Management of surgical conditions involving the kidneys, bladder, urinary tract, urethra, and testicles in children.',
      bg: 'bg-purple-50 border-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: Stethoscope,
      title: 'General Surgery',
      desc: 'Surgical management of a broad range of common and complex surgical conditions affecting adults and children.',
      bg: 'bg-amber-50 border-amber-100',
      iconColor: 'text-amber-600'
    },
    {
      icon: Activity,
      title: 'Laparoscopic & Robotic Surgery',
      desc: 'Modern minimally invasive surgical techniques designed to reduce surgical trauma, pain, and support faster recovery.',
      bg: 'bg-teal-50 border-teal-100',
      iconColor: 'text-teal-600'
    },
    {
      icon: ShieldCheck,
      title: 'Antenatal Diagnosis & Management',
      desc: 'Identification and assessment of potential congenital surgical conditions during pregnancy through ultrasound, with birth planning.',
      bg: 'bg-rose-50 border-rose-100',
      iconColor: 'text-rose-600'
    }
  ];

  const commonConditions = [
    {
      name: 'Hypospadias',
      desc: 'Congenital abnormality involving the position of the urethral opening.'
    },
    {
      name: 'Undescended Testis',
      desc: 'Condition where one or both testicles have not descended into the scrotum.'
    },
    {
      name: 'PUJ Obstruction',
      desc: 'Obstruction at the junction between kidney and ureter, requiring pyeloplasty.'
    },
    {
      name: 'Vesicoureteral Reflux (VUR)',
      desc: 'Backward flow of urine from the bladder toward the kidneys.'
    },
    {
      name: 'Posterior Urethral Valve (PUV)',
      desc: 'Congenital obstructive condition affecting the urethra in boys.'
    },
    {
      name: 'Pediatric Kidney & Bladder Disorders',
      desc: 'Surgical conditions affecting the kidneys, urinary tract, or bladder.'
    },
    {
      name: 'Hernia',
      desc: 'Bulge caused by tissue protruding through a weakened area of abdominal wall.'
    },
    {
      name: 'Hydrocele',
      desc: 'Fluid accumulation around the testicle causing swelling in the scrotum.'
    }
  ];

  return (
    <div className="pb-24 space-y-12 text-slate-900 overflow-x-hidden w-full max-w-full">
      
      {/* ==========================================
          SECTION 1: ABOUT DR. ANKUR DESHWALI
      ========================================== */}
      <section className="relative bg-gradient-to-br from-[#0B2545] via-[#0F4C81] to-slate-950 text-white py-14 sm:py-20 rounded-b-[3rem] shadow-2xl overflow-hidden border-b border-white/10">
        {/* Ambient Glow & Radial Lighting Effects */}
        <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[650px] h-[650px] bg-[#0F4C81]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Biography & Structured Glass Cards */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Top Eyebrow Tag */}
              <div className="inline-flex items-center gap-2 bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-xs">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Class-I Gazetted Surgical Specialist • 3× MPPSC Selected</span>
              </div>

              {/* Main Elegant Title */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                  Dedicated to Specialized <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                    Surgical Care for Children
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-emerald-300/90 font-bold tracking-wide">
                  Pediatric Surgeon | Neonatal Surgeon | General Surgeon
                </p>
              </div>

              {/* Structured Glass Cards for High Scannability */}
              <div className="space-y-3 pt-1">
                
                {/* Card 1: Government & Public Service */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shadow-sm space-y-1 text-left hover:bg-white/15 transition">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <h4 className="font-extrabold text-sm text-white">Government Healthcare & Public Service</h4>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal pl-6">
                    Class-I Gazetted Surgical Specialist serving in MP Medical Services at <strong>Civil Hospital, Sarangpur</strong> & <strong>District Hospital, Rajgarh, Madhya Pradesh</strong>.
                  </p>
                </div>

                {/* Card 2: Pediatric & Neonatal Surgical Focus */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shadow-sm space-y-1 text-left hover:bg-white/15 transition">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-teal-300 shrink-0" />
                    <h4 className="font-extrabold text-sm text-white">Specialized Newborn & Pediatric Surgery</h4>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal pl-6">
                    Focusing on specialized surgical care for newborns, children, and adolescents with congenital anomalies, pediatric urology, hernia, and hydrocele conditions.
                  </p>
                </div>

                {/* Card 3: Advanced Minimally Invasive Techniques */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shadow-sm space-y-1 text-left hover:bg-white/15 transition">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-300 shrink-0" />
                    <h4 className="font-extrabold text-sm text-white">Laparoscopic, Robotic & Antenatal Care</h4>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal pl-6">
                    Advanced laparoscopic & robotic surgical techniques alongside antenatal diagnosis and management during pregnancy for seamless post-birth surgical planning.
                  </p>
                </div>

              </div>

              {/* Location Badge */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-slate-300 pt-1">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Civil Hospital, Sarangpur & District Hospital, Rajgarh, Madhya Pradesh</span>
              </div>

              {/* Action CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => openBookingModal()}
                  className="bg-[#10B981] hover:bg-emerald-500 text-slate-950 font-black px-7 py-3.5 rounded-2xl text-xs shadow-lg hover:shadow-emerald-500/25 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>Book a Consultation</span>
                </button>

                <a
                  href="tel:1800-7382-723"
                  className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-7 py-3.5 rounded-2xl text-xs border border-white/20 flex items-center gap-2 backdrop-blur-md transition hover:scale-105"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-300" />
                  <span>Call Doctor Helpline</span>
                </a>
              </div>

            </div>

            {/* Right Column: Doctor Photograph with Floating Badges */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group max-w-md w-full">
                
                {/* Decorative background glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-50 transition duration-500" />
                
                {/* Main Card Container */}
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 bg-slate-900/50 backdrop-blur-sm">
                  <img
                    src="/dr-ankur-about.png"
                    alt="Dr. Ankur Deshwali - Pediatric & Neonatal Surgeon"
                    className="w-full h-[480px] object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Doctor Title Card Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-6 text-white space-y-1">
                    <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Pediatric Surgical Specialist
                    </span>
                    <h3 className="font-black text-xl text-white">Dr. Ankur Deshwali</h3>
                    <p className="text-xs text-slate-300 font-medium">MBBS • MS • MCh (Pediatric Surgery)</p>
                  </div>
                </div>

                {/* Floating Badge Top Left */}
                <div className="absolute -top-4 -left-4 bg-slate-900/90 backdrop-blur-xl border border-white/20 text-white p-3 rounded-2xl shadow-xl hidden sm:flex items-center gap-2.5 z-20">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-black text-xs text-amber-300">MCh Degree</p>
                    <p className="text-[10px] text-slate-300 font-medium">Pediatric Surgery</p>
                  </div>
                </div>

                {/* Floating Badge Bottom Right */}
                <div className="absolute -bottom-4 -right-4 bg-slate-900/90 backdrop-blur-xl border border-white/20 text-white p-3 rounded-2xl shadow-xl hidden sm:flex items-center gap-2.5 z-20">
                  <div className="w-8 h-8 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-black text-xs text-emerald-300">3× MPPSC</p>
                    <p className="text-[10px] text-slate-300 font-medium">Selected Specialist</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: EDUCATION & QUALIFICATIONS (TIMELINE)
      ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-[#0F4C81] uppercase tracking-wider bg-[#0F4C81]/10 px-3.5 py-1 rounded-full">
            Academic Foundation
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Education & Qualifications Timeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
            Rigorous surgical training across top premier medical institutions of Madhya Pradesh.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationTimeline.map((edu, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-[#0B2545] text-emerald-400 font-black text-xs px-3.5 py-1 rounded-full font-mono">
                    {edu.period}
                  </span>
                  <GraduationCap className="w-6 h-6 text-[#0F4C81]" />
                </div>
                <h3 className="text-xl font-black text-slate-900">{edu.degree}</h3>
                <p className="text-xs font-bold text-[#0F4C81]">{edu.institution}</p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Professional Roles */}
        <div className="bg-sky-50/80 rounded-3xl p-6 sm:p-8 border border-sky-200 space-y-4">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#0F4C81]" />
            Additional Professional Roles & Government Service
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionalRoles.map((role, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-sky-100 space-y-2 shadow-xs">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                  Government Service
                </span>
                <h4 className="font-black text-base text-slate-900">{role.role}</h4>
                <p className="text-xs font-bold text-[#0F4C81]">{role.organization}</p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{role.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 3: PROFESSIONAL JOURNEY
      ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B2545] via-[#0F4C81] to-[#0D1F38] text-white rounded-3xl p-6 sm:p-10 border border-blue-900/60 shadow-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
              EXPERIENCE & LEADERSHIP
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              A Journey Built on Surgical Expertise & Service
            </h2>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-medium max-w-3xl">
            Dr. Deshwali's professional journey combines clinical practice, government healthcare service, surgical training, and academic experience.
          </p>

          {/* MPPSC Highlight Box */}
          <div className="bg-white/10 p-5 rounded-2xl border border-white/15 space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-300" />
              <h4 className="font-black text-base text-amber-300">3× MPPSC Selected Specialist</h4>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              He has been selected three times through competitive examinations conducted by the <strong>Madhya Pradesh Public Service Commission (MPPSC)</strong>, reflecting his professional competence, experience, and commitment to public healthcare.
            </p>
          </div>

          {/* Senior Resident Duties Grid */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-emerald-300 uppercase tracking-wider">
              Senior Residency at Atal Bihari Vajpayee Govt Medical College, Vidisha (2021–2022)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h5 className="font-black text-xs text-white">OT Management</h5>
                <p className="text-[11px] text-slate-300">Operation Theatre management & emergency surgical workflow.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h5 className="font-black text-xs text-white">Critical Care</h5>
                <p className="text-[11px] text-slate-300">Surgical critical care & post-operative intensive monitoring.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h5 className="font-black text-xs text-white">Surgical Training</h5>
                <p className="text-[11px] text-slate-300">Clinical & hands-on surgical procedure training.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h5 className="font-black text-xs text-white">MBBS Teaching</h5>
                <p className="text-[11px] text-slate-300">Teaching MBBS students practical bedside & surgical skills.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: AREAS OF CLINICAL EXPERTISE
      ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-[#0F4C81] uppercase tracking-wider bg-[#0F4C81]/10 px-3.5 py-1 rounded-full">
            Clinical Focus
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Areas of Clinical Expertise
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
            Specialized surgical interventions ranging from neonatal congenital repairs to minimally invasive laparoscopy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicalExpertiseList.map((exp, idx) => {
            const IconComp = exp.icon;
            return (
              <div 
                key={idx}
                className={`p-6 rounded-3xl border ${exp.bg} shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center">
                    <IconComp className={`w-6 h-6 ${exp.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">{exp.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {exp.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          SECTION 5: ACADEMIC & RESEARCH EXPERIENCE
      ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/90 rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black text-emerald-800 uppercase tracking-wider bg-emerald-100 px-3.5 py-1 rounded-full">
              RESEARCH & SCHOLARSHIP
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              Commitment to Medical Education & Research
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
              <FileText className="w-8 h-8 text-[#0F4C81]" />
              <h4 className="font-black text-2xl text-slate-900">25–30+</h4>
              <h5 className="font-black text-xs text-[#0F4C81]">Research Papers & Posters</h5>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Contributed scientific research papers and poster presentations across peer-reviewed medical platforms.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
              <BookOpen className="w-8 h-8 text-emerald-600" />
              <h4 className="font-black text-2xl text-slate-900">Conferences</h4>
              <h5 className="font-black text-xs text-emerald-600">National & International</h5>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Active participant in pediatric surgery conferences and surgical workshops to stay updated with global standards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
              <Award className="w-8 h-8 text-amber-500" />
              <h4 className="font-black text-2xl text-slate-900">Evidence-Based</h4>
              <h5 className="font-black text-xs text-amber-600">Surgical Practice</h5>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Applying evidence-based surgical guidelines to optimize post-operative recovery and long-term outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 6: COMMON CONDITIONS TREATED
      ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-black text-[#0F4C81] uppercase tracking-wider bg-[#0F4C81]/10 px-3.5 py-1 rounded-full">
              Surgical Spectrum
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Common Pediatric Conditions Treated
            </h2>
          </div>

          <button
            onClick={() => {
              if (onNavigate) onNavigate('specialties');
            }}
            className="bg-[#0F4C81] hover:bg-[#0A365C] text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>View All Conditions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {commonConditions.map((cond, idx) => (
            <div 
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition space-y-1.5 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <span className="bg-sky-50 text-[#0F4C81] text-[10px] font-black px-2 py-0.5 rounded-md">
                  Condition #{idx + 1}
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{cond.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{cond.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          FINAL CONSULTATION CTA
      ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-gradient-to-r from-[#0B2545] via-[#0F4C81] to-[#0A365C] text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-900/50">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase font-black text-emerald-400 tracking-widest">EXPERT SURGICAL ADVICE</span>
            <h3 className="text-2xl sm:text-3xl font-black">Concerned About Your Child's Surgical Health?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium">
              Early evaluation can help identify pediatric surgical conditions and enable timely treatment. Consult a Pediatric Surgeon for proper evaluation and guidance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => openBookingModal()}
              className="bg-[#10B981] hover:bg-emerald-500 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs shadow-lg transition hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Book a Consultation</span>
            </button>

            <a
              href="tel:1800-7382-723"
              className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs border border-white/20 flex items-center gap-2 backdrop-blur-md transition hover:scale-105"
            >
              <PhoneCall className="w-4 h-4 text-emerald-300" />
              <span>Contact Dr. Ankur Deshwali</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
