
export interface Notice {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
}

export interface Villager {
  id: string;
  name: string;
  occupation: string;
  contact?: string;
}

export interface Complaint {
  id: string;
  name: string;
  phone: string;
  type: string;
  description: string;
  date: string;
  status: 'pending' | 'reviewed' | 'resolved';
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  content: string;
  rating: number;
  avatarUrl: string;
}
