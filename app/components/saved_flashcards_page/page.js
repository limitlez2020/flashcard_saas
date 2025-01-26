'use client';

import { useState } from "react";
import Link from "next/link";
import { Raleway, Space_Mono } from "next/font/google";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

const raleway = Raleway({ subsets: ['latin'] });
const space_mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] });


export default function saved_flashcards_page() {
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
          <Link href="/components/saved_flashcards_page">
            <button className='flex items-center px-3 py-2 bg-[#232127] rounded-md hover:bg-[#0f0312]'>
              <p className={`${raleway.className} text-center text-white font-semibold text-xs`}>
                My Flashcards
              </p>
            </button>
          </Link>
        </div>

        {/* Main Screen Container: */}
        <div className="flex flex-col w-full justify-center items-center gap-20">
          {/* Header and subheader: */}
          <div className="flex flex-col text-center">
            <div className={`${raleway.className} text-6xl font-bold`}>
              <p>FLASHCARDS</p>
            </div>
            <div className={`${space_mono.className}`}>
              <p>❤️ Here are your saved flashcards ❤️</p>
            </div>
          </div>

          {/* Flashcards Set: */}

        </div>
      </div>
    </div>
  );
}