"use client"


import { useState } from "react";
import { Raleway, Space_Mono } from "next/font/google";
import { ArrowPathIcon } from '@heroicons/react/20/solid'


const raleway = Raleway({ subsets: ["latin"] })
const space_mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] })


/* Flashcard Component:
  * This is how a *single* flashcard will look and behave
  */
export default function Flashcard({flashcard, index}) {

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
                          bg-[#282828] rounded-full text-white flex items-center
                          justify-center hover:bg-[#0f0312]'
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
    