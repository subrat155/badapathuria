
import React, { useState } from 'react';
import { CircleAlert, FileText, Droplets, Zap, Construction, ShieldAlert, CheckCircle, Loader2 } from 'lucide-react';
import { useApp } from '../AppContext';

const ComplaintPage: React.FC = () => {
  const { addComplaint } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', location: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      addComplaint({
        name: formData.name,
        phone: formData.phone,
        type: 'Public Grievance',
        description: `${formData.description} (At: ${formData.location})`,
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', location: '', description: '' });
      
      // Clear success message after 4 seconds
      setTimeout(() => setIsSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
       <div className="text-center mb-16">
          <div className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 mb-4">
             <CircleAlert size={14} /> Public Grievance Cell
          </div>
          <h1 className="text-5xl font-bold text-black mb-4">Report an Issue</h1>
          <p className="text-lg text-black/60 max-w-xl mx-auto">
             Your request helps improve Badapathuria. All complaints are reviewed by village administration and tracked until resolution.
          </p>
       </div>

       {isSuccess && (
          <div className="mb-8 bg-[#88AB8E] text-white p-6 rounded-3xl flex items-center gap-4 animate-in zoom-in duration-300">
             <div className="bg-white/20 p-2 rounded-full"><CheckCircle size={24} /></div>
             <div>
                <h4 className="font-bold">Request Submitted Successfully!</h4>
                <p className="text-sm opacity-90">Our team has received your report and assigned it a tracking ID #{Math.floor(Math.random() * 9000) + 1000}.</p>
             </div>
          </div>
       )}

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Construction />, label: 'Road Damage' },
            { icon: <Droplets />, label: 'Water Issues' },
            { icon: <Zap />, label: 'Electricity' },
            { icon: <ShieldAlert />, label: 'Safety' },
          ].map((cat, i) => (
             <button key={i} className="bg-white p-6 rounded-3xl border border-[#88AB8E]/10 flex flex-col items-center gap-3 hover:border-[#88AB8E]/50 transition-all group">
                <div className="p-3 bg-[#F9F8F4] rounded-2xl text-black/40 group-hover:text-[#88AB8E] group-hover:bg-[#88AB8E]/10 transition-all">
                   {cat.icon}
                </div>
                <span className="font-bold text-black">{cat.label}</span>
             </button>
          ))}
       </div>

       <div className="bg-white rounded-[40px] shadow-2xl border border-[#88AB8E]/10 overflow-hidden relative">
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-[#88AB8E] mb-4" size={48} />
              <span className="font-bold text-[#88AB8E]">Transmitting Request...</span>
            </div>
          )}

          <div className="p-8 border-b border-gray-100 flex items-center gap-4">
             <div className="p-3 bg-[#88AB8E]/10 text-[#88AB8E] rounded-2xl">
                <FileText size={24} />
             </div>
             <div>
                <h3 className="text-xl font-bold text-black">New Request Form</h3>
                <p className="text-sm text-black/40 font-medium">Please provide accurate details for faster action.</p>
             </div>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-sm font-bold text-black/70 ml-1">Your Name</label>
                   <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 bg-[#F9F8F4] border-none rounded-2xl focus:ring-2 focus:ring-[#88AB8E]/20" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-bold text-black/70 ml-1">Phone Number</label>
                   <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-5 py-4 bg-[#F9F8F4] border-none rounded-2xl focus:ring-2 focus:ring-[#88AB8E]/20" 
                   />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-black/70 ml-1">Location of Issue</label>
                <input 
                  type="text" 
                  required
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full px-5 py-4 bg-[#F9F8F4] border-none rounded-2xl focus:ring-2 focus:ring-[#88AB8E]/20" 
                  placeholder="e.g. Near Primary School" 
                />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-black/70 ml-1">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-5 py-4 bg-[#F9F8F4] border-none rounded-2xl focus:ring-2 focus:ring-[#88AB8E]/20 min-h-[120px]"
                ></textarea>
             </div>
             <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#88AB8E] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#6B8A7A] transition-all shadow-xl shadow-[#88AB8E]/10 disabled:opacity-50"
             >
                Submit Request <CheckCircle size={20} />
             </button>
          </form>
       </div>

       <div className="mt-12 text-center text-black/40 text-sm">
          Privacy Policy: Your details are only visible to the village administrator and relevant staff.
       </div>
    </div>
  );
};

export default ComplaintPage;
