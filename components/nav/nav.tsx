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
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full text-foreground bg-background">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="py-4">
            <Link href="/">
              <div className="">
                <div className="mr-3"></div>
                <Image
                  src={Logo}
                  alt="Logo"
                  className="p-3"
                  height={75}
                  priority
                />
              </div>
            </Link>
          </div>
          <div className="justify-between z-0 hidden md:gap-3 md:flex">
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
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
