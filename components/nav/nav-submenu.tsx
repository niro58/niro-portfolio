import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { RxPlus } from "react-icons/rx";

interface NavSubmenuProps {
  title: string;
  subPages: { title: string; href: string }[];
}
const NavSubmenu: React.FC<NavSubmenuProps> = ({ title, subPages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1);

  return (
    <div className="relative">
      <div className="relative hidden sm:block">
        <div
          className="relative z-0 hidden items-center px-2 py-1 sm:flex lg:px-4"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="z-10 inline-flex items-center justify-center">
            <div className="text-base/relaxed">{title}</div>
            <RxPlus
              className="ms-3"
              size={21}
              style={{
                rotate: isOpen ? "135deg" : "",
                transition: "rotate 0.5s"
              }}
            />
          </div>
          <Transition
            show={isOpen}
            className="absolute inset-0 h-28 rounded-lg ring-2 ring-primary/10"
            enter="transition-all ease-out duration-800 transform origin-top"
            enterFrom="opacity-0 scale-y-0"
            enterTo="opacity-100 scale-y-100"
            leave="transition-all ease-in duration-200 transform origin-top"
            leaveFrom="opacity-100 scale-y-100"
            leaveTo="opacity-0 scale-y-0"
          >
            <div className="scale-y- absolute inset-0 -z-10 h-full rounded-lg bg-gradient-to-br from-transparent to-primary opacity-40 duration-500 " />
            <div className="relative mt-8 origin-center text-center">
              <div className="px-1 py-1">
                {subPages.map((sublink, index) => (
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
                            : 0.5
                      }}
                    >
                      <div className="mb-2 mt-2"></div>
                      <span className="text-base/relaxed">{sublink.title}</span>
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
