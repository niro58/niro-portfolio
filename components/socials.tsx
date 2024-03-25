"use client";

import Leetcode from "@/public/icons/leetcode";
import copyToCliboard from "@/utils/copyToClipboard";
import Link from "next/link";
import React from "react";
import { BsDiscord, BsEnvelope, BsGithub, BsLinkedin } from "react-icons/bs";
import { FaItchIo } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { useInView } from "react-intersection-observer";
import { Separator } from "./ui/separator";
const components: {
  username: string;
  logo: IconType;
  href?: string;
  onClick?: (arg: string) => void;
}[] = [
  { username: "niro58", logo: BsDiscord, href: "niro58" },
  {
    username: "niro.dev@gmail.com",
    logo: BsEnvelope,
    onClick: (username) => {
      copyToCliboard(username);
    }
  },

  {
    username: "niro58",
    logo: BsGithub,
    href: "https://github.com/niro58"
  },
  {
    username: "Nichita Roilean",
    logo: BsLinkedin,
    href: "https://www.linkedin.com/in/nichita-roilean-2b4673241/"
  },
  {
    username: "niro58",
    logo: Leetcode,
    href: "https://leetcode.com/user0863D/"
  },
  {
    username: "niro58",
    logo: FaItchIo,
    href: "https://niro58.itch.io/"
  }
];

export const Socials: React.FC = () => {
  const { ref, inView, entry } = useInView({
    threshold: 1,
    triggerOnce: false
  });

  return (
    <div
      className="bg-gradient-to-b from-primary/10 px-16 py-2 sm:px-5 sm:py-6 lg:py-24"
      ref={ref}
    >
      <div className="container grid min-h-44 w-full grid-flow-col gap-5 rounded-lg border-2 border-primary border-opacity-20 bg-gradient-to-b from-primary/10 p-8">
        {components.map((component, index) => {
          const IconComponent = component.logo;
          return (
            <Link
              key={index}
              href={component.href || ""}
              target={component.href ? "_blank" : ""}
              onClick={() =>
                component.onClick && component.onClick(component.username || "")
              }
              className="grid h-full w-full grid-flow-row grid-rows-5 items-center rounded-lg border border-primary bg-primary/10 p-5 transition-all duration-300 ease-in-out hover:border-primary/20 hover:bg-primary/20"
            >
              <div className="row-span-2 flex items-center justify-center">
                <IconComponent className=" h-12 w-12 text-white hover:text-red-500" />
              </div>

              <Separator
                orientation="horizontal"
                className="border-red bg-primary"
              />
              <div className="row-span-2 text-center">{component.username}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
