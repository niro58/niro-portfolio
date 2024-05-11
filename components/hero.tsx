"use client";

import React from "react";

import HeroBackground from "./hero-background";

export const Hero: React.FC = () => {
  return (
    <div className="flex h-screen min-h-screen flex-col">
      <HeroBackground />
      <div className="h-full ps-32">
        <div className="flex h-full flex-col items-start justify-center  gap-5 text-8xl">
          <div className="flex flex-col gap-10 rounded-lg border border-primary bg-primary/40 px-8 py-16 text-center font-bold shadow-2xl shadow-primary">
            <span>N</span>
            <span>I</span>
            <span>R</span>
            <span>O</span>
          </div>
        </div>
      </div>
    </div>
  );
};
