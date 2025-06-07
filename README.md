# Worst Movie Awards API

API for importing, storing, and analyzing movie data, focusing on producers with the shortest and longest intervals between award wins.

## Features
- Import movies from a CSV file
- List producers with minimum and maximum intervals between wins

## Technologies
- Node.js
- Express
- Lowdb (in-memory database)
- Multer (file upload)
- csv-parse (CSV parsing)
- jest (for testing)

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd worst-movie-awards-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the server
```bash
npm start
```
The server will run on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Import Movies (CSV Upload)
- **URL:** `POST /csv/upload`
- **Description:** Import movies from a CSV file. The file must be sent as form-data with the key `file`.
- **Example using curl:**
```bash
curl -F "file=@src/data/Movielist.csv" http://localhost:3000/csv/upload
```
- **Response:**
```json
{
  "message": "CSV imported and movies saved successfully",
  "total": 206
}
```

### Get Producers Interval
- **URL:** `GET /movies/producers-interval`
- **Description:** Returns the producers with the minimum and maximum intervals between two consecutive awards.
- **Response:**
```json
{
  "min": [
    {
      "producer": "Producer Name",
      "interval": 1,
      "previousWin": 2000,
      "followingWin": 2001
    }
  ],
  "max": [
    {
      "producer": "Another Producer",
      "interval": 13,
      "previousWin": 1990,
      "followingWin": 2003
    }
  ]
}
```

## Authentication (JWT)

All routes are protected by a simple JWT middleware. You must provide a valid JWT token in the `Authorization` header for every request:

```
Authorization: Bearer <your_token>
```

### How to generate a test token

You can generate a valid token using Node.js:

Use this one-liner in your terminal (Linux):

```bash
node -e "console.log(require('jsonwebtoken').sign({user:'test'}, 'worst-movie-secret', {expiresIn:'1h'}))"
```

Use the generated token in your requests:

```bash
curl -H "Authorization: Bearer <your_token>" http://localhost:3000/movies/producers-interval
```

## Project Structure
```
src/
  app.js
  server.js
  middlewares/
    authMiddleware.js
  controllers/
    importController.js
    moviesController.js
  data/
    Movielist.csv
  db/
    index.js
  routes/
    importRoutes.js
    producersIntervalRoutes.js
  services/
    importCsvService.js
    producersInterval.js
uploads/
  ... (uploaded files)
```

## Notes
- The database is in-memory; data will be lost when the server restarts.
- For persistent storage, adapt `db/index.js` to use a file adapter (e.g., `JSONFile`).
- The CSV delimiter is `;` (semicolon).

## Testing
To run tests (if implemented):
```bash
npm test
```

---