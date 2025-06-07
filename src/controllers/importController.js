import { importCSV } from '../services/importCsvService.js';
import { db } from '../db/index.js';

async function postMovies(movies) {
  if (!Array.isArray(movies)) {
    throw new Error('Movies must be an array');
  }
  db.data.movies = movies;
  await db.write();
}

async function importCsvHandler(req, res) {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'CSV file is required' });
    }
    const movies = await importCSV(req.file.path);
    await postMovies(movies); 
    res.status(201).json({ message: 'CSV imported and movies saved successfully', total: movies.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to import and save movies', details: error.message });
  }
}

export default {
  importCsvHandler,
};
