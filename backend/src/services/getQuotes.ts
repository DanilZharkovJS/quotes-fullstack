import { IncomingMessage, ServerResponse } from 'http'
import quotes from '../data/quotes.json' with { type: 'json' }

export const getQuotes = (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    res.statusCode = 200
    res.end(JSON.stringify(quotes))
  } catch (error) {
    res.statusCode = 501
    res.end(JSON.stringify([{ err: 'server err' }]))
  }
}
