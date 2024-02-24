"use client";

import headerNavLinks from "@/data/headerNavLinks";
import Logo from "@/data/logo.svg";
import { ScrollContext } from "@/lib/scroll-observer";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

import MobileNav from "./mobile-nav";
import NavLink from "./nav-link";
import NavSubmenu from "./nav-submenu";

const Navbar: React.FC = () => {
  const { scrollY } = useContext(ScrollContext);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full text-foreground">
      <div className="w-full">
        <div className="flex items-center justify-between ps-10 pt-5 pe-16 ">
          {/* Logo */}
          <div
            className={`${scrollY > 400 ? "w-36 h-0" : "py-4 w-36 h-36"} transition-all duration-500 flex items-center justify-center rounded-full bg-background`}
          >
            <Link href="/" className="p-8">
              <Image
                src={Logo}
                alt="Logo"
                className={`${scrollY > 400 ? "scale-0" : "scale-1"} transition-all duration-300`}
                height={125}
                priority
              />
            </Link>
          </div>
          <div
            className={`rounded-s-xl transition-colors duration-500 ${scrollY > 400 ? "md:bg-background/50" : "md:bg-background"}`}
          >
            <div className="pe-8 z-0 hidden md:gap-7 md:justify-items-end md:grid md:grid-cols-5 md:py-3">
              {headerNavLinks.map((link) =>
                link.length == 1 ? (
                  <NavLink
                    key={link[0].title}
                    title={link[0].title}
                    href={link[0].href}
                  />
                ) : (
                  <NavSubmenu
                    key={link[0].title}
                    title={link[0].title}
                    subMenuTitles={link.slice(1)}
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
