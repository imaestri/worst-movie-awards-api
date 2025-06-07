import fs from 'fs/promises';
import { parse } from 'csv-parse/sync';

async function importCSV(filePath) {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ';'
  });
  return records;
}

export { importCSV };