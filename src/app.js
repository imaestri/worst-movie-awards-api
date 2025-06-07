import express from 'express';
import producersIntervalRoutes from './routes/producersIntervalRoutes.js';
import importRoutes from './routes/importRoutes.js';

const app = express();
app.use(express.json());

app.use('/', producersIntervalRoutes);
app.use('/', importRoutes);

export default app;
