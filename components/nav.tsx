"use client";

import headerNavLinks from "@/data/headerNavLinks";
import Logo from "@/data/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import MobileNav from "./mobile-nav";
import NavLink from "./ui/nav-link";
import NavSubmenu from "./ui/nav-submenu";

export const Nav: React.FC = () => {
  const page = usePathname();

  return (
    <div className="fixed z-50 w-full bg-black">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
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
          <div className="flex justify-between space-x-8">
            {headerNavLinks.map((link) =>
              link.length == 1 ? (
                <NavLink
                  key={link[0].title}
                  title={link[0].title}
                  href={link[0].href}
                  isActive={page === link[0].href}
                />
              ) : (
                <NavSubmenu
                  key={link[0].title}
                  title={link[0].title}
                  href={link[0].href}
                  isActive={page === link[0].href}
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
