import express from 'express';
import producersIntervalRoutes from './routes/producersIntervalRoutes.js';
import importRoutes from './routes/importRoutes.js';
import { authenticateJWT } from './middleware/authMiddleware.js';

const app = express();
app.use(express.json());

app.use('/', authenticateJWT, producersIntervalRoutes);
app.use('/', authenticateJWT, importRoutes);

export default app;
