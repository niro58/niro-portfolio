"use client";

import ContactsImage from "@/public/images/contacts.webp";
import Image from "next/image";

import { ContactForm } from "./contact-form";

export const Contacts: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-between bg-gradient-to-b from-primary/20 to-primary/10 py-24">
      <div className="container flex h-1/2 flex-col justify-between gap-5 md:flex-row">
        <div className="flex  w-full items-center bg-cover md:h-full md:max-h-full md:w-1/2">
          <Image
            src={ContactsImage}
            className="h-full rounded-lg object-cover shadow-lg"
            alt="contacts image"
          />
        </div>
        <div className="flex w-full flex-col justify-between md:w-1/2">
          <div className="space-y-5">
            <div className="py-16 text-start text-6xl/tight font-thin tracking-wide">
              Contact Form
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
