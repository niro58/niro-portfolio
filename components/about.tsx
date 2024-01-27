import Image from "next/image";

import { Separator } from "./ui/separator";

export const About: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-between p-24 bg-gradient-to-b from-gray-950 to-black">
      <div className="relative container flex flex-row justify-between ">
        <div>
          <Image
            src={"/images/about-me.webp"}
            className="object-cover h-full shadow-lg shadow-white"
            width={600}
            height={600}
            alt="about"
          />
        </div>
        <div className="w-1/2 p-9">
          <div>1</div>
          <Separator className="my-4" orientation="horizontal" />
          <div>2</div>
          <Separator className="my-4" orientation="horizontal" />
          <div>3</div>
          <Separator className="my-4" orientation="horizontal" />
          <div>4</div>
        </div>
      </div>
    </div>
  );
};
