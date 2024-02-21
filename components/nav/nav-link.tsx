import Link from "next/link";
import { useState } from "react";
import { BsFillCircleFill } from "react-icons/bs";

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-0 sm:flex hidden items-center px-2 lg:px-4 py-1 gap-2">
        <div
          className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-transparent to-primary duration-500"
          style={{ scale: isOpen ? 0.9 : 0, opacity: isOpen ? 0.5 : 0 }}
        ></div>
        <BsFillCircleFill
          className="origin-center rounded-full text-primary duration-500"
          size={9}
          style={{ scale: isOpen ? 0.9 : 0, opacity: isOpen ? 1 : 0 }}
        />

        <span className="text-base/relaxed">{title}</span>
      </div>
    </Link>
  );
};

export default NavLink;
