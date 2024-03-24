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
      <div className="relative z-0 hidden items-center gap-2 px-2 py-1 sm:flex lg:px-4">
        <div
          className={`absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-transparent to-primary duration-500
                      ${isOpen ? "scale-90 opacity-50" : "scale-50 opacity-0"}
                      `}
        ></div>
        <BsFillCircleFill
          className={`origin-center rounded-full text-primary duration-500 ${isOpen ? "scale-90 opacity-100" : "scale-50 opacity-0"}`}
          size={9}
        />

        <span className="text-base/relaxed">{title}</span>
      </div>
    </Link>
  );
};

export default NavLink;
