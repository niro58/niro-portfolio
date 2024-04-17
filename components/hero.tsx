"use client";

import { Transition } from "@headlessui/react";
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

      <div className="absolute bottom-0 left-0 right-0 top-0 z-20 mx-auto flex flex-col items-center justify-center">
        <div className="break-words rounded-lg bg-background/25 px-8 py-5 sm:px-32">
          <div className="pb-5 text-center text-6xl font-light tracking-wider sm:text-8xl">
            NIRO
          </div>
          <div className="h-0.5">
            <Transition
              show={inView}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="scale-0"
              enterTo="scale-100"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="scale-100"
              leaveTo="scale-0"
            >
              <div
                className="shadow-bg m-auto h-0.5 w-full border-b-primary/70 bg-primary"
                style={{ boxShadow: "0 0 10px" }}
              ></div>
            </Transition>
          </div>
          <div className="pt-5 text-center text-3xl font-extralight tracking-wide sm:text-4xl">
            Just another <br />
            <span className="font-light text-primary">&#8217;&#8217;</span>
            Developer
            <span className="font-light text-primary">&#8217;&#8217;</span>
          </div>
        </div>
      </div>
    </div>
  );
};
