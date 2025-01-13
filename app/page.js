'use client';

import { useState } from 'react';
import { Montserrat } from 'next/font/google';
import { Oswald } from 'next/font/google';
import { Inclusive_Sans } from 'next/font/google';

const monstserrat = Montserrat({ subsets: ['latin'] });
const oswald = Oswald({ subsets: ['latin'] });
const inclusive_sans = Inclusive_Sans({ subsets: ['latin'], weight: '400' });


export default function Generate() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);


  /* Toggle the flip state of the flashcard */
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  }

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
      <div className="w-full min-h-screen bg-[#F1F1F1] flex flex-col items-center">
        {/* Nav Bar: */}
        <div className='w-full flex justify-between items-center px-5 py-5'>
          {/* Logo: */}
          <div className='flex items-center bg-white shadow-2xl border-black border-[1px] rounded-full p-3'>
            {/* <img src='logo.png' alt='Logo' className='w-10 h-10' /> */}
            F.
          </div>
          {/* Github Link: */}
          <button className='fllex items-center px-3 py-2 bg-[#232127] rounded-md'
                  onClick={() => window.open('https://github.com/limitlez2020/flashcard_saas')}>
            <p className='text-center text-white text-xs'> Github </p> 
          </button>
        </div>


        {/* Header: */}
        <div className="w-full flex flex-col items-center pt-20 pb-28 justify-center align-middle">
          <h1 className={`${inclusive_sans} text-6xl text-center font-bold tracking-widest`}>FLASHCARD</h1>
          
          <h3 className="text-lg mb-4">
            Generate the flashcards
          </h3>
        </div>

        {/* Generate Flashcards: */}
        <div className="h-full w-1/4 flex flex-row gap-4">
          
          {/* <div className='flex flex-row justify-center align-middle'> */}
          {/* Get Text to generate flashcards on: */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
            className="w-3/4 h-10 p-3 text-sm border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            rows={4}
          />

          <button
            onClick={handleSubmit}
            className="w-1/4 h-10 bg-[#282828] text-white font-medium py-2 rounded-md hover:bg-gray-700"
          >
            Generate
          </button>
          {/* </div> */}
        </div>
        
        
        {/* Dsiplay the Flashcards gotten from the API: */}
        {flashcards.length > 0 && (
          <div className="flex flex-col h-full mt-28 mx-16 mb-16">
            {/* <h2 className="text-lg font-medium mb-2">
              Generated Flashcards
            </h2> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Each Flashcard */}
                {flashcards.map((flashcard, index) => (
                /* Card Cointainer: */
                <div key={index} 
                     className="relative bg-white shadow-md rounded-lg p-4 w-80 h-96 cursor-pointer"
                     onClick={flipCard}
                >
                  {!isFlipped ? (
                    /* Flashcard Front: */
                    <div className="absolute h-full w-full flex flex-col rotate-0">
                      <h3 className={`${oswald.className} text-3xl font-bold`}> 
                        {/* Flascard Number */}
                        {((index+1) < 9) ? '0'+(index+1) : (index)} 
                      </h3>
                      <p className='w-full pr-5'>{flashcard.front}</p>
                    </div>

                    ) : (

                    /* Flashcard Back: */
                    <div className="absolute h-full w-full flex flex-col rotate-0">
                      <h3 className="text-lg font-semibold mt-4">Back:</h3>
                      <p className='w-full pr-8'>{flashcard.back}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
