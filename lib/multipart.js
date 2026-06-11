import Busboy from 'busboy';

export function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const fields = {};
    let file = null;

    const busboy = Busboy({
      headers: req.headers,
      limits: { fileSize: 10 * 1024 * 1024 },
    });

    busboy.on('file', (_name, stream, info) => {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        file = {
          buffer,
          originalname: info.filename,
          mimetype: info.mimeType,
          type: info.mimeType,
          arrayBuffer: async () =>
            buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
        };
      });
    });

    busboy.on('field', (name, value) => {
      fields[name] = value;
    });

    busboy.on('finish', () => resolve({ fields, file }));
    busboy.on('error', reject);
    req.pipe(busboy);
  });
}
