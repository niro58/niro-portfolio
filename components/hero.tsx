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
    <div className="min-h-screen">
      <div ref={ref} className="relative flex flex-col">
        <HeroBackground />

        <div className="absolute bottom-0 left-0 right-0 top-0 mx-auto flex w-full flex-col items-center justify-center sm:w-1/2 xl:w-1/4">
          <div
            className="w-full rounded-lg bg-background/50 p-5"
            style={{
              backdropFilter: "blur(5px)"
            }}
          >
            <div className="pb-5 text-center text-4xl font-light tracking-wider sm:text-6xl lg:text-8xl">
              NIRO
            </div>
            <div className="h-0.5 w-full ">
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
                  className="shadow-bg m-auto h-0.5 w-3/4 border-b-primary/70 bg-primary"
                  style={{ boxShadow: "0 0 10px" }}
                ></div>
              </Transition>
            </div>
            <div className="pt-5 text-center text-xl font-extralight tracking-wide sm:text-2xl lg:text-4xl">
              Just another <br />
              <span className="text-3xl font-light text-primary">
                &#8217;&#8217;
              </span>
              Developer
              <span className="text-3xl font-light text-primary">
                &#8217;&#8217;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
