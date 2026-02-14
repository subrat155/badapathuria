
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useApp } from '../AppContext';

const ContactPage: React.FC = () => {
  const { addComplaint } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Actually add the complaint to the system
    setTimeout(() => {
      addComplaint({
        name: formData.name,
        phone: formData.phone,
        type: formData.subject,
        description: formData.message,
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setIsSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
             <span className="bg-[#88AB8E]/10 text-[#88AB8E] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                Get In Touch
             </span>
             <h1 className="text-5xl font-bold text-black mb-6 leading-tight">Contact <br />Badapathuria Village</h1>
             <p className="text-xl text-black/60 leading-relaxed mb-12">
               We welcome your suggestions and support for village development. Connect with us through any of these channels.
             </p>
             
             <div className="space-y-8">
                {[
                  { icon: <MapPin />, title: 'Village Office', detail: 'Main Street, Badapathuria, Ganjam, Odisha - 76XXXX', color: 'bg-blue-50 text-blue-600' },
                  { icon: <Phone />, title: 'Emergency Contact', detail: '+91 67425-XXXXX', color: 'bg-red-50 text-red-600' },
                  { icon: <Mail />, title: 'Official Email', detail: 'contact@badapathuria.gov.in', color: 'bg-green-50 text-green-600' },
                  { icon: <Clock />, title: 'Office Hours', detail: 'Mon - Sat: 10:00 AM - 05:00 PM', color: 'bg-yellow-50 text-yellow-600' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                     <div className={`p-4 rounded-3xl ${item.color} group-hover:scale-110 transition-transform`}>
                        {item.icon}
                     </div>
                     <div>
                        <h4 className="font-bold text-black text-lg mb-1">{item.title}</h4>
                        <p className="text-black/60">{item.detail}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
          
          <div className="bg-white p-10 rounded-[50px] shadow-2xl border border-[#88AB8E]/10 relative overflow-hidden">
             {isSuccess && (
               <div className="absolute inset-0 bg-[#88AB8E] z-30 flex flex-col items-center justify-center text-white text-center p-10 animate-in fade-in duration-500">
                  <CheckCircle size={64} className="mb-4" />
                  <h2 className="text-3xl font-bold mb-2">Message Sent!</h2>
                  <p className="opacity-90">Thank you for reaching out. A village administrator will get back to you shortly.</p>
                  <button onClick={() => setIsSuccess(false)} className="mt-8 bg-white text-[#88AB8E] px-8 py-2 rounded-xl font-bold">Close</button>
               </div>
             )}

             <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="text-[#88AB8E]" size={24} />
                <h3 className="text-2xl font-bold text-black">Send a Suggestion</h3>
             </div>
             <form onSubmit={handleSend} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-black/70 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-5 py-4 bg-[#F9F8F4] border-none rounded-2xl focus:ring-2 focus:ring-[#88AB8E]/20" 
                        placeholder="John Doe" 
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-black/70 ml-1">Mobile No</label>
                      <input 
                        type="tel" 
                        required 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-5 py-4 bg-[#F9F8F4] border-none rounded-2xl focus:ring-2 focus:ring-[#88AB8E]/20" 
                        placeholder="+91 XXX-XXX-XXXX" 
                      />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-bold text-black/70 ml-1">Subject</label>
                   <select 
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-5 py-4 bg-[#F9F8F4] border-none rounded-2xl focus:ring-2 focus:ring-[#88AB8E]/20 appearance-none"
                    >
                      <option>General Inquiry</option>
                      <option>Infrastructure Suggestion</option>
                      <option>Welfare Program Help</option>
                      <option>Other</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-bold text-black/70 ml-1">Your Message</label>
                   <textarea 
                      required 
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-5 py-4 bg-[#F9F8F4] border-none rounded-2xl focus:ring-2 focus:ring-[#88AB8E]/20 min-h-[150px]" 
                      placeholder="Tell us how we can help..."
                    ></textarea>
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#333] transition-all shadow-xl shadow-black/10 disabled:opacity-50"
                >
                   {isSubmitting ? <Loader2 className="animate-spin" /> : <>Submit Message <Send size={18} /></>}
                </button>
             </form>
          </div>
       </div>
    </div>
  );
};

export default ContactPage;
