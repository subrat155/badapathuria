
import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, FileText, Camera, Users, Settings, 
  MessageSquare, CheckCircle, Clock, AlertTriangle, 
  Trash2, Plus, Home as HomeIcon, LogOut, ShieldCheck,
  Upload, Link as LinkIcon, Image as ImageIcon, User, Phone,
  Star
} from 'lucide-react';
import { useApp } from '../AppContext';

const dataUrlToFile = async (dataUrl: string, filename: string): Promise<File> => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
};

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'dash' | 'notices' | 'gallery' | 'villagers' | 'home' | 'reviews'>('dash');

  const { 
    notices, villagers, gallery, complaints, homeConfig, reviews,
    addNotice, deleteNotice, addVillager, deleteVillager,
    addImage, deleteImage, updateHomeConfig, deleteComplaint,
    addReview, deleteReview
  } = useApp();

  // Form States
  const [newNotice, setNewNotice] = useState({ title: '', category: 'Panchayat', content: '', date: new Date().toISOString().split('T')[0] });
  const [newVillager, setNewVillager] = useState({ name: '', occupation: '', contact: '' });
  const [newImage, setNewImage] = useState({ url: '', title: '', description: '' });
  const [newReview, setNewReview] = useState({ name: '', content: '', rating: 5, avatarUrl: '' });
  const [tempHome, setTempHome] = useState(homeConfig);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const homeHeroFileInputRef = useRef<HTMLInputElement>(null);
  const reviewAvatarInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === '909021') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImage({ ...newImage, url: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleHomeHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempHome({ ...tempHome, heroImageUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleReviewAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewReview({ ...newReview, avatarUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-2xl border border-[#88AB8E]/10 w-full max-w-md">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="bg-[#88AB8E] text-white p-3 rounded-2xl mb-4">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-black">Admin Access</h1>
            <p className="text-black/40 text-sm mt-2">Manage Badapathuria Portal</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-black/70 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-[#F9F8F4] border-none rounded-2xl focus:ring-2 focus:ring-[#88AB8E]/20" 
                placeholder="admin@gmail.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-black/70 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-[#F9F8F4] border-none rounded-2xl focus:ring-2 focus:ring-[#88AB8E]/20" 
                placeholder="••••••"
                required
              />
            </div>
            {loginError && <p className="text-red-500 text-xs font-bold text-center">{loginError}</p>}
            <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-bold hover:bg-[#333] transition-all shadow-xl shadow-black/10">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-black">Admin Dashboard</h1>
          <p className="text-black/60 mt-1">Logged in as admin@gmail.com</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="bg-black text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#333] transition-all flex items-center gap-2"
          >
             <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Tab Navigation - Scrollable on Mobile */}
      <div className="flex overflow-x-auto pb-4 mb-10 gap-2 border-b border-gray-100 custom-scrollbar whitespace-nowrap">
        {[
          { id: 'dash', label: 'Overview', icon: <LayoutDashboard size={18} /> },
          { id: 'home', label: 'Home Page', icon: <HomeIcon size={18} /> },
          { id: 'notices', label: 'Notices', icon: <FileText size={18} /> },
          { id: 'gallery', label: 'Gallery', icon: <Camera size={18} /> },
          { id: 'villagers', label: 'Directory', icon: <Users size={18} /> },
          { id: 'reviews', label: 'Reviews', icon: <Star size={18} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all flex-shrink-0 ${
              activeTab === tab.id 
                ? 'bg-[#88AB8E] text-white shadow-lg shadow-[#88AB8E]/20' 
                : 'text-black/60 hover:bg-[#88AB8E]/10'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'dash' && (
        <div className="space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Village Notices', value: notices.length, icon: <FileText className="text-green-500" /> },
              { label: 'Directory Size', value: villagers.length, icon: <Users className="text-purple-500" /> },
              { label: 'Gallery Photos', value: gallery.length, icon: <Camera className="text-yellow-500" /> },
              { label: 'User Inquiries', value: complaints.length, icon: <MessageSquare className="text-blue-500" /> },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-[#88AB8E]/10 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-[#F9F8F4] rounded-2xl">{stat.icon}</div>
                <div>
                  <span className="text-xs font-bold text-black/40 uppercase tracking-wider">{stat.label}</span>
                  <div className="text-2xl font-bold text-black">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[40px] border border-[#88AB8E]/10 overflow-hidden">
            <h3 className="text-xl font-bold text-black mb-6">Recent User Inquiries & Complaints</h3>
            <div className="space-y-4">
              {complaints.length === 0 ? (
                <div className="text-center py-20 bg-[#F9F8F4] rounded-3xl border border-dashed border-[#88AB8E]/20">
                   <MessageSquare size={48} className="mx-auto mb-4 text-[#88AB8E]/20" />
                   <p className="text-black/30 italic">No user submissions to display.</p>
                </div>
              ) : (
                complaints.map(item => (
                  <div key={item.id} className="p-6 border border-gray-100 rounded-[32px] bg-white hover:border-[#88AB8E]/30 transition-all">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                             item.type === 'Public Grievance' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                           }`}>
                             {item.type}
                           </span>
                           <span className="text-[10px] text-black/40 font-bold">{item.date}</span>
                        </div>
                        <p className="text-black/80 font-medium mb-4 leading-relaxed italic border-l-4 border-[#88AB8E]/20 pl-4 text-sm md:text-base">
                           "{item.description}"
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                           <div className="flex items-center gap-2 text-xs text-black/60">
                              <User size={14} className="text-[#88AB8E]" />
                              <span className="font-bold">From:</span> {item.name}
                           </div>
                           <div className="flex items-center gap-2 text-xs text-black/60">
                              <Phone size={14} className="text-[#88AB8E]" />
                              <span className="font-bold">Contact:</span> {item.phone}
                           </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
                        <div className="text-[10px] font-bold uppercase bg-gray-50 text-gray-500 px-3 py-1 rounded-full border border-gray-100">
                           {item.status}
                        </div>
                        <button 
                          onClick={() => deleteComplaint(item.id)}
                          className="flex items-center gap-2 text-red-400 hover:text-red-600 text-xs font-bold transition-colors p-2"
                        >
                          <Trash2 size={16} /> Delete Entry
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'home' && (
        <div className="bg-white p-6 md:p-8 rounded-[40px] border border-[#88AB8E]/10 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-black mb-8 flex items-center gap-2">
            <HomeIcon size={20} className="text-[#88AB8E]" /> Manage Home Page
          </h3>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-black/70 ml-1">Option 1: Hero Background URL</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={16} />
                  <input 
                    type="text" 
                    value={tempHome.heroImageUrl.startsWith('data:') ? '' : tempHome.heroImageUrl}
                    onChange={(e) => setTempHome({...tempHome, heroImageUrl: e.target.value})}
                    className="w-full pl-10 pr-5 py-4 bg-[#F9F8F4] border-none rounded-2xl text-sm" 
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-black/70 ml-1">Option 2: System Upload</label>
                <input 
                  type="file" 
                  ref={homeHeroFileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleHomeHeroUpload}
                />
                <button 
                  onClick={() => homeHeroFileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#88AB8E]/30 py-6 rounded-2xl text-[#88AB8E] font-bold hover:bg-[#88AB8E]/5 transition-all text-sm"
                >
                  <Upload size={20} />
                  {tempHome.heroImageUrl.startsWith('data:') ? 'Hero Image Selected ✅' : 'Choose from Device'}
                </button>
              </div>

              {tempHome.heroImageUrl && (
                <div className="relative w-full h-48 rounded-3xl overflow-hidden border border-[#88AB8E]/10 shadow-inner group">
                  <img src={tempHome.heroImageUrl} className="w-full h-full object-cover" alt="Hero Preview" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => setTempHome({...tempHome, heroImageUrl: ''})} 
                      className="bg-white text-red-500 p-3 rounded-full hover:scale-110 transition-transform shadow-xl"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#88AB8E]">
                    Current Preview
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-black/70">Welcome Heading</label>
                <input 
                  type="text" 
                  value={tempHome.welcomeHeading}
                  onChange={(e) => setTempHome({...tempHome, welcomeHeading: e.target.value})}
                  className="w-full px-5 py-4 bg-[#F9F8F4] border-none rounded-2xl font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-black/70">Welcome Subheading</label>
                <textarea 
                  value={tempHome.welcomeSubheading}
                  onChange={(e) => setTempHome({...tempHome, welcomeSubheading: e.target.value})}
                  className="w-full px-5 py-4 bg-[#F9F8F4] border-none rounded-2xl min-h-[100px] leading-relaxed resize-none" 
                />
              </div>
            </div>

            <button 
              onClick={() => {
                updateHomeConfig(tempHome);
                alert('Home page configuration updated successfully!');
              }}
              className="w-full bg-[#88AB8E] text-white py-5 rounded-2xl font-bold hover:bg-[#6B8A7A] shadow-xl shadow-[#88AB8E]/20 transition-all active:scale-95"
            >
              Apply Home Page Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'notices' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 md:p-8 rounded-[40px] border border-[#88AB8E]/10 h-fit">
            <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-2"><Plus size={20} /> Add New Notice</h3>
            <div className="space-y-4">
              <input 
                placeholder="Notice Title"
                value={newNotice.title}
                onChange={e => setNewNotice({...newNotice, title: e.target.value})}
                className="w-full px-5 py-4 bg-[#F9F8F4] rounded-2xl"
              />
              <select 
                value={newNotice.category}
                onChange={e => setNewNotice({...newNotice, category: e.target.value})}
                className="w-full px-5 py-4 bg-[#F9F8F4] rounded-2xl"
              >
                <option>Panchayat</option>
                <option>Culture</option>
                <option>Health</option>
                <option>Emergency</option>
              </select>
              <textarea 
                placeholder="Notice Content"
                value={newNotice.content}
                onChange={e => setNewNotice({...newNotice, content: e.target.value})}
                className="w-full px-5 py-4 bg-[#F9F8F4] rounded-2xl min-h-[120px] resize-none"
              ></textarea>
              <button 
                onClick={() => {
                  if (newNotice.title && newNotice.content) {
                    addNotice(newNotice);
                    setNewNotice({ title: '', category: 'Panchayat', content: '', date: new Date().toISOString().split('T')[0] });
                  }
                }}
                className="w-full bg-[#88AB8E] text-white py-4 rounded-2xl font-bold"
              >
                Publish Notice
              </button>
            </div>
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar p-2">
            {notices.map(n => (
              <div key={n.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex justify-between items-start gap-4 shadow-sm">
                <div>
                  <span className="text-[10px] font-bold text-[#88AB8E] uppercase">{n.category}</span>
                  <h4 className="font-bold text-black text-sm md:text-base">{n.title}</h4>
                  <p className="text-xs text-black/40 mt-1 line-clamp-2">{n.content}</p>
                </div>
                <button onClick={() => deleteNotice(n.id)} className="text-red-400 hover:text-red-600 p-2 flex-shrink-0 transition-colors"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'gallery' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 md:p-8 rounded-[40px] border border-[#88AB8E]/10 h-fit">
            <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-2"><Plus size={20} /> Add to Gallery</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-bold text-black/40 uppercase ml-1">Option 1: Image URL</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={16} />
                      <input 
                        placeholder="https://..."
                        value={newImage.url.startsWith('data:') ? '' : newImage.url}
                        onChange={e => setNewImage({...newImage, url: e.target.value})}
                        className="w-full pl-10 pr-5 py-4 bg-[#F9F8F4] rounded-2xl text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-black/40 uppercase ml-1">Option 2: System Upload</label>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileUpload}
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#88AB8E]/30 py-6 rounded-2xl text-[#88AB8E] font-bold hover:bg-[#88AB8E]/5 transition-all text-sm"
                  >
                    <Upload size={20} />
                    {newImage.url.startsWith('data:') ? 'Image Selected ✅' : 'Choose from Gallery'}
                  </button>
                </div>

                {newImage.url && (
                  <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
                    <img src={newImage.url} className="w-full h-full object-cover" alt="Preview" />
                    <button onClick={() => setNewImage({...newImage, url: ''})} className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-full"><Trash2 size={14} /></button>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <input 
                  placeholder="Photo Title"
                  value={newImage.title}
                  onChange={e => setNewImage({...newImage, title: e.target.value})}
                  className="w-full px-5 py-4 bg-[#F9F8F4] rounded-2xl text-sm"
                />
                <input 
                  placeholder="Description"
                  value={newImage.description}
                  onChange={e => setNewImage({...newImage, description: e.target.value})}
                  className="w-full px-5 py-4 bg-[#F9F8F4] rounded-2xl text-sm"
                />
                <button 
                  onClick={async () => {
                    if (newImage.url && newImage.title) {
                      const file = newImage.url.startsWith('data:')
                        ? await dataUrlToFile(newImage.url, 'admin-upload.jpg')
                        : undefined;
                      await addImage({
                        ...newImage,
                        url: file ? '' : newImage.url,
                        file,
                      });
                      setNewImage({ url: '', title: '', description: '' });
                    }
                  }}
                  className="w-full bg-[#88AB8E] text-white py-4 rounded-2xl font-bold shadow-xl shadow-[#88AB8E]/20 transition-transform active:scale-95"
                >
                  Add to Village Lens
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto p-2 custom-scrollbar">
            {gallery.map(img => (
              <div key={img.id} className="relative rounded-2xl overflow-hidden group border border-gray-100 shadow-sm aspect-video">
                <img src={img.url} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                   <span className="text-white text-[10px] font-bold mb-2 line-clamp-1">{img.title}</span>
                   <button 
                    onClick={() => deleteImage(img.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'villagers' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 md:p-8 rounded-[40px] border border-[#88AB8E]/10 h-fit">
            <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-2"><Plus size={20} /> Register Resident</h3>
            <div className="space-y-4">
              <input 
                placeholder="Full Name"
                value={newVillager.name}
                onChange={e => setNewVillager({...newVillager, name: e.target.value})}
                className="w-full px-5 py-4 bg-[#F9F8F4] rounded-2xl"
              />
              <input 
                placeholder="Occupation"
                value={newVillager.occupation}
                onChange={e => setNewVillager({...newVillager, occupation: e.target.value})}
                className="w-full px-5 py-4 bg-[#F9F8F4] rounded-2xl"
              />
              <input 
                placeholder="Contact Number (Optional)"
                value={newVillager.contact}
                onChange={e => setNewVillager({...newVillager, contact: e.target.value})}
                className="w-full px-5 py-4 bg-[#F9F8F4] rounded-2xl"
              />
              <button 
                onClick={() => {
                  if (newVillager.name && newVillager.occupation) {
                    addVillager(newVillager);
                    setNewVillager({ name: '', occupation: '', contact: '' });
                  }
                }}
                className="w-full bg-[#88AB8E] text-white py-4 rounded-2xl font-bold"
              >
                Add Resident
              </button>
            </div>
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto p-2 custom-scrollbar">
            {villagers.map(v => (
              <div key={v.id} className="bg-white px-6 py-4 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
                <div>
                  <div className="font-bold text-black text-sm md:text-base">{v.name}</div>
                  <div className="text-xs text-black/40">{v.occupation}</div>
                </div>
                <button onClick={() => deleteVillager(v.id)} className="text-red-400 p-2 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 md:p-8 rounded-[40px] border border-[#88AB8E]/10 h-fit">
            <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-2"><Plus size={20} /> Add Villager Review</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-bold text-black/40 uppercase ml-1">Option 1: Avatar URL</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={16} />
                      <input 
                        placeholder="https://..."
                        value={newReview.avatarUrl.startsWith('data:') ? '' : newReview.avatarUrl}
                        onChange={e => setNewReview({...newReview, avatarUrl: e.target.value})}
                        className="w-full pl-10 pr-5 py-4 bg-[#F9F8F4] rounded-2xl text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-black/40 uppercase ml-1">Option 2: System Upload</label>
                  <input 
                    type="file" 
                    ref={reviewAvatarInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleReviewAvatarUpload}
                  />
                  <button 
                    onClick={() => reviewAvatarInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#88AB8E]/30 py-6 rounded-2xl text-[#88AB8E] font-bold hover:bg-[#88AB8E]/5 transition-all text-sm"
                  >
                    <Upload size={20} />
                    {newReview.avatarUrl.startsWith('data:') ? 'Avatar Selected ✅' : 'Choose from Device'}
                  </button>
                </div>

                {newReview.avatarUrl && (
                  <div className="flex justify-center">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#88AB8E]/20 shadow-lg group">
                      <img src={newReview.avatarUrl} className="w-full h-full object-cover" alt="Preview" />
                      <button onClick={() => setNewReview({...newReview, avatarUrl: ''})} className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20} /></button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-black/40 uppercase ml-1">Villager Name</label>
                  <input 
                    placeholder="e.g. Ramesh Kumar"
                    value={newReview.name}
                    onChange={e => setNewReview({...newReview, name: e.target.value})}
                    className="w-full px-5 py-4 bg-[#F9F8F4] rounded-2xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-black/40 uppercase ml-1">Review Content</label>
                  <textarea 
                    placeholder="What did they say about the village?"
                    value={newReview.content}
                    onChange={e => setNewReview({...newReview, content: e.target.value})}
                    className="w-full px-5 py-4 bg-[#F9F8F4] rounded-2xl min-h-[100px] text-sm resize-none"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-black/40 uppercase ml-1">Rating (1-5)</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star} 
                        onClick={() => setNewReview({...newReview, rating: star})}
                        className={`p-2.5 rounded-xl transition-all ${newReview.rating >= star ? 'text-yellow-500 bg-yellow-50' : 'text-gray-300 bg-gray-50'}`}
                      >
                        <Star size={20} fill={newReview.rating >= star ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={async () => {
                    if (newReview.name && newReview.content && newReview.avatarUrl) {
                      const avatarFile = newReview.avatarUrl.startsWith('data:')
                        ? await dataUrlToFile(newReview.avatarUrl, 'avatar.jpg')
                        : undefined;
                      await addReview({
                        ...newReview,
                        avatarUrl: avatarFile ? '' : newReview.avatarUrl,
                        avatarFile,
                      });
                      setNewReview({ name: '', content: '', rating: 5, avatarUrl: '' });
                    }
                  }}
                  className="w-full bg-[#88AB8E] text-white py-4 rounded-2xl font-bold shadow-xl shadow-[#88AB8E]/20 transition-transform active:scale-95"
                >
                  Publish Review
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4 max-h-[700px] overflow-y-auto p-2 custom-scrollbar">
            {reviews.map(review => (
              <div key={review.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex gap-4 items-start shadow-sm hover:border-[#88AB8E]/20 transition-all">
                <img src={review.avatarUrl} className="w-12 h-12 rounded-full object-cover border-2 border-[#88AB8E]/10 flex-shrink-0" alt={review.name} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h4 className="font-bold text-black text-sm md:text-base truncate">{review.name}</h4>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < review.rating ? 'text-yellow-500' : 'text-gray-200'} fill={i < review.rating ? 'currentColor' : 'none'} />
                        ))}
                      </div>
                    </div>
                    <button onClick={() => deleteReview(review.id)} className="text-red-400 hover:text-red-600 p-2 flex-shrink-0 transition-colors"><Trash2 size={18} /></button>
                  </div>
                  <p className="text-sm text-black/60 mt-3 italic leading-relaxed">"{review.content}"</p>
                </div>
              </div>
            ))}
            {reviews.length === 0 && (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400">No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
