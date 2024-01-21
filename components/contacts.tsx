import Image from "next/image";
import ContactsImage from "@/public/images/contacts.webp";
import { ContactForm } from "./contact-form";
export const Contacts: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container gap-5 h-1/2 inline-flex justify-betwee">
        <div className="bg-contacts w-1/2 bg-cover items-center flex">
          <Image
            src={ContactsImage}
            className="object-contain h-5/6"
            alt="contacts image"
          />
        </div>
        <div className="p-10 w-1/2 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="text-4xl">
              Do you want to contact <span className="text-blue-400">me?</span>
            </div>
            <div className="text-2xl inline-block">
              In case if you want to contact me for fun cooperation on some
              project or anything else feel free to contact me using this{" "}
              <span className="text-blue-400">form</span> or on{" "}
              <span className="text-blue-400">discord (niro58)</span>
            </div>
          </div>
          <div className="flex justify-center items-center h-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
