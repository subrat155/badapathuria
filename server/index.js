import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import {
  initDb,
  getGallery,
  getReviews,
  getComplaints,
  getFullState,
  insertGallery,
  findGallery,
  deleteGallery,
  insertReview,
  findReview,
  deleteReview,
  insertComplaint,
  deleteComplaint,
  resetAll,
  getAllUploadUrls,
  isRemoteDb,
} from '../lib/db.js';
import { uploadImage, deleteStoredFile, getUploadsDir, isBlobStorage } from '../lib/storage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4001;
const uploadsDir = getUploadsDir();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

await initDb();

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, db: isRemoteDb() ? 'mongodb' : 'not-configured', storage: isBlobStorage() ? 'vercel-blob' : 'local' });
});

app.get('/api/sync', async (_req, res) => {
  res.json(await getFullState());
});

app.get('/api/gallery', async (_req, res) => {
  res.json(await getGallery());
});

app.post('/api/gallery', async (req, res) => {
  const { url, title, description } = req.body;
  if (!url || !title) return res.status(400).json({ error: 'url and title are required' });
  const item = {
    id: `uimg_${randomUUID()}`,
    url,
    title,
    description: description || '',
  };
  await insertGallery(item);
  res.status(201).json(item);
});

app.post('/api/gallery/upload', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image file provided' });

  const file = {
    ...req.file,
    arrayBuffer: async () => req.file.buffer ?? (await fsRead(req.file.path)),
  };

  let url;
  if (isBlobStorage()) {
    url = await uploadImage(file, req.file.originalname);
  } else {
    url = `/uploads/${req.file.filename}`;
  }

  const title = req.body.title || 'Community Contribution';
  const description =
    req.body.description ||
    `Uploaded by a community member on ${new Date().toLocaleDateString()}`;

  const item = { id: `uimg_${randomUUID()}`, url, title, description };
  await insertGallery(item);
  res.status(201).json(item);
});

app.delete('/api/gallery/:id', async (req, res) => {
  const row = await findGallery(req.params.id);
  if (!row) return res.status(404).json({ error: 'Image not found' });
  await deleteStoredFile(row.url);
  await deleteGallery(req.params.id);
  res.json({ success: true });
});

app.get('/api/reviews', async (_req, res) => {
  res.json(await getReviews());
});

app.post('/api/reviews', async (req, res) => {
  const { name, content, rating, avatarUrl } = req.body;
  if (!name || !content || !avatarUrl) {
    return res.status(400).json({ error: 'name, content, and avatarUrl are required' });
  }
  const item = {
    id: `urev_${randomUUID()}`,
    name,
    content,
    rating: Number(rating) || 5,
    avatarUrl,
  };
  await insertReview(item);
  res.status(201).json(item);
});

app.post('/api/reviews/upload-avatar', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image file provided' });
  const file = {
    ...req.file,
    arrayBuffer: async () => req.file.buffer ?? (await fsRead(req.file.path)),
  };
  const avatarUrl = isBlobStorage()
    ? await uploadImage(file, req.file.originalname)
    : `/uploads/${req.file.filename}`;
  res.json({ avatarUrl });
});

app.delete('/api/reviews/:id', async (req, res) => {
  const row = await findReview(req.params.id);
  if (!row) return res.status(404).json({ error: 'Review not found' });
  await deleteStoredFile(row.avatarUrl);
  await deleteReview(req.params.id);
  res.json({ success: true });
});

app.get('/api/complaints', async (_req, res) => {
  res.json(await getComplaints());
});

app.post('/api/complaints', async (req, res) => {
  const { name, phone, type, description } = req.body;
  if (!name || !phone || !description) {
    return res.status(400).json({ error: 'name, phone, and description are required' });
  }
  const item = {
    id: `c_${randomUUID()}`,
    name,
    phone,
    type: type || 'General Inquiry',
    description,
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
  };
  await insertComplaint(item);
  res.status(201).json(item);
});

app.delete('/api/complaints/:id', async (req, res) => {
  await deleteComplaint(req.params.id);
  res.json({ success: true });
});

app.delete('/api/reset', async (_req, res) => {
  const urls = await getAllUploadUrls();
  await Promise.all(urls.map((url) => deleteStoredFile(url)));
  await resetAll();
  res.json({ success: true });
});

async function fsRead(filePath) {
  const fs = await import('fs/promises');
  const buf = await fs.readFile(filePath);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  console.log(`Uploads: ${uploadsDir}`);
});
