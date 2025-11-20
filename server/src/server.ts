import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';
import { SERVER_CONFIG, API_ROUTES } from './constants/index.js';

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(API_ROUTES.BASE, routes);
app.use(errorHandler);

app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`🚀 Server running at http://${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}`);
  console.log(`📊 API available at http://${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}${API_ROUTES.BASE}`);
});
