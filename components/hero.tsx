import React from "react";

export const Hero: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute bg-hero bg-fixed bg-center backdrop-blur-3x bg-cover w-full h-full -z-10"></div>
      <div className="flex flex-col gap-5">
        <div className="text-center text-8xl tracking-wider font-light">NIRO</div>
        <div className="border-b-blue-400 bg-blue-400 h-0.5" style={{boxShadow: '0 0 10px #60A5FA'}}></div>
        <div className="text-center text-4xl font-extralight tracking-wide">
          Just another{" "}
          <span className="text-blue-400 text-3xl font-light">&#8217;&#8217;</span>
          Developer
          <span className="text-blue-400 text-3xl font-light">&#8217;&#8217;</span>
        </div>
      </div>
    </div>
  );
};
