"use client";

import { ActiveSkills } from "@/data/active-skills";
import Link from "next/link";
import React from "react";

import { Button } from "./ui/button";

export interface SkillDescription {
  id: string;
  type: string;
  description: string;
  skillLength: string;
  headerIcons: JSX.Element[];
  headerIconsTooltip: string[];
}
export const CurrentStack: React.FC = () => {
  const roundedSides = [
    "rounded-tl-xl col-span-3",
    "rounded-bl-xl col-span-2",
    "rounded-tr-xl col-span-2",
    "rounded-br-xl col-span-3"
  ];
  return (
    <div className="min-h-screen container space-y-5">
      <div className="text-center w-full text-4xl mb-5 font-thin tracking-wide pt-24">
        <div className="text-4xl font-thin tracking-wide">
          My current learning stack
        </div>
        <div className="text-xl/relaxed font-normal text-gray-600 tracking-normal">
          All archive/current projects are available in my portfolio
        </div>
        <Button variant="outline">
          <Link href="/history-stack/">View history stack</Link>
        </Button>
      </div>
      <div className="grid grid-rows-2 grid-cols-5 gap-5">
        {ActiveSkills.map((skill, index) => (
          <div
            key={skill.id}
            className={`flex flex-col ring-2 gap-5 ring-primary ${roundedSides[index]} rounded-sm p-10`}
          >
            <div className="inline-flex space-x-5 p-5 justify-center">
              {skill.headerIcons.map((headerIcon, index) =>
                //if headericon is ',' dont clone it
                React.cloneElement(headerIcon, { key: index })
              )}
            </div>
            <div className="w-full border-t-2 border-primary"></div>
            <div className="inline-flex justify-between tracking-wider text-2xl text-primary">
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
