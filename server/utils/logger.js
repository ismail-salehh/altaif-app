import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_DIR  = path.join(__dirname, '../../logs');
const LOG_FILE = path.join(LOG_DIR, 'app.log');
const MAX_SIZE = 5 * 1024 * 1024; // rotate at 5 MB

if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

function rotateLogs() {
  try {
    if (!fs.existsSync(LOG_FILE)) return;
    if (fs.statSync(LOG_FILE).size >= MAX_SIZE) {
      fs.renameSync(LOG_FILE, path.join(LOG_DIR, `app-${Date.now()}.bak.log`));
    }
  } catch (_) {}
}

function write(level, message, meta = {}) {
  rotateLogs();
  const line = JSON.stringify({ ts: new Date().toISOString(), level, message, ...meta });
  try { fs.appendFileSync(LOG_FILE, line + '\n'); } catch (_) {}
  if (level === 'error') console.error(line);
  else if (process.env.NODE_ENV !== 'production') console.log(line);
}

export const logger = {
  info:  (msg, meta) => write('info',  msg, meta),
  warn:  (msg, meta) => write('warn',  msg, meta),
  error: (msg, meta) => write('error', msg, meta),
};