import { getAllMovies } from '../services/moviesService.js';

async function listMovies(_, res) {
  try {
    const movies = await getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies', details: error.message });
  }
}

export default {
  listMovies,
};