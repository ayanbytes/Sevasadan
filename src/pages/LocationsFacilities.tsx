import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Navigation
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FACILITIES_DATA } from '../data/mockData';

export const LocationsFacilities: React.FC = () => {
  const { clinics, openBookingModal } = useApp();
  
  const [selectedBranchId, setSelectedBranchId] = useState<string>('sarangpur');
  const [facilityCategory, setFacilityCategory] = useState<string>('all');

  const selectedClinic = clinics.find(c => c.id === selectedBranchId) || clinics[0];

  const facilityCategories = [
    { id: 'all', label: 'All Facilities' },
    { id: 'Emergency & ICU', label: 'Emergency & ICU' },
    { id: 'Diagnostics & Imaging', label: 'Diagnostics & Labs' },
    { id: 'Surgery & OT', label: 'Modular OTs' },
    { id: 'Digital & Telehealth', label: 'Telehealth Pods' },
    { id: 'Patient Care & Amenities', label: 'Pharmacy & Care' }
  ];

  const filteredFacilities = FACILITIES_DATA.filter(f => {
    const matchesCat = facilityCategory === 'all' || f.category === facilityCategory;
    const matchesBranch = f.availableBranches.includes('all') || f.availableBranches.includes(selectedBranchId);
    return matchesCat && matchesBranch;
  });

  return (
    <div className="space-y-10 pb-16 text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#0B2545] via-[#0F4C81] to-slate-950 text-white py-10 sm:py-12 rounded-b-[2rem] shadow-2xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center max-w-3xl">
          
          <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-amber-300" />
            <span>Infrastructure & Regional OPD Locations</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Clinic Branches & State-of-the-Art <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300 bg-clip-text text-transparent">
              Medical Hospital Facilities
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
            Delivering high-tech diagnostic labs, clean-air modular OTs, 24/7 ICU resuscitation, and comfortable patient amenities across Sarangpur, Shujalpur, and Rajgarh.
          </p>

        </div>
      </section>

      {/* 2. BRANCH SELECTOR TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-[#0F4C81] uppercase tracking-wider bg-[#0F4C81]/10 px-3.5 py-1 rounded-full">
            Select OPD Location
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Our Physical Clinic Locations
          </h2>
        </div>

        {/* Branch Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {clinics.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedBranchId(c.id)}
              className={`p-5 rounded-3xl border text-left transition-all space-y-2 ${
                selectedBranchId === c.id
                  ? 'bg-[#0F4C81] text-white border-[#0F4C81] shadow-xl scale-105'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                  selectedBranchId === c.id ? 'bg-emerald-400 text-slate-950' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {c.city}
                </span>
                <span className={`text-xs font-bold ${selectedBranchId === c.id ? 'text-slate-200' : 'text-slate-500'}`}>
                  {c.activeDoctorCount} Doctors
                </span>
              </div>
              <h3 className="font-black text-base">{c.name}</h3>
              <p className={`text-xs truncate ${selectedBranchId === c.id ? 'text-slate-200' : 'text-slate-500'}`}>
                {c.address}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Branch Detail Spotlight */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[420px]">
            <img 
              src={selectedClinic.imageUrl} 
              alt={selectedClinic.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <h3 className="text-2xl font-black">{selectedClinic.fullName}</h3>
              <p className="text-xs text-slate-300 font-medium">{selectedClinic.city}, Madhya Pradesh • Pin: {selectedClinic.pincode}</p>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-[#0F4C81] uppercase tracking-wider">Branch Address</span>
                <p className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#0F4C81] shrink-0 mt-0.5" />
                  <span>{selectedClinic.address}</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">OPD Operating Hours</span>
                <p className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{selectedClinic.operatingHours}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-sky-50 p-3 rounded-2xl border border-sky-100 space-y-0.5">
                  <p className="text-[10px] text-slate-500 font-bold">Desk Reception</p>
                  <p className="text-xs font-black text-[#0F4C81] font-mono">{selectedClinic.phone}</p>
                </div>
                <div className="bg-rose-50 p-3 rounded-2xl border border-rose-100 space-y-0.5">
                  <p className="text-[10px] text-rose-600 font-bold">24x7 Emergency Helpline</p>
                  <p className="text-xs font-black text-rose-700 font-mono">{selectedClinic.emergencyHelpline}</p>
                </div>
              </div>

              <div className="pt-2">
                <iframe
                  title={`${selectedClinic.name} Map Embed`}
                  src={selectedClinic.googleMapEmbedUrl}
                  className="w-full h-40 rounded-2xl border border-slate-200 shadow-2xs"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(selectedClinic.address)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-3 rounded-xl text-xs flex items-center gap-1.5 transition"
              >
                <Navigation className="w-4 h-4 text-[#0F4C81]" />
                <span>Get Directions</span>
              </a>

              <button
                onClick={() => openBookingModal(undefined, selectedClinic.id)}
                className="bg-gradient-to-r from-[#0F4C81] to-[#10B981] hover:opacity-95 text-white font-black px-6 py-3 rounded-xl text-xs shadow-lg transition hover:scale-105 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-emerald-300" />
                <span>Book Branch Token</span>
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* 3. HOSPITAL FACILITIES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-emerald-800 uppercase tracking-wider bg-emerald-100 px-3.5 py-1 rounded-full">
            Clinical Infrastructure
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Hospital Facilities & Equipment
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
            Designed for clinical precision, patient safety, and high-quality outcomes.
          </p>
        </div>

        {/* Facility Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {facilityCategories.map(fc => (
            <button
              key={fc.id}
              onClick={() => setFacilityCategory(fc.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition ${
                facilityCategory === fc.id
                  ? 'bg-[#0F4C81] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {fc.label}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFacilities.map(fac => (
            <div 
              key={fac.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src={fac.imageUrl} 
                    alt={fac.title} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0B2545] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    {fac.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-black text-base text-slate-900 leading-snug">{fac.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3">
                    {fac.description}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5 pt-2">
                    <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider block">Key Highlights:</span>
                    <ul className="space-y-1 text-[11px] text-slate-600 font-medium">
                      {fac.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Available: {fac.availableBranches.includes('all') ? 'All 3 Branches' : fac.availableBranches.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};
