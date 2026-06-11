import { initDb, getFullState } from '../lib/db.js';
import { cors, json, methodNotAllowed } from '../lib/http.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    cors(res);
    return res.status(200).end();
  }
  if (req.method !== 'GET') return methodNotAllowed(res);

  try {
    await initDb();
    const state = await getFullState();
    return json(res, 200, state);
  } catch (err) {
    return json(res, 500, { error: err.message || 'Sync failed' });
  }
}
