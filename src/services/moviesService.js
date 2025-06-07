import { db } from '../db/index.js';

export async function getAllMovies() {
  await db.read();
  return db.data?.movies || [];
}