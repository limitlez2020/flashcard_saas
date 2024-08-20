'use client'

import { useState } from 'react'

export default function Generate() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.')
      return
    }
  
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        /* Wrap the text in a JSON object */
        body: JSON.stringify({ content: text }),
      })
  
      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }
  
      const data = await response.json()
      setFlashcards(data.flashcards)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert('An error occurred while generating flashcards. Please try again.')
    }
  }



  return (
    <div className="max-w-md mx-auto px-4">
      {/* Generate Flashcards: */}
      <div className="my-4">
        <h1 className="text-2xl font-bold mb-4">
          Generate Flashcards
        </h1>
        {/* Get Text to generate flashcards on: */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Generate Flashcards
        </button>
      </div>
      
      
      {/* Dsiplay the Flashcards gotten from the API: */}
      {/* {flashcards.length > 0 && ( */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">
            Generated Flashcards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* {flashcards.map((flashcard, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold">Front:</h3>
                <p>{flashcard.front}</p>
                <h3 className="text-lg font-semibold mt-4">Back:</h3>
                <p>{flashcard.back}</p>
              </div>
            ))} */}
          </div>
        </div>
      {/* )} */}

    </div>
  )
}
