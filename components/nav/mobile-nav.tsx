"use client";

import { Transition } from "@headlessui/react";
import { useState } from "react";

import header_components from "@/data/header-components";
import MobileNavLink from "./mobile-nav-link";
import MobileNavSubmenu from "./mobile-nav-submenu";

const MobileNav: React.FC = () => {
  const [navShow, setNavShow] = useState(false);
  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <>
      <Transition
        show={!navShow}
        as="div"
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="pe-5 md:hidden"
        onClick={onToggleNav}
        aria-label="Toggle Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-14 w-14 rounded-full bg-black p-3 text-primary"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </Transition>
      <Transition
        show={navShow}
        as="div"
        enter="transition-transform duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="fixed left-0 top-0 z-10 h-full w-full transform bg-gradient-to-tr from-black/90 to-primary-foreground/90 duration-300 ease-in-out"
      >
        <div className="flex justify-end">
          <button
            className="mr-8 mt-8 h-8 w-8"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="container fixed mt-8 grid grid-cols-1 gap-5 text-4xl font-bold tracking-widest">
          {header_components.map((link) =>
            link.subPages === undefined ? (
              <MobileNavLink
                key={link.title}
                title={link.title}
                href={link.href}
                setClosedNav={onToggleNav}
              />
            ) : (
              <MobileNavSubmenu
                key={link.title}
                title={link.title}
                subPages={link.subPages}
              />
            )
          )}
        </nav>
      </Transition>
    </>
  );
};

export default MobileNav;
