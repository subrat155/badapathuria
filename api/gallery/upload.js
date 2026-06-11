import { randomUUID } from 'crypto';
import { initDb, insertGallery } from '../../lib/db.js';
import { uploadImage } from '../../lib/storage.js';
import { parseMultipart } from '../../lib/multipart.js';
import { cors, json, methodNotAllowed } from '../../lib/http.js';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    cors(res);
    return res.status(200).end();
  }
  if (req.method !== 'POST') return methodNotAllowed(res);

  try {
    await initDb();
    const { fields, file } = await parseMultipart(req);

    if (!file) {
      return json(res, 400, { error: 'No image file provided' });
    }
    if (!file.mimetype?.startsWith('image/')) {
      return json(res, 400, { error: 'Only image files are allowed' });
    }

    const url = await uploadImage(file, file.originalname);
    const title = fields.title || 'Community Contribution';
    const description =
      fields.description ||
      `Uploaded by a community member on ${new Date().toLocaleDateString()}`;

    const item = {
      id: `uimg_${randomUUID()}`,
      url,
      title,
      description,
    };

    await insertGallery(item);
    return json(res, 201, item);
  } catch (err) {
    return json(res, 500, { error: err.message || 'Upload failed' });
  }
}
