"use client";
import "@/styles/rain.css";
import React, { useEffect, useRef } from "react";
function randRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const Rain: React.FC = () => {
  const rainContainer = useRef<HTMLDivElement | null>(null);
  const nbDrop = 100;
  useEffect(() => {
    if (rainContainer.current) {
      for (let i = 1; i < nbDrop; i++) {
        const dropLeft = randRange(200, 1800);
        const dropTop = randRange(-1300, 800);

        const drop = document.createElement("div");
        drop.className = "drop";
        drop.id = `drop${i}`;
        drop.style.left = `${dropLeft}px`;
        drop.style.top = `${dropTop}px`;

        rainContainer.current.appendChild(drop);
      }
    }
  }, []);

  return (
    <div className="z-10 h-full w-full">
      <div className="rain h-full w-full" ref={rainContainer}></div>
    </div>
  );
};
