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
    <div className="px-5 min-h-screen">
      <div ref={ref} className="flex relative flex-col">
        <HeroBackground />

        <div className="absolute left-0 right-0 bottom-0 top-0 mx-auto w-full sm:w-1/2 lg:w-1/4 flex items-center flex-col justify-center">
          <div
            className="bg-background/50 p-5 rounded-lg w-full"
            style={{
              backdropFilter: "blur(5px)"
            }}
          >
            <div className="text-center text-4xl sm:text-6xl lg:text-8xl pb-5 tracking-wider font-light">
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
                  className="h-0.5 border-b-primary/70 bg-primary shadow-bg w-3/4 m-auto"
                  style={{ boxShadow: "0 0 10px" }}
                ></div>
              </Transition>
            </div>
            <div className="text-center text-xl sm:text-2xl lg:text-4xl font-extralight tracking-wide pt-5">
              Just another <br />
              <span className="text-primary text-3xl font-light">
                &#8217;&#8217;
              </span>
              Developer
              <span className="text-primary text-3xl font-light">
                &#8217;&#8217;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
