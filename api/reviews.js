import { randomUUID } from 'crypto';
import { initDb, getReviews, insertReview } from '../lib/db.js';
import { cors, json, methodNotAllowed, readJson } from '../lib/http.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    cors(res);
    return res.status(200).end();
  }

  try {
    await initDb();

    if (req.method === 'GET') {
      return json(res, 200, await getReviews());
    }

    if (req.method === 'POST') {
      const body = await readJson(req);
      const { name, content, rating, avatarUrl } = body;
      if (!name || !content || !avatarUrl) {
        return json(res, 400, { error: 'name, content, and avatarUrl are required' });
      }

      const item = {
        id: `urev_${randomUUID()}`,
        name,
        content,
        rating: Number(rating) || 5,
        avatarUrl,
      };

      await insertReview(item);
      return json(res, 201, item);
    }

    return methodNotAllowed(res);
  } catch (err) {
    return json(res, 500, { error: err.message || 'Reviews request failed' });
  }
}
