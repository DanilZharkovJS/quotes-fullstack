import http, { createServer } from 'http'
import {
  deleteQuoteController,
  getQuotesController,
  postQuoteController,
} from './controllers/quotesControllers.ts'

const PORT = 4000

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  
  if (req.url === '/quotes' && req.method === 'GET') {
    return getQuotesController(req, res)
  }

  if (req.url === '/quotes' && req.method === 'POST') {
    return postQuoteController(req, res)
  }

  if (req.url === '/quotes' && req.method === 'DELETE') {
    return deleteQuoteController(req, res)
  }

  req.statusCode = 404
  res.setHeader('Content-Type', 'text/plain')
  res.end('404 Error: Endpoint or req method you are using is not right')
})

server.listen(PORT, () => {
  console.log(`Port ${PORT}`)
})
