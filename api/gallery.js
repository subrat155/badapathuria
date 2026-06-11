import { randomUUID } from 'crypto';
import { initDb, getGallery, insertGallery } from '../lib/db.js';
import { cors, json, methodNotAllowed, readJson } from '../lib/http.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    cors(res);
    return res.status(200).end();
  }

  try {
    await initDb();

    if (req.method === 'GET') {
      return json(res, 200, await getGallery());
    }

    if (req.method === 'POST') {
      const body = await readJson(req);
      const { url, title, description } = body;
      if (!url || !title) {
        return json(res, 400, { error: 'url and title are required' });
      }
      const item = {
        id: `uimg_${randomUUID()}`,
        url,
        title,
        description: description || '',
      };
      await insertGallery(item);
      return json(res, 201, item);
    }

    return methodNotAllowed(res);
  } catch (err) {
    return json(res, 500, { error: err.message || 'Gallery request failed' });
  }
}
