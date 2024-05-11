"use client";

import { ScrollContext } from "@/lib/scroll-observer";
import PersonalLogo from "@/public/icons/logo";
import Link from "next/link";
import React, { useContext } from "react";

import header_components from "@/data/header-components";
import { BsDiscord, BsGithub, BsLinkedin } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { Separator } from "../ui/separator";
import MobileNav from "./mobile-nav";
import NavLink from "./nav-link";
import NavSubmenu from "./nav-submenu";
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
        <div
          className={`${
            scrollY > 400
              ? "h-24 -translate-y-0 lg:h-24"
              : "h-0 -translate-y-96"
          } flex w-24 items-center justify-center rounded-full border border-background bg-background transition-all duration-500 hover:border-primary hover:bg-primary/20 hover:shadow-lg lg:w-24`}
        >
          <Link href="/" className="p-4 lg:p-8">
            <PersonalLogo
              className={`
            h-12 w-12 opacity-100 transition-all duration-500 lg:h-12 lg:w-12
            `}
            />
          </Link>
        </div>
      </div>
      <MobileNav />
      <div
        className={`absolute hidden w-full flex-col  gap-5 transition-all duration-1000 md:flex xl:w-auto ${scrollY > 400 ? "left-auto right-0 translate-x-0 transform items-end" : "left-1/2 -translate-x-1/2 transform items-center"}`}
      >
        <div
          className={`rounded-br-xl rounded-tl-xl border-y transition-colors duration-500 ${
            scrollY > 400
              ? "border-y-primary/50 text-xl md:bg-background/50 "
              : "border-y-primary/75 text-2xl font-normal md:bg-background "
          }`}
        >
          <div className="grid pe-8 md:grid-cols-5 md:justify-items-end md:gap-7 md:py-3">
            {header_components.map((link) =>
              link.subPages == undefined ? (
                <NavLink key={link.title} title={link.title} href={link.href} />
              ) : (
                <NavSubmenu
                  key={link.title}
                  title={link.title}
                  subPages={link.subPages}
                  size={scrollY > 400 ? "small" : "large"}
                />
              )
            )}
          </div>
        </div>
        <div
          className={`flex flex-row gap-8 rounded-xl p-5 ${
            scrollY > 400
              ? "pe-16 md:bg-background/50"
              : "gap-8 md:bg-background"
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
                <div
                  className={`flex items-center justify-center ${
                    index < socials.length - 1 ? "pe-8" : ""
                  }`}
                >
                  <IconComponent
                    className={`text-white transition-transform hover:-translate-y-1 hover:translate-x-1 hover:text-primary
                        ${scrollY > 400 ? "h-8 w-8" : "h-12 w-12"}
                      `}
                  />
                </div>
                {index < socials.length - 1 && scrollY < 400 && (
                  <Separator orientation="vertical" className="h-12" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
