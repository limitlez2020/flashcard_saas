"use client"
import { useEffect, useState } from "react";
import { Raleway, Space_Mono } from "next/font/google";


const raleway = Raleway({ subsets: "latin" });
const space_mono = Space_Mono({ subsets: "latin", weight: ["400", "700"] });


export default function FlahscardSet(flashcardSet, flashcardTopic, flashcardsNum) {
  /* Track which flashcard is being displayed */
  const [currentIndex, setCurrentIndex] = useState(0);



  return (
    <div className={space_mono.className}>
      Hello, we out!
    </div>
  );

}