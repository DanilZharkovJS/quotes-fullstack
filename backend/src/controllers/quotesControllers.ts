import { IncomingMessage, ServerResponse } from 'http'
import { getQuotes } from '../services/getQuotes.ts'
import { postQuote } from '../services/postQuote.ts'
import { deleteQuote } from '../services/deleteQuote.ts'

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
 
export const deleteQuoteController = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  deleteQuote(req, res)
}