"use client";

import { ScrollContext } from "@/lib/scroll-observer";
import PersonalLogo from "@/public/icons/logo";
import Link from "next/link";
import React, { useContext } from "react";

import header_components from "@/data/header-components";
import { Transition } from "@headlessui/react";
import { BsDiscord, BsGithub, BsLinkedin } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import MobileNav from "./mobile-nav";
import NavLink from "./nav-link";
export const socials: {
  username: string;
  logo: IconType;
  href?: string;
  onClick?: (arg: string) => void;
}[] = [
  { username: "niro58", logo: BsDiscord, href: "niro58" },

  {
    username: "niro58",
    logo: BsGithub,
    href: "https://github.com/niro58"
  },
  {
    username: "Nichita Roilean",
    logo: BsLinkedin,
    href: "https://www.linkedin.com/in/nichita-roilean-2b4673241/"
  }
];

const Navbar: React.FC = () => {
  const { scrollY } = useContext(ScrollContext);
  return (
    <div className="fixed z-50 w-full pt-5">
      {/* Logo */}
      <div className="absolute ps-12">
        <Link href="/">
          <Transition
            show={scrollY > 400}
            as="div"
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="flex h-24 w-24 items-center justify-center rounded-full bg-background hover:bg-background/50"
          >
            <PersonalLogo
              className={`
            h-12 w-12 opacity-100 transition-all duration-500 lg:h-12 lg:w-12
            `}
            />
          </Transition>
        </Link>
      </div>
      <MobileNav />
      <div
        className={`absolute right-0 hidden w-full transform flex-col items-end gap-5 transition-all duration-1000 md:flex xl:w-auto`}
      >
        <div
          className={`rounded-br-xl rounded-tl-xl border-y transition-all duration-500 ${
            scrollY > 400
              ? "border-y-primary/50 bg-background/50 text-base "
              : "border-y-primary/75 bg-background text-xl font-normal "
          }`}
        >
          <div className="flex flex-row justify-center gap-7 py-2 pe-8">
            {header_components.map((link) => (
              <NavLink key={link.title} title={link.title} href={link.href} />
            ))}
          </div>
        </div>
        <div
          className={`flex flex-row rounded-xl p-5 transition-all ${
            scrollY > 400 ? "gap-8 bg-background/50" : "gap-12 bg-background"
          }`}
        >
          {socials.map((component, index) => {
            const IconComponent = component.logo;
            return (
              <Link
                href={component.href || ""}
                key={index}
                className="flex flex-row"
              >
                <IconComponent
                  className={`text-white transition-all hover:-translate-y-1 hover:translate-x-1 hover:text-primary
                        ${scrollY > 400 ? "h-8 w-8" : "h-12 w-12"}
                      `}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
