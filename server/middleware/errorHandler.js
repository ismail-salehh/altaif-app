import { logger } from '../utils/logger.js';

export function notFound(req, res) {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
}

export function errorHandler(err, req, res, next) {
  logger.error('Unhandled error', {
    message: err.message,
    path:    req.path,
    method:  req.method,
    ip:      req.ip,
    // Only include stack in dev logs — never send to client
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });

  const status  = err.status || err.statusCode || 500;
  // Don't leak internal details on 5xx
  const message = status < 500 ? err.message : 'Internal Server Error';
  res.status(status).json({ error: message });
}