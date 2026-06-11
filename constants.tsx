
import { Notice, Villager, GalleryImage, Review } from './types';

/**
 * 🚀 SYSTEM CONFIGURATION
 * Increment this version (e.g., 1.0.4 -> 1.0.5) to force browsers to see your code changes.
 */
export const SYSTEM_VERSION = '1.0.5'; 

export const COLORS = {
  primary: '#88AB8E',
  primaryDark: '#6B8A7A',
  secondary: '#AFC8AD',
  accent: '#F2F1EB',
  text: '#000000',
  bg: '#F9F8F4',
};

/**
 * 🏠 HOME PAGE HERO CONFIG
 * Points to your local assets folder.
 */
export const HOME_CONFIG = {
  heroImageUrl: '/hero.png',
  welcomeHeading: 'Welcome to Badapathuria Village',
  welcomeSubheading: 'Connecting our community through information, services, and announcements.'
};

/**
 * 📢 NOTICES (Fixed in code)
 */
export const INITIAL_NOTICES: Notice[] = [
  { id: '1', title: 'Village development meeting on Sunday', date: '2024-03-20', category: 'Panchayat', content: 'Discussion on road repairs and solar street lighting.' },
  { id: '2', title: 'Festival celebration schedule released', date: '2024-03-18', category: 'Culture', content: 'Detailed schedule for the upcoming Spring festival.' },
  { id: '3', title: 'Clean water campaign update', date: '2024-03-15', category: 'Health', content: 'Weekly water testing results are out.' },
  { id: '4', title: 'Emergency helpline notice', date: '2024-03-10', category: 'Emergency', content: 'Updated list of emergency contacts for monsoon season.' },
];

/**
 * 👥 VILLAGE DIRECTORY (32 PEOPLE - Fixed in code)
 */
export const INITIAL_VILLAGERS: Villager[] = [
  { id: 'v1', name: 'Diba Panda', occupation: 'Head Farmer', contact: '+91 98765-XXXX1' },
  { id: 'v2', name: 'Naba kishore Rath', occupation: 'Senior Teacher', contact: '+91 98765-XXXX2' },
  { id: 'v3', name: 'Akash Parida', occupation: 'Shop Owner', contact: '+91 98765-XXXX3' },
  { id: 'v4', name: 'Lata Mohanty', occupation: 'Healthcare Worker', contact: '+91 98765-XXXX4' },
  { id: 'v5', name: 'Prakash Ch. Sahoo', occupation: 'Master Carpenter', contact: '+91 98765-XXXX5' },
  { id: 'v6', name: 'Saroj Parida', occupation: 'Post Master', contact: '+91 98765-XXXX6' },
  { id: 'v7', name: 'Meera Patra', occupation: 'Anganwadi Worker', contact: '+91 98765-XXXX7' },
  { id: 'v8', name: 'Sanjib Rath', occupation: 'Electrician', contact: '+91 98765-XXXX8' },
  { id: 'v9', name: 'Gopal Sahoo', occupation: 'Tailor', contact: '+91 98765-XXXX9' },
  { id: 'v10', name: 'Rina Behera', occupation: 'SHG Leader', contact: '+91 98765-XXX10' },
  { id: 'v11', name: 'Manoj Parida', occupation: 'Pharmacist', contact: '+91 98765-XXX11' },
  { id: 'v12', name: 'Suresh Chandra Maharana', occupation: 'Village Priest', contact: '+91 98765-XXX12' },
  { id: 'v13', name: 'Pabitra Rout', occupation: 'Blacksmith', contact: '+91 98765-XXX13' },
  { id: 'v14', name: 'Sabita Nayak', occupation: 'Primary Teacher', contact: '+91 98765-XXX14' },
  { id: 'v15', name: 'Deepak Maharana', occupation: 'Driver', contact: '+91 98765-XXX15' },
  { id: 'v16', name: 'Basant Panda', occupation: 'Retired Officer', contact: '+91 98765-XXX16' },
  { id: 'v17', name: 'Arati Rath', occupation: 'Midwife', contact: '+91 98765-XXX17' },
  { id: 'v18', name: 'Tapan Kumar Rath', occupation: 'Accountant', contact: '+91 98765-XXX18' },
  { id: 'v19', name: 'Bikash Rath', occupation: 'Traditional Healer', contact: '+91 98765-XXX19' },
  { id: 'v20', name: 'Mamata Pattnaik', occupation: 'Potter', contact: '+91 98765-XXX20' },
  { id: 'v21', name: 'Sudarsan Baral', occupation: 'Milk Vendor', contact: '+91 98765-XXX21' },
  { id: 'v22', name: 'Jyoti Rekha Sahoo', occupation: 'Computer Operator', contact: '+91 98765-XXX22' },
  { id: 'v23', name: 'Bibhu Prasad Maharana', occupation: 'Social Worker', contact: '+91 98765-XXX23' },
  { id: 'v24', name: 'Niranjan Kar', occupation: 'Mason', contact: '+91 98765-XXX24' },
  { id: 'v25', name: 'Santi Lata Parida', occupation: 'Cook', contact: '+91 98765-XXX25' },
  { id: 'v26', name: 'Kirti Ch. Rath', occupation: 'Plumber', contact: '+91 98765-XXX26' },
  { id: 'v27', name: 'Trilochan Sahoo', occupation: 'Guard', contact: '+91 98765-XXX27' },
  { id: 'v28', name: 'Sasmita Rath', occupation: 'Artist', contact: '+91 98765-XXX28' },
  { id: 'v29', name: 'Rahul Gouda', occupation: 'College Student', contact: '+91 98765-XXX29' },
  { id: 'v30', name: 'Tulasi Maharana', occupation: 'Temple Caretaker', contact: '+91 98765-XXX30' },
  { id: 'v31', name: 'Abhimanyu Rath', occupation: 'Contractor', contact: '+91 98765-XXX31' },
  { id: 'v32', name: 'Goura Parida', occupation: 'Librarian', contact: '+91 98765-XXX32' },
];

/**
 * 🖼️ GALLERY (18 Fixed Photos from assets/)
 */
export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', url: '/vil1.jpg', title: 'ଶ୍ରୀ ଶ୍ରୀ ଗୋପୀନାଥ ଦେବ', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g2', url: '/vil2.jpg', title: 'ଆମ ଗାଁ ଶିବ ମନ୍ଦିର', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g3', url: '/vil3.jpg', title: 'ବୋଲ୍ ବମ ୨୦୨୪', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g4', url: '/vil4.jpg', title: 'ବାଲୁକା କଳା', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g5', url: '/vil5.jpg', title: 'ଗାଁ ପର୍ବତ ଶୀର୍ଷ', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g6', url: '/vil6.jpg', title: 'ପ୍ରାଥମିକ ବିଦ୍ୟାଳୟ ପୁରସ୍କାର ବଣ୍ଟନ', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g7', url: '/vil7.jpg', title: 'ପଶା ଖେଳ', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g8', url: '/vil8.jpg', title: 'ଗୋଲାକାର ଆଲୋଚନା ', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g9', url: '/vil9.jpg', title: 'ଗାଁ ପଡିଆର ଦୃଶ୍ୟ', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g10', url: '/vil10.jpg', title: 'ଶିବ ମନ୍ଦିର କାମ', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g11', url: '/vil11.jpg', title: 'ଶିବ ମନ୍ଦିର କାମ', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g12', url: '/vil12.jpg', title: 'ଗାଁ ଦୃଶ୍ୟ', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g13', url: '/vil13.jpg', title: 'ବଡ ସାପ ଦୃଶ୍ୟ ', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g14', url: '/vil14.jpg', title: 'ଗୋଷ୍ଠୀ ଫଟୋ |', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g15', url: '/vil15.jpg', title: 'ଗ୍ରାମ ଗଣେଶ ପୂଜା', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g16', url: '/vil16.jpg', title: 'ଗ୍ରାମ ରାସ୍ତା', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g17', url: '/vil17.jpg', title: 'ପୁରସ୍କାର ବଣ୍ଟନ ଦିନ ଫଟୋ', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
  { id: 'g18', url: '/vil18.jpg', title: 'ବିଲ ଫଟୋ', description: 'ବଡପଥୁରିଆ ଜୀବନର ଏକ ଫଟୋ' },
];

/**
 * ⭐ REVIEWS (4 Fixed Reviews from assets/)
 */
export const INITIAL_REVIEWS: Review[] = [
  { id: 'r1', name: 'ସୁକାନ୍ତ କୁମାର ରଥ', content: 'ଗ୍ରାମ ପୋର୍ଟାଲ୍ ଆଗାମୀ ବୈଠକଗୁଡ଼ିକୁ ଦେଖିବା ଏତେ ସହଜ କରିଥାଏ!', rating: 5, avatarUrl: '/review1.jpg' },
  { id: 'r2', name: 'ସୋନୁ', content: 'ଏହି ଡିଜିଟାଲ ପଦକ୍ଷେପ ସହିତ ଆମ ଗାଁ ପ୍ରଗତି କରୁଥିବା ଦେଖି ଗର୍ବିତ।', rating: 5, avatarUrl: '/review2.jpg' },
  { id: 'r3', name: 'ସରୋଜ ପରିଡା ', content: 'ଯୁବପିଢ଼ିଙ୍କୁ ଆମର ପରମ୍ପରା ସହିତ ଯୋଡ଼ି ହେବା ପାଇଁ ଏକ ମହାନ ପ୍ଲାଟଫର୍ମ।', rating: 5, avatarUrl: '/review3.jpg' },
  { id: 'r4', name: 'Arati Swain', content: 'Finally, a way to quickly get notices about health camps and schools.', rating: 5, avatarUrl: '/review4.jpg' }
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
