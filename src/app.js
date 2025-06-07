import express from 'express';
import movieRoutes from './routes/moviesRoutes.js';
import importRoutes from './routes/importRoutes.js';

const app = express();
app.use(express.json());

app.use('/', movieRoutes);
app.use('/', importRoutes);

export default app;
