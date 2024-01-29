"use client";

import { RxDoubleArrowRight } from "react-icons/rx";

export const ActiveProjects: React.FC = () => {
  return (
    <div className="flex flex-col content-center p-10 bg-black">
      <div className="container text-4xl text-primary tracking-wider pb-16">
        Active Projects
      </div>
      <div className="flex gap-5">
        <div className="bg-transparent grow flex flex-col p-10 rounded-lg border-2 shadow-md shadow-primary-foreground border-primary-foreground">
          <div className="h-96 bg-gray-800">img</div>
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
        <div className="bg-transparent grow flex flex-col p-10 rounded-lg border-2 shadow-md shadow-primary-foreground border-primary-foreground">
          <div className="h-96 bg-gray-800">img</div>
          <div className="inline-flex justify-between pt-5">
            <div className="text-4xl text-primary">Truck Fleet</div>
            <div className="text-4xl text-primary"> 2024</div>
          </div>
          <div className="inline-flex justify-between items-center">
            <div className="pt-2 text-gray-400 text-xl">Data analytics</div>
            <a
              href=""
              className="inline-flex items-center active:text-primary  hover:text-blue-900 gap-2"
            >
              <span className=" text-lg">Read</span>
              <RxDoubleArrowRight size={24} />
            </a>
          </div>
        </div>
        <div className="bg-transparent grow flex flex-col p-10 rounded-lg border-2 shadow-md shadow-primary-foreground border-primary-foreground">
          <div className="h-96 bg-gray-800">img</div>
          <div className="inline-flex justify-between pt-5">
            <div className="text-4xl text-primary">Taxi Fleet</div>
            <div className="text-4xl text-primary">2023 - 2024</div>
          </div>
          <div className="inline-flex justify-between items-center">
            <div className="pt-2 text-gray-400 text-xl">Data analytics</div>
            <a
              href=""
              className="inline-flex items-center active:text-primary  hover:text-blue-900 gap-2"
            >
              <span className=" text-lg">Read</span>
              <RxDoubleArrowRight size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
