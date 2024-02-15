"use client";

import Image from "next/image";
import { RxDoubleArrowRight } from "react-icons/rx";

export const ActiveProjects: React.FC = () => {
  const currentProjects = ["sad", "mad", "re"];
  return (
    <div className="flex flex-col content-center py-24 px-10">
      <div className="text-center w-full text-4xl mb-5 font-thin tracking-wide pt-24">
        <div className="text-4xl font-thin tracking-wide">
          Currently projects that I am working on
        </div>
        <div className="text-xl/relaxed font-normal text-gray-600 tracking-normal">
          All archive/current projects are available in my portfolio
        </div>
      </div>
      <div className="flex gap-8 items-center justify-between">
        {currentProjects.map((project, index) => (
          <div
            key={index}
            className="grow flex flex-col gap-5 ring-primary ring-2 rounded-xl p-5"
          >
            <Image
              src={"/images/about-me.jpg"}
              alt="About me"
              width={300}
              height={200}
              className="rounded-s-none rounded-3xl"
            />
            <div className="inline-flex justify-between pt-5">
              <div className="text-4xl text-primary">VJM Frigotrans</div>
              <div className="text-4xl text-primary"> 2024</div>
            </div>
            <div className="inline-flex justify-between items-center">
              <div className="pt-2 text-gray-400 text-xl">Web development</div>
              <a
                href="project/vjm-frigotrans"
                className="inline-flex items-center active:text-primary  hover:text-blue-900 gap-2"
              >
                <span className=" text-lg">Read</span>
                <RxDoubleArrowRight size={24} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
