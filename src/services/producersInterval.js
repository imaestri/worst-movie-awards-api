import { db } from '../db/index.js';

export async function getAllMovies() {
  await db.read();
  return db.data?.movies || [];
}

export async function getProducersInterval() {
  const movies = await getAllMovies();

  const winners = movies.filter(movie => movie.winner === 'yes');

  const producerWins = {};

  winners.forEach(movie => {
    const producers = movie.producers.split(/,| and /).map(p => p.trim());
    producers.forEach(producer => {
      if (!producerWins[producer]) {
        producerWins[producer] = [];
      }
      producerWins[producer].push(parseInt(movie.year));
    });
  });

  const intervals = [];

  Object.entries(producerWins).forEach(([producer, years]) => {
    if (years.length < 2) return;
    const sortedYears = years.sort((a, b) => a - b);

    for (let i = 1; i < sortedYears.length; i++) {
      intervals.push({
        producer,
        interval: sortedYears[i] - sortedYears[i - 1],
        previousWin: sortedYears[i - 1],
        followingWin: sortedYears[i]
      });
    }
  });


  if (intervals.length === 0) return { min: [], max: [] };

  const minInterval = Math.min(...intervals.map(i => i.interval));
  const maxInterval = Math.max(...intervals.map(i => i.interval));

  return {
    min: intervals.filter(i => i.interval === minInterval),
    max: intervals.filter(i => i.interval === maxInterval)
  };
}


