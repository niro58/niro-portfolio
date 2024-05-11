import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { RxPlus } from "react-icons/rx";
import { Separator } from "../ui/separator";
type Size = "small" | "large" | string;

interface NavSubmenuProps {
  title: string;
  subPages: { title: string; href: string }[];
  size?: Size;
}
const NavSubmenu: React.FC<NavSubmenuProps> = ({ title, subPages, size }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1);

  return (
    <>
      <div className="hidden sm:block">
        <div
          className="relative z-0 hidden items-center px-2 py-1 sm:flex lg:px-4"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="z-10 inline-flex items-center justify-center">
            <div>{title}</div>
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
            className={`absolute inset-0 rounded-lg pt-10 ring-2 ring-primary/10 ${size == "small" ? "h-16" : "h-32"}`}
            enter="transition-all ease-out duration-800 transform origin-top"
            enterFrom="opacity-0 scale-y-0"
            enterTo="opacity-100 scale-y-100"
            leave="transition-all ease-in duration-200 transform origin-top"
            leaveFrom="opacity-100 scale-y-100"
            leaveTo="opacity-0 scale-y-0"
          >
            <Separator
              orientation="horizontal"
              className={`bg-primary ${size == "small" ? "my-2" : "my-3"}`}
            />
            <div className="absolute inset-0 -z-10 h-full rounded-lg bg-gradient-to-br from-transparent via-primary to-primary duration-500 " />
            <div
              className={`z-10 origin-center text-start ${size == "small" ? "px-2" : "px-3"}`}
            >
              <div className="flex flex-col gap-1">
                {subPages.map((sublink, index) => (
                  <div key={sublink.href}>
                    <Link
                      href={sublink.href}
                      className={`relative transition-all duration-500 sm:block
                        ${isOpen ? "bottom-0" : "bottom-4"}
                        ${
                          selectedOption === index || selectedOption === -1
                            ? "opacity-100"
                            : "opacity-50"
                        }
                      `}
                      onMouseEnter={() => setSelectedOption(index)}
                      onMouseLeave={() => setSelectedOption(-1)}
                    >
                      <span>{sublink.title}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};
export default NavSubmenu;
