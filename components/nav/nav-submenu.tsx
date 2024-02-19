import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { RxPlus } from "react-icons/rx";
interface SubMenuOption {
  title: string;
  href: string;
}
interface NavSubmenuProps {
  title: string;
  subMenuTitles: SubMenuOption[];
}
const NavSubmenu: React.FC<NavSubmenuProps> = ({ title, subMenuTitles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1);

  return (
    <div className="relative">
      <div className="relative hidden sm:block">
        <div
          className="relative z-0 hidden items-center px-2 lg:px-4 py-1 sm:flex"
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
            className="absolute inset-0 h-28 rounded-lg ring-2 ring-primary/10"
            enter="transition-all ease-out duration-200 transform origin-top"
            enterFrom="opacity-0 scale-y-0"
            enterTo="opacity-100 scale-y-100"
            leave="transition-all ease-in duration-200 transform origin-top"
            leaveFrom="opacity-100 scale-y-100"
            leaveTo="opacity-0 scale-y-0"
          >
            <div className="absolute inset-0 -z-10 scale-y- h-full rounded-lg bg-gradient-to-br from-transparent to-primary duration-500 opacity-40 " />
            <div className="relative mt-8 origin-center text-center text-white">
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
