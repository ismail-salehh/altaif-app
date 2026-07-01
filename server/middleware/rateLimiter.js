import rateLimit from 'express-rate-limit';

const make = (windowMs, max, message) =>
  rateLimit({ windowMs, max, message: { error: message }, standardHeaders: true, legacyHeaders: false });

// Tight limits on auth — brute-force and credential-stuffing protection
export const authLimiter   = make(15 * 60 * 1000, 15,  'Too many auth attempts. Try again in 15 minutes.');
// Story gen calls OpenAI + Gemini — protect your wallet
export const storyLimiter  = make(60 * 60 * 1000, 10,  'Story generation limit reached. Try again in an hour.');
// Catch-all safety net
export const globalLimiter = make(15 * 60 * 1000, 200, 'Too many requests. Please slow down.');