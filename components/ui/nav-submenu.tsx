import { Transition } from "@headlessui/react";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { RxPlus, RxStretchHorizontally } from "react-icons/rx";

interface SubMenuOption {
  title: string;
  href: string;
}
interface NavSubmenuProps {
  title: string;
  href: string;
  isActive: boolean;
  subMenuTitles: SubMenuOption[];
}
const NavSubmenu: React.FC<NavSubmenuProps> = ({
  title,
  href,
  isActive,
  subMenuTitles,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1);
  return (
    <div className="relative">
      <div className="relative hidden text-left text-base sm:block">
        <div
          className="relative  z-0 hidden items-center px-4 py-1 sm:flex"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="inline-flex items-center z-10">
            <div className="text-base">{title}</div>
            <RxPlus
              className="ms-3"
              size={21}
              style={{
                rotate: isOpen ? "135deg" : "",

                transition: "rotate 0.5s",
              }}
            />
          </div>
          <Transition
            show={isOpen}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-20 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 h-32 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 h-0 sm:translate-y-0 sm:scale-95"
            className="absolute inset-0 z-0 h-28 rounded-lg shadow-lg ring-1 ring-gray-700"
          >
            <div className="absolute inset-0 -z-10 h-full rounded-lg bg-gradient-to-t from-transparent to-blue-400 " />
            <div
              className="relative mt-8 origin-center text-center
                          text-white"
            >
              <div className="px-1 py-1 text-center">
                {subMenuTitles.map((sublink, index) => (
                  <div key={sublink.href}>
                    <Link
                      href={sublink.href}
                      className="sm:block"
                      onMouseEnter={() => setSelectedOption(index)}
                      onMouseLeave={() => setSelectedOption(-1)}
                      style={{
                        position: "relative",
                        bottom: isOpen ? 0 : "-1 rem",
                        transition: "all 0.5s",
                        opacity:
                          selectedOption === index || selectedOption === -1
                            ? 1
                            : 0.5,
                      }}
                    >
                      <div className="mb-2 mt-2"></div>
                      {sublink.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
};
export default NavSubmenu;
