"use client";

import { Transition } from "@headlessui/react";
import React from "react";
import { useInView } from "react-intersection-observer";

export const Hero: React.FC = () => {
  const { ref, inView, entry } = useInView({
    threshold: 0
  });
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute bg-hero bg-fixed bg-center blur-md bg-cover w-full h-full -z-10"></div>
      <div className="flex flex-col gap-5" ref={ref}>
        <div className="text-center text-8xl tracking-wider font-light">
          NIRO
        </div>
        <Transition
          show={inView}
          enter="transition-opacity duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="animate-popup"
        >
          <div
            className="h-0.5 border-b-blue-400 bg-blue-400"
            style={{ boxShadow: "0 0 10px #60A5FA" }}
          ></div>
        </Transition>
        <div className="text-center text-4xl font-extralight tracking-wide">
          Just another{" "}
          <span className="text-blue-400 text-3xl font-light">
            &#8217;&#8217;
          </span>
          Developer
          <span className="text-blue-400 text-3xl font-light">
            &#8217;&#8217;
          </span>
        </div>
      </div>
    </div>
  );
};
