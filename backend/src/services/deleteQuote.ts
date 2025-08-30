import { IncomingMessage, ServerResponse } from 'http'
import quotesData from '../data/quotes.json' with { type: 'json' }
import fs from 'fs/promises'
import { fileURLToPath } from 'url';
import path from 'path';

interface Quote {
  id: string;
  text: string;
  author: string;
}

const quotes: Quote[] = quotesData as unknown as Quote[];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteQuote = (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.headers['content-type'] === 'application/json') {
    try {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', async () => {
        const parsed = JSON.parse(body);

        if (parsed.id) {
          const filtered = quotes.filter((q) => q.id !== parsed.id);

          quotes.length = 0;
          quotes.push(...filtered);

          await fs.writeFile(
            path.join(__dirname, '../data/quotes.json'),
            JSON.stringify(filtered, null, 2)
          );

          res.statusCode = 200;
          res.end(JSON.stringify({ response: 'Quote has been deleted' }));
        } else {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Must contain a quote id' }));
        }
      });
    } catch (err) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  } else {
    res.statusCode = 415;
    res.end(JSON.stringify({ error: 'Content-Type must be application/json' }));
  }
}
