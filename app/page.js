'use client';

import { useState } from 'react';
import { Montserrat } from 'next/font/google';
import { Oswald } from 'next/font/google';

const monstserrat = Montserrat({ subsets: ['latin'] });
const oswald = Oswald({ subsets: ['latin'] });


export default function Generate() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);


  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.');
      return;
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
      
      /* Get the flashcards json object from the API */
      const data = await response.json()

      /* Extract the flashcards array from the data object */
      setFlashcards(data.flashcards)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert('An error occurred while generating flashcards. Please try again.')
    }
  }



  return (
    // <div className="max-w-md mx-auto px-4">
    <div>
      <div className="w-full min-h-screen bg-[#0C0C0E] flex flex-col items-center">
        {/* Nav Bar: */}
        <div className='w-full flex justify-between items-center px-5 py-5'>
          {/* Logo: */}
          <div className='flex items-center bg-[#DCF360] rounded-full p-3'>
            {/* <img src='logo.png' alt='Logo' className='w-10 h-10' /> */}
          </div>
          {/* Github Link: */}
          <button className='fllex items-center px-3 py-2 bg-[#232127] rounded-md'
                  onClick={() => window.open('https://github.com/limitlez2020/flashcard_saas')}>
            <p className='text-center text-white text-xs'> Github </p> 
          </button>
        </div>


        {/* Header: */}
        <div className="w-full items-center pt-10 pb-28">
          <h1 className="text-2xl text-white text-center font-bold">Flashcards</h1>
        </div>

        {/* Generate Flashcards: */}
        <div className="h-full w-1/4 flex flex-col">
          <h1 className="text-base mb-4">
            Generate the flashcards:
          </h1>
          {/* Get Text to generate flashcards on: */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
            className="w-full p-3 text-sm border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
          >
            Generate
          </button>
        </div>
        
        
        {/* Dsiplay the Flashcards gotten from the API: */}
        {flashcards.length > 0 && (
          <div className="flex flex-col h-full mt-28 mx-16 mb-16">
            <h2 className="text-lg text-white font-medium mb-2">
              Generated Flashcards
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {flashcards.map((flashcard, index) => (
                /* Each Flashcard: */
                <div key={index} className="relative bg-white shadow-md rounded-lg p-4 h-96">
                  {/* Black dot: */}
                  <div className='w-4 h-4 absolute right-4 flex rounded-full justify-items-end bg-black'></div>

                  <div className="h-full flex flex-col ">
                    <h3 className={`${oswald.className} text-3xl font-bold`}> QUESTION </h3>
                    <p>{flashcard.front}</p>
                  </div>
                  {/* <h3 className="text-lg font-semibold mt-4">Back:</h3>
                  <p>{flashcard.back}</p> */}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
