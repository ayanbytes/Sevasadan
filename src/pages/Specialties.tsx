import React, { useState } from 'react';
import { 
  Stethoscope, 
  Search, 
  CheckCircle2, 
  Calendar, 
  User, 
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SPECIALTIES_DATA } from '../data/mockData';

export const Specialties: React.FC = () => {
  const { doctors, openBookingModal, openDoctorProfileModal, language, selectedSpecialtyFilter } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(selectedSpecialtyFilter || 'all');

  React.useEffect(() => {
    if (selectedSpecialtyFilter) {
      setSelectedCategory(selectedSpecialtyFilter);
    }
  }, [selectedSpecialtyFilter]);

  const categories = [
    { id: 'all', label: 'All Specialties' },
    { id: 'Internal Medicine', label: 'General & Diabetes' },
    { id: 'Child Health', label: 'Pediatrics & Child' },
    { id: 'Bone & Joint', label: 'Orthopedics' },
    { id: 'Skin & Hair', label: 'Dermatology' },
    { id: 'Cardiovascular', label: 'Cardiology' },
    { id: 'Womens Health', label: 'Gynecology' },
    { id: 'Eye Care', label: 'Ophthalmology' },
    { id: 'Critical Care', label: 'Emergency & ICU' }
  ];

  const filteredSpecialties = SPECIALTIES_DATA.filter(sp => {
    const matchesCategory = selectedCategory === 'all' || sp.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      sp.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
      sp.nameHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sp.conditionsTreated.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 pb-16 text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#0B2545] via-[#0F4C81] to-slate-950 text-white py-10 sm:py-12 rounded-b-[2rem] shadow-2xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center max-w-3xl">
          
          <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Centers of Excellence & Clinical Care</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Specialized Medical Care <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300 bg-clip-text text-transparent">
              Tailored to Your Health Needs
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
            Explore our board-certified departments, advanced diagnostic protocols, specialized treatments, and senior medical experts across Sarangpur, Shujalpur, and Rajgarh.
          </p>

          {/* Search Box with Perfect Centered Icon Alignment */}
          <div className="pt-4 max-w-md mx-auto relative flex items-center">
            <div className="absolute left-4 flex items-center justify-center pointer-events-none">
              <Search className="w-4.5 h-4.5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specialty, condition or treatment..."
              className="w-full pl-11 pr-4 py-3.5 bg-white/95 text-slate-900 placeholder:text-slate-500 rounded-2xl text-xs font-bold shadow-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#0F4C81] text-white shadow-lg scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. SPECIALTIES DETAILED GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredSpecialties.map(sp => {
          const departmentDoctors = doctors.filter(d => sp.doctorIds.includes(d.id) || d.specialization.toLowerCase().includes(sp.id.replace('-', '')));

          return (
            <div 
              key={sp.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all space-y-6"
            >
              {/* Banner & Header */}
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img 
                  src={sp.bannerUrl} 
                  alt={sp.nameEn} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                    {sp.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black">{language === 'en' ? sp.nameEn : sp.nameHi}</h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium">{sp.tagline}</p>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-6 sm:p-8 space-y-6">
                
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {sp.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  
                  {/* Common Conditions Treated */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
                    <h3 className="font-black text-xs text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-[#0F4C81]" />
                      <span>Common Conditions Treated</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sp.conditionsTreated.map((cond, idx) => (
                        <span key={idx} className="bg-white border border-slate-200 text-slate-800 px-3 py-1 rounded-xl text-xs font-semibold shadow-2xs">
                          {cond}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Procedures & Technology */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
                    <h3 className="font-black text-xs text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Diagnostic Equipment & Procedures</span>
                    </h3>
                    <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                      {sp.proceduresAndTech.map((proc, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{proc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Key Department Doctors */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <h3 className="font-black text-xs text-slate-900 uppercase tracking-wider">
                    Department Medical Specialists ({departmentDoctors.length})
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {departmentDoctors.map(doc => (
                      <div key={doc.id} className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-2xs hover:border-[#0F4C81] transition">
                        <div className="flex items-center gap-3">
                          <img 
                            src={doc.avatarUrl} 
                            alt={doc.name} 
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                          />
                          <div>
                            <h4 className="font-black text-sm text-slate-900">{doc.name}</h4>
                            <p className="text-[11px] text-[#0F4C81] font-bold">{doc.specialization}</p>
                            <p className="text-[10px] text-slate-500">{doc.qualification}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openDoctorProfileModal(doc)}
                            className="p-2 text-slate-600 hover:text-[#0F4C81] bg-slate-100 hover:bg-sky-50 rounded-xl transition"
                            title="View Full Profile"
                          >
                            <User className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openBookingModal(doc.id, undefined)}
                            className="bg-[#0F4C81] hover:bg-[#0A365C] text-white px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1"
                          >
                            <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Book</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </section>

    </div>
  );
};
