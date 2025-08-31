'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

type Quote = {
  name?: string
  desc?: string
}

const GetQuotesPage: React.FC = () => {
  const [quotes, setQuotes] = useState([])

  const getQuotes = async () => {
    try {
      const res = await axios.get('http://localhost:4000/quotes')
      const data = res.data
      setQuotes(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getQuotes()
  }, [])

  return (
    <div>
      {quotes.length > 0 &&
        quotes.map((q: Quote, i) => {
          return <div className='text-black' key={i}>{q.name}</div>
        })}
    </div>
  )
}

export default GetQuotesPage
