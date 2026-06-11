import { randomUUID } from 'crypto';
import { initDb, getComplaints, insertComplaint } from '../lib/db.js';
import { cors, json, methodNotAllowed, readJson } from '../lib/http.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    cors(res);
    return res.status(200).end();
  }

  try {
    await initDb();

    if (req.method === 'GET') {
      return json(res, 200, await getComplaints());
    }

    if (req.method === 'POST') {
      const body = await readJson(req);
      const { name, phone, type, description } = body;
      if (!name || !phone || !description) {
        return json(res, 400, { error: 'name, phone, and description are required' });
      }

      const item = {
        id: `c_${randomUUID()}`,
        name,
        phone,
        type: type || 'General Inquiry',
        description,
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
      };

      await insertComplaint(item);
      return json(res, 201, item);
    }

    return methodNotAllowed(res);
  } catch (err) {
    return json(res, 500, { error: err.message || 'Complaints request failed' });
  }
}
