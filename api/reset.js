import { initDb, resetAll, getAllUploadUrls } from '../lib/db.js';
import { deleteStoredFile } from '../lib/storage.js';
import { cors, json, methodNotAllowed } from '../lib/http.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    cors(res);
    return res.status(200).end();
  }
  if (req.method !== 'DELETE') return methodNotAllowed(res);

  try {
    await initDb();
    const urls = await getAllUploadUrls();
    await Promise.all(urls.map((url) => deleteStoredFile(url)));
    await resetAll();
    return json(res, 200, { success: true });
  } catch (err) {
    return json(res, 500, { error: err.message || 'Reset failed' });
  }
}
