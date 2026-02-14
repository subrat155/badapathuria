
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Megaphone, Calendar, Tag, Search, Bell, Send, CheckCircle, Loader2 } from 'lucide-react';

const NoticesPage: React.FC = () => {
  const { notices, addComplaint } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;

    setIsSubmitting(true);
    // Simulate slight delay for UX
    setTimeout(() => {
      addComplaint({
        name: 'Anonymous Villager',
        phone: 'N/A',
        type: 'Notice Request',
        description: suggestion,
      });
      setIsSubmitting(false);
      setShowSuccess(true);
      setSuggestion('');
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-[#88AB8E] font-bold mb-2 uppercase tracking-widest text-sm">
            <Megaphone size={16} />
            Announcements
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-black">Badapathuria Notice Board</h1>
          <p className="text-black/60 mt-2 max-w-md">Stay updated with the latest news from the Panchayat and the local community.</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search notices..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-6 py-3 bg-white border border-[#88AB8E]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#88AB8E]/30 transition-all w-full md:w-72 shadow-sm"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredNotices.map((notice) => (
          <div key={notice.id} className="bg-white p-6 md:p-8 rounded-[32px] border border-[#88AB8E]/10 shadow-lg shadow-black/5 group hover:border-[#88AB8E]/30 transition-all">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  notice.category === 'Emergency' ? 'bg-red-50 text-red-600' : 'bg-[#88AB8E]/10 text-[#88AB8E]'
                }`}>
                  {notice.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-black/40 font-medium">
                  <Calendar size={12} />
                  {notice.date}
                </div>
              </div>
              <button className="flex items-center gap-2 text-[#88AB8E] text-xs font-bold hover:underline w-fit">
                <Bell size={12} /> Notify Me
              </button>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-black mb-3 group-hover:text-[#88AB8E] transition-colors">{notice.title}</h3>
            <p className="text-black/70 mb-6 leading-relaxed">
              {notice.content}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-100 gap-2 text-xs font-medium text-black/40">
              <div className="flex items-center gap-1">
                <Tag size={12} /> Official Update
              </div>
              <div>Posted by Admin</div>
            </div>
          </div>
        ))}
        {filteredNotices.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-[#88AB8E]/30">
            <Megaphone size={48} className="mx-auto mb-4 text-[#88AB8E]/20" />
            <p className="text-black/40">No matching notices found.</p>
          </div>
        )}
      </div>
      
      {/* Suggest a Notice Section */}
      <div className="mt-16 bg-black rounded-[40px] p-8 md:p-12 lg:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-[#88AB8E]/20 w-fit p-3 rounded-2xl mb-6">
              <Megaphone className="text-[#88AB8E]" size={32} />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Which notice do you want to add?</h3>
            <p className="text-white/60 mb-8 leading-relaxed max-w-lg">
              If you have community news, cultural events, or important updates to share with the village, submit your request here. It will be reviewed by the Admin and published on the notice board.
            </p>
            <div className="flex items-center gap-4 text-sm font-bold">
              <Link 
                to="/contact" 
                className="text-white/40 hover:text-[#88AB8E] underline transition-colors"
              >
                Or view contact details
              </Link>
            </div>
          </div>

          <div className="bg-white/5 p-6 md:p-8 rounded-[32px] border border-white/10 backdrop-blur-sm">
            {showSuccess ? (
              <div className="text-center py-8 animate-in zoom-in duration-300">
                <div className="bg-[#88AB8E] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Request Sent!</h4>
                <p className="text-white/50 text-sm">Your suggestion has been sent to the admin panel for review.</p>
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="mt-6 text-[#88AB8E] font-bold text-sm hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/70 ml-1">Add details here</label>
                  <textarea 
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    required
                    placeholder="Describe the notice details, date, and purpose..."
                    className="w-full px-6 py-5 bg-white/10 border-none rounded-2xl focus:ring-2 focus:ring-[#88AB8E]/50 min-h-[150px] shadow-sm text-sm text-white placeholder:text-white/20 transition-all resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>Submitting... <Loader2 className="animate-spin" size={20} /></>
                  ) : (
                    <>Submit Request <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        
        {/* Background Decor */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#88AB8E]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#88AB8E]/5 rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default NoticesPage;
