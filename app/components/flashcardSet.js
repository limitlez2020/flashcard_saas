"use client"
import { useState, useEffect } from "react";
import { Raleway, Space_Mono } from "next/font/google";
import { ArrowLongLeftIcon, ArrowLongRightIcon, BookmarkIcon as SolidBookMarkIocn } from '@heroicons/react/20/solid';
import { BookmarkIcon as OutlineBookMarkIcon } from '@heroicons/react/24/outline'


import Flashcard from "./flashcard";

const raleway = Raleway({ subsets: ["latin"] });
const space_mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });


export default function FlashcardSet({flashcards, flashcardTopic, isSetSaved}) {
  /* Track which flashcard is being displayed */
  const [currentIndex, setCurrentIndex] = useState(0);
  /* Total Number of Flashcards: */
  const flashcardsTotal = flashcards.length;
  /* Flashcard Progress Bar Tracking: */
  const progressBar = ((currentIndex+1) / flashcardsTotal) * 100;
  /* State to track if the flashcard set is saved */
  const [isSaved, setIsSaved] = useState(isSetSaved);



  /* Add a flashcard set to the flashcardSets in the localstorage: */
  /** Set an item in localstorage:
    *   - key: flashcardSets --> key to access all the flashcard sets the user saves
    *   - value: an empty object ---> JSON.stringify({})
    *   - we want to create an empty object, then add elements
    *     when the user saves a flashcard set 
    *   - NOTE: the structure of the 'value' is:
    *      - an object that contains elements
    *      - each element is a flashcard set
    *      - each element has the flashcard title (or unique key) and 
    *      - an array of objects, each object representing a flashcard in the specific set
    *   
    *   - Example representation of the 'value':
    *     {
    *       "Biology":         [ {front: "...", back: "..."}, ... ],
    *       "Fish Species":    [ {front: "...", back: "..."}, ... ],
    *       ...
    *     }
    */
  const saveFlashcardSet = () => {
    /* Get the existing flashcard sets in localstorage */
    const existingSets = localStorage.getItem("flashcardSets");
    /* Turn the string into an object */
    const existingSetsObject = existingSets ? JSON.parse(existingSets) : {};

    /* Now we add the new flashcard set to the existing sets object */
    existingSetsObject[flashcardTopic] = flashcards;

    /* Update the localstorage with the newly added flashcard set */
    localStorage.setItem("flashcardSets", JSON.stringify(existingSetsObject));

    /* Set saved state to true: */
    setIsSaved(true);
  }






  /* Unsave Flashcard set */
  /*  - i.e. delete the flashcard set from the localStorage:  */
  const unsaveFlashcardSet = () => {
    /* Get the existing flashcard sets in localstorage */
    const existingSets = localStorage.getItem("flashcardSets");
    /* Turn the string into an object */
    const existingSetsObject = existingSets ? JSON.parse(existingSets) : {};
    /* Now we delete the flashcard set from the existing sets object */
    delete existingSetsObject[flashcardTopic];
    /* Update the localstorage to reflect this change: */
    localStorage.setItem("flashcardSets", JSON.stringify(existingSetsObject));

    /* Set the saved state to be false: */
    setIsSaved(false);
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




  return (
    <div className={space_mono.className}>
      {flashcards.length > 0 && (
        <div className='flex flex-col justify-center items-center gap-5'>
          <div className="flex flex-col justify-center items-center h-full gap-5">
            
            {/* Display Title and save button: */}
            <div className='flex flex-row justify-between items-center w-80 gap-28'>
              {/* Topic: */}
              <div className='flex'>
                <p className={`${raleway.className} text-2xl font-bold`}>{flashcardTopic}</p>
              </div>

              {/* Show icon to save or unsave flashcard: */}
              {isSaved ? (
                /* Saved state: */
                <button className='bg-[#aec1f3] flex flex-row items-center justify-center
                                    gap-2 p-2 border-2 border-black rounded-md hover:bg-[#c7d4f4]'
                        onClick={unsaveFlashcardSet}> 
                  <SolidBookMarkIocn className='text-black w-4 h-4'/>
                </button>
              ) : (
                /* Unsaved state: */
                <button className='bg-[#aec1f3] flex flex-row items-center justify-center
                                    gap-2 p-2 border-2 border-black rounded-md hover:bg-[#c7d4f4]'
                        onClick={saveFlashcardSet}>
                  <OutlineBookMarkIcon className='w-4 h-4'/>
                </button>
              )}
            </div>


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