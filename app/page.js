'use client';

import { useState } from 'react';
import { Montserrat, Raleway } from 'next/font/google';
import { Oswald } from 'next/font/google';
import { Inclusive_Sans } from 'next/font/google';
import { Space_Mono } from 'next/font/google';
import { ArrowLongLeftIcon, ArrowLongRightIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import { AcademicCapIcon } from '@heroicons/react/24/outline'

const monstserrat = Montserrat({ subsets: ['latin'] });
const oswald = Oswald({ subsets: ['latin'] });
const inclusive_sans = Inclusive_Sans({ subsets: ['latin'], weight: ['400'] });
const space_mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700']});
const raleway = Raleway({ subsets: ['latin'] });


export default function Generate() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  /* Track which flashcard is being displayed */
  const [currentIndex, setCurrentIndex] = useState(0);

  /* The amount of flashcards we have: */
  const flashcardsTotal = 2
  /* Flashcard Progress Bar Tracking: */
  const progressBar = ((currentIndex+1) / flashcardsTotal) * 100

  const handleSubmit = async () => {
    if (!text.trim()) {
      // alert('Please enter some text to generate flashcards.');
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




  /* Handle moving to the previous flashcard: */
  const prevFlashcard = () => {
    /* Update the current flashcard index: */ 
    /* We also want it to wrap around */
    if (currentIndex === 0) {
      setCurrentIndex(flashcardsTotal - 1);
    }
    else {
      setCurrentIndex(currentIndex - 1);
    }
  }



  /* Handle moving to the next flashcard: */
  const nextFlashcard = () => {
    /* Update the current flashcard index: */
    /* Make it wrap around as well: */
    if (currentIndex === flashcardsTotal - 1) {
      setCurrentIndex(0);
    }
    else {
      setCurrentIndex(currentIndex + 1);
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
          <div className='flex items-center justify-center bg-white shadow-gray-300 shadow-md
                        border-black border-[1px] rounded-full p-2 cursor-pointer'>
            {/* <p className="w-5 h-5 font-semibold flex justify-center">F.</p> */}
            <AcademicCapIcon className='w-[18px] h-[18px] text-black'/>

          </div>
          {/* Github Link: */}
          <button className='fllex items-center px-3 py-2 bg-[#232127] rounded-md'
                  onClick={() => window.open('https://github.com/limitlez2020/flashcard_saas')}>
            <p className={`${raleway.className} text-center text-white font-semibold text-xs`}> Github </p> 
          </button>
        </div>


        {/* Header: */}
        <div className="w-full flex flex-col items-center pt-20 pb-24 justify-center align-middle">
          <h1 className={`${raleway.className} lg:text-7xl md:text-6xl text-4xl text-center font-bold`}>STUDY PRO</h1>
          
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
            className="w-full h-10 bg-[#282828] text-white self-center text-sm py-2 rounded-md hover:bg-gray-800"
          >
            Generate
          </button>
          {/* </div> */}
        </div>
        
        
        {/* Dsiplay the Flashcards gotten from the API: */}
        {/* Flashcard Area */}
        {flashcards.length > 0 && (
          <div className='flex flex-col justify-center items-center'>
            <div className="flex lg:flex-row md:flex-row flex-col justify-center items-center h-full mt-28 mb-7 lg:gap-12 md:gap-5 gap-2">
              {/* Previous Icon -- go to previous flashcard: */}
              <button className='border-black border-2 rounded-full lg:p-3 md:p-3 p-2'
                      onClick={prevFlashcard}
              >
                <ArrowLongLeftIcon className='lg:w-5 md:w-5 w-4 lg:h-5 md:h-5 h-4 text-black'/>
              </button>

              {/* Flashcard Container: */}
              <div className="flex items-center justify-center">
                {/* We want to create a stack of flashcards */}
                {/* Only display the current flashcard */}
                <Flashcard flashcard={flashcards[currentIndex]} index={currentIndex} />
              </div>

              {/* Next Icon -- go to next flashcard: */}
              <button className='border-black border-2 rounded-full lg:p-3 md:p-3 p-2'
                      onClick={nextFlashcard}
              >
                <ArrowLongRightIcon className='lg:w-5 md:w-5 w-4 lg:h-5 md:h-5 h-4 text-black'/>
              </button>
            </div>


            {/* Progress Bar for the Flashcard: */}
            <div className='relative w-80 h-2 bg-slate-100 border-black border-[1px] mb-16 rounded-md'>
              <div className='absolute top-0 left-0 bg-gradient-to-tr from-black to-[#023bcc] h-full rounded-md'
                  style={{ width: `${progressBar}%` }}>
              </div>
            </div>
          </div>

        )}
      </div>
    </div>
  )
}
