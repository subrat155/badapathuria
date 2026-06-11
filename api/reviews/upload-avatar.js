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
    const { file } = await parseMultipart(req);
    if (!file) {
      return json(res, 400, { error: 'No image file provided' });
    }

    const avatarUrl = await uploadImage(file, file.originalname);
    return json(res, 200, { avatarUrl });
  } catch (err) {
    return json(res, 500, { error: err.message || 'Avatar upload failed' });
  }
}
