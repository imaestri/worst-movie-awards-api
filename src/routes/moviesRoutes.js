import express from 'express';
import  moviesController from '../controllers/moviesController.js';

const router = express.Router();

router.get('/movies', moviesController.listMovies);

export default router;
