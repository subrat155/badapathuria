
import { Notice, Villager, GalleryImage } from './types';

export const COLORS = {
  primary: '#88AB8E',
  primaryDark: '#6B8A7A',
  secondary: '#AFC8AD',
  accent: '#F2F1EB',
  text: '#000000',
  bg: '#F9F8F4',
};

export const INITIAL_NOTICES: Notice[] = [
  { id: '1', title: 'Village development meeting on Sunday', date: '2024-03-20', category: 'Panchayat', content: 'Discussion on road repairs and solar street lighting.' },
  { id: '2', title: 'Festival celebration schedule released', date: '2024-03-18', category: 'Culture', content: 'Detailed schedule for the upcoming Spring festival.' },
  { id: '3', title: 'Clean water campaign update', date: '2024-03-15', category: 'Health', content: 'Weekly water testing results are out.' },
  { id: '4', title: 'Emergency helpline notice', date: '2024-03-10', category: 'Emergency', content: 'Updated list of emergency contacts for monsoon season.' },
];

export const INITIAL_VILLAGERS: Villager[] = [
  { id: '1', name: 'Ramesh Kumar', occupation: 'Farmer', contact: '+91 98765-XXXX1' },
  { id: '2', name: 'Sunita Devi', occupation: 'Teacher', contact: '+91 98765-XXXX2' },
  { id: '3', name: 'Anil Das', occupation: 'Shop Owner', contact: '+91 98765-XXXX3' },
  { id: '4', name: 'Lata Mohanty', occupation: 'Healthcare Worker', contact: '+91 98765-XXXX4' },
  { id: '5', name: 'Prakash Sahoo', occupation: 'Carpenter', contact: '+91 98765-XXXX5' },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: '1', url: 'https://picsum.photos/seed/village1/800/600', title: 'Harvest Festival 2023', description: 'Celebrating our bounty together.' },
  { id: '2', url: 'https://picsum.photos/seed/village2/800/600', title: 'Primary School Inauguration', description: 'A big step for our children.' },
  { id: '3', url: 'https://picsum.photos/seed/village3/800/600', title: 'Community Clean-up', description: 'Working together for a cleaner Badapathuria.' },
  { id: '4', url: 'https://picsum.photos/seed/village4/800/600', title: 'Annual Sports Meet', description: 'Fostering spirit and health.' },
  { id: '5', url: 'https://picsum.photos/seed/village5/800/600', title: 'Evening Panchayat', description: 'Deciding our future together.' },
  { id: '6', url: 'https://picsum.photos/seed/village6/800/600', title: 'Temple Restoration', description: 'Preserving our sacred heritage.' },
];

export const ECONOMY_DATA = [
  { name: 'Agriculture', value: 70 },
  { name: 'Service', value: 20 },
  { name: 'Other', value: 10 },
];

export const EVENTS_CHART_DATA = [
  { name: 'JAN', count: 2 },
  { name: 'FEB', count: 5 },
  { name: 'MAR', count: 4 },
  { name: 'APR', count: 3 },
  { name: 'MAY', count: 6 },
];
