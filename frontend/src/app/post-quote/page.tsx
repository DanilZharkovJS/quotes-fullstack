'use client'
import axios from 'axios'
import React, { useState } from 'react'

type Quote = {
  name?: string | null
  desc?: string | null
}

const PostPage: React.FC = () => {
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [quote, setquote] = useState<Quote>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:4000/quotes', {
        name: input1,
        desc: input2,
      })
      const data = res.data
      setquote(data)
    } catch (error) {
      console.error(error)
      return
    }
  }

  return (
    <div className="text-black flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className='flex flex-col w-1/2'>
        <input
          className='border-1 border-black'
          type="text"
          value={input1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput1(e.target.value)
          }}
        />
        <input
          className='border-1 border-black'
          type="text"
          value={input2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput2(e.target.value)
          }}
        />
        <button type="submit" className='border-1 border-black'>Submit</button>
      </form>
      {quote && (
        <div>
          <h1 className="text-xl">Quote: </h1>
          <p>{quote.name}</p>
          <p>{quote.desc}</p>
        </div>
      )}
    </div>
  )
}

export default PostPage
