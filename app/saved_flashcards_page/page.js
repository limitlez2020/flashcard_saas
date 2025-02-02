'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Raleway, Space_Mono } from "next/font/google";
import { AcademicCapIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import FlashcardFolder from "../components/flashcardFolder";

const raleway = Raleway({ subsets: ['latin'] });
const space_mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] });




export default function SavedFlashcards() {
 const [text, setText] = useState("");
 const [savedFlashcards, setSavedFlashcards] = useState([]);


  /* Get the saved flashcard sets from localstorage */
  useEffect(() => {
    /* Ensure we are on the client side */
    if (typeof window != 'undefined') {
      const flashcardSets = JSON.parse(localStorage.getItem("flashcardSets"));
      if (flashcardSets) {
        setSavedFlashcards(flashcardSets);
      }
    }
  }, []);




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
            <div className={`${raleway.className} lg:text-7xl md:text-6xl text-4xl font-bold`}>
              <p>CARDS</p>
            </div>
            <div className={`${space_mono.className} lg:text-lg md:text-lg text-base`}>
              <p>Here are your saved flashcards</p>
            </div>
          </div>

          {/* Display Flashcard Sets: */}
          <div className={`${raleway.className} flex flex-col w-full px-20 items-center justify-center gap-12`}>

            <div className="flex flex-row justify-between items-center w-full md:px-28 border-0 border-black">
              <p className="text-base">Saved:</p>

              {/* Search Bar: */}
              <div className="flex justify-center items-center w-40 h-10 bg-[#f6f4f4] border-black border-[2px] rounded-xl">
                {/* <textarea className="flex items-center justify-center bg-[#f6f4f4] w-full h-9 text-xs rounded-3xl no-scrollbar focus:outline-none"
                          value={text}
                          onChange={e => setText(e.target.value)}
                          placeholder="search..."
                /> */}

                <div className="flex justify-end items-center w-full self-center p-3">
                  <MagnifyingGlassIcon className="w-4 h-4"/>
                </div>
              </div>
            </div>

            {/* Flashcard Sets */}
            {/* Display in grid format for responsitivity: */}
            <div className="flex flex-wrap justify-center gap-x-28 px-10">

              {/* Display All Flashcard Folders: */}
              {/* Map over every set of saved flashcards:
                * Use Object.keys() to map because saveFlashcards
                * is an array of objects, so we can just map
                * over the keys of the objects -- flashcard sets
              */}
              {savedFlashcards ? 
                (Object.keys(savedFlashcards).map((topic) => {
                  const flashcards = savedFlashcards[topic];
                  var backgroundColor;
                  var foregroundColor;
                  /* Randomly pick one of the color combos: */
                  const colorCombo = Math.floor(Math.random() * 5)
                  /* Pink */
                  if (colorCombo === 0) {
                    backgroundColor = "#1e0418";
                    foregroundColor = "#4d0a3d";
                  }
                  /* Red */
                  else if (colorCombo === 1) {
                    backgroundColor = "#270505";
                    foregroundColor = "#4e0a0a";
                  }
                  /* Green */
                  else if (colorCombo === 2) {
                    backgroundColor = "#031518";
                    foregroundColor = "#073239";
                  }
                  /* Purple */
                  else if (colorCombo === 3) {
                    backgroundColor = "#170422";
                    foregroundColor = "#32094a";
                  }
                  /* Blue */
                  else {
                    backgroundColor = "#060d2e";
                    foregroundColor = "#0a164d";
                  }
        
                  return (
                    <FlashcardFolder 
                      key={topic}
                      topic={topic}
                      backgroundColor={backgroundColor}
                      foregroundColor={foregroundColor}
                    />
                  )
                })
              ) : (
                <p className={`${raleway.className} text-xs`}>
                  No saved flashcards 🥺
                </p>
              )}
            </div>

          </div>

        </div>
      </div>
  );
}