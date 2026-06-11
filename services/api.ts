import { Complaint, GalleryImage, Review } from '../types';

const API = '/api';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${url}`, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export interface SyncState {
  gallery: GalleryImage[];
  reviews: Review[];
  complaints: Complaint[];
  lastUpdate: string;
}

export const api = {
  getSync: () => request<SyncState>('/sync'),
  getGallery: () => request<GalleryImage[]>('/gallery'),
  addGallery: (data: { url: string; title: string; description: string }) =>
    request<GalleryImage>('/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  uploadGallery: (file: File, title?: string, description?: string) => {
    const form = new FormData();
    form.append('image', file);
    if (title) form.append('title', title);
    if (description) form.append('description', description);
    return request<GalleryImage>('/gallery/upload', { method: 'POST', body: form });
  },
  deleteGallery: (id: string) =>
    request<{ success: boolean }>(`/gallery/${id}`, { method: 'DELETE' }),

  getReviews: () => request<Review[]>('/reviews'),
  addReview: (data: Omit<Review, 'id'>) =>
    request<Review>('/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  uploadReviewAvatar: (file: File) => {
    const form = new FormData();
    form.append('image', file);
    return request<{ avatarUrl: string }>('/reviews/upload-avatar', {
      method: 'POST',
      body: form,
    });
  },
  deleteReview: (id: string) =>
    request<{ success: boolean }>(`/reviews/${id}`, { method: 'DELETE' }),

  getComplaints: () => request<Complaint[]>('/complaints'),
  addComplaint: (data: Omit<Complaint, 'id' | 'date' | 'status'>) =>
    request<Complaint>('/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  deleteComplaint: (id: string) =>
    request<{ success: boolean }>(`/complaints/${id}`, { method: 'DELETE' }),

  reset: () => request<{ success: boolean }>('/reset', { method: 'DELETE' }),
  health: () => request<{ ok: boolean }>('/health'),
};
