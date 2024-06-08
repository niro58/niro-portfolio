"use client";

import ContactsImage from "@/public/images/contacts.jpg";
import Image from "next/image";

import copyToCliboard from "@/lib/copyToClipboard";
import Link from "next/link";

export const Contacts: React.FC = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-primary/20 to-primary/10">
      <div className="container flex h-[90%] w-full flex-col gap-5 md:flex-row">
        <div className="flex w-full items-center bg-cover md:h-full md:max-h-full md:w-1/2">
          <Image
            src={ContactsImage}
            className="h-full rounded-lg object-cover shadow-xl shadow-background"
            alt="contacts image"
          />
        </div>
        <div className="flex flex-col justify-between space-y-4 rounded-lg bg-primary/20 px-6 py-6 text-2xl text-neutral-200 shadow-xl md:w-1/2">
          <div>
            <h2 className="text-5xl font-thin">Get in touch</h2>
            <p className="pt-4 text-neutral-300">
              I&apos;m always open to discussing interesting topics or collaborating
              on new projects. If you&apos;re interested, feel free to reach out to
              me anytime.
            </p>
          </div>
          <div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-semibold">Social Media</h3>
              <div className="flex flex-col gap-5 sm:flex-row">
                <div>
                  {" "}
                  <Link
                    href="/"
                    className="underline transition-colors hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      copyToCliboard("Niro58");
                    }}
                  >
                    Discord
                  </Link>
                </div>
                <Link
                  href="https://www.linkedin.com/in/nichita-roilean-2b4673241/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-words underline transition-colors hover:text-primary"
                >
                  Linkedin
                </Link>
              </div>
            </div>
            <div className="flex flex-col space-y-2 pt-4">
              <h3 className="text-xl font-semibold">Email</h3>
              <span
                className="cursor-pointer break-words underline transition-colors hover:text-primary"
                onClick={() => copyToCliboard("niro.dev.01@gmail.com")}
              >
                niro.dev.01@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
