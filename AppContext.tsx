
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notice, Villager, GalleryImage, Complaint, Review } from './types';
import { INITIAL_NOTICES, INITIAL_VILLAGERS, GALLERY_IMAGES } from './constants';

interface HomeConfig {
  heroImageUrl: string;
  welcomeHeading: string;
  welcomeSubheading: string;
}

interface AppContextType {
  notices: Notice[];
  villagers: Villager[];
  gallery: GalleryImage[];
  reviews: Review[];
  homeConfig: HomeConfig;
  complaints: Complaint[];
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  deleteNotice: (id: string) => void;
  addVillager: (villager: Omit<Villager, 'id'>) => void;
  deleteVillager: (id: string) => void;
  addImage: (image: Omit<GalleryImage, 'id'>) => void;
  deleteImage: (id: string) => void;
  addReview: (review: Omit<Review, 'id'>) => void;
  deleteReview: (id: string) => void;
  updateHomeConfig: (config: HomeConfig) => void;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'date' | 'status'>) => void;
  deleteComplaint: (id: string) => void;
}

const INITIAL_REVIEWS: Review[] = [
  { 
    id: '1', 
    name: 'Suresh Chandra', 
    content: 'The new solar lights in our street have made a huge difference. Safety has improved significantly for our children.', 
    rating: 5, 
    avatarUrl: 'https://i.pravatar.cc/150?u=suresh' 
  },
  { 
    id: '2', 
    name: 'Meena Patra', 
    content: 'Panchayat updates on this portal are very helpful. I don\'t have to walk to the office anymore to check notices.', 
    rating: 4, 
    avatarUrl: 'https://i.pravatar.cc/150?u=meena' 
  },
  { 
    id: '3', 
    name: 'Gopal Sahu', 
    content: 'Clean drinking water campaign was a great initiative. The village health has noticeably improved this year.', 
    rating: 5, 
    avatarUrl: 'https://i.pravatar.cc/150?u=gopal' 
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('village_notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [villagers, setVillagers] = useState<Villager[]>(() => {
    const saved = localStorage.getItem('village_villagers');
    return saved ? JSON.parse(saved) : INITIAL_VILLAGERS;
  });

  const [gallery, setGallery] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('village_gallery');
    return saved ? JSON.parse(saved) : GALLERY_IMAGES;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('village_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [homeConfig, setHomeConfig] = useState<HomeConfig>(() => {
    const saved = localStorage.getItem('village_home_config');
    return saved ? JSON.parse(saved) : {
      heroImageUrl: 'https://picsum.photos/seed/badapathuria/1920/600',
      welcomeHeading: 'Welcome to Badapathuria Village',
      welcomeSubheading: 'Connecting our community through information, services, and announcements. A village built on unity, culture, and progress.'
    };
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem('village_complaints');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => localStorage.setItem('village_notices', JSON.stringify(notices)), [notices]);
  useEffect(() => localStorage.setItem('village_villagers', JSON.stringify(villagers)), [villagers]);
  useEffect(() => localStorage.setItem('village_gallery', JSON.stringify(gallery)), [gallery]);
  useEffect(() => localStorage.setItem('village_reviews', JSON.stringify(reviews)), [reviews]);
  useEffect(() => localStorage.setItem('village_home_config', JSON.stringify(homeConfig)), [homeConfig]);
  useEffect(() => localStorage.setItem('village_complaints', JSON.stringify(complaints)), [complaints]);

  const addNotice = (notice: Omit<Notice, 'id'>) => {
    const newNotice = { ...notice, id: Date.now().toString() };
    setNotices([newNotice, ...notices]);
  };

  const deleteNotice = (id: string) => setNotices(notices.filter(n => n.id !== id));

  const addVillager = (villager: Omit<Villager, 'id'>) => {
    const newVillager = { ...villager, id: Date.now().toString() };
    setVillagers([newVillager, ...villagers]);
  };

  const deleteVillager = (id: string) => setVillagers(villagers.filter(v => v.id !== id));

  const addImage = (image: Omit<GalleryImage, 'id'>) => {
    const newImage = { ...image, id: Date.now().toString() };
    setGallery([newImage, ...gallery]);
  };

  const deleteImage = (id: string) => setGallery(gallery.filter(i => i.id !== id));

  const addReview = (review: Omit<Review, 'id'>) => {
    const newReview = { ...review, id: Date.now().toString() };
    setReviews([newReview, ...reviews]);
  };

  const deleteReview = (id: string) => setReviews(reviews.filter(r => r.id !== id));

  const updateHomeConfig = (config: HomeConfig) => setHomeConfig(config);

  const addComplaint = (complaint: Omit<Complaint, 'id' | 'date' | 'status'>) => {
    const newComplaint: Complaint = {
      ...complaint,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setComplaints([newComplaint, ...complaints]);
  };

  const deleteComplaint = (id: string) => setComplaints(complaints.filter(c => c.id !== id));

  return (
    <AppContext.Provider value={{
      notices, villagers, gallery, reviews, homeConfig, complaints,
      addNotice, deleteNotice, addVillager, deleteVillager,
      addImage, deleteImage, addReview, deleteReview, updateHomeConfig, addComplaint, deleteComplaint
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
