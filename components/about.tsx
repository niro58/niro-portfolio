"use client";

import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

export const About: React.FC = () => {
  const { ref, inView, entry } = useInView({
    triggerOnce: true
  });

  return (
    <div className="flex min-h-screen items-center justify-between to-background via-gray-900 from-20% via-70% from-background bg-gradient-to-b py-24">
      <div
        ref={ref}
        className="container flex flex-col items-center justify-center gap-8 px-4 text-center md:gap-10 md:px-6 lg:flex-row lg:justify-between xl:gap-12"
      >
        <Transition
          show={inView}
          className="grid gap-4 lg:gap-6 xl:gap-8 lg:order-1 order-2"
        >
          <Transition.Child
            as="h2"
            enter="transition ease-in-out duration-500 transform opacity-0"
            enterFrom="translate-y-2 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition ease-in-out duration-500 transform opacity-100"
            leaveFrom="translate-y-0 opacity-100"
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            Hi, I'm Nichita Roilean
          </Transition.Child>
          <Transition.Child
            as="p"
            enter="transition ease-in-out duration-500 transform opacity-0"
            enterFrom="translate-y-2 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition ease-in-out duration-500 transform opacity-100"
            leaveFrom="translate-y-0 opacity-100"
            className="max-w-3xl text-gray-400 text-2xl/relaxed delay-300"
          >
            A full stack developer from Czech Republic, Prague that enjoys
            trying new technologies, frameworks, understanding their
            functionality, trying to create something interesting. That has
            created this website to showcase some recent projects/current
            projects
          </Transition.Child>
        </Transition>
        <Transition
          show={inView}
          enter="transition ease-in-out duration-1000 transform opacity-0"
          enterFrom="translate-y-2 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transition ease-in-out duration-1000 transform opacity-100"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-2 opacity-0"
          className="flex-1 items-center justify-center gap-4 lg:order-1 lg:gap-6"
        >
          <Image
            src={"/images/about-me.jpg"}
            sizes="100vw"
            priority
            width={500}
            height={500}
            alt="About me"
            className="rounded-s-none rounded-3xl"
          />
        </Transition>
      </div>
    </div>
  );
};
