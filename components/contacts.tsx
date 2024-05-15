"use client";

import ContactsImage from "@/public/images/contacts.webp";
import Image from "next/image";

import { ContactForm } from "./contact-form";

export const Contacts: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-between bg-gradient-to-b from-primary/20 to-slate-900 py-24">
      <div className="container flex h-1/2 flex-col justify-between gap-5 md:flex-row">
        <div className="flex  w-full items-center bg-cover md:h-full md:max-h-full md:w-1/2">
          <Image
            src={ContactsImage}
            className="h-full object-cover shadow-lg shadow-white"
            alt="contacts image"
          />
        </div>
        <div className="flex w-full flex-col justify-between p-10 md:w-1/2">
          <div className="space-y-5">
            <div className="text-4xl">
              Do you want to contact <span className="text-primary">me?</span>
            </div>
            <div className="inline-block text-2xl">
              In case if you want to contact me for fun cooperation on some
              project or anything else feel free to contact me using this{" "}
              <span className="text-primary">form</span> or on{" "}
              <span className="text-primary">discord (niro58)</span>
            </div>
          </div>
          <div className="flex h-full items-center justify-center">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
