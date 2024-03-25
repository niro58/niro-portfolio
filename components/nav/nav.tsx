"use client";

import { ScrollContext } from "@/lib/scroll-observer";
import PersonalLogo from "@/public/icons/logo";
import Link from "next/link";
import React, { useContext } from "react";

import header_components from "@/data/header-components";
import MobileNav from "./mobile-nav";
import NavLink from "./nav-link";
import NavSubmenu from "./nav-submenu";

const Navbar: React.FC = () => {
  const { scrollY } = useContext(ScrollContext);
  console.log(typeof PersonalLogo);
  return (
    <div className="fixed left-0 right-0 top-0 z-50 w-full text-foreground">
      <div className="w-full">
        <div className="flex items-center justify-between ps-10 pt-5 ">
          {/* Logo */}
          <div
            className={`${
              scrollY > 400
                ? "pointer-events-none h-0 border-0"
                : "h-24 border py-4 lg:h-32"
            } flex w-24 items-center justify-center  rounded-full border-background bg-background transition-all duration-300 hover:border-primary hover:bg-primary/20 hover:shadow-lg lg:w-32`}
          >
            <Link href="/" className="p-4 lg:p-8">
              <PersonalLogo
                className={`${
                  scrollY > 400 ? "scale-0" : "scale-1"
                } transition-all duration-300`}
              />
            </Link>
          </div>
          <div
            className={`rounded-s-xl transition-colors duration-500 ${
              scrollY > 400 ? "md:bg-background/50" : "md:bg-background"
            }`}
          >
            <div className="z-0 hidden pe-8 md:grid md:grid-cols-5 md:justify-items-end md:gap-7 md:py-3">
              {header_components.map((link) =>
                link.subPages == undefined ? (
                  <NavLink
                    key={link.title}
                    title={link.title}
                    href={link.href}
                  />
                ) : (
                  <NavSubmenu
                    key={link.title}
                    title={link.title}
                    subPages={link.subPages}
                  />
                )
              )}
            </div>
          </div>
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
