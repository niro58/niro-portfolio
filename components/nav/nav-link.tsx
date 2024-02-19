import Link from "next/link";
import { useState } from "react";
interface NavLinkProps {
  title: string;
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ title, href }) => {
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
      className="text-white m-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-0 sm:flex hidden items-center px-2 lg:px-4 py-1">
        <div
          className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-transparent to-primary duration-500"
          style={{ scale: isOpen ? 1 : 0.9, opacity: isOpen ? 0.5 : 0 }}
        ></div>
        <div
          className="circle mr-2 h-2 w-2 origin-center rounded-full bg-primary opacity-0 duration-500"
          style={{ scale: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
        ></div>

        <span>{title}</span>
      </div>
    </Link>
  );
};

export default NavLink;
