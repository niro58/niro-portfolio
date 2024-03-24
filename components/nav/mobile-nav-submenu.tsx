import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";

interface MobileNavSubmenuProps {
  title: string;
  subPages: { title: string; href: string }[];
}
const MobileNavSubmenu: React.FC<MobileNavSubmenuProps> = ({
  title,
  subPages
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="z-0 flex flex-col">
      <div
        className={`z-10 inline-flex cursor-pointer items-center ${isOpen ? "text-primary/90" : "text-white"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{title}</div>
        <BsArrowDownCircle
          className="ms-3"
          size={28}
          style={{
            rotate: isOpen ? "180deg" : "",
            transition: "rotate 0.5s"
          }}
        />
      </div>
      <Transition
        show={isOpen}
        className="pb-2 pt-2"
        enter="transition-all ease-out duration-200 transform origin-top"
        enterFrom="opacity-0 scale-y-0"
        enterTo="opacity-100 scale-y-100"
        leave="transition-all ease-in duration-200 transform origin-top"
        leaveFrom="opacity-100 scale-y-100"
        leaveTo="opacity-0 scale-y-0"
      >
        {subPages.map((sublink, index) => (
          <div key={sublink.href}>
            <Link
              href={sublink.href}
              className="sm:block"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="hover:text-primary/90 active:text-primary/70"></div>
              {sublink.title}
            </Link>
          </div>
        ))}
      </Transition>
    </div>
  );
};
export default MobileNavSubmenu;
