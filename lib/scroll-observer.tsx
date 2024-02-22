"use client";

import React, { useCallback, useEffect, useState } from "react";

interface ScrollValue {
  scrollY: number;
}
export const ScrollContext = React.createContext<ScrollValue>({ scrollY: 0 });

const ScrollObserver: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [handleScroll]);
  useEffect(() => {
    setScrollY(window.scrollY);
  }, []);
  return (
    <ScrollContext.Provider value={{ scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};
export default ScrollObserver;
