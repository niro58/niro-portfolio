"use client";
import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
enum Section {
  About,
  Experience
}

export const AboutMe: React.FC = () => {
  const [section, setSection] = React.useState<Section>(Section.About);
  const activeButton = `
     bg-primary font-bold
  `;

  const [isTransitioning, setIsTransitioning] = useState(false);
  return (
    <div className="relative">
      <Image
        src="/images/about-me.jpg"
        alt="city background"
        fill
        className="object-cover"
      />
      <div className="container flex h-full min-h-screen w-full flex-col items-center justify-center">
        <div className="z-10 flex flex-col items-center rounded-lg bg-gradient-to-b from-background via-background to-background/50 shadow-lg shadow-background ring-4 ring-primary">
          <div className="flex">
            <SectionTransition
              show={section === Section.About && !isTransitioning}
              beforeLeaveCallback={() => setIsTransitioning(true)}
              afterLeaveCallback={() => setIsTransitioning(false)}
              className="h-[40rem] w-full overflow-auto p-0 sm:h-[30rem] sm:w-[25rem] md:w-[30rem]"
            >
              <AboutSection />
            </SectionTransition>
            <SectionTransition
              show={section === Section.Experience && !isTransitioning}
              beforeLeaveCallback={() => setIsTransitioning(true)}
              afterLeaveCallback={() => setIsTransitioning(false)}
              className="h-[50rem] w-full overflow-auto md:h-[42rem] md:w-[40rem]"
            >
              <ExperienceSection />
            </SectionTransition>
          </div>
          <div className="grid w-full grid-cols-2 justify-between border-t text-center text-lg">
            <div
              onClick={() =>
                section !== Section.About && setSection(Section.About)
              }
              className={cn(
                "cursor-pointer py-3 transition-colors hover:bg-primary/75 active:bg-primary/50",
                section === Section.About && activeButton
              )}
            >
              About
            </div>
            <div
              onClick={() =>
                section !== Section.Experience && setSection(Section.Experience)
              }
              className={cn(
                "cursor-pointer py-3 transition-colors hover:bg-primary/75 active:bg-primary/50",
                section === Section.Experience && activeButton
              )}
            >
              Experience
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  show: boolean;
  beforeLeaveCallback: () => void;
  afterLeaveCallback: () => void;
}
const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  className,
  show,
  beforeLeaveCallback,
  afterLeaveCallback
}) => (
  <Transition
    appear={true}
    as="div"
    enter="transition ease-in-out duration-300 transform"
    enterFrom="opacity-0 scale-95"
    enterTo="opacity-100 scale-100"
    leave="transition ease-in-out duration-300 transform"
    leaveFrom="opacity-100 scale-100"
    leaveTo="opacity-0 scale-95"
    show={show}
    className={cn("flex flex-col items-center p-5", className)}
    afterLeave={afterLeaveCallback}
    beforeLeave={beforeLeaveCallback}
  >
    {children}
  </Transition>
);
const AboutSection: React.FC = () => (
  <>
    <div className="relative z-0 flex w-full flex-col items-center">
      <div
        className="absolute top-14 -z-10 h-full w-full bg-cover bg-center blur-[40px]"
        style={{
          //local image public/images/hero/hero-city-background.jpg
          backgroundImage: "url(/images/hero/hero-city-background.jpg)"
        }}
      ></div>
      <Avatar className="mt-5 h-24 w-24">
        <AvatarImage
          src="https://avatars.githubusercontent.com/u/62609303?v=4"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="pt-2 text-center text-xl font-bold">Nichita Roilean</div>
      <div className="grid grid-cols-2 gap-1 px-2 py-1 text-center text-neutral-400 sm:gap-5 sm:px-0">
        <div className="break-all">Full-stack Developer</div>
        <div>Data Analytic</div>
      </div>
    </div>
    <div className="z-10 px-5">
      <div className="self-start py-2 text-xl font-bold text-neutral-400 ">
        About
      </div>
      <div className="text-md leading-relaxed ">
        A 21 year old developer from Prague, Czech Republic that enjoys creating
        software, console apps, . . . Basically everything that sounds fun and
        challenging, enjoying trying out new technologies in each project
      </div>
    </div>
  </>
);

const ExperienceSection: React.FC = () => {
  const data = [
    {
      title: "Naive Newbie Developer",
      company: "High School",
      date: "2018 - 2022",
      description: "Basic web development",
      detailed_link: "https..."
    },
    {
      title: "Unity Developer",
      company: "My projects",
      date: "2020 - 2022",
      description: "Creating games, creative coding, 3D modelling, pixel art",
      detailed_link: "https..."
    },
    {
      title: "Web Development & Creative Coding",
      company: "My projects",
      date: "2024 - Present",
      description: "Back to web dev Next.JS and p5js for creative coding",
      detailed_link: "https..."
    },
    {
      title: "Back-End Development",
      company: "My projects",
      date: "2022 - Present",
      description: "Console apps, databases, APIs ...",
      detailed_link: "https..."
    },
    {
      title: "Full-stack Developer, Data Analytics & Visualization",
      company: "VJM Frigotrans",
      date: "2023 - Present",
      description: "Data gathering, visualization, design, internal software",
      detailed_link: "https..."
    }
  ];
  return (
    <>
      <div className="relative flex max-h-full flex-row items-start justify-between gap-3 self-start text-neutral-300">
        <svg
          width="100px"
          height="100%"
          viewBox="0 0 59 672"
          fill="none"
          className="hidden md:block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_228_7)">
            <line
              x1="49"
              y1="672"
              x2="49"
              y2="560"
              stroke="url(#paint0_linear_228_7)"
              strokeWidth="2"
            />
            <line
              x1="49"
              y1="540"
              x2="49"
              y2="428"
              stroke="url(#paint1_linear_228_7)"
              strokeWidth="2"
            />
            <line
              y1="-1"
              x2="112"
              y2="-1"
              transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 48 408)"
              stroke="url(#paint2_linear_228_7)"
              strokeWidth="2"
            />
            <line
              y1="-1"
              x2="112"
              y2="-1"
              transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 48 276)"
              stroke="url(#paint3_linear_228_7)"
              strokeWidth="2"
            />
            <line
              x1="49"
              y1="144"
              x2="49"
              y2="32"
              stroke="url(#paint4_linear_228_7)"
              strokeWidth="2"
            />
            <circle
              cx="10"
              cy="10"
              r="10"
              transform="matrix(1 0 0 -1 39 560)"
              fill="#DC2626"
            />
            <circle
              cx="10"
              cy="10"
              r="10"
              transform="matrix(1 0 0 -1 39 428)"
              fill="#DC2626"
              fillOpacity="0.75"
            />
            <circle
              cx="10"
              cy="10"
              r="10"
              transform="matrix(1 0 0 -1 39 296)"
              fill="#DC2626"
              fillOpacity="0.5"
            />
            <circle
              cx="10"
              cy="10"
              r="10"
              transform="matrix(1 0 0 -1 39 164)"
              fill="#DC2626"
              fillOpacity="0.2"
            />
            <circle
              cx="10"
              cy="10"
              r="10"
              transform="matrix(1 0 0 -1 39 32)"
              fill="#DC2626"
              fillOpacity="0.2"
            />
            <path
              d="M3.42 12V10.956L6.756 7.788C7.036 7.524 7.244 7.292 7.38 7.092C7.516 6.892 7.604 6.708 7.644 6.54C7.692 6.364 7.716 6.2 7.716 6.048C7.716 5.664 7.584 5.368 7.32 5.16C7.056 4.944 6.668 4.836 6.156 4.836C5.748 4.836 5.376 4.908 5.04 5.052C4.712 5.196 4.428 5.416 4.188 5.712L3.096 4.872C3.424 4.432 3.864 4.092 4.416 3.852C4.976 3.604 5.6 3.48 6.288 3.48C6.896 3.48 7.424 3.58 7.872 3.78C8.328 3.972 8.676 4.248 8.916 4.608C9.164 4.968 9.288 5.396 9.288 5.892C9.288 6.164 9.252 6.436 9.18 6.708C9.108 6.972 8.972 7.252 8.772 7.548C8.572 7.844 8.28 8.176 7.896 8.544L5.028 11.268L4.704 10.68H9.612V12H3.42ZM14.0164 12.12C13.3524 12.12 12.7524 11.952 12.2164 11.616C11.6884 11.28 11.2724 10.792 10.9684 10.152C10.6644 9.504 10.5124 8.72 10.5124 7.8C10.5124 6.88 10.6644 6.1 10.9684 5.46C11.2724 4.812 11.6884 4.32 12.2164 3.984C12.7524 3.648 13.3524 3.48 14.0164 3.48C14.6884 3.48 15.2884 3.648 15.8164 3.984C16.3444 4.32 16.7604 4.812 17.0644 5.46C17.3764 6.1 17.5324 6.88 17.5324 7.8C17.5324 8.72 17.3764 9.504 17.0644 10.152C16.7604 10.792 16.3444 11.28 15.8164 11.616C15.2884 11.952 14.6884 12.12 14.0164 12.12ZM14.0164 10.764C14.4084 10.764 14.7484 10.66 15.0364 10.452C15.3244 10.236 15.5484 9.908 15.7084 9.468C15.8764 9.028 15.9604 8.472 15.9604 7.8C15.9604 7.12 15.8764 6.564 15.7084 6.132C15.5484 5.692 15.3244 5.368 15.0364 5.16C14.7484 4.944 14.4084 4.836 14.0164 4.836C13.6404 4.836 13.3044 4.944 13.0084 5.16C12.7204 5.368 12.4924 5.692 12.3244 6.132C12.1644 6.564 12.0844 7.12 12.0844 7.8C12.0844 8.472 12.1644 9.028 12.3244 9.468C12.4924 9.908 12.7204 10.236 13.0084 10.452C13.3044 10.66 13.6404 10.764 14.0164 10.764ZM19.9189 12V4.2L20.6029 4.908H18.1429V3.6H21.4789V12H19.9189ZM26.5172 12.12C25.8212 12.12 25.2172 12.016 24.7052 11.808C24.1932 11.6 23.7972 11.308 23.5172 10.932C23.2372 10.548 23.0972 10.1 23.0972 9.588C23.0972 9.076 23.2332 8.644 23.5052 8.292C23.7772 7.94 24.1692 7.672 24.6812 7.488C25.1932 7.304 25.8052 7.212 26.5172 7.212C27.2292 7.212 27.8412 7.304 28.3532 7.488C28.8732 7.672 29.2692 7.944 29.5412 8.304C29.8212 8.656 29.9612 9.084 29.9612 9.588C29.9612 10.1 29.8172 10.548 29.5292 10.932C29.2492 11.308 28.8492 11.6 28.3292 11.808C27.8172 12.016 27.2132 12.12 26.5172 12.12ZM26.5172 10.896C27.0932 10.896 27.5492 10.776 27.8852 10.536C28.2212 10.296 28.3892 9.964 28.3892 9.54C28.3892 9.124 28.2212 8.796 27.8852 8.556C27.5492 8.316 27.0932 8.196 26.5172 8.196C25.9412 8.196 25.4892 8.316 25.1612 8.556C24.8332 8.796 24.6692 9.124 24.6692 9.54C24.6692 9.964 24.8332 10.296 25.1612 10.536C25.4892 10.776 25.9412 10.896 26.5172 10.896ZM26.5172 8.028C25.8692 8.028 25.3132 7.944 24.8492 7.776C24.3852 7.6 24.0252 7.348 23.7692 7.02C23.5212 6.684 23.3972 6.284 23.3972 5.82C23.3972 5.34 23.5252 4.928 23.7812 4.584C24.0452 4.232 24.4132 3.96 24.8852 3.768C25.3572 3.576 25.9012 3.48 26.5172 3.48C27.1412 3.48 27.6892 3.576 28.1612 3.768C28.6332 3.96 29.0012 4.232 29.2652 4.584C29.5292 4.928 29.6612 5.34 29.6612 5.82C29.6612 6.284 29.5332 6.684 29.2772 7.02C29.0292 7.348 28.6692 7.6 28.1972 7.776C27.7252 7.944 27.1652 8.028 26.5172 8.028ZM26.5172 7.068C27.0132 7.068 27.4052 6.964 27.6932 6.756C27.9812 6.54 28.1252 6.252 28.1252 5.892C28.1252 5.516 27.9772 5.224 27.6812 5.016C27.3852 4.808 26.9972 4.704 26.5172 4.704C26.0372 4.704 25.6532 4.808 25.3652 5.016C25.0772 5.224 24.9332 5.516 24.9332 5.892C24.9332 6.252 25.0732 6.54 25.3532 6.756C25.6412 6.964 26.0292 7.068 26.5172 7.068Z"
              fill="#D4D4D4"
            />
            <path
              d="M0.42 145V143.956L3.756 140.788C4.036 140.524 4.244 140.292 4.38 140.092C4.516 139.892 4.604 139.708 4.644 139.54C4.692 139.364 4.716 139.2 4.716 139.048C4.716 138.664 4.584 138.368 4.32 138.16C4.056 137.944 3.668 137.836 3.156 137.836C2.748 137.836 2.376 137.908 2.04 138.052C1.712 138.196 1.428 138.416 1.188 138.712L0.096 137.872C0.424 137.432 0.864 137.092 1.416 136.852C1.976 136.604 2.6 136.48 3.288 136.48C3.896 136.48 4.424 136.58 4.872 136.78C5.328 136.972 5.676 137.248 5.916 137.608C6.164 137.968 6.288 138.396 6.288 138.892C6.288 139.164 6.252 139.436 6.18 139.708C6.108 139.972 5.972 140.252 5.772 140.548C5.572 140.844 5.28 141.176 4.896 141.544L2.028 144.268L1.704 143.68H6.612V145H0.42ZM11.0164 145.12C10.3524 145.12 9.75238 144.952 9.21638 144.616C8.68838 144.28 8.27238 143.792 7.96838 143.152C7.66438 142.504 7.51238 141.72 7.51238 140.8C7.51238 139.88 7.66438 139.1 7.96838 138.46C8.27238 137.812 8.68838 137.32 9.21638 136.984C9.75238 136.648 10.3524 136.48 11.0164 136.48C11.6884 136.48 12.2884 136.648 12.8164 136.984C13.3444 137.32 13.7604 137.812 14.0644 138.46C14.3764 139.1 14.5324 139.88 14.5324 140.8C14.5324 141.72 14.3764 142.504 14.0644 143.152C13.7604 143.792 13.3444 144.28 12.8164 144.616C12.2884 144.952 11.6884 145.12 11.0164 145.12ZM11.0164 143.764C11.4084 143.764 11.7484 143.66 12.0364 143.452C12.3244 143.236 12.5484 142.908 12.7084 142.468C12.8764 142.028 12.9604 141.472 12.9604 140.8C12.9604 140.12 12.8764 139.564 12.7084 139.132C12.5484 138.692 12.3244 138.368 12.0364 138.16C11.7484 137.944 11.4084 137.836 11.0164 137.836C10.6404 137.836 10.3044 137.944 10.0084 138.16C9.72038 138.368 9.49238 138.692 9.32438 139.132C9.16438 139.564 9.08438 140.12 9.08438 140.8C9.08438 141.472 9.16438 142.028 9.32438 142.468C9.49238 142.908 9.72038 143.236 10.0084 143.452C10.3044 143.66 10.6404 143.764 11.0164 143.764ZM15.4669 145V143.956L18.8029 140.788C19.0829 140.524 19.2909 140.292 19.4269 140.092C19.5629 139.892 19.6509 139.708 19.6909 139.54C19.7389 139.364 19.7629 139.2 19.7629 139.048C19.7629 138.664 19.6309 138.368 19.3669 138.16C19.1029 137.944 18.7149 137.836 18.2029 137.836C17.7949 137.836 17.4229 137.908 17.0869 138.052C16.7589 138.196 16.4749 138.416 16.2349 138.712L15.1429 137.872C15.4709 137.432 15.9109 137.092 16.4629 136.852C17.0229 136.604 17.6469 136.48 18.3349 136.48C18.9429 136.48 19.4709 136.58 19.9189 136.78C20.3749 136.972 20.7229 137.248 20.9629 137.608C21.2109 137.968 21.3349 138.396 21.3349 138.892C21.3349 139.164 21.2989 139.436 21.2269 139.708C21.1549 139.972 21.0189 140.252 20.8189 140.548C20.6189 140.844 20.3269 141.176 19.9429 141.544L17.0749 144.268L16.7509 143.68H21.6589V145H15.4669ZM23.9033 145V137.2L24.5873 137.908H22.1273V136.6H25.4633V145H23.9033Z"
              fill="#D4D4D4"
            />
            <path
              d="M0.42 278V276.956L3.756 273.788C4.036 273.524 4.244 273.292 4.38 273.092C4.516 272.892 4.604 272.708 4.644 272.54C4.692 272.364 4.716 272.2 4.716 272.048C4.716 271.664 4.584 271.368 4.32 271.16C4.056 270.944 3.668 270.836 3.156 270.836C2.748 270.836 2.376 270.908 2.04 271.052C1.712 271.196 1.428 271.416 1.188 271.712L0.096 270.872C0.424 270.432 0.864 270.092 1.416 269.852C1.976 269.604 2.6 269.48 3.288 269.48C3.896 269.48 4.424 269.58 4.872 269.78C5.328 269.972 5.676 270.248 5.916 270.608C6.164 270.968 6.288 271.396 6.288 271.892C6.288 272.164 6.252 272.436 6.18 272.708C6.108 272.972 5.972 273.252 5.772 273.548C5.572 273.844 5.28 274.176 4.896 274.544L2.028 277.268L1.704 276.68H6.612V278H0.42ZM11.0164 278.12C10.3524 278.12 9.75238 277.952 9.21638 277.616C8.68838 277.28 8.27238 276.792 7.96838 276.152C7.66438 275.504 7.51238 274.72 7.51238 273.8C7.51238 272.88 7.66438 272.1 7.96838 271.46C8.27238 270.812 8.68838 270.32 9.21638 269.984C9.75238 269.648 10.3524 269.48 11.0164 269.48C11.6884 269.48 12.2884 269.648 12.8164 269.984C13.3444 270.32 13.7604 270.812 14.0644 271.46C14.3764 272.1 14.5324 272.88 14.5324 273.8C14.5324 274.72 14.3764 275.504 14.0644 276.152C13.7604 276.792 13.3444 277.28 12.8164 277.616C12.2884 277.952 11.6884 278.12 11.0164 278.12ZM11.0164 276.764C11.4084 276.764 11.7484 276.66 12.0364 276.452C12.3244 276.236 12.5484 275.908 12.7084 275.468C12.8764 275.028 12.9604 274.472 12.9604 273.8C12.9604 273.12 12.8764 272.564 12.7084 272.132C12.5484 271.692 12.3244 271.368 12.0364 271.16C11.7484 270.944 11.4084 270.836 11.0164 270.836C10.6404 270.836 10.3044 270.944 10.0084 271.16C9.72038 271.368 9.49238 271.692 9.32438 272.132C9.16438 272.564 9.08438 273.12 9.08438 273.8C9.08438 274.472 9.16438 275.028 9.32438 275.468C9.49238 275.908 9.72038 276.236 10.0084 276.452C10.3044 276.66 10.6404 276.764 11.0164 276.764ZM15.4669 278V276.956L18.8029 273.788C19.0829 273.524 19.2909 273.292 19.4269 273.092C19.5629 272.892 19.6509 272.708 19.6909 272.54C19.7389 272.364 19.7629 272.2 19.7629 272.048C19.7629 271.664 19.6309 271.368 19.3669 271.16C19.1029 270.944 18.7149 270.836 18.2029 270.836C17.7949 270.836 17.4229 270.908 17.0869 271.052C16.7589 271.196 16.4749 271.416 16.2349 271.712L15.1429 270.872C15.4709 270.432 15.9109 270.092 16.4629 269.852C17.0229 269.604 17.6469 269.48 18.3349 269.48C18.9429 269.48 19.4709 269.58 19.9189 269.78C20.3749 269.972 20.7229 270.248 20.9629 270.608C21.2109 270.968 21.3349 271.396 21.3349 271.892C21.3349 272.164 21.2989 272.436 21.2269 272.708C21.1549 272.972 21.0189 273.252 20.8189 273.548C20.6189 273.844 20.3269 274.176 19.9429 274.544L17.0749 277.268L16.7509 276.68H21.6589V278H15.4669ZM25.1992 278.12C24.6073 278.12 24.0273 278.036 23.4593 277.868C22.8993 277.692 22.4273 277.452 22.0433 277.148L22.7153 275.936C23.0193 276.184 23.3873 276.384 23.8193 276.536C24.2513 276.688 24.7033 276.764 25.1753 276.764C25.7353 276.764 26.1713 276.652 26.4833 276.428C26.7953 276.196 26.9513 275.884 26.9513 275.492C26.9513 275.108 26.8073 274.804 26.5193 274.58C26.2313 274.356 25.7673 274.244 25.1273 274.244H24.3593V273.176L26.7593 270.32L26.9633 270.908H22.4513V269.6H28.1753V270.644L25.7753 273.5L24.9593 273.02H25.4273C26.4593 273.02 27.2313 273.252 27.7433 273.716C28.2633 274.172 28.5233 274.76 28.5233 275.48C28.5233 275.952 28.4033 276.388 28.1633 276.788C27.9233 277.188 27.5553 277.512 27.0593 277.76C26.5713 278 25.9513 278.12 25.1992 278.12Z"
              fill="#D4D4D4"
            />
            <path
              d="M0.42 411V409.956L3.756 406.788C4.036 406.524 4.244 406.292 4.38 406.092C4.516 405.892 4.604 405.708 4.644 405.54C4.692 405.364 4.716 405.2 4.716 405.048C4.716 404.664 4.584 404.368 4.32 404.16C4.056 403.944 3.668 403.836 3.156 403.836C2.748 403.836 2.376 403.908 2.04 404.052C1.712 404.196 1.428 404.416 1.188 404.712L0.096 403.872C0.424 403.432 0.864 403.092 1.416 402.852C1.976 402.604 2.6 402.48 3.288 402.48C3.896 402.48 4.424 402.58 4.872 402.78C5.328 402.972 5.676 403.248 5.916 403.608C6.164 403.968 6.288 404.396 6.288 404.892C6.288 405.164 6.252 405.436 6.18 405.708C6.108 405.972 5.972 406.252 5.772 406.548C5.572 406.844 5.28 407.176 4.896 407.544L2.028 410.268L1.704 409.68H6.612V411H0.42ZM11.0164 411.12C10.3524 411.12 9.75238 410.952 9.21638 410.616C8.68838 410.28 8.27238 409.792 7.96838 409.152C7.66438 408.504 7.51238 407.72 7.51238 406.8C7.51238 405.88 7.66438 405.1 7.96838 404.46C8.27238 403.812 8.68838 403.32 9.21638 402.984C9.75238 402.648 10.3524 402.48 11.0164 402.48C11.6884 402.48 12.2884 402.648 12.8164 402.984C13.3444 403.32 13.7604 403.812 14.0644 404.46C14.3764 405.1 14.5324 405.88 14.5324 406.8C14.5324 407.72 14.3764 408.504 14.0644 409.152C13.7604 409.792 13.3444 410.28 12.8164 410.616C12.2884 410.952 11.6884 411.12 11.0164 411.12ZM11.0164 409.764C11.4084 409.764 11.7484 409.66 12.0364 409.452C12.3244 409.236 12.5484 408.908 12.7084 408.468C12.8764 408.028 12.9604 407.472 12.9604 406.8C12.9604 406.12 12.8764 405.564 12.7084 405.132C12.5484 404.692 12.3244 404.368 12.0364 404.16C11.7484 403.944 11.4084 403.836 11.0164 403.836C10.6404 403.836 10.3044 403.944 10.0084 404.16C9.72038 404.368 9.49238 404.692 9.32438 405.132C9.16438 405.564 9.08438 406.12 9.08438 406.8C9.08438 407.472 9.16438 408.028 9.32438 408.468C9.49238 408.908 9.72038 409.236 10.0084 409.452C10.3044 409.66 10.6404 409.764 11.0164 409.764ZM15.4669 411V409.956L18.8029 406.788C19.0829 406.524 19.2909 406.292 19.4269 406.092C19.5629 405.892 19.6509 405.708 19.6909 405.54C19.7389 405.364 19.7629 405.2 19.7629 405.048C19.7629 404.664 19.6309 404.368 19.3669 404.16C19.1029 403.944 18.7149 403.836 18.2029 403.836C17.7949 403.836 17.4229 403.908 17.0869 404.052C16.7589 404.196 16.4749 404.416 16.2349 404.712L15.1429 403.872C15.4709 403.432 15.9109 403.092 16.4629 402.852C17.0229 402.604 17.6469 402.48 18.3349 402.48C18.9429 402.48 19.4709 402.58 19.9189 402.78C20.3749 402.972 20.7229 403.248 20.9629 403.608C21.2109 403.968 21.3349 404.396 21.3349 404.892C21.3349 405.164 21.2989 405.436 21.2269 405.708C21.1549 405.972 21.0189 406.252 20.8189 406.548C20.6189 406.844 20.3269 407.176 19.9429 407.544L17.0749 410.268L16.7509 409.68H21.6589V411H15.4669ZM25.1992 411.12C24.6073 411.12 24.0273 411.036 23.4593 410.868C22.8993 410.692 22.4273 410.452 22.0433 410.148L22.7153 408.936C23.0193 409.184 23.3873 409.384 23.8193 409.536C24.2513 409.688 24.7033 409.764 25.1753 409.764C25.7353 409.764 26.1713 409.652 26.4833 409.428C26.7953 409.196 26.9513 408.884 26.9513 408.492C26.9513 408.108 26.8073 407.804 26.5193 407.58C26.2313 407.356 25.7673 407.244 25.1273 407.244H24.3593V406.176L26.7593 403.32L26.9633 403.908H22.4513V402.6H28.1753V403.644L25.7753 406.5L24.9593 406.02H25.4273C26.4593 406.02 27.2313 406.252 27.7433 406.716C28.2633 407.172 28.5233 407.76 28.5233 408.48C28.5233 408.952 28.4033 409.388 28.1633 409.788C27.9233 410.188 27.5553 410.512 27.0593 410.76C26.5713 411 25.9513 411.12 25.1992 411.12Z"
              fill="#D4D4D4"
            />
            <path
              d="M0.42 544V542.956L3.756 539.788C4.036 539.524 4.244 539.292 4.38 539.092C4.516 538.892 4.604 538.708 4.644 538.54C4.692 538.364 4.716 538.2 4.716 538.048C4.716 537.664 4.584 537.368 4.32 537.16C4.056 536.944 3.668 536.836 3.156 536.836C2.748 536.836 2.376 536.908 2.04 537.052C1.712 537.196 1.428 537.416 1.188 537.712L0.096 536.872C0.424 536.432 0.864 536.092 1.416 535.852C1.976 535.604 2.6 535.48 3.288 535.48C3.896 535.48 4.424 535.58 4.872 535.78C5.328 535.972 5.676 536.248 5.916 536.608C6.164 536.968 6.288 537.396 6.288 537.892C6.288 538.164 6.252 538.436 6.18 538.708C6.108 538.972 5.972 539.252 5.772 539.548C5.572 539.844 5.28 540.176 4.896 540.544L2.028 543.268L1.704 542.68H6.612V544H0.42ZM11.0164 544.12C10.3524 544.12 9.75238 543.952 9.21638 543.616C8.68838 543.28 8.27238 542.792 7.96838 542.152C7.66438 541.504 7.51238 540.72 7.51238 539.8C7.51238 538.88 7.66438 538.1 7.96838 537.46C8.27238 536.812 8.68838 536.32 9.21638 535.984C9.75238 535.648 10.3524 535.48 11.0164 535.48C11.6884 535.48 12.2884 535.648 12.8164 535.984C13.3444 536.32 13.7604 536.812 14.0644 537.46C14.3764 538.1 14.5324 538.88 14.5324 539.8C14.5324 540.72 14.3764 541.504 14.0644 542.152C13.7604 542.792 13.3444 543.28 12.8164 543.616C12.2884 543.952 11.6884 544.12 11.0164 544.12ZM11.0164 542.764C11.4084 542.764 11.7484 542.66 12.0364 542.452C12.3244 542.236 12.5484 541.908 12.7084 541.468C12.8764 541.028 12.9604 540.472 12.9604 539.8C12.9604 539.12 12.8764 538.564 12.7084 538.132C12.5484 537.692 12.3244 537.368 12.0364 537.16C11.7484 536.944 11.4084 536.836 11.0164 536.836C10.6404 536.836 10.3044 536.944 10.0084 537.16C9.72038 537.368 9.49238 537.692 9.32438 538.132C9.16438 538.564 9.08438 539.12 9.08438 539.8C9.08438 540.472 9.16438 541.028 9.32438 541.468C9.49238 541.908 9.72038 542.236 10.0084 542.452C10.3044 542.66 10.6404 542.764 11.0164 542.764ZM15.4669 544V542.956L18.8029 539.788C19.0829 539.524 19.2909 539.292 19.4269 539.092C19.5629 538.892 19.6509 538.708 19.6909 538.54C19.7389 538.364 19.7629 538.2 19.7629 538.048C19.7629 537.664 19.6309 537.368 19.3669 537.16C19.1029 536.944 18.7149 536.836 18.2029 536.836C17.7949 536.836 17.4229 536.908 17.0869 537.052C16.7589 537.196 16.4749 537.416 16.2349 537.712L15.1429 536.872C15.4709 536.432 15.9109 536.092 16.4629 535.852C17.0229 535.604 17.6469 535.48 18.3349 535.48C18.9429 535.48 19.4709 535.58 19.9189 535.78C20.3749 535.972 20.7229 536.248 20.9629 536.608C21.2109 536.968 21.3349 537.396 21.3349 537.892C21.3349 538.164 21.2989 538.436 21.2269 538.708C21.1549 538.972 21.0189 539.252 20.8189 539.548C20.6189 539.844 20.3269 540.176 19.9429 540.544L17.0749 543.268L16.7509 542.68H21.6589V544H15.4669ZM25.1992 544.12C24.6073 544.12 24.0273 544.036 23.4593 543.868C22.8993 543.692 22.4273 543.452 22.0433 543.148L22.7153 541.936C23.0193 542.184 23.3873 542.384 23.8193 542.536C24.2513 542.688 24.7033 542.764 25.1753 542.764C25.7353 542.764 26.1713 542.652 26.4833 542.428C26.7953 542.196 26.9513 541.884 26.9513 541.492C26.9513 541.108 26.8073 540.804 26.5193 540.58C26.2313 540.356 25.7673 540.244 25.1273 540.244H24.3593V539.176L26.7593 536.32L26.9633 536.908H22.4513V535.6H28.1753V536.644L25.7753 539.5L24.9593 539.02H25.4273C26.4593 539.02 27.2313 539.252 27.7433 539.716C28.2633 540.172 28.5233 540.76 28.5233 541.48C28.5233 541.952 28.4033 542.388 28.1633 542.788C27.9233 543.188 27.5553 543.512 27.0593 543.76C26.5713 544 25.9513 544.12 25.1992 544.12Z"
              fill="#D4D4D4"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_228_7"
              x1="50.5"
              y1="672"
              x2="50.5"
              y2="560"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DC2626" />
              <stop offset="1" stopColor="#DC2626" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_228_7"
              x1="50.5"
              y1="540"
              x2="50.5"
              y2="428"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DC2626" stopOpacity="0.9" />
              <stop offset="1" stopColor="#DC2626" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_228_7"
              x1="0"
              y1="0.5"
              x2="112"
              y2="0.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DC2626" stopOpacity="0.75" />
              <stop offset="1" stopColor="#DC2626" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_228_7"
              x1="0"
              y1="0.5"
              x2="112"
              y2="0.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DC2626" stopOpacity="0.5" />
              <stop offset="1" stopColor="#DC2626" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_228_7"
              x1="50.5"
              y1="144"
              x2="50.5"
              y2="32"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DC2626" stopOpacity="0.2" />
              <stop offset="1" stopColor="#DC2626" stopOpacity="0.2" />
            </linearGradient>
            <clipPath id="clip0_228_7">
              <rect width="59" height="672" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <div className="col-span-2 flex h-full flex-col gap-3 md:grid md:grid-cols-1 md:grid-rows-5 md:gap-0">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col gap-1 text-sm">
              <div className="font-medium">{item.title}</div>
              <div className="flex gap-2 text-xs">
                {item.company} <Separator orientation="vertical" /> {item.date}
              </div>

              <div>{item.description}</div>
              {/* <Link href={item.detailed_link}>
                <Button size="sm" variant="outline">
                  Details
                </Button>
              </Link> */}
              {index !== data.length - 1 && (
                <Separator
                  orientation="horizontal"
                  className="mt-3 block md:hidden"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
