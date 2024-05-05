"use client";

import React from "react";
import { useInView } from "react-intersection-observer";

import HeroBackground from "./hero-background";

export const Hero: React.FC = () => {
  const { ref, inView, entry } = useInView({
    threshold: 0,
    triggerOnce: true
  });
  return (
    <div ref={ref} className="flex h-screen min-h-screen flex-col">
      <HeroBackground />
    </div>
  );
};
