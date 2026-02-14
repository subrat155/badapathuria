
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  Users, 
  Settings, 
  Image as ImageIcon, 
  Phone, 
  Briefcase,
  Menu,
  X
} from 'lucide-react';

// Context
import { AppProvider } from './AppContext';

// Pages
import HomePage from './pages/HomePage';
import NoticesPage from './pages/NoticesPage';
import DirectoryPage from './pages/DirectoryPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import ComplaintPage from './pages/ComplaintPage';
import AdminPage from './pages/AdminPage';

// Component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Component to handle the "Redirect to home on refresh" requirement
const InitialRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // On mount (which happens on a full page refresh), redirect to home if not already there
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, []); // Empty dependency array ensures this only runs once when the app initializes

  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Notices', path: '/notices', icon: <MessageSquare size={18} /> },
    { name: 'Services', path: '/services', icon: <Briefcase size={18} /> },
    { name: 'Directory', path: '/directory', icon: <Users size={18} /> },
    { name: 'Gallery', path: '/gallery', icon: <ImageIcon size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-[#88AB8E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="https://cdn-icons-png.flaticon.com/128/36/36487.png" 
              alt="Badapathuria Village Logo" 
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-xl font-bold text-black tracking-tight">Badapathuria Portal</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  location.pathname === link.path 
                    ? 'bg-[#88AB8E] text-white' 
                    : 'text-black/70 hover:bg-[#88AB8E]/10 hover:text-black'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="ml-4 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold bg-black text-white hover:bg-[#333] transition-all"
            >
              <Settings size={18} />
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-black hover:bg-[#88AB8E]/10"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-[#88AB8E]/10 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-black hover:bg-[#88AB8E]/10"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold bg-black text-white mt-2"
            >
              <Settings size={18} />
              Admin Panel
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#88AB8E]/20 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-4 mb-6">
          <Link 
            to="/gallery" 
            className="p-2 rounded-full bg-[#88AB8E]/10 text-[#88AB8E] hover:bg-[#88AB8E] hover:text-white transition-all"
            title="Gallery"
          >
            <ImageIcon size={20} />
          </Link>
          <Link 
            to="/contact" 
            className="p-2 rounded-full bg-[#88AB8E]/10 text-[#88AB8E] hover:bg-[#88AB8E] hover:text-white transition-all"
            title="Contact"
          >
            <Phone size={20} />
          </Link>
          <Link 
            to="/notices" 
            className="p-2 rounded-full bg-[#88AB8E]/10 text-[#88AB8E] hover:bg-[#88AB8E] hover:text-white transition-all"
            title="Notices"
          >
            <MessageSquare size={20} />
          </Link>
        </div>
        <p className="text-black/60 text-sm mb-2">
          © 2024 Village of Badapathuria. All Rights Reserved.
        </p>
        <p className="text-black/40 text-xs flex items-center justify-center gap-1">
          Built with <span className="text-red-400">❤</span> for the community.
        </p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <InitialRedirect />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/notices" element={<NoticesPage />} />
              <Route path="/directory" element={<DirectoryPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/complaints" element={<ComplaintPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
          
          <a 
            href="https://chat.whatsapp.com/Kw4Xt2UWmtWGYIH6iHbwqL"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 bg-black text-white px-6 py-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all flex items-center gap-3 font-bold group border border-[#88AB8E]/20"
          >
            <img 
              src="https://cdn-icons-png.flaticon.com/128/15713/15713434.png" 
              alt="WhatsApp" 
              className="w-7 h-7 object-contain group-hover:scale-110 transition-transform"
            />
            <span className="hidden sm:inline">Join WhatsApp</span>
          </a>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
