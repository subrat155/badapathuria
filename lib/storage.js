import { put, del } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', 'server', 'uploads');

export function isBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function ensureLocalDir() {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
}

export async function uploadImage(file, originalName = 'image.jpg') {
  const ext = path.extname(originalName) || '.jpg';
  const filename = `${randomUUID()}${ext}`;

  if (process.env.VERCEL && !isBlobStorage()) {
    throw new Error('Set BLOB_READ_WRITE_TOKEN in Vercel (Storage → Blob)');
  }

  if (isBlobStorage()) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const blob = await put(`gallery/${filename}`, buffer, {
      access: 'public',
      contentType: file.type || 'image/jpeg',
    });
    return blob.url;
  }

  ensureLocalDir();
  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(uploadsDir, filename);
  fs.writeFileSync(filePath, buffer);
  return `/uploads/${filename}`;
}

export async function deleteStoredFile(url) {
  if (!url) return;

  if (url.includes('blob.vercel-storage.com') || url.includes('public.blob.vercel-storage.com')) {
    try {
      await del(url);
    } catch {
      /* ignore missing blobs */
    }
    return;
  }

  if (url.startsWith('/uploads/')) {
    const filePath = path.join(uploadsDir, path.basename(url));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
}

export function getUploadsDir() {
  ensureLocalDir();
  return uploadsDir;
}
