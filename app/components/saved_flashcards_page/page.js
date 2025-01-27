'use client';

import { useState } from "react";
import Link from "next/link";
import { Raleway, Space_Mono } from "next/font/google";
import { AcademicCapIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowUpRightIcon, BookmarkIcon, MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid";

const raleway = Raleway({ subsets: ['latin'] });
const space_mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] });




function FlashcardFolder ({topic, foregroundColor, backgroundColor}) {
  return (
    /* Individual Folder: */
    <div className="flex flex-col gap-[92px] mb-24">
      <div className="flex relative w-44 h-32 cursor-pointer">
        {/* Folder Background: */}
        <div className="absolute top-2 left-0 w-full h-full rounded-2xl shadow-2xl"
             style={{backgroundColor: backgroundColor}}
        />

        {/* Card inside Folder: */}
        <div className="absolute top-9 left-2 bg-white w-40 h-24 rounded-md -rotate-1 hover:top-8 shadow-2xl"/>

        {/* Folder Foreground: */}
        <div className="absolute top-12 w-52 h-[156px] rounded-2xl shadow-2xl"
             style={{backgroundColor: foregroundColor}}
        />

        {/* Arrow Icon: */}
        <div className="absolute top-[170px] left-3 w-10 h-10 rounded-full">
          <ArrowUpRightIcon className="text-white w-6 h-6"/>
        </div>
      </div>

      {/* Title - of set of flashcards: */}
      <div className="mt-1 px-3">
        <p className={` ${raleway.className} font-medium text-xl`}>{topic}</p>
        <p className={`${space_mono.className} font-light text-sm`}>3 flashcards</p>
      </div>
    </div>
  )
}




export default function SavedFlashcards() {
 const [text, setText] = useState("");


  return (
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
          <Link href="/components/saved_flashcards_page">
            <button className='flex items-center px-3 py-2 bg-[#232127] rounded-md hover:bg-[#0f0312]'>
              <p className={`${raleway.className} text-center text-white font-semibold text-xs`}>
                Flashcards
              </p>
            </button>
          </Link>
        </div>

        {/* Main Screen Container: */}
        <div className="flex flex-col w-full justify-center items-center gap-32">
          {/* Page Header and subheader: */}
          <div className="flex flex-col text-center">
            <div className={`${raleway.className} text-6xl font-bold`}>
              <p>FLASHCARDS</p>
            </div>
            <div className={`${space_mono.className}`}>
              <p>Here are your saved flashcards</p>
            </div>
          </div>

          {/* Display Flashcard Sets: */}
          <div className={`${raleway.className} flex flex-col w-full px-20 items-center justify-center gap-12`}>
           
            {/* Search Bar: */}
            <div className="flex justify-center items-center w-56 h-10 bg-[#f6f4f4] border-black border-[2px] rounded-xl">
              {/* <textarea className="flex items-center justify-center bg-[#f6f4f4] w-full h-9 text-xs rounded-3xl no-scrollbar focus:outline-none"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="search..."
              /> */}

              <div className="flex justify-end items-center w-full self-center p-3">
                <MagnifyingGlassIcon className="w-4 h-4"/>
              </div>
            </div>

            {/* Flashcard Sets */}
            {/* Display in grid format for responsitivity: */}
            <div className="flex flex-wrap justify-center gap-x-32">

              {/* Display a Flashcard: */}
              <FlashcardFolder topic="Rugby Rules" backgroundColor={"#414040"} foregroundColor={"#595858"}/>
              <FlashcardFolder topic="Cooking Methods" backgroundColor={"#270505"} foregroundColor={"#4e0a0a"}/>
              <FlashcardFolder topic="Water" backgroundColor={"#031518"} foregroundColor={"#073239"}/>
              <FlashcardFolder topic="Coding Beauty" backgroundColor={"#170422"} foregroundColor={"#32094a"}/>

            </div>

          </div>

        </div>
      </div>
  );
}