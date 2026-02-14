
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Users, Phone, Briefcase, User, Search, Filter } from 'lucide-react';

const DirectoryPage: React.FC = () => {
  const { villagers } = useApp();
  const [search, setSearch] = useState('');

  const filteredVillagers = villagers.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) || 
    v.occupation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-[#88AB8E]/10 text-[#88AB8E] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          <Users size={14} />
          Community Connect
        </div>
        <h1 className="text-5xl font-bold text-black mb-4">Villagers Directory</h1>
        <p className="text-black/60 max-w-2xl mx-auto text-lg leading-relaxed">
          A voluntary directory to help villagers connect, support each other, and grow the local economy together.
        </p>
      </div>

      <div className="bg-white rounded-[40px] shadow-2xl border border-[#88AB8E]/10 overflow-hidden mb-12">
        <div className="p-6 md:p-8 bg-[#88AB8E]/5 border-b border-[#88AB8E]/10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or occupation..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#88AB8E]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#88AB8E]/30 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-bold text-sm shadow-sm hover:shadow-md transition-all border border-[#88AB8E]/20">
            <Filter size={18} /> Filter List
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#88AB8E]/5">
                <th className="px-8 py-6 text-xs font-bold text-black/40 uppercase tracking-widest">Villager</th>
                <th className="px-8 py-6 text-xs font-bold text-black/40 uppercase tracking-widest">Occupation</th>
                <th className="px-8 py-6 text-xs font-bold text-black/40 uppercase tracking-widest">Contact</th>
                <th className="px-8 py-6 text-xs font-bold text-black/40 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVillagers.map((villager) => (
                <tr key={villager.id} className="hover:bg-[#F9F8F4] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#88AB8E]/10 flex items-center justify-center text-[#88AB8E]">
                        <User size={24} />
                      </div>
                      <span className="font-bold text-black">{villager.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-black/70">
                      <Briefcase size={16} />
                      {villager.occupation}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-black/50">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-[#88AB8E]" />
                      {villager.contact || 'Not shared'}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button className="text-[#88AB8E] font-bold text-sm hover:underline underline-offset-4">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredVillagers.length === 0 && (
             <div className="p-20 text-center text-gray-400">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                No villagers found matching your search.
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectoryPage;
