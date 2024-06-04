"use client";

import ContactsImage from "@/public/images/contacts.jpg";
import Image from "next/image";

import copyToCliboard from "@/lib/copyToClipboard";
import { ContactForm } from "./contact-form";

export const Contacts: React.FC = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-primary/20 to-primary/10">
      <div className="container flex h-[90%] flex-col justify-between gap-5 md:flex-row">
        <div className="flex w-full items-center bg-cover md:h-full md:max-h-full md:w-1/2">
          <Image
            src={ContactsImage}
            className="h-full rounded-lg object-cover shadow-xl shadow-background"
            alt="contacts image"
          />
        </div>
        <div className="flex w-full flex-col justify-between md:w-1/2">
          <div className="text-start text-6xl/tight font-thin tracking-wide">
            Contact Form
          </div>
          <div className="px-2 pb-10 pt-5">
            You can reach me either by email at{" "}
            <span
              className="cursor-pointer underline transition-colors hover:text-primary"
              onClick={() => copyToCliboard("niro.dev.01@gmail.com")}
            >
              niro.dev.01@gmail.com
            </span>{" "}
            <br />
            or by using this contact form.
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};
