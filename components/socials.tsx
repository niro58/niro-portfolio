"use client";

import { Transition } from "@headlessui/react";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { BsDiscord, BsGithub, BsLinkedin } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

export const Socials: React.FC = () => {
  const { ref, inView, entry } = useInView({
    threshold: 1,
    triggerOnce: false
  });
  function copyToCliboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("Email copied to clipboard");
  }

  return (
    <div
      className="py-2 px-16 sm:px-5 sm:py-6 lg:py-24 bg-gradient-to-b from-primary/10"
      ref={ref}
    >
      <div className="container flex bg-gradient-to-b from-primary/10 justify-center items-center border-2 border-primary border-opacity-20 rounded-lg min-h-44">
        <Transition
          show={inView}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="scale-0"
          enterTo="scale-100"
          leave="transition ease-in-out duration-300 transform"
          className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-6 gap-5 sm:gap-0 w-full items-center"
        >
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="scale-0"
            enterTo="scale-100"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="scale-100"
            leaveTo="scale-0"
            as="a"
            className="gap-0 h-3/4 justify-center place-items-center grid grid-rows-3 items-center hover:bg-primary/10 transition-colors duration-300 active:bg-primary/30 hover:cursor-pointer rounded-md p-5"
          >
            <BsDiscord size={36} />
            <div className="bg-primary h-0.5 w-32"></div>
            <div className="tracking-wider">niro58</div>
          </Transition.Child>
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="scale-0"
            enterTo="scale-100"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="scale-100"
            leaveTo="scale-0"
            as="a"
            href="https://www.linkedin.com/in/nichita-roilean-2b4673241/"
            className="gap-0 h-3/4 justify-center place-items-center grid grid-rows-3 items-center hover:bg-primary/10 transition-colors duration-300 active:bg-primary/30 hover:cursor-pointer rounded-md p-5"
          >
            <BsLinkedin size={28} />{" "}
            <div className="bg-primary h-0.5 w-32"></div>
            <div className="tracking-wider">Nichita Roilean</div>
          </Transition.Child>
          <Transition.Child
            enter="transition ease-in-out duration-300 transform delay-100"
            enterFrom="scale-0"
            enterTo="scale-100"
            leave="transition ease-in-out duration-300 transform delay-100"
            leaveFrom="scale-100"
            leaveTo="scale-0"
            as="a"
            href="https://github.com/niro58"
            className="gap-0 h-3/4 justify-center place-items-center grid grid-rows-3 items-center hover:bg-primary/10 transition-colors duration-300 active:bg-primary/30 hover:cursor-pointer rounded-md p-5"
          >
            <BsGithub size={28} /> <div className="bg-primary h-0.5 w-32"></div>
            <div className="tracking-wider">niro58</div>
          </Transition.Child>
          <Transition.Child
            enter="transition ease-in-out duration-300 transform delay-150"
            enterFrom="scale-0"
            enterTo="scale-100"
            leave="transition ease-in-out duration-300 transform delay-150"
            leaveFrom="scale-100"
            leaveTo="scale-0"
            as="a"
            onClick={(event) => copyToCliboard("niro.dev.01@gmail.com")}
            className="gap-0 h-3/4 justify-center place-items-center grid grid-rows-3 items-center hover:bg-primary/10 transition-colors duration-300 active:bg-primary/30 hover:cursor-pointer rounded-md p-5"
          >
            <EnvelopeIcon height={36} />
            <div className="bg-primary h-0.5 w-32"></div>
            <div className="tracking-wider">niro.dev.01@gmail.com</div>
          </Transition.Child>
          <Transition.Child
            enter="transition ease-in-out duration-300 transform delay-200"
            enterFrom="scale-0"
            enterTo="scale-100"
            leave="transition ease-in-out duration-300 transform delay-200"
            leaveFrom="scale-100"
            leaveTo="scale-0"
            as="a"
            href="https://niro58.itch.io/"
            className="gap-0 h-3/4 justify-center place-items-center grid grid-rows-3 items-center hover:bg-primary/10 transition-colors duration-300 active:bg-primary/30 hover:cursor-pointer rounded-md p-5"
          >
            <svg
              width="36"
              height="32"
              viewBox="0 0 36 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.63755 0.198017C3.08595 1.11929 0.0289938 4.63116 0 5.55215V7.07664C0 9.00908 1.80631 10.7075 3.44634 10.7075C5.4156 10.7075 7.05636 9.07547 7.0565 7.1384C7.0565 9.07547 8.64101 10.7075 10.6104 10.7075C12.58 10.7075 14.1136 9.07547 14.1136 7.1384C14.1136 9.07547 15.7984 10.7075 17.7678 10.7075H17.8035C19.773 10.7075 21.4578 9.07547 21.4578 7.1384C21.4578 9.07547 22.9916 10.7075 24.9609 10.7075C26.9303 10.7075 28.5148 9.07547 28.5148 7.1384C28.5148 9.07547 30.1558 10.7075 32.1249 10.7075C33.765 10.7075 35.5713 9.00937 35.5713 7.07664V5.55215C35.5423 4.63102 32.4853 1.119 30.934 0.198017C26.1115 0.0286939 22.7682 -0.00058983 17.7855 0.000135014C12.8029 0.00056992 6.00997 0.0784182 4.63726 0.198017H4.63755ZM14.0886 9.79742C13.9003 10.1257 13.6671 10.426 13.3957 10.6897C12.6523 11.4166 11.6333 11.8671 10.5099 11.8671C9.42896 11.8682 8.39069 11.4452 7.61811 10.6891C7.34876 10.4253 7.14406 10.1432 6.95662 9.81467L6.95575 9.81525C6.76845 10.1443 6.5075 10.4263 6.23757 10.6904C5.4647 11.4459 4.42654 11.8685 3.34574 11.8676C3.21033 11.8676 3.06942 11.8302 2.95548 11.791C2.79717 13.4396 2.73034 15.0151 2.70671 16.1639L2.70642 16.1704C2.70352 16.7537 2.70062 17.2334 2.69772 17.8999C2.72817 21.3588 2.35516 29.1109 4.2228 31.0156C7.11695 31.6905 12.4425 31.9978 17.7854 31.9997H17.7862C23.1289 31.9978 28.4545 31.6905 31.3486 31.0156C33.2163 29.1107 32.8433 21.3587 32.8737 17.8997C32.8705 17.2334 32.8679 16.7537 32.865 16.1702L32.8646 16.1637C32.8411 15.0147 32.7743 13.4393 32.616 11.7907C32.502 11.8299 32.3612 11.8673 32.2257 11.8673C31.1449 11.8682 30.1067 11.4457 29.3339 10.6901C29.0639 10.426 28.803 10.1442 28.6155 9.81496L28.6147 9.81438C28.4271 10.1429 28.2225 10.4251 27.9532 10.6888C27.1806 11.4448 26.1424 11.8677 25.0615 11.8667C23.9383 11.8667 22.9191 11.4158 22.1757 10.6891C21.9043 10.4254 21.6711 10.1251 21.4828 9.79684C21.2965 10.1247 21.0654 10.425 20.7962 10.6891C20.0234 11.4451 18.9851 11.8679 17.9041 11.8668C17.8649 11.8668 17.8258 11.8651 17.7867 11.8639H17.7856C17.7465 11.8651 17.7074 11.8668 17.6678 11.8668C16.5868 11.8679 15.5484 11.4452 14.7757 10.6893C14.5064 10.4252 14.2754 10.1249 14.0891 9.79698L14.0886 9.79742ZM11.1188 13.6376L11.1185 13.6391H11.1207C12.2968 13.6416 13.3416 13.6391 14.6362 15.052C15.655 14.9451 16.7197 14.8918 17.7852 14.8934H17.7861C18.8516 14.8919 19.9163 14.9451 20.9352 15.052C22.2298 13.6389 23.2746 13.6414 24.4507 13.6391H24.4528L24.4525 13.6376C25.0081 13.6376 27.2309 13.6376 28.7798 17.9877L30.4434 23.9554C31.6763 28.3949 30.0487 28.5035 28.0186 28.5074C25.0078 28.3953 23.3408 26.2089 23.3408 24.0228C21.6743 24.2959 19.7301 24.4325 17.7859 24.4326H17.7851C15.8407 24.4326 13.8966 24.2959 12.2301 24.0228C12.2301 26.2089 10.563 28.3953 7.55244 28.5074C5.5223 28.5035 3.89488 28.395 5.12769 23.9554L6.79179 17.9879C8.34064 13.6378 10.5634 13.6378 11.1191 13.6378L11.1188 13.6376ZM17.7852 17.0563V17.0572C17.7823 17.0601 14.6158 19.9681 14.0465 21.0025L16.1201 20.9194V22.7278C16.1201 22.8124 16.9522 22.7779 17.7852 22.7394H17.7861C18.6188 22.7779 19.451 22.8124 19.451 22.7278V20.9194L21.5247 21.0025C20.9552 19.9681 17.7859 17.0572 17.7859 17.0572V17.0563L17.7855 17.0566L17.7852 17.0563Z"
                fill="#ffffff"
              />
              <clipPath id="clip0_101_4">
                <rect width="35.5711" height="32" fill="white" />
              </clipPath>
            </svg>

            <div className="bg-primary h-0.5 w-32"></div>
            <div className="tracking-wider">niro58</div>
          </Transition.Child>
          <Transition.Child
            enter="transition ease-in-out duration-300 transform delay-250"
            enterFrom="scale-0"
            enterTo="scale-100"
            leave="transition ease-in-out duration-300 transform delay-250"
            leaveFrom="scale-100"
            leaveTo="scale-0"
            as="a"
            href="https://leetcode.com/user0863D/"
            className="gap-0 h-3/4 justify-center place-items-center grid grid-rows-3 items-center hover:bg-primary/10 transition-colors duration-300 active:bg-primary/30 hover:cursor-pointer rounded-md p-5"
          >
            <svg
              width="28"
              height="32"
              viewBox="0 0 28 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_101_7)">
                <path
                  d="M19.6055 23.947C20.3244 23.2292 21.4881 23.2311 22.2047 23.9512C22.9213 24.6714 22.9194 25.8371 22.2005 26.555L19.0082 29.7427C16.0631 32.6835 11.2606 32.7261 8.26578 29.8415C8.24846 29.8251 6.91495 28.5175 2.5158 24.2038C-0.410852 21.3341 -0.702418 16.7423 2.05164 13.7935L7.18655 8.2953C9.9199 5.36843 14.9585 5.04851 18.0836 7.57585L22.7474 11.3476C23.5372 11.9863 23.6605 13.1455 23.0229 13.9366C22.3853 14.7278 21.2281 14.8514 20.4384 14.2127L15.7747 10.441C14.1402 9.11923 11.2812 9.30077 9.87086 10.8109L4.73587 16.3092C3.39512 17.7447 3.54198 20.0573 5.08706 21.5723C8.31745 24.74 10.8071 27.1811 10.81 27.1839C12.3669 28.6835 14.8845 28.6611 16.4132 27.1346L19.6055 23.947Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.8506 20.7572C10.8356 20.7572 10.0127 19.9329 10.0127 18.9161C10.0127 17.8993 10.8356 17.075 11.8506 17.075H25.4053C26.4203 17.075 27.2432 17.8993 27.2432 18.9161C27.2432 19.9329 26.4203 20.7572 25.4053 20.7572H11.8506Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.389 0.583308C15.0825 -0.159227 16.2456 -0.198023 16.9868 0.496654C17.728 1.19133 17.7668 2.35643 17.0733 3.09896L4.73593 16.3093C3.39515 17.7447 3.54198 20.0573 5.08697 21.5724L10.7846 27.1594C11.5099 27.8707 11.5223 29.0364 10.8123 29.7629C10.1022 30.4897 8.93859 30.5021 8.21323 29.7908L2.51562 24.2037C-0.410854 21.3339 -0.702417 16.7421 2.05176 13.7935L14.389 0.583308Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_101_7">
                  <rect width="27.3874" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <div className="bg-primary h-0.5 w-32"></div>
            <div className="tracking-wider">niro58</div>
          </Transition.Child>
        </Transition>
      </div>
    </div>
  );
};
