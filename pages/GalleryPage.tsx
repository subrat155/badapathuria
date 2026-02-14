
import React, { useRef, useState } from 'react';
import { useApp } from '../AppContext';
import { Image as ImageIcon, Maximize2, Camera, Upload, CheckCircle, Loader2 } from 'lucide-react';

const GalleryPage: React.FC = () => {
  const { gallery, addImage } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      addImage({
        url: base64String,
        title: 'Community Contribution',
        description: `Uploaded by a community member on ${new Date().toLocaleDateString()}`
      });
      setIsUploading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 text-[#88AB8E] font-bold mb-4 uppercase tracking-[0.2em] text-sm">
           <Camera size={16} />
           Village Lens
        </div>
        <h1 className="text-5xl font-bold text-black mb-6">Memories of Badapathuria</h1>
        <p className="text-black/60 max-w-2xl mx-auto text-lg italic">
          “Celebrating our unity, heritage, and the beautiful everyday moments of our culture.”
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
         <h3 className="text-2xl font-bold text-black uppercase tracking-wider">Community Collection</h3>
         <div className="flex gap-3">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#333] transition-all disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
              Upload Your Photo
            </button>
            <div className="flex gap-1 p-1 bg-[#88AB8E]/5 rounded-2xl border border-[#88AB8E]/10">
               <button className="px-4 py-2 rounded-xl bg-[#88AB8E] text-white font-bold text-xs">All</button>
               <button className="px-4 py-2 rounded-xl text-black/50 font-bold text-xs hover:bg-white transition-colors">History</button>
            </div>
         </div>
      </div>

      {showSuccess && (
        <div className="mb-8 bg-[#88AB8E] text-white p-4 rounded-2xl flex items-center justify-center gap-3 animate-in zoom-in duration-300">
           <CheckCircle size={20} />
           <span className="font-bold">Photo successfully added to the village lens!</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {gallery.map((img) => (
          <div key={img.id} className="bg-white rounded-[32px] overflow-hidden border border-[#88AB8E]/10 shadow-lg group hover:scale-[1.03] transition-all">
            <div className="h-60 overflow-hidden relative">
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full text-black">
                    <ImageIcon size={20} />
                 </div>
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-black mb-1 line-clamp-1">{img.title}</h4>
              <p className="text-xs text-black/50 line-clamp-2">{img.description}</p>
            </div>
          </div>
        ))}
        {gallery.length === 0 && (
          <div className="col-span-full text-center py-20">
             <Camera size={48} className="mx-auto mb-4 text-[#88AB8E]/20" />
             <p className="text-black/40">No photos shared yet. Be the first to upload!</p>
          </div>
        )}
      </div>

      <div className="mt-20 bg-[#F9F8F4] p-12 rounded-[50px] border border-dashed border-[#88AB8E]/30 text-center">
         <h4 className="text-2xl font-bold text-black mb-2">Preserve the Heritage</h4>
         <p className="text-black/50 max-w-lg mx-auto mb-8">Have old photos of Badapathuria? Help us build a digital archive of our village history.</p>
         <button 
           onClick={() => fileInputRef.current?.click()}
           className="bg-[#88AB8E] text-white px-10 py-4 rounded-full font-bold hover:bg-[#6B8A7A] shadow-xl shadow-[#88AB8E]/10"
          >
           Start Uploading
         </button>
      </div>
    </div>
  );
};

export default GalleryPage;
