const fs = require('fs');
const path = require('path');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8'
};

module.exports = (req, res) => {
  try {
    let requested = String(req.query.path || '').replace(/^\/+/, '');
    requested = decodeURIComponent(requested);
    if (!requested || requested === '/') requested = 'index.html';
    if (requested.includes('..') || requested.includes('\\')) {
      return res.status(400).send('Invalid path');
    }

    const root = path.resolve(process.cwd());
    const resolved = path.resolve(root, requested);
    if (!resolved.startsWith(root + path.sep)) {
      return res.status(403).send('Forbidden');
    }
    if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
      return res.status(404).send('File not found');
    }

    const ext = path.extname(resolved).toLowerCase();
    res.setHeader('Content-Type', TYPES[ext] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.send(fs.readFileSync(resolved));
  } catch (error) {
    console.error(error);
    return res.status(500).send('Static file error');
  }
};
