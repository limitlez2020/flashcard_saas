"use client"
import { useEffect, useState } from "react";
import { Raleway, Space_Mono } from "next/font/google";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

import Flashcard from "./flashcard";

const raleway = Raleway({ subsets: "latin" });
const space_mono = Space_Mono({ subsets: "latin", weight: ["400", "700"] });


export default function FlahscardSet(flashcards, flashcardTopic) {
  /* Track which flashcard is being displayed */
  const [currentIndex, setCurrentIndex] = useState(0);
  /* Flashcard Progress Bar Tracking: */
  const progressBar = ((currentIndex+1) / flashcardsNum) * 100
  /* Total Number of Flashcards: */
  const flashcardsTotal = flashcards.length;


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



  return (
    <div className={space_mono.className}>
      {flashcards.length > 0 && (
        <div className='flex flex-col justify-center items-center gap-5'>

          <div className="flex flex-col justify-center items-center h-full mt-28 gap-5">
            
            {/* Approach 2: */}
            {/* Display Title and save button: */}
            <div className='flex flex-row justify-between items-center w-80 gap-28'>
              {/* Topic: */}
              <div className='flex'>
                <p className={`${raleway.className} text-2xl font-bold`}>{flashcardTopic}</p>
              </div>
              {/* Save Button: */}
              <button className='bg-[#aec1f3] flex flex-row items-center justify-center
                                  gap-2 p-2 border-2 border-black rounded-md hover:bg-[#c7d4f4]'
                      onClick={saveFlashcardSet}>
                <BookmarkIcon className='w-4 h-4'/>
              </button>
            </div>
            {/* Aproach 2 End */}


            {/* Flashcard Container: */}
            <div className="flex items-center justify-center">
              {/* We want to create a stack of flashcards */}
              {/* Only display the current flashcard */}
              <Flashcard flashcard={flashcards[currentIndex]} index={currentIndex} />
            </div>

            <div className='flex flex-row justify-center items-center gap-16'>
              {/* Previous Icon -- go to previous flashcard: */}
              <button className='border-black border-2 rounded-2xl p-3 hover:bg-neutral-200'
                      onClick={prevFlashcard}
              >
                <ArrowLongLeftIcon className='w-5 h-5 text-black'/>
              </button>

              {/* Display Flashcard progress (in number): */}
              <p className={` ${raleway.className} text-center text-black text-base`}>
                {currentIndex + 1} / {flashcardsTotal}
              </p>

              {/* Next Icon -- go to next flashcard: */}
              <button className='border-black border-2 rounded-2xl p-3 hover:bg-neutral-200'
                      onClick={nextFlashcard}
              >
                <ArrowLongRightIcon className='w-5 h-5 text-black'/>
              </button>
            </div>
          </div>

          {/* Approach 2: */}
          {/* Progress Bar for the Flashcard: */}
          <div className='relative w-80 h-1 bg-neutral-300 mb-24 rounded-md'>
            <div className='absolute top-0 left-0 bg-gradient-to-tr from-black to-[#6E94F9] h-full rounded-md'
                style={{ width: `${progressBar}%` }}>
            </div>
          </div>
          
        </div>

      )}
    </div>
  );

}