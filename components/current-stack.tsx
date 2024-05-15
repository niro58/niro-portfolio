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
function Background() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="none"
      className="absolute left-0 top-0 z-0 object-cover"
    >
      <g clipPath="url(#a)">
        <g filter="url(#b)">
          <path
            stroke="#DC2626"
            strokeWidth={16}
            d="M2140 653c-94.5 141.5-464.6-53.274-724-187.5-159.16-82.36-197.11-286.182-375-264.5-229.721 27.998-5.6 595.756-231.5 545.5-186.303-41.447-10.931-391.75-193-449-229.513-72.169-125.904 419.446-350 507-205.652 80.348-557.5-94-557.5-94"
          />
        </g>
        <g filter="url(#c)">
          <path
            stroke="#DC2626"
            strokeWidth={5}
            d="M2311 1008.6c-94.5 141.5-464.6-53.27-724-187.496-159.16-82.359-197.11-286.181-375-264.5-229.721 27.999-5.6 595.756-231.5 545.496-186.303-41.44-10.931-391.745-193-448.996-229.513-72.168-125.904 419.446-350 506.996-205.652 80.35-557.5-94-557.5-94"
          />
        </g>
        <g filter="url(#d)">
          <path
            stroke="#DC2626"
            strokeWidth={5}
            d="M-1101 172.661c94.5-141.5 464.603 53.274 724 187.5 159.164 82.36 197.106 286.182 375 264.5 229.721-27.998 5.602-595.756 231.5-545.5 186.303 41.448 10.931 391.75 193 449 229.513 72.169 125.904-419.445 350-507 205.652-80.348 557.5 94 557.5 94"
          />
        </g>
      </g>
      <defs>
        <filter
          id="b"
          width={2951.2}
          height={1152.27}
          x={-549.545}
          y={-63.606}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_245_7"
            stdDeviation={127.5}
          />
        </filter>
        <filter
          id="c"
          width={2944.18}
          height={1141.27}
          x={-376.105}
          y={297.499}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_245_7"
            stdDeviation={127.5}
          />
        </filter>
        <filter
          id="d"
          width={2944.18}
          height={1141.27}
          x={-1358.08}
          y={-257.5}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_245_7"
            stdDeviation={127.5}
          />
        </filter>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h1920v1080H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
export const CurrentStack: React.FC = () => {
  const roundedSides = [
    "rounded-tl-xl col-span-3",
    "rounded-bl-xl col-span-2",
    "rounded-tr-xl col-span-2",
    "rounded-br-xl col-span-3"
  ];
  return (
    <div className="relative -z-20 min-h-screen bg-gradient-to-t from-slate-900 to-background">
      <Background />
      <div className="container z-10 py-24">
        <div className="mb-5 w-full text-start text-4xl font-thin tracking-wide">
          <div className="text-start text-6xl/tight font-thin tracking-wide">
            My current learning stack
          </div>
          <div className="text-start text-2xl/relaxed font-bold tracking-normal text-neutral-400">
            All archive/current projects are available in my portfolio
          </div>
        </div>
        <div className="grid grid-cols-5 grid-rows-2 gap-5 pb-12 pt-12">
          {ActiveSkills.map((skill, index) => (
            <div
              key={skill.id}
              className={`flex flex-col gap-5 bg-background/50 ring-2 ring-primary ${roundedSides[index]} rounded-sm p-10`}
            >
              <div className="inline-flex justify-center space-x-5 p-5">
                {skill.headerIcons.map((headerIcon, index) =>
                  //if headericon is ',' dont clone it
                  React.cloneElement(headerIcon, { key: index })
                )}
              </div>
              <div className="w-full border-t-2 border-primary"></div>
              <div className="inline-flex justify-between text-2xl tracking-wider text-primary">
                <div>{skill.type}</div>
                <div>{skill.skillLength}</div>
              </div>
              <div className="w-full">{skill.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
