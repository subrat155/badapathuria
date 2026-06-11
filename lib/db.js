import { MongoClient } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB_NAME || 'badapathuria';

let client = null;
let connectPromise = null;

function requireUri() {
  if (process.env.VERCEL && !process.env.MONGODB_URI) {
    throw new Error('Set MONGODB_URI in Vercel Environment Variables');
  }
  if (!process.env.MONGODB_URI) {
    throw new Error('Set MONGODB_URI in .env (MongoDB Atlas connection string)');
  }
  return process.env.MONGODB_URI;
}

async function getClient() {
  requireUri();
  if (client) return client;
  if (!connectPromise) {
    const mongo = new MongoClient(process.env.MONGODB_URI);
    connectPromise = mongo.connect();
  }
  client = await connectPromise;
  return client;
}

async function collection(name) {
  const c = await getClient();
  return c.db(DB_NAME).collection(name);
}

export function isRemoteDb() {
  return Boolean(process.env.MONGODB_URI);
}

export async function initDb() {
  await getClient();
  return true;
}

export async function getGallery() {
  const col = await collection('gallery');
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map((d) => ({
    id: d.id,
    url: d.url,
    title: d.title,
    description: d.description,
  }));
}

export async function getReviews() {
  const col = await collection('reviews');
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map((d) => ({
    id: d.id,
    name: d.name,
    content: d.content,
    rating: d.rating,
    avatarUrl: d.avatarUrl,
  }));
}

export async function getComplaints() {
  const col = await collection('complaints');
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map((d) => ({
    id: d.id,
    name: d.name,
    phone: d.phone,
    type: d.type,
    description: d.description,
    date: d.date,
    status: d.status,
  }));
}

export async function getFullState() {
  const [gallery, reviews, complaints] = await Promise.all([
    getGallery(),
    getReviews(),
    getComplaints(),
  ]);
  return {
    gallery,
    reviews,
    complaints,
    lastUpdate: new Date().toLocaleString(),
  };
}

export async function insertGallery(item) {
  const col = await collection('gallery');
  await col.insertOne({ ...item, createdAt: new Date() });
  return item;
}

export async function findGallery(id) {
  const col = await collection('gallery');
  return col.findOne({ id });
}

export async function deleteGallery(id) {
  const col = await collection('gallery');
  await col.deleteOne({ id });
}

export async function insertReview(item) {
  const col = await collection('reviews');
  await col.insertOne({ ...item, createdAt: new Date() });
  return item;
}

export async function findReview(id) {
  const col = await collection('reviews');
  return col.findOne({ id });
}

export async function deleteReview(id) {
  const col = await collection('reviews');
  await col.deleteOne({ id });
}

export async function insertComplaint(item) {
  const col = await collection('complaints');
  await col.insertOne({ ...item, createdAt: new Date() });
  return item;
}

export async function deleteComplaint(id) {
  const col = await collection('complaints');
  await col.deleteOne({ id });
}

export async function resetAll() {
  const db = (await getClient()).db(DB_NAME);
  await Promise.all([
    db.collection('gallery').deleteMany({}),
    db.collection('reviews').deleteMany({}),
    db.collection('complaints').deleteMany({}),
  ]);
}

export async function getAllUploadUrls() {
  const [galleryCol, reviewsCol] = await Promise.all([
    collection('gallery'),
    collection('reviews'),
  ]);
  const [gallery, reviews] = await Promise.all([
    galleryCol.find({}, { projection: { url: 1 } }).toArray(),
    reviewsCol.find({}, { projection: { avatarUrl: 1 } }).toArray(),
  ]);
  return [
    ...gallery.map((g) => g.url),
    ...reviews.map((r) => r.avatarUrl),
  ].filter(Boolean);
}
