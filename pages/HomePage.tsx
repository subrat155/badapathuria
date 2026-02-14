
import React from 'react';
import { 
  Users, 
  MapPin, 
  School, 
  HeartPulse, 
  ArrowRight,
  Info,
  TrendingUp,
  Store,
  Briefcase,
  Megaphone,
  Calendar,
  Camera,
  ChevronRight,
  Star,
  Quote,
  History,
  ScrollText
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { ECONOMY_DATA, EVENTS_CHART_DATA, COLORS } from '../constants';
import { Link } from 'react-router-dom';
import { useApp } from '../AppContext';

const HomePage: React.FC = () => {
  const { homeConfig, villagers, notices, gallery, reviews } = useApp();
  const PIE_COLORS = [COLORS.primary, COLORS.secondary, COLORS.primaryDark];

  // Logic to highlight "Badapathuria" with animation
  const renderAnimatedHeading = (text: string) => {
    const target = "Badapathuria";
    if (!text.includes(target)) return text;
    
    const parts = text.split(target);
    return (
      <>
        {parts[0]}
        <span className="animate-badapathuria">{target}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:h-[600px] overflow-hidden flex items-center">
        <img 
          src={homeConfig.heroImageUrl} 
          alt="Badapathuria Village" 
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white py-20">
          <div className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-sm font-medium border border-white/20 mb-4 w-fit">
            Official Portal
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight max-w-2xl whitespace-pre-line">
            {renderAnimatedHeading(homeConfig.welcomeHeading)}
          </h1>
          <p className="text-base md:text-xl text-white/90 max-w-xl mb-8 leading-relaxed">
            {homeConfig.welcomeSubheading}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/notices" className="bg-[#88AB8E] hover:bg-[#6B8A7A] text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 transition-all">
              Latest Notices <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="bg-white hover:bg-gray-100 text-black px-8 py-3.5 rounded-full font-bold transition-all">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'POPULATION', value: villagers.length + 300, sub: 'RESIDENTS', icon: <Users className="text-[#88AB8E]" />, bg: 'bg-white' },
            { label: 'ACTIVE NOTICES', value: notices.length, sub: 'UPDATES', icon: <Info className="text-[#88AB8E]" />, bg: 'bg-white' },
            { label: 'LOCAL BUSINESSES', value: '40', sub: 'REGISTERED', icon: <Store className="text-[#88AB8E]" />, bg: 'bg-white' },
          ].map((stat, i) => (
            <div key={i} className={`${stat.bg} p-8 rounded-3xl shadow-xl shadow-black/5 border border-[#88AB8E]/10 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform`}>
              <div className="p-3 bg-[#88AB8E]/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <span className="text-xs font-bold tracking-widest text-black/50 mb-1">{stat.label}</span>
              <div className="text-4xl font-bold text-black">{stat.value}</div>
              <span className="text-xs font-medium text-[#88AB8E] mt-1">{stat.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Village Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white p-6 md:p-12 rounded-[40px] shadow-2xl shadow-black/5 border border-[#88AB8E]/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">Village Vital Stats</h3>
              <p className="text-black/40 font-medium text-sm">Monitoring the progress of Badapathuria in real-time.</p>
            </div>
            <div className="bg-[#88AB8E]/10 text-[#88AB8E] px-4 py-2 rounded-2xl text-[10px] md:text-xs font-bold tracking-widest uppercase w-fit">Panchayat Verified</div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <p className="text-sm font-bold text-black/40 mb-6 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp size={14} /> Community Participation
              </p>
              <div className="h-[250px] md:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={EVENTS_CHART_DATA}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#00000066', fontSize: 10}} />
                    <Tooltip cursor={{fill: '#88AB8E11'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="count" fill={COLORS.primary} radius={[6, 6, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-10 lg:pt-0 lg:pl-16 lg:border-l border-gray-100">
              <p className="text-sm font-bold text-black/40 mb-6 uppercase tracking-wider flex items-center gap-2">
                <Briefcase size={14} /> Employment Sectors
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                <div className="h-[200px] w-[200px] flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ECONOMY_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {ECONOMY_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4 w-full">
                  {ECONOMY_DATA.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-lg flex-shrink-0" style={{backgroundColor: PIE_COLORS[i]}} />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-black">{item.name}</div>
                        <div className="text-xs text-black/40 font-medium">{item.value}% of households</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Village History Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#F9F8F4] p-8 md:p-16 rounded-[40px] border border-[#88AB8E]/20 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/3">
              <div className="bg-[#88AB8E]/10 w-fit p-4 rounded-3xl mb-6 group-hover:bg-[#88AB8E] group-hover:text-white transition-all">
                <History size={40} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">ବଡପଥୁରିଆ ଗ୍ରାମର ଇତିହାସ</h2>
              <div className="h-1.5 w-24 bg-[#88AB8E] rounded-full mb-6" />
              <p className="text-[#88AB8E] font-bold text-sm tracking-widest uppercase mb-8">
                ୨୦୦ ବର୍ଷର ଐତିହ୍ୟ
              </p>
            </div>
            <div className="lg:w-2/3 space-y-6">
              <p className="text-black/70 text-base md:text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-[#88AB8E] first-letter:mr-3 first-letter:float-left">
                ବଡ଼ପଥୁରିଆ ହେଉଛି ପ୍ରାୟ ଦୁଇ ଶତାବ୍ଦୀ ଧରି ଇତିହାସ ଥିବା ଏକ ଗ୍ରାମ। ପ୍ରାୟ 150-200 ବର୍ଷ ପୂର୍ବେ ପ୍ରତିଷ୍ଠିତ ଏହି ଗ୍ରାମ ଏକ ଛୋଟ କୃଷି ଜନବସତିରୁ ସହଯୋଗ ଏବଂ ସମାନ ପରମ୍ପରା ଉପରେ ନିର୍ମିତ ଏକ ଘନିଷ୍ଠ ସମ୍ପ୍ରଦାୟରେ ପରିଣତ ହୋଇଥିଲା। ପ୍ରାରମ୍ଭିକ ବାସିନ୍ଦାମାନେ ମୁଖ୍ୟତଃ ଚାଷ, ପଶୁପାଳନ ଏବଂ ପ୍ରାକୃତିକ ସମ୍ପଦ ଉପରେ ନିର୍ଭର କରୁଥିଲେ, ଯାହା ଭୂମି ସହିତ ଗଭୀର ଭାବରେ ଜଡିତ ଏକ ଜୀବନଶୈଳୀକୁ ଆକାର ଦେଇଥିଲା।
              </p>
              <p className="text-black/70 text-base md:text-lg leading-relaxed">
                ପିଢ଼ି ପରେ ପିଢ଼ି ଧରି, ବଡ଼ପଥୁରିଆ ଦୃଢ଼ ସାଂସ୍କୃତିକ ମୂଳ ବିକଶିତ କରିଥିଲା। ପର୍ବପର୍ବାଣୀ, ଗ୍ରାମ ସମାବେଶ ଏବଂ ସାମୂହିକ କାର୍ଯ୍ୟ ପରିବାର ମଧ୍ୟରେ ଏକତାକୁ ସୁଦୃଢ଼ ​​କରିଥିଲା। ବୃଦ୍ଧମାନେ ପରମ୍ପରା, କାହାଣୀ ଏବଂ ମୂଲ୍ୟବୋଧକୁ ବିତରଣ କରିଥିଲେ ଯାହା ଆଜି ମଧ୍ୟ ଗ୍ରାମ ପରିଚୟକୁ ପ୍ରଭାବିତ କରେ।
              </p>
              <p className="text-black/70 text-base md:text-lg leading-relaxed">
                ସମୟ ସହିତ, ଗ୍ରାମ ଶିକ୍ଷା, ଭିତ୍ତିଭୂମି ଏବଂ ସାର୍ବଜନୀନ ସେବାରେ ଧୀରେ ଧୀରେ ବିକାଶକୁ ଗ୍ରହଣ କରିଥିଲା। ସ୍କୁଲ, ରାସ୍ତା ଏବଂ ସାମ୍ପ୍ରଦାୟିକ ସ୍ଥାନଗୁଡ଼ିକ ଗ୍ରାମୀଣ ସମନ୍ୱୟର ଆତ୍ମାକୁ ସଂରକ୍ଷଣ କରି ଜୀବନଧାରଣ ମାନକୁ ଉନ୍ତତ କରିଥିଲା। ଆଧୁନିକୀକରଣ ସତ୍ତ୍ୱେ, ବଡ଼ପଥୁରିଆ ଏହାର ଐତିହ୍ୟକୁ ସମ୍ମାନ ଦେଇ ଏବଂ ଗ୍ରାମ ଜୀବନକୁ ପରିଭାଷିତ କରୁଥିବା ସାମାଜିକ ବନ୍ଧନକୁ ବଜାୟ ରଖି ଆସୁଛି।
              </p>
              <p className="text-black/80 font-bold text-base md:text-lg leading-relaxed bg-[#88AB8E]/5 p-6 rounded-2xl border-l-4 border-[#88AB8E]">
                ଆଜି, ବଡ଼ପଥୁରିଆ ସ୍ଥିରତା, ସହଯୋଗ ଏବଂ ସାଂସ୍କୃତିକ ଗର୍ବର ପ୍ରତୀକ ଭାବରେ ଠିଆ ହୋଇଛି - ଏକ ପ୍ରଗତିଶୀଳ ଭବିଷ୍ୟତ ଆଡକୁ ଅଗ୍ରସର ହେବା ସହିତ ଏହାର ଅତୀତକୁ ସମ୍ମାନ କରୁଛି।
              </p>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#88AB8E]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute top-12 right-12 text-[#88AB8E]/10 opacity-20 pointer-events-none hidden md:block">
            <ScrollText size={200} />
          </div>
        </div>
      </section>

      {/* Notice Board Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#88AB8E] text-white rounded-xl">
              <Megaphone size={20} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-black">Recent Notices</h2>
          </div>
          <Link to="/notices" className="text-[#88AB8E] font-bold text-sm flex items-center gap-1 hover:underline underline-offset-4">
            View All Board <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notices.slice(0, 4).map((notice) => (
            <Link to="/notices" key={notice.id} className="bg-white p-6 rounded-[32px] border border-[#88AB8E]/10 shadow-lg shadow-black/5 hover:border-[#88AB8E]/40 transition-all group">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#88AB8E]/10 text-[#88AB8E] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {notice.category}
                </span>
                <span className="text-[10px] text-black/40 font-bold flex items-center gap-1">
                  <Calendar size={12} /> {notice.date}
                </span>
              </div>
              <h4 className="text-lg font-bold text-black mb-2 group-hover:text-[#88AB8E] transition-colors">{notice.title}</h4>
              <p className="text-black/60 text-sm line-clamp-2 leading-relaxed">
                {notice.content}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-black py-20 md:py-32 mb-20 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#88AB8E] font-bold uppercase tracking-[0.2em] text-sm block mb-4">Our Services</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for Community Support</h2>
              <p className="text-white/60 text-lg">Access essential village infrastructure and government support systems designed to help every resident thrive.</p>
            </div>
            <Link to="/services" className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition-all flex items-center gap-2 w-fit">
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <School size={32} />, title: 'Education', desc: 'Primary and secondary schools serving our children.' },
              { icon: <HeartPulse size={32} />, title: 'Healthcare', desc: 'PHC centers and emergency medical support.' },
              { icon: <Store size={32} />, title: 'Local Economy', desc: 'Supporting local businesses and agriculture.' },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-white/10 transition-all backdrop-blur-sm">
                <div className="text-[#88AB8E] mb-6">{s.icon}</div>
                <h4 className="text-2xl font-bold mb-3">{s.title}</h4>
                <p className="text-white/40 leading-relaxed text-sm md:text-base">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#88AB8E]/5 rounded-full translate-x-1/2 -translate-y-1/2" />
      </section>

      {/* Gallery Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-[#88AB8E] text-white rounded-xl">
               <Camera size={20} />
             </div>
             <h2 className="text-2xl md:text-3xl font-bold text-black">Village Snapshots</h2>
          </div>
          <Link to="/gallery" className="text-[#88AB8E] font-bold text-sm flex items-center gap-1 hover:underline">
            Explore Gallery <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar scroll-smooth snap-x snap-mandatory">
          {gallery.slice(0, 6).map((img) => (
            <Link key={img.id} to="/gallery" className="min-w-[280px] md:min-w-[350px] snap-center group flex flex-col bg-white rounded-[32px] overflow-hidden shadow-lg border border-[#88AB8E]/10 hover:scale-[1.02] transition-transform">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="p-5">
                <h5 className="font-bold text-black group-hover:text-[#88AB8E] transition-colors line-clamp-1">{img.title}</h5>
                <p className="text-[10px] md:text-xs text-black/50 line-clamp-2 mt-1">{img.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Villager Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <span className="text-[#88AB8E] font-bold uppercase tracking-[0.2em] text-sm block mb-4">Resident Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-black">What our Villagers say</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-[40px] shadow-xl shadow-black/5 border border-[#88AB8E]/5 relative group hover:scale-[1.02] transition-all">
              <div className="absolute top-8 right-8 text-[#88AB8E]/10">
                <Quote size={48} />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#88AB8E]/20">
                  <img src={review.avatarUrl} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-black">{review.name}</h4>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? 'text-yellow-500' : 'text-gray-200'} fill={i < review.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-black/70 leading-relaxed italic text-sm">
                "{review.content}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-[40px] p-4 shadow-xl border border-[#88AB8E]/10 overflow-hidden">
          <div className="p-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#88AB8E] text-white rounded-xl">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-black">Our Location</h3>
                <p className="text-xs md:text-sm text-black/50">📍 Badapathuria Village, Ganjam, Odisha</p>
              </div>
            </div>
            <button className="bg-[#F9F8F4] text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors w-full sm:w-auto">
              Get Directions
            </button>
          </div>
          <div className="relative rounded-[32px] overflow-hidden h-[350px] md:h-[450px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13559.64221350307!2d85.38990019288322!3d20.135169797186936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a185a53eca68429%3A0xfd70ebae457695bb!2sBadapathuria%2C%20Odisha!5e1!3m2!1sen!2sin!4v1771049415142!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
