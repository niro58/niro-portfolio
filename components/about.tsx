"use client";

import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

import { Separator } from "./ui/separator";

export const About: React.FC = () => {
  const { ref, inView, entry } = useInView({
    triggerOnce: true
  });

  return (
    <div className="flex h-screen items-center justify-between p-24 bg-gradient-to-b from-gray-950 to-black">
      <div
        ref={ref}
        className="relative container flex flex-row justify-between "
      >
        <Transition
          show={inView}
          enter="transition ease-in-out duration-500 transform opacity-0"
          enterFrom="translate-y-2 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transition ease-in-out duration-500 transform opacity-100"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-2 opacity-0"
        >
          <Image
            src={"/images/about-me.webp"}
            className="object-cover h-full shadow-lg shadow-white"
            width={600}
            height={600}
            alt="about"
          />
        </Transition>
        <Transition
          show={inView}
          className="w-1/2 p-9 flex flex-col justify-between items-center text-2xl"
        >
          <Transition.Child
            enter="transition ease-in-out duration-300 transform opacity-0"
            enterFrom="translate-y-2 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition ease-in-out duration-300 transform opacity-100"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-2 opacity-0"
          >
            Czech Republic
          </Transition.Child>
          <Transition.Child
            enter="transition ease-in-out duration-300 transform delay-100"
            enterFrom="scale-0"
            enterTo="scale-100"
            leave="transition ease-in-out duration-300 transform delay-100"
            leaveFrom="scale-100"
            leaveTo="scale-0"
            className="delay"
          >
            <Separator className="my-4 h-16 delay" orientation="vertical" />
          </Transition.Child>
          <Transition.Child
            enter="transition ease-in-out duration-300 transform opacity-0 delay-300"
            enterFrom="translate-y-2 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition ease-in-out duration-300 transform opacity-100 delay-300"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-2 opacity-0"
          >
            21 years old
          </Transition.Child>
          <Transition.Child
            enter="transition ease-in-out duration-300 transform delay-400"
            enterFrom="scale-0"
            enterTo="scale-100"
            leave="transition ease-in-out duration-300 transform delay-400"
            leaveFrom="scale-100"
            leaveTo="scale-0"
          >
            <Separator className="my-4 h-16 delay-200" orientation="vertical" />
          </Transition.Child>
          <Transition.Child
            enter="transition ease-in-out duration-300 transform opacity-0 delay-600"
            enterFrom="translate-y-2 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition ease-in-out duration-300 transform opacity-100 delay-600"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-2 opacity-0"
          >
            Enjoyer of Midjourney, ChatGPT, Github Copilot
          </Transition.Child>
        </Transition>
      </div>
    </div>
  );
};
