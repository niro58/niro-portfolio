"use client";

import headerNavLinks from "@/data/headerNavLinks";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";

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
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="sm:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8 text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`fixed left-0 top-0 z-10 h-full w-full transform bg-white opacity-95 duration-300 ease-in-out dark:bg-blue-800 dark:opacity-[0.98] ${
          navShow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            className="mr-5 mt-5 h-8 w-8"
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
        <nav className="fixed mt-8 h-full">
          {headerNavLinks.map((link) =>
            link.length == 1 ? (
              <div key={link[0].title} className="px-12 py-4">
                <Link
                  href={link[0].href}
                  className="tracking-widest text-2xl font-bold text-gray-900 dark:text-gray-100"
                  onClick={onToggleNav}
                >
                  {link[0].title}
                </Link>
              </div>
            ) : (
              <div key={link[0].title} className="px-12 py-4">
                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-start rounded-l text-left text-sm font-medium ">
                        <span className="tracking-widest text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {link[0].title}
                        </span>
                        <ChevronUpIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-8 w-8 text-white`}
                        />
                      </Disclosure.Button>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        {link.slice(1).map((sublink) => (
                          <Disclosure.Panel
                            key={sublink.title}
                            className="tracking-widest text-white-900 px-4 pb-2 pt-4 text-2xl font-bold dark:text-gray-100"
                          >
                            <div className="px-1 py-1">
                              <Link href={sublink.href}>{sublink.title}</Link>
                            </div>
                          </Disclosure.Panel>
                        ))}
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </div>
            )
          )}
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
