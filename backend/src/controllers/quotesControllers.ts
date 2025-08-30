import { IncomingMessage, ServerResponse } from 'http'
import { getQuotes } from '../services/getQuotes.ts'
import { postQuote } from '../services/postQuote.ts'

export const getQuotesController = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  getQuotes(req, res)
}

export const postQuoteController = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  postQuote(req, res)
}
