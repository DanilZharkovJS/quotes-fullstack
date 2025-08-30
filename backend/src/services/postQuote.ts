import { IncomingMessage, ServerResponse } from "http";
import fs from "fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';
import quotes from '../data/quotes.json' with {type: 'json'}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const postQuote = (req: IncomingMessage, res: ServerResponse) => {
  if (req.headers['content-type'] === 'application/json') {
    try {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', async () => {
        const parsedBody = JSON.parse(body)

        quotes.push(parsedBody)
        await fs.writeFile(path.join(__dirname, '../data/quotes.json'), JSON.stringify(quotes));

        res.statusCode = 201
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(parsedBody))
      })
    } catch (err) {
      res.statusCode = 400 
      res.end(JSON.stringify({error: 'Invalid JSON'}))
    }
  } else {
    res.statusCode = 415
    res.end(JSON.stringify({ error: 'Content-Type must be application/json' }));
  }
}