import React from "react";

export const Hero: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute bg-hero bg-fixed bg-center bg-cover animate-pulse-slow w-full h-full -z-10"></div>
      <div className="flex flex-col gap-5">
        <div className="text-center text-7xl font-light">NIRO</div>
        <div className="border-b-blue-400 border-b-2"></div>
        <div className="text-center text-2xl font-light">
          Just another{" "}
          <span className="text-blue-400 text-3xl">&#8217;&#8217;</span>
          Developer
          <span className="text-blue-400 text-3xl">&#8217;&#8217;</span>
        </div>
      </div>
    </div>
  );
};
