"use client";

import { ActiveSkills } from "@/data/active-skills";
import React from "react";

export interface SkillDescription {
  id: string;
  type: string;
  description: string;
  skillLength: string;
  headerIcons: JSX.Element[];
  headerIconsTooltip: string[];
}
export const CurrentStack: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-mountains pb-24 bg-cover space-y-5">
      <div className="text-center w-full text-4xl mb-5 font-thin tracking-wide pt-24">
        <div className="text-4xl font-thin tracking-wide">
          My current learning stack
        </div>
        <div className="text-xl font-normal text-gray-600 tracking-normal">
          All archive/current projects are available in my portfolio
        </div>
      </div>
      <div className="grid grid-rows-2 grid-flow-col gap-5 content-center container">
        {ActiveSkills.map((skill) => (
          <div
            key={skill.id}
            className="flex flex-col h-96 bg-black ring-2 gap-5 ring-blue-300 rounded-tl-xl rounded-sm p-10"
          >
            <div className="inline-flex space-x-5 p-5 justify-center">
              {skill.headerIcons.map((headerIcon, index) =>
                //if headericon is ',' dont clone it
                React.cloneElement(headerIcon, { key: index })
              )}
            </div>
            <div className="w-full border-t-2 border-blue-400"></div>
            <div className="inline-flex justify-between tracking-wider text-2xl text-blue-400">
              <div>{skill.type}</div>
              <div>{skill.skillLength}</div>
            </div>
            <div className="w-full">{skill.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
