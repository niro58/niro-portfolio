"use client";

import { ActiveSkills } from "@/data/active-skills";
import React from "react";
export interface SkillDescription {
  type: string;
  description: string;
  skillLength: string;
  headerIcons: JSX.Element[];
  headerIconsTooltip: string[];
}
const Background = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={1888}
    height={1560}
    className="absolute -z-0"
  >
    <g clipPath="url(#a)">
      <mask
        id="b"
        width={1920}
        height={1920}
        x={0}
        y={-360}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha"
        }}
      >
        <path
          fill="#D9D9D9"
          fillRule="evenodd"
          d="M1617 1257v303h-1v-303h-100v303h-1v-303h-100v303h-1v-303h-100v303h-1v-303h-100v303h-1v-303h-100v303h-1v-303h-100v303h-1v-303H910v303h-1v-303H809v303h-1v-303H708v303h-1v-303H607v303h-1v-303H506v303h-1v-303H405v303h-1v-303H304v303h-1v-303H0v-1h303v-100H0v-1h303v-100H0v-1h303V954H0v-1h303V853H0v-1h303V752H0v-1h303V651H0v-1h303V550H0v-1h303V449H0v-1h303V348H0v-1h303V247H0v-1h303V146H0v-1h303V45H0v-1h303V-56H0v-1h303v-303h1v303h100v-303h1v303h100v-303h1v303h100v-303h1v303h100v-303h1v303h100v-303h1v303h100v-303h1v303h100v-303h1v303h100v-303h1v303h100v-303h1v303h100v-303h1v303h100v-303h1v303h100v-303h1v303h100v-303h1v303h303v1h-303V44h303v1h-303v100h303v1h-303v100h303v1h-303v100h303v1h-303v100h303v1h-303v100h303v1h-303v100h303v1h-303v100h303v1h-303v100h303v1h-303v100h303v1h-303v100h303v1h-303v100h303v1h-303v100h303v1h-303Zm-1-1v-100h-100v100h100Zm-101 0v-100h-100v100h100Zm-101 0v-100h-100v100h100Zm-101 0v-100h-100v100h100Zm-101 0v-100h-100v100h100Zm-101 0v-100h-100v100h100Zm-101 0v-100H910v100h100Zm-101 0v-100H809v100h100Zm-101 0v-100H708v100h100Zm-101 0v-100H607v100h100Zm-101 0v-100H506v100h100Zm-101 0v-100H405v100h100Zm-101 0v-100H304v100h100Zm-100-101h100v-100H304v100Zm0-101h100V954H304v100Zm0-101h100V853H304v100Zm0-101h100V752H304v100Zm0-101h100V651H304v100Zm0-101h100V550H304v100Zm0-101h100V449H304v100Zm0-101h100V348H304v100Zm0-101h100V247H304v100Zm0-101h100V146H304v100Zm0-101h100V45H304v100Zm0-101h100V-56H304V44ZM405-56V44h100V-56H405Zm101 0V44h100V-56H506Zm101 0V44h100V-56H607Zm101 0V44h100V-56H708Zm101 0V44h100V-56H809Zm101 0V44h100V-56H910Zm101 0V44h100V-56h-100Zm101 0V44h100V-56h-100Zm101 0V44h100V-56h-100Zm101 0V44h100V-56h-100Zm101 0V44h100V-56h-100Zm101 0V44h100V-56h-100Zm100 101h-100v100h100V45Zm0 101h-100v100h100V146Zm0 101h-100v100h100V247Zm0 101h-100v100h100V348Zm0 101h-100v100h100V449Zm0 101h-100v100h100V550Zm0 101h-100v100h100V651Zm0 101h-100v100h100V752Zm0 101h-100v100h100V853Zm0 101h-100v100h100V954Zm0 101h-100v100h100v-100Zm-101 100v-100h-100v100h100Zm-101 0v-100h-100v100h100Zm-101 0v-100h-100v100h100Zm-101 0v-100h-100v100h100Zm-101 0v-100h-100v100h100Zm-101 0v-100H910v100h100Zm-101 0v-100H809v100h100Zm-101 0v-100H708v100h100Zm-101 0v-100H607v100h100Zm-101 0v-100H506v100h100Zm-101 0v-100H405v100h100Zm-100-101h100V954H405v100Zm0-101h100V853H405v100Zm0-101h100V752H405v100Zm0-101h100V651H405v100Zm0-101h100V550H405v100Zm0-101h100V449H405v100Zm0-101h100V348H405v100Zm0-101h100V247H405v100Zm0-101h100V146H405v100Zm0-101h100V45H405v100ZM506 45v100h100V45H506Zm101 0v100h100V45H607Zm101 0v100h100V45H708Zm101 0v100h100V45H809Zm101 0v100h100V45H910Zm101 0v100h100V45h-100Zm101 0v100h100V45h-100Zm101 0v100h100V45h-100Zm101 0v100h100V45h-100Zm101 0v100h100V45h-100Zm100 101h-100v100h100V146Zm0 101h-100v100h100V247Zm0 101h-100v100h100V348Zm0 101h-100v100h100V449Zm0 101h-100v100h100V550Zm0 101h-100v100h100V651Zm0 101h-100v100h100V752Zm0 101h-100v100h100V853Zm0 101h-100v100h100V954Zm-101 100V954h-100v100h100Zm-101 0V954h-100v100h100Zm-101 0V954h-100v100h100Zm-101 0V954h-100v100h100Zm-101 0V954H910v100h100Zm-101 0V954H809v100h100Zm-101 0V954H708v100h100Zm-101 0V954H607v100h100Zm-101 0V954H506v100h100ZM506 953h100V853H506v100Zm0-101h100V752H506v100Zm0-101h100V651H506v100Zm0-101h100V550H506v100Zm0-101h100V449H506v100Zm0-101h100V348H506v100Zm0-101h100V247H506v100Zm0-101h100V146H506v100Zm101-100v100h100V146H607Zm101 0v100h100V146H708Zm101 0v100h100V146H809Zm101 0v100h100V146H910Zm101 0v100h100V146h-100Zm101 0v100h100V146h-100Zm101 0v100h100V146h-100Zm101 0v100h100V146h-100Zm100 101h-100v100h100V247Zm0 101h-100v100h100V348Zm0 101h-100v100h100V449Zm0 101h-100v100h100V550Zm0 101h-100v100h100V651Zm0 101h-100v100h100V752Zm0 101h-100v100h100V853Zm-101 100V853h-100v100h100Zm-101 0V853h-100v100h100Zm-101 0V853h-100v100h100Zm-101 0V853H910v100h100Zm-101 0V853H809v100h100Zm-101 0V853H708v100h100Zm-101 0V853H607v100h100ZM607 852h100V752H607v100Zm0-101h100V651H607v100Zm0-101h100V550H607v100Zm0-101h100V449H607v100Zm0-101h100V348H607v100Zm0-101h100V247H607v100Zm101-100v100h100V247H708Zm101 0v100h100V247H809Zm101 0v100h100V247H910Zm101 0v100h100V247h-100Zm101 0v100h100V247h-100Zm101 0v100h100V247h-100Zm100 101h-100v100h100V348Zm0 101h-100v100h100V449Zm0 101h-100v100h100V550Zm0 101h-100v100h100V651Zm0 101h-100v100h100V752Zm-101 100V752h-100v100h100Zm-101 0V752h-100v100h100Zm-101 0V752H910v100h100Zm-101 0V752H809v100h100Zm-101 0V752H708v100h100ZM708 751h100V651H708v100Zm0-101h100V550H708v100Zm0-101h100V449H708v100Zm0-101h100V348H708v100Zm101-100v100h100V348H809Zm101 0v100h100V348H910Zm101 0v100h100V348h-100Zm101 0v100h100V348h-100Zm100 101h-100v100h100V449Zm0 101h-100v100h100V550Zm0 101h-100v100h100V651Zm-101 100V651h-100v100h100Zm-101 0V651H910v100h100Zm-101 0V651H809v100h100ZM809 650h100V550H809v100Zm0-101h100V449H809v100Zm101-100v100h100V449H910Zm101 0v100h100V449h-100Zm100 101h-100v100h100V550Zm-101 100V550H910v100h100Z"
          clipRule="evenodd"
        />
      </mask>
      <g mask="url(#b)">
        <g filter="url(#c)">
          <path
            fill="#DC2626"
            d="M1212 270c-35.9 0-65-10.521-65-23.5s29.1-23.5 65-23.5 65 10.521 65 23.5-29.1 23.5-65 23.5Z"
          />
        </g>
        <g filter="url(#d)">
          <path
            fill="#DC2626"
            d="M1212 257c-35.9 0-65-5.149-65-11.5s29.1-11.5 65-11.5 65 5.149 65 11.5-29.1 11.5-65 11.5Z"
          />
        </g>
        <g filter="url(#e)">
          <path
            fill="#DC2626"
            d="M505 472c-35.899 0-65-10.521-65-23.5s29.101-23.5 65-23.5 65 10.521 65 23.5-29.101 23.5-65 23.5Z"
          />
        </g>
        <g filter="url(#f)">
          <path
            fill="#DC2626"
            d="M505 459c-35.899 0-65-5.149-65-11.5s29.101-11.5 65-11.5 65 5.149 65 11.5-29.101 11.5-65 11.5Z"
          />
        </g>
        <g filter="url(#g)">
          <path
            fill="#DC2626"
            d="M606 674c-35.899 0-65-10.521-65-23.5s29.101-23.5 65-23.5 65 10.521 65 23.5-29.101 23.5-65 23.5Z"
          />
        </g>
        <g filter="url(#h)">
          <path
            fill="#DC2626"
            d="M606 661c-35.899 0-65-5.149-65-11.5s29.101-11.5 65-11.5 65 5.149 65 11.5-29.101 11.5-65 11.5Z"
          />
        </g>
        <g filter="url(#i)">
          <path
            fill="#DC2626"
            d="M1414 774c-35.9 0-65-10.521-65-23.5s29.1-23.5 65-23.5 65 10.521 65 23.5-29.1 23.5-65 23.5Z"
          />
        </g>
        <g filter="url(#j)">
          <path
            fill="#DC2626"
            d="M1414 761c-35.9 0-65-5.149-65-11.5s29.1-11.5 65-11.5 65 5.149 65 11.5-29.1 11.5-65 11.5Z"
          />
        </g>
        <g filter="url(#k)">
          <path
            fill="#DC2626"
            d="M908 774c-35.899 0-65-10.521-65-23.5s29.101-23.5 65-23.5 65 10.521 65 23.5-29.101 23.5-65 23.5Z"
          />
        </g>
        <g filter="url(#l)">
          <path
            fill="#DC2626"
            d="M908 761c-35.899 0-65-5.149-65-11.5s29.101-11.5 65-11.5 65 5.149 65 11.5-29.101 11.5-65 11.5Z"
          />
        </g>
        <g filter="url(#m)">
          <path
            fill="#DC2626"
            d="M1416 977c-35.9 0-65-10.521-65-23.5s29.1-23.5 65-23.5 65 10.521 65 23.5-29.1 23.5-65 23.5Z"
          />
        </g>
        <g filter="url(#n)">
          <path
            fill="#DC2626"
            d="M1416 964c-35.9 0-65-5.149-65-11.5s29.1-11.5 65-11.5 65 5.149 65 11.5-29.1 11.5-65 11.5Z"
          />
        </g>
      </g>
      <path fill="url(#o)" d="M1112 246h100v1h-100v-1Z" />
      <path fill="url(#p)" d="M405 448h100v1H405v-1Z" />
      <path fill="url(#q)" d="M1314 751h100v1h-100v-1Z" />
      <path fill="url(#r)" d="M506 650h100v1H506v-1Z" />
      <path
        fill="#DC2626"
        d="M1211 246.5a1.5 1.5 0 1 1 2.999-.001 1.5 1.5 0 0 1-2.999.001ZM1413 751.5a1.5 1.5 0 1 1 2.999-.001 1.5 1.5 0 0 1-2.999.001Z"
      />
      <path fill="url(#s)" d="M1314 953h100v1h-100v-1Z" />
      <path
        fill="#DC2626"
        d="M1413 953.5a1.5 1.5 0 1 1 2.999-.001 1.5 1.5 0 0 1-2.999.001Z"
      />
      <path fill="url(#t)" d="M809 751h100v1H809v-1Z" />
      <path
        fill="#DC2626"
        d="M908 751.5a1.5 1.5 0 1 1 3.001.001A1.5 1.5 0 0 1 908 751.5ZM605 650.5a1.5 1.5 0 1 1 3.001.001A1.5 1.5 0 0 1 605 650.5ZM504 448.5a1.5 1.5 0 1 1 3.001.001A1.5 1.5 0 0 1 504 448.5Z"
      />
    </g>
    <defs>
      <filter
        id="c"
        width={330}
        height={247}
        x={1047}
        y={123}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_251_4"
          stdDeviation={50}
        />
      </filter>
      <filter
        id="d"
        width={250}
        height={143}
        x={1087}
        y={174}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_251_4"
          stdDeviation={30}
        />
      </filter>
      <filter
        id="e"
        width={330}
        height={247}
        x={340}
        y={325}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_251_4"
          stdDeviation={50}
        />
      </filter>
      <filter
        id="f"
        width={250}
        height={143}
        x={380}
        y={376}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_251_4"
          stdDeviation={30}
        />
      </filter>
      <filter
        id="g"
        width={330}
        height={247}
        x={441}
        y={527}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_251_4"
          stdDeviation={50}
        />
      </filter>
      <filter
        id="h"
        width={250}
        height={143}
        x={481}
        y={578}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_251_4"
          stdDeviation={30}
        />
      </filter>
      <filter
        id="i"
        width={330}
        height={247}
        x={1249}
        y={627}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_251_4"
          stdDeviation={50}
        />
      </filter>
      <filter
        id="j"
        width={250}
        height={143}
        x={1289}
        y={678}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_251_4"
          stdDeviation={30}
        />
      </filter>
      <filter
        id="k"
        width={330}
        height={247}
        x={743}
        y={627}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_251_4"
          stdDeviation={50}
        />
      </filter>
      <filter
        id="l"
        width={250}
        height={143}
        x={783}
        y={678}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_251_4"
          stdDeviation={30}
        />
      </filter>
      <filter
        id="m"
        width={330}
        height={247}
        x={1251}
        y={830}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_251_4"
          stdDeviation={50}
        />
      </filter>
      <filter
        id="n"
        width={250}
        height={143}
        x={1291}
        y={881}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_251_4"
          stdDeviation={30}
        />
      </filter>
      <linearGradient
        id="o"
        x1={1212}
        x2={1112}
        y1={246.5}
        y2={246.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DC2626" />
        <stop offset={1} stopColor="#DC2626" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="p"
        x1={505}
        x2={405}
        y1={448.5}
        y2={448.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DC2626" />
        <stop offset={1} stopColor="#DC2626" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="q"
        x1={1414}
        x2={1314}
        y1={751.5}
        y2={751.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DC2626" />
        <stop offset={1} stopColor="#DC2626" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="r"
        x1={606}
        x2={506}
        y1={650.5}
        y2={650.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DC2626" />
        <stop offset={1} stopColor="#DC2626" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="s"
        x1={1414}
        x2={1314}
        y1={953.5}
        y2={953.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DC2626" />
        <stop offset={1} stopColor="#DC2626" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="t"
        x1={909}
        x2={809}
        y1={751.5}
        y2={751.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DC2626" />
        <stop offset={1} stopColor="#DC2626" stopOpacity={0} />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h1888v1560H0z" />
      </clipPath>
    </defs>
  </svg>
);
export const CurrentStack: React.FC = () => {
  const roundedSides = [
    "rounded-bl-xl row-span-2",
    "rounded-tl-xl",
    "rounded-tr-xl"
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
        <div className="grid grid-cols-2 grid-rows-3 gap-5 pb-12 pt-12">
          {ActiveSkills.map((skill, index) => (
            <div
              key={index}
              className={`flex flex-col gap-5 bg-background/50 ring-2 ring-primary ${roundedSides[index]} rounded-sm p-10`}
            >
              <div className="inline-flex justify-center space-x-5 p-5">
                {skill.headerIcons.map((headerIcon, index) =>
                  React.cloneElement(headerIcon, { key: index })
                )}
              </div>
              <div className="w-full border-t-2 border-primary"></div>
              <div className="inline-flex justify-between text-2xl tracking-wider text-primary">
                <div>{skill.type}</div>
                <div>{skill.skillLength}</div>
              </div>
              <div className="text-md/relaxed w-full text-neutral-200">
                {skill.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
