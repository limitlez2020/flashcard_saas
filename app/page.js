'use client';

import { useState } from 'react';
import { Montserrat, Raleway } from 'next/font/google';
import { Oswald } from 'next/font/google';
import { Inclusive_Sans } from 'next/font/google';
import { Space_Mono } from 'next/font/google';
import { ArrowPathIcon } from '@heroicons/react/20/solid';

const monstserrat = Montserrat({ subsets: ['latin'] });
const oswald = Oswald({ subsets: ['latin'] });
const inclusive_sans = Inclusive_Sans({ subsets: ['latin'], weight: ['400'] });
const space_mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700']});
const raleway = Raleway({ subsets: ['latin'] });


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


  /* Create a Flashcard Component 
   * This is how a *single* flashcard will look and behave
   */
  function Flashcard({flashcard, index}) {
    /* Flip state of the flashcard */
    const [isFlipped, setIsFlipped] = useState(false);

    /* Toggle the flip state of the flashcard */
    const flipCard = () => {
    setIsFlipped(!isFlipped);
    }

    /* Display the flashcard */
    return (
      <div key={index} 
          className="bg-white shadow-md rounded-lg p-4 w-80 h-96 cursor-pointer"
          onClick={flipCard}
      >
        {!isFlipped ? (
          /* Flashcard Front: */
          <div className="relative h-full w-full flex flex-col justify-center rotate-0">
            <h3 className={`${raleway.className} absolute top-2 left-2 text-5xl font-bold`}> 
              {/* Flascard Number */}
              {((index+1) < 9) ? '0'+(index+1) : (index)} 
            </h3>
            <p className={`${space_mono.className} w-full pr-5 text-center`}>
              {flashcard.front}
            </p>

            {/* Flip icon: */}
            <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10
                            bg-black rounded-full text-white flex items-center justify-center'
            >
              <ArrowPathIcon className='w-5 h-5'/>
            </div>
          </div>

          ) : (

          /* Flashcard Back: */
          <div className="relative h-full w-full">
            <h3 className={`${raleway.className} absolute top-2 left-0 right-0 text-center text-xl font-bold mt-5`}>
              ANSWER
            </h3>
            <div className='flex h-full justify-normal text-center items-center'>
              <p className={`${space_mono.className} px-4`}>
                {flashcard.back}
              </p>
            </div>

            {/* Flip icon: */}
            <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10
                            bg-black rounded-full text-white flex items-center justify-center'
            >
              <ArrowPathIcon className='w-5 h-5'/>
            </div>
          </div>
        )}
      </div>
    )
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
        <div className="w-full flex flex-col items-center pt-20 pb-24 justify-center align-middle">
          <h1 className={`${raleway.className} text-7xl text-center font-bold`}>STUDY PRO</h1>
          
          <h3 className={`${space_mono.className} text-lg mb-4`}>
            Generate study flashcards
          </h3>
        </div>

        {/* Generate Flashcards: */}
        <div className={`${space_mono.className} h-full w-1/4 flex flex-col`}>
          
          {/* <div className='flex flex-row justify-center align-middle'> */}
          {/* Get Text to generate flashcards on: */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
            className="w-full h-24 px-3 py-2 text-sm border-black border-2 rounded-xl mb-4 
                       no-scrollbar focus:outline-none"
            rows={4}
          />

          <button
            onClick={handleSubmit}
            className="w-full h-10 bg-[#282828] text-white self-center text-sm py-2 rounded-md hover:bg-gray-800"
          >
            Generate
          </button>
          {/* </div> */}
        </div>
        
        
        {/* Dsiplay the Flashcards gotten from the API: */}
        {flashcards.length > 0 && (
          <div className="flex flex-col h-full mt-28 mx-16 mb-16">

            <div className="flex items-center justify-center gap-4">
                {/* Each Flashcard */}
                {flashcards.map((flashcard, index) => (
                  /* Create an instance of the Flashcard Component */
                  <Flashcard flashcard={flashcard} index={index} key={index} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
