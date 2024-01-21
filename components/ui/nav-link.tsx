"use client";

import Link from "next/link";
import { useState } from "react";

interface NavLinkProps {
  title: string;
  href: string;
  isActive: boolean;
}
const NavLink: React.FC<NavLinkProps> = ({ title, href, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMouseEnter = () => {
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <Link
      href={href}
      className="text-white"
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      <div className="relative z-0 hidden items-center px-4 py-1 sm:flex">
        <div
          className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-transparent to-blue-400 opacity-0"
          style={{
            opacity: isOpen || isActive ? 0.2 : 0,
            transition: "opacity 0.5s",
          }}
        ></div>
        <div
          className="circle mr-2 h-2 w-2 origin-center rounded-full bg-blue-400"
          style={{
            scale: isOpen || isActive ? 1 : 0,
            transition: "scale 0.5s",
          }}
        ></div>
        <div className="text-base">{title}</div>
      </div>
    </Link>
  );
};
export default NavLink;
