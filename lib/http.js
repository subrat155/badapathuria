export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export function json(res, status, data) {
  cors(res);
  res.status(status).json(data);
}

export function methodNotAllowed(res) {
  json(res, 405, { error: 'Method not allowed' });
}

export async function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

export async function parseMultipart(req) {
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('multipart/form-data')) {
    throw new Error('Expected multipart form data');
  }

  const boundary = contentType.split('boundary=')[1];
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  const parts = buffer.toString('binary').split(`--${boundary}`);

  const fields = {};
  let file = null;

  for (const part of parts) {
    if (!part || part === '--\r\n' || part === '--') continue;

    const headerEnd = part.indexOf('\r\n\r\n');
    if (headerEnd === -1) continue;

    const headers = part.slice(0, headerEnd);
    const body = part.slice(headerEnd + 4, part.lastIndexOf('\r\n'));
    const nameMatch = headers.match(/name="([^"]+)"/);
    const filenameMatch = headers.match(/filename="([^"]+)"/);
    const contentTypeMatch = headers.match(/Content-Type: ([^\r\n]+)/);

    if (!nameMatch) continue;
    const name = nameMatch[1];

    if (filenameMatch) {
      file = {
        buffer: Buffer.from(body, 'binary'),
        originalname: filenameMatch[1],
        mimetype: contentTypeMatch?.[1] || 'application/octet-stream',
        arrayBuffer: async () => Buffer.from(body, 'binary').buffer,
        type: contentTypeMatch?.[1] || 'application/octet-stream',
      };
    } else {
      fields[name] = body;
    }
  }

  return { fields, file };
}
