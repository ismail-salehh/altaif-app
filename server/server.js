import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import { globalLimiter } from './middleware/rateLimiter.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

/* Security headers  */
app.use(helmet());

/* CORS */
const ALLOWED_ORIGINS =
  process.env.NODE_ENV === 'production'
    ? ['https://altaif-app.onrender.com']
    : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin(origin, cb) {
    // Allow same-origin / server-to-server requests (no origin header)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    logger.warn('CORS blocked', { origin });
    cb(new Error(`Origin ${origin} not allowed`));
  },
  credentials: true,
}));

/* HTTP logging */
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  const logDir = path.join(__dirname, '../logs');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  const accessStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });
  app.use(morgan('combined', { stream: accessStream }));
}

/* Parsing & sanitisation */
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));   // reject oversized payloads
app.use(mongoSanitize());                   // strip $ and . from keys → NoSQL injection prevention

/* Global rate limit */
app.use(globalLimiter);

/* Routes */
app.use('/api/auth',  authRoutes);
app.use('/api/story', storyRoutes);

/* ── Health check (for uptime monitors) */
app.get('/health', (_req, res) =>
  res.json({ status: 'ok', ts: new Date().toISOString() }));

/* Frontend (production) */
app.use(express.static('public'));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (_req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html')));
}

/* Error handlers (must be last) */
app.use(notFound);
app.use(errorHandler);

/* Start */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  logger.info('Server started', { port: PORT, env: process.env.NODE_ENV });
  connectDB();
});

/* Process-level safety nets */
process.on('uncaughtException', err => {
  logger.error('Uncaught exception', { message: err.message, stack: err.stack });
  process.exit(1);
});
process.on('unhandledRejection', reason => {
  logger.error('Unhandled rejection', { reason: String(reason) });
});