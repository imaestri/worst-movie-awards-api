import { Low } from 'lowdb';

class MemoryAdapter {
  #data;
  async read() {
    return this.#data;
  }
  async write(data) {
    this.#data = data;
  }
}

const db = new Low(new MemoryAdapter(), { movies: [] });

async function initDb() {
  await db.read();
  db.data ||= { movies: [] };
  await db.write();
}

export { db, initDb };
