import ContactsImage from "@/public/images/contacts.webp";
import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";
export const AboutMe: React.FC = () => {
  return (
    <div className="flex h-full max-h-screen min-h-screen w-full flex-col items-center justify-center">
      <div className="grid h-full min-h-screen w-full grid-cols-2 flex-row items-center justify-between">
        <div className="relative grid h-1/2 w-2/3 grid-rows-4 flex-col place-self-center ">
          <div className="grid w-full grid-cols-3 justify-between gap-3">
            <div className="flex justify-center rounded-t-lg border-x border-t border-primary bg-background p-5">
              <h1 className="break-words text-center text-4xl">
                <span className="text-8xl text-primary">A</span>bout Me
              </h1>
            </div>
            <div className="flex translate-y-4 justify-center rounded-lg border bg-background p-5 opacity-50">
              <h1 className="break-words text-center text-4xl">
                <span className="text-8xl text-primary">S</span>hort story
              </h1>
            </div>
            <div className="flex translate-y-4 justify-center rounded-lg border bg-background p-5 opacity-50">
              <h1 className="break-words text-center text-4xl">
                <span className="text-8xl text-primary">I</span>dk kev
              </h1>
            </div>
          </div>
          <div className="z-10 row-span-3 flex h-full flex-col gap-2 rounded-lg border border-primary bg-gradient-to-br from-primary/50 via-background to-background p-5">
            <h1 className="text-2xl">About Me</h1>
            <Separator orientation="horizontal" />
            <p className="text-neutral-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              vitae orci sed dolor sit amet, consectetur adipiscing elit. Donec
              vitae orci sed
            </p>
          </div>
        </div>
        <div className="place-self-center">
          <Image
            src={ContactsImage}
            className=" rounded-lg object-cover shadow"
            alt="contacts image"
          />
        </div>
      </div>
    </div>
  );
};
