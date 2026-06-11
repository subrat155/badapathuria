
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Notice, Villager, GalleryImage, Complaint, Review } from './types';
import { 
  INITIAL_NOTICES, 
  INITIAL_VILLAGERS, 
  GALLERY_IMAGES, 
  INITIAL_REVIEWS,
  HOME_CONFIG, 
  SYSTEM_VERSION 
} from './constants';
import { api, SyncState } from './services/api';

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
  isProcessing: boolean;
  processMessage: string;
  lastUpdate: string | null;
  isConnected: boolean;
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  deleteNotice: (id: string) => void;
  addVillager: (villager: Omit<Villager, 'id'>) => void;
  deleteVillager: (id: string) => void;
  addImage: (image: { url: string; title: string; description: string; file?: File }) => Promise<boolean>;
  deleteImage: (id: string) => void;
  addReview: (review: Omit<Review, 'id'> & { avatarFile?: File }) => Promise<void>;
  deleteReview: (id: string) => void;
  updateHomeConfig: (config: HomeConfig) => void;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'date' | 'status'>) => void;
  deleteComplaint: (id: string) => void;
  resetSystem: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const FIXED_GALLERY_IDS = new Set(GALLERY_IMAGES.map((g) => g.id));
const FIXED_REVIEW_IDS = new Set(INITIAL_REVIEWS.map((r) => r.id));
const STORAGE_VERSION_KEY = 'bp_sys_version';
const POLL_MS = 4000;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
    if (savedVersion !== SYSTEM_VERSION) {
      localStorage.setItem(STORAGE_VERSION_KEY, SYSTEM_VERSION);
    }
  }, []);

  const [notices] = useState<Notice[]>(INITIAL_NOTICES);
  const [villagers] = useState<Villager[]>(INITIAL_VILLAGERS);
  const [homeConfig] = useState<HomeConfig>(HOME_CONFIG);

  const [userGallery, setUserGallery] = useState<GalleryImage[]>([]);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processMessage, setProcessMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const gallery = [...GALLERY_IMAGES, ...userGallery];
  const reviews = [...INITIAL_REVIEWS, ...userReviews];

  const applySync = useCallback((data: SyncState) => {
    setUserGallery(data.gallery);
    setUserReviews(data.reviews);
    setComplaints(data.complaints);
    setLastUpdate(data.lastUpdate);
    setIsConnected(true);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const data = await api.getSync();
      applySync(data);
    } catch {
      setIsConnected(false);
    }
  }, [applySync]);

  useEffect(() => {
    refresh();
    pollRef.current = setInterval(refresh, POLL_MS);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [refresh]);

  const addImage = async (image: { url: string; title: string; description: string; file?: File }) => {
    if (gallery.length >= 60) return false;

    setIsProcessing(true);
    setProcessMessage('Saving contribution...');

    try {
      if (image.file) {
        await api.uploadGallery(image.file, image.title, image.description);
      } else {
        await api.addGallery({
          url: image.url,
          title: image.title,
          description: image.description,
        });
      }
      await refresh();
      return true;
    } catch {
      return false;
    } finally {
      setIsProcessing(false);
      setProcessMessage('');
    }
  };

  const deleteImage = async (id: string) => {
    if (FIXED_GALLERY_IDS.has(id)) return;
    try {
      await api.deleteGallery(id);
      await refresh();
    } catch {
      /* ignore */
    }
  };

  const addReview = async (review: Omit<Review, 'id'> & { avatarFile?: File }) => {
    let avatarUrl = review.avatarUrl;
    if (review.avatarFile) {
      const result = await api.uploadReviewAvatar(review.avatarFile);
      avatarUrl = result.avatarUrl;
    }
    await api.addReview({
      name: review.name,
      content: review.content,
      rating: review.rating,
      avatarUrl,
    });
    await refresh();
  };

  const deleteReview = async (id: string) => {
    if (FIXED_REVIEW_IDS.has(id)) return;
    try {
      await api.deleteReview(id);
      await refresh();
    } catch {
      /* ignore */
    }
  };

  const addComplaint = async (complaint: Omit<Complaint, 'id' | 'date' | 'status'>) => {
    try {
      await api.addComplaint(complaint);
      await refresh();
    } catch {
      /* ignore */
    }
  };

  const deleteComplaint = async (id: string) => {
    try {
      await api.deleteComplaint(id);
      await refresh();
    } catch {
      /* ignore */
    }
  };

  const addNotice = () => {};
  const deleteNotice = () => {};
  const addVillager = () => {};
  const deleteVillager = () => {};
  const updateHomeConfig = () => {};

  const resetSystem = async () => {
    if (window.confirm('Delete all user-added photos and messages from the server?')) {
      try {
        await api.reset();
        await refresh();
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <AppContext.Provider value={{
      notices, villagers, gallery, reviews, homeConfig, complaints,
      isProcessing, processMessage, lastUpdate, isConnected,
      addNotice, deleteNotice, addVillager, deleteVillager,
      addImage, deleteImage, addReview, deleteReview, updateHomeConfig,
      addComplaint, deleteComplaint, resetSystem
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
