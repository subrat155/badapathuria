import { initDb, deleteComplaint } from '../../lib/db.js';
import { cors, json, methodNotAllowed } from '../../lib/http.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    cors(res);
    return res.status(200).end();
  }
  if (req.method !== 'DELETE') return methodNotAllowed(res);

  try {
    await initDb();
    await deleteComplaint(req.query.id);
    return json(res, 200, { success: true });
  } catch (err) {
    return json(res, 500, { error: err.message || 'Delete failed' });
  }
}
