"use client"

import { Raleway, Space_Mono } from "next/font/google";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";

const raleway = Raleway({ subsets: ["latin"] })
const space_mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] })



export default function FlashcardFolder ({topic, flashcards, foregroundColor, backgroundColor}) {
  /* Function to display the flashcards in this flashcard folder: */
  // const displayFlashcards = ( flashcards ) => {
  //   return <div className="w-full h-full bg-black text-white z-50">{flashcards}</div>
  // }


  return (
    /* Individual Folder: */
    <div className="flex flex-col gap-[88px] mb-24"
         onClick={() => displayFlashcards(flashcards)}
    >
      <div className="flex relative w-44 h-32 cursor-pointer">
        {/* Folder Background: */}
        <div className="absolute top-4 left-0 w-full h-full rounded-2xl shadow-2xl"
              style={{backgroundColor: backgroundColor}}
        />

        {/* Card inside Folder: */}
        <div className="absolute top-9 left-2 bg-white w-40 h-24 rounded-md -rotate-1 hover:top-8 shadow-2xl"/>

        {/* Folder Foreground: */}
        <div className="absolute top-12 w-48 h-[146px] rounded-2xl shadow-2xl"
              style={{backgroundColor: foregroundColor}}
        />

        {/* Arrow Icon: */}
        <div className="absolute top-[160px] left-3 w-10 h-10 rounded-full">
          <ArrowUpRightIcon className="text-white w-5 h-5"/>
        </div>
      </div>

      {/* Title - of set of flashcards: */}
      <div className="px-3">
        <p className={` ${raleway.className} font-medium text-xl`}>{topic}</p>
        <p className={`${space_mono.className} font-light text-sm`}>3 flashcards</p>
      </div>
    </div>
  )
}