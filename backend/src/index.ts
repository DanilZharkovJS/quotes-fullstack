import http, { createServer } from 'http'
import {
  getQuotesController,
  postQuoteController,
} from './controllers/quotesControllers.ts'

const PORT = 4000

const server = createServer((req, res) => {
  if (req.url === '/quotes' && req.method === 'GET') {
    return getQuotesController(req, res)
  }

  if (req.url === '/quotes' && req.method === 'POST') {
    return postQuoteController(req, res)
  }

  req.statusCode = 404
  res.setHeader('Content-Type', 'text/plain')
  res.end('404 Error: Endpoint or req method you are using is not right')
})

server.listen(PORT, () => {
  console.log(`Port ${PORT}`)
})
