import { cors, json } from '../lib/http.js';
import { isRemoteDb } from '../lib/db.js';
import { isBlobStorage } from '../lib/storage.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    cors(res);
    return res.status(200).end();
  }
  if (req.method !== 'GET') {
    return json(res, 405, { error: 'Method not allowed' });
  }
  return json(res, 200, {
    ok: true,
    db: isRemoteDb() ? 'mongodb' : 'not-configured',
    storage: isBlobStorage() ? 'vercel-blob' : 'local',
  });
}
