import cors from 'cors';
import { SERVER_CONFIG } from '../constants/index.js';

export const corsMiddleware = cors({
  origin: SERVER_CONFIG.CORS_ORIGIN,
  credentials: true
});
