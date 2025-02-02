'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Space_Mono, Raleway } from 'next/font/google';
import { AcademicCapIcon } from '@heroicons/react/24/outline'

import FlashcardSet from './components/flashcardSet';

const space_mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700']});
const raleway = Raleway({ subsets: ['latin'] });


export default function Generate() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [flashcardTopic, setFlashcardTopic] = useState('');

  const handleSubmit = async () => {
    if (!text.trim()) {
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

      /* Get the topic for the flashcard set */
      setFlashcardTopic(data.topic)
      /* Extract the flashcards array from the data object */
      setFlashcards(data.flashcards)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert('An error occurred while generating flashcards. Please try again.')
    }
  }







  return (
    <div>
      <div className="w-full min-h-screen bg-[#F1F1F1] flex flex-col items-center">
        {/* Nav Bar: */}
        <div className='w-full flex justify-between items-center mb-20 px-5 py-5'>
          {/* Logo - link to homepage */}
          <Link href="/">
            <div className='flex items-center justify-center bg-white shadow-gray-300 shadow-md
                          border-black border-[1px] rounded-full p-2 cursor-pointer'>
              <AcademicCapIcon className='w-[18px] h-[18px] text-black'/>

            </div>
          </Link>

          {/* Github Link: */}
          <Link href="/saved_flashcards_page">
            <button className='flex items-center px-3 py-2 bg-[#232127] rounded-md hover:bg-[#0f0312]'>
              <p className={`${raleway.className} text-center text-white font-semibold text-xs`}>
                Flashcards
              </p>
            </button>
          </Link>
        </div>


        {/* Header: */}
        <div className="w-full flex flex-col items-center pb-24 justify-center align-middle">
          <h1 className={`${raleway.className} lg:text-7xl md:text-6xl text-4xl text-center font-bold`}>
            STUDY PRO
          </h1>
          
          <h3 className={`${space_mono.className} lg:text-lg md:text-lg text-base mb-4`}>
            Generate study flashcards
          </h3>
        </div>

        {/* Generate Flashcards: */}
        <div className={`${space_mono.className} h-full lg:w-1/4 md:w-1/3 w-3/5 flex flex-col`}>
          
          {/* Get Text to generate flashcards on: */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
            required
            className="w-full h-24 px-3 py-2 text-sm border-black border-2 rounded-xl mb-4 
                       no-scrollbar focus:outline-none"
            rows={4}
          />

          <button
            onClick={handleSubmit}
            className="w-full h-10 bg-[#282828] text-white self-center text-sm py-2 rounded-md hover:bg-[#0f0312]"
          >
            Generate
          </button>
        </div>
        
        
        {/* Dsiplay the Flashcards gotten from the API as a set: */}
        <FlashcardSet flashcards={flashcards} flashcardTopic={flashcardTopic}/>
      </div>
    </div>
  )
}
