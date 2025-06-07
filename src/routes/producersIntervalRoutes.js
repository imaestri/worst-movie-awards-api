import express from 'express';
import  moviesController from '../controllers/moviesController.js';

const router = express.Router();

router.get('/movies/producers-interval', moviesController.listIntervals);

export default router;
