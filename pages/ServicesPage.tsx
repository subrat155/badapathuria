
import React from 'react';
import { Link } from 'react-router-dom';
import { School, HeartPulse, ScrollText, PhoneCall, Building2, Droplets, Zap, ShieldCheck } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const services = [
    {
      title: 'Schools',
      icon: <School className="text-[#88AB8E]" size={32} />,
      desc: 'Primary and secondary schools serving the village children with quality education and basic amenities.',
      details: '1-Primary and Secondary school'
    },
    {
      title: 'Health Center',
      icon: <HeartPulse className="text-[#88AB8E]" size={32} />,
      desc: 'Local clinic providing primary health care, maternity services, and emergency first aid for all residents.',
      details: 'Patana,Open 24 Hours, 24/7 Helpline'
    },
    {
      title: 'Government Schemes',
      icon: <ScrollText className="text-[#88AB8E]" size={32} />,
      desc: 'Information about rural welfare programs like MGNREGA, Ration Cards, and Housing schemes.',
      details: 'Apply at Panchayat Office,Gadabanikilo'
    },
    {
      title: 'Emergency Contacts',
      icon: <PhoneCall className="text-[#88AB8E]" size={32} />,
      desc: 'Village office, emergency numbers for police, fire, and ambulance services available locally.',
      details: 'Call 112 for general emergencies,Ranapur'
    },
    {
      title: 'Panchayat Office',
      icon: <Building2 className="text-[#88AB8E]" size={32} />,
      desc: 'Central hub for village administration, certificates, and community decision-making.',
      details: 'Gadabanikilo,Open-Monday to Saturday'
    },
    {
      title: 'Water Supply',
      icon: <Droplets className="text-[#88AB8E]" size={32} />,
      desc: 'Maintenance of clean drinking water systems and community well management.',
      details: 'Daily morning supply at-6A.M'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-1">
             <div className="sticky top-24">
                <span className="bg-[#88AB8E]/10 text-[#88AB8E] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                  Essential Services
                </span>
                <h1 className="text-4xl font-bold text-black mb-6 leading-tight">Improving Quality of Life</h1>
                <p className="text-lg text-black/60 leading-relaxed mb-8">
                  Badapathuria provides essential infrastructure and support systems to ensure every resident has access to basic needs.
                </p>
                <div className="space-y-4">
                   <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-[#88AB8E]/10">
                      <Zap className="text-yellow-500" />
                      <span className="font-bold text-black">Electricity: 24/7 Active</span>
                   </div>
                   <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-[#88AB8E]/10">
                      <ShieldCheck className="text-green-500" />
                      <span className="font-bold text-black">Public Safety: Secure</span>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
             {services.map((service, i) => (
               <div key={i} className="bg-white p-8 rounded-[40px] shadow-xl shadow-black/5 border border-[#88AB8E]/10 group hover:scale-[1.02] transition-all">
                  <div className="p-4 bg-[#F9F8F4] w-fit rounded-3xl mb-6 group-hover:bg-[#88AB8E]/10 transition-colors">
                     {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3">{service.title}</h3>
                  <p className="text-black/60 mb-6 text-sm leading-relaxed">{service.desc}</p>
                  <div className="text-xs font-bold text-[#88AB8E] uppercase tracking-wider bg-[#88AB8E]/5 px-3 py-1 rounded-full w-fit">
                    {service.details}
                  </div>
               </div>
             ))}
          </div>
       </div>

       <div className="bg-black rounded-[40px] p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Need Help with Services?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Our administration is here to assist you with any paperwork or service-related issues. Visit us during office hours.
            </p>
            <Link 
              to="/contact" 
              className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-2xl inline-block"
            >
              Contact Admin Office
            </Link>
          </div>
          {/* Decor */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-10 -translate-y-10" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-20 translate-y-20" />
       </div>
    </div>
  );
};

export default ServicesPage;
