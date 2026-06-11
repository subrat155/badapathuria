import { initDb, findReview, deleteReview } from '../../lib/db.js';
import { deleteStoredFile } from '../../lib/storage.js';
import { cors, json, methodNotAllowed } from '../../lib/http.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    cors(res);
    return res.status(200).end();
  }
  if (req.method !== 'DELETE') return methodNotAllowed(res);

  try {
    await initDb();
    const row = await findReview(req.query.id);
    if (!row) {
      return json(res, 404, { error: 'Review not found' });
    }

    await deleteStoredFile(row.avatarUrl);
    await deleteReview(req.query.id);
    return json(res, 200, { success: true });
  } catch (err) {
    return json(res, 500, { error: err.message || 'Delete failed' });
  }
}
