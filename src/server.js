import app from './app.js';
import { initDb } from './db/index.js';

const PORT = 3000;

(async () => {
  await initDb();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
