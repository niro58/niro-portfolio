import { SkillDescription } from "@/components/skills";
import { v4 as uuidv4 } from "uuid";
import { FaReact } from "react-icons/fa";

export const ActiveSkills: SkillDescription[] = [
  {
    id: uuidv4(),
    type: "Web",
    description:
      "Basically started in the start of 2024, I have done some web dev earlier in high school(PHP, JS) and at work(Symfony, JS). Decided to choose this because I have done some React Native earlier and it seemed like the most suiting mix for me",
    skillLength: "2024",
    headerIconsTooltip: ["Next.JS", "React", "Typescript", "Tailwind"],
    headerIcons: [
      <svg
        width="100"
        height="32"
        viewBox="0 0 394 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M261.919 0.0330722H330.547V12.7H303.323V79.339H289.71V12.7H261.919V0.0330722Z"
          fill="white"
        />
        <path
          d="M149.052 0.0330722V12.7H94.0421V33.0772H138.281V45.7441H94.0421V66.6721H149.052V79.339H80.43V12.7H80.4243V0.0330722H149.052Z"
          fill="white"
        />
        <path
          d="M183.32 0.0661486H165.506L229.312 79.3721H247.178L215.271 39.7464L247.127 0.126654L229.312 0.154184L206.352 28.6697L183.32 0.0661486Z"
          fill="white"
        />
        <path
          d="M201.6 56.7148L192.679 45.6229L165.455 79.4326H183.32L201.6 56.7148Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M80.907 79.339L17.0151 0H0V79.3059H13.6121V16.9516L63.8067 79.339H80.907Z"
          fill="white"
        />
        <path
          d="M333.607 78.8546C332.61 78.8546 331.762 78.5093 331.052 77.8186C330.342 77.1279 329.991 76.2917 330 75.3011C329.991 74.3377 330.342 73.5106 331.052 72.8199C331.762 72.1292 332.61 71.7838 333.607 71.7838C334.566 71.7838 335.405 72.1292 336.115 72.8199C336.835 73.5106 337.194 74.3377 337.204 75.3011C337.194 75.9554 337.028 76.5552 336.696 77.0914C336.355 77.6368 335.922 78.064 335.377 78.373C334.842 78.6911 334.252 78.8546 333.607 78.8546Z"
          fill="white"
        />
        <path
          d="M356.84 45.4453H362.872V68.6846C362.863 70.8204 362.401 72.6472 361.498 74.1832C360.585 75.7191 359.321 76.8914 357.698 77.7185C356.084 78.5364 354.193 78.9546 352.044 78.9546C350.079 78.9546 348.318 78.6001 346.75 77.9094C345.182 77.2187 343.937 76.1826 343.024 74.8193C342.101 73.456 341.649 71.7565 341.649 69.7207H347.691C347.7 70.6114 347.903 71.3838 348.29 72.0291C348.677 72.6744 349.212 73.1651 349.895 73.5105C350.586 73.8559 351.38 74.0286 352.274 74.0286C353.243 74.0286 354.073 73.8286 354.746 73.4196C355.419 73.0197 355.936 72.4199 356.296 71.6201C356.646 70.8295 356.831 69.8479 356.84 68.6846V45.4453Z"
          fill="white"
        />
        <path
          d="M387.691 54.5338C387.544 53.1251 386.898 52.0254 385.773 51.2438C384.638 50.4531 383.172 50.0623 381.373 50.0623C380.11 50.0623 379.022 50.2532 378.118 50.6258C377.214 51.0075 376.513 51.5164 376.033 52.1617C375.554 52.807 375.314 53.5432 375.295 54.3703C375.295 55.061 375.461 55.6608 375.784 56.1607C376.107 56.6696 376.54 57.0968 377.103 57.4422C377.656 57.7966 378.274 58.0874 378.948 58.3237C379.63 58.56 380.313 58.76 380.995 58.9236L384.14 59.6961C385.404 59.9869 386.631 60.3778 387.802 60.8776C388.973 61.3684 390.034 61.9955 390.965 62.7498C391.897 63.5042 392.635 64.413 393.179 65.4764C393.723 66.5397 394 67.7848 394 69.2208C394 71.1566 393.502 72.8562 392.496 74.3285C391.491 75.7917 390.043 76.9369 388.143 77.764C386.252 78.582 383.965 79 381.272 79C378.671 79 376.402 78.6002 374.493 77.8004C372.575 77.0097 371.08 75.8463 370.001 74.3194C368.922 72.7926 368.341 70.9294 368.258 68.7391H374.235C374.318 69.8842 374.687 70.8386 375.314 71.6111C375.95 72.3745 376.78 72.938 377.795 73.3197C378.819 73.6923 379.962 73.8832 381.226 73.8832C382.545 73.8832 383.707 73.6832 384.712 73.2924C385.708 72.9016 386.492 72.3564 387.055 71.6475C387.627 70.9476 387.913 70.1206 387.922 69.1754C387.913 68.312 387.654 67.5939 387.156 67.0304C386.649 66.467 385.948 65.9944 385.053 65.6127C384.15 65.231 383.098 64.8856 381.899 64.5857L378.081 63.6223C375.323 62.9225 373.137 61.8592 371.541 60.4323C369.937 59.0054 369.143 57.115 369.143 54.7429C369.143 52.798 369.678 51.0894 370.758 49.6261C371.827 48.1629 373.294 47.0268 375.148 46.2179C377.011 45.4 379.114 45 381.456 45C383.836 45 385.92 45.4 387.719 46.2179C389.517 47.0268 390.929 48.1538 391.952 49.5897C392.976 51.0257 393.511 52.6707 393.539 54.5338H387.691Z"
          fill="white"
        />
      </svg>,

      <FaReact size={32} />,
      <svg
        fill="none"
        height="32"
        viewBox="0 0 512 512"
        width="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="#ffffff" height="512" rx="50" width="512" />
        <rect fill="#ffffff" height="512" rx="50" width="512" />
        <path
          clipRule="evenodd"
          d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z"
          fill="#000000"
          fillRule="evenodd"
        />
      </svg>,
      <svg
        width="53"
        height="32"
        viewBox="0 0 53 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.3401 0C19.3156 0 14.9265 3.4911 13.1695 10.4733C15.8039 6.98219 18.8769 5.67329 22.3886 6.54555C24.3923 7.0431 25.825 8.48826 27.4095 10.0883C29.9923 12.6937 32.9817 15.7089 39.5097 15.7089C46.5332 15.7089 50.9234 12.2178 52.6792 5.23664C50.0459 8.72774 46.9729 10.0366 43.4612 9.16335C41.4565 8.66581 40.0237 7.22065 38.4392 5.62168C35.8565 3.01419 32.8681 0 26.3401 0ZM13.1695 15.7089C6.14606 15.7089 1.75587 19.2 0 26.1822C2.63432 22.6911 5.70735 21.3822 9.21806 22.2545C11.2227 22.752 12.6555 24.1972 14.24 25.7972C16.8227 28.4026 19.8111 31.4178 26.3401 31.4178C33.3636 31.4178 37.7538 27.9277 39.5097 20.9455C36.8754 24.4366 33.8023 25.7455 30.2906 24.8733C28.287 24.3747 26.8542 22.9295 25.2697 21.3306C22.687 18.7252 19.6975 15.7089 13.1695 15.7089Z"
          fill="white"
        />
        <clipPath id="clip0_103_4">
          <rect width="52.6452" height="32" fill="white" />
        </clipPath>
      </svg>
    ],
  },
  {
    id: uuidv4(),
    type: "Apps",
    description:
      "I have done some web scrapping for work and for my own projects. I have also done some data analysis for my own projects and for work. I have used Python for these projects.",
    headerIconsTooltip: ["C#", "Microsoft Power BI", "MongoDB"],
    headerIcons: [
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31.9984 10.5738C31.9981 9.96907 31.8688 9.4347 31.6072 8.97608C31.3503 8.52509 30.9656 8.1471 30.4495 7.84824C26.1894 5.39185 21.9252 2.94298 17.6665 0.484087C16.5183 -0.178745 15.4052 -0.15458 14.2655 0.517767C12.5699 1.51778 4.08041 6.38159 1.55066 7.84686C0.508831 8.44997 0.00187807 9.37298 0.00162766 10.5727C0 15.5126 0.00162766 20.4524 0 25.3925C0 25.984 0.124078 26.508 0.374111 26.9597C0.631156 27.4243 1.02129 27.8127 1.54928 28.1183C4.07916 29.5836 12.5698 34.447 14.265 35.4473C15.4052 36.12 16.5183 36.1441 17.6668 35.481C21.9257 33.022 26.1901 30.5732 30.4508 28.1168C30.9788 27.8113 31.369 27.4227 31.626 26.9584C31.8757 26.5067 32 25.9827 32 25.3911C32 25.3911 32 15.5139 31.9984 10.5738Z"
          fill="white"
        />
        <path
          d="M16.049 17.9345L0.374111 26.9597C0.631156 27.4243 1.02129 27.8127 1.54928 28.1183C4.07916 29.5836 12.5698 34.447 14.265 35.4473C15.4052 36.12 16.5183 36.1441 17.6668 35.481C21.9257 33.022 26.1901 30.5732 30.4508 28.1168C30.9788 27.8113 31.369 27.4227 31.626 26.9584L16.049 17.9345Z"
          fill="white"
        />
        <path
          d="M31.9984 10.5738C31.9981 9.96907 31.8688 9.4347 31.6072 8.97608L16.049 17.9345L31.626 26.9584C31.8757 26.5067 31.9997 25.9827 32 25.3911C32 25.3911 32 15.5139 31.9984 10.5738Z"
          fill="white"
        />
        <path
          d="M25.2778 14.5605V16.2475H26.9647V14.5605H27.8082V16.2475H29.4952V17.091H27.8082V18.778H29.4952V19.6214H27.8082V21.3084H26.9647V19.6214H25.2778V21.3084H24.4343V19.6214H22.7473V18.778H24.4343V17.091H22.7473V16.2475H24.4343V14.5605H25.2778ZM26.9647 17.091H25.2778V18.778H26.9647V17.091Z"
          fill="black"
        />
        <path
          d="M16.0835 6.08813C20.4836 6.08813 24.3253 8.47782 26.383 12.0298L26.3629 11.9957L21.1859 14.9766C20.1659 13.2495 18.296 12.0841 16.151 12.0601L16.0835 12.0597C12.8124 12.0597 10.1605 14.7114 10.1605 17.9825C10.1605 19.0522 10.4457 20.0549 10.9417 20.921C11.9626 22.7033 13.8818 23.9054 16.0835 23.9054C18.2987 23.9054 20.2288 22.688 21.2446 20.8866L21.2199 20.9299L26.3892 23.9245C24.354 27.4465 20.565 29.8288 16.216 29.8763L16.0835 29.877C11.6694 29.877 7.8168 27.4726 5.76429 23.9018C4.76228 22.1586 4.18896 20.1376 4.18896 17.9825C4.18896 11.4135 9.51419 6.08813 16.0835 6.08813Z"
          fill="black"
        />
      </svg>,
      <svg
        width="32"
        height="32"
        viewBox="0 0 25 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.0296 32H14.8811C13.978 32 13.3105 31.4896 13.3105 30.7828V1.49202C13.3105 0.235593 14.2136 0 14.6455 0H22.6161C23.9039 0 24.0296 0.981604 24.0296 1.49202V32Z"
          fill="#A7A7A7"
        />
        <path
          d="M17.3545 32H8.20605C7.30298 32 6.6355 31.4896 6.6355 30.7828V9.50185C6.6355 8.24542 7.53857 8.00983 7.97047 8.00983H15.941C17.2289 8.00983 17.3545 8.99143 17.3545 9.50185V32Z"
          fill="#CCCCCC"
        />
        <path
          d="M10.719 32H1.57055C0.667485 32 0 31.4896 0 30.7828V17.5117C0 16.2552 0.903067 16.0197 1.33497 16.0197H9.30552C10.5934 16.0197 10.719 17.0013 10.719 17.5117V32Z"
          fill="#DADADA"
        />
      </svg>,
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 258"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M83.0089 28.7559C72.1328 15.9086 62.7673 2.86053 60.8539 0.150554C60.6525 -0.0501848 60.3503 -0.0501848 60.1489 0.150554C58.2355 2.86053 48.8699 15.9086 37.9938 28.7559C-55.3594 147.292 52.6968 227.287 52.6968 227.287L53.6031 227.889C54.4087 240.235 56.4228 258 56.4228 258H60.451H64.4792C64.4792 258 66.4934 240.335 67.299 227.889L68.2052 227.187C68.306 227.187 176.362 147.292 83.0089 28.7559ZM60.451 225.48C60.451 225.48 55.6172 221.365 54.3081 219.257V219.057L60.1489 89.9813C60.1489 89.5798 60.7532 89.5798 60.7532 89.9813L66.594 219.057V219.257C65.2848 221.365 60.451 225.48 60.451 225.48Z"
          fill="white"
        />
      </svg>
    ],
    skillLength: "2023-2024",
  },
  {
    id: uuidv4(),
    type: "AI | ML | DS",
    description:
      "I have done some web scrapping for work and for my own projects. I have also done some data analysis for my own projects and for work. I have used Python for these projects.",
    headerIconsTooltip: ["Python"],
    headerIcons: [
      <svg
        width="32"
        height="32"
        viewBox="0 0 113 113"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M56.5101 0.397983C51.9264 0.419282 47.5492 0.810201 43.6976 1.49173C32.3514 3.49624 30.2913 7.69183 30.2913 15.4292V25.648H57.1038V29.0542H30.2913H20.2288C12.4364 29.0542 5.61308 33.738 3.47884 42.648C1.01702 52.8609 0.907829 59.234 3.47884 69.898C5.38477 77.8358 9.93639 83.4917 17.7288 83.4917H26.9476V71.2417C26.9476 62.3918 34.6047 54.5855 43.6976 54.5855H70.4788C77.9338 54.5855 83.8851 48.4473 83.8851 40.9605V15.4292C83.8851 8.16289 77.7551 2.70446 70.4788 1.49173C65.8729 0.725008 61.0937 0.376685 56.5101 0.397983ZM42.0101 8.61673C44.7796 8.61673 47.0413 10.9154 47.0413 13.7417C47.0413 16.5581 44.7796 18.8355 42.0101 18.8355C39.2306 18.8355 36.9788 16.5581 36.9788 13.7417C36.9788 10.9154 39.2306 8.61673 42.0101 8.61673Z"
          fill="#B8B8B8"
        />
        <path
          d="M87.229 29.0542V40.9605C87.229 50.1912 79.4031 57.9605 70.479 57.9605H43.6978C36.3619 57.9605 30.2915 64.239 30.2915 71.5855V97.1167C30.2915 104.383 36.6101 108.657 43.6978 110.742C52.1851 113.237 60.324 113.688 70.479 110.742C77.2292 108.787 83.8853 104.854 83.8853 97.1167V86.898H57.104V83.4917H83.8853H97.2915C105.084 83.4917 107.988 78.0563 110.698 69.898C113.497 61.4991 113.378 53.4222 110.698 42.648C108.772 34.8905 105.094 29.0542 97.2915 29.0542H87.229ZM72.1665 93.7105C74.946 93.7105 77.1978 95.9879 77.1978 98.8042C77.1978 101.631 74.946 103.929 72.1665 103.929C69.397 103.929 67.1353 101.631 67.1353 98.8042C67.1353 95.9879 69.397 93.7105 72.1665 93.7105Z"
          fill="white"
        />
      </svg>
    ],
    skillLength: "2024",
  },
  {
    id: uuidv4(),
    type: "Graphics",
    description:
      "I have done some web scrapping for work and for my own projects. I have also done some data analysis for my own projects and for work. I have used Python for these projects.",
    headerIconsTooltip: ["Figma"],
    headerIcons: [
      <svg
        stroke="white"
        fill="white"
        strokeWidth="0"
        viewBox="0 0 384 512"
        height="32"
        width="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 95.7924C14 42.8877 56.8878 0 109.793 0H274.161C327.066 0 369.954 42.8877 369.954 95.7924C369.954 129.292 352.758 158.776 326.711 175.897C352.758 193.019 369.954 222.502 369.954 256.002C369.954 308.907 327.066 351.795 274.161 351.795H272.081C247.279 351.795 224.678 342.369 207.666 326.904V415.167C207.666 468.777 163.657 512 110.309 512C57.5361 512 14 469.243 14 416.207C14 382.709 31.1945 353.227 57.2392 336.105C31.1945 318.983 14 289.5 14 256.002C14 222.502 31.196 193.019 57.2425 175.897C31.196 158.776 14 129.292 14 95.7924ZM176.288 191.587H109.793C74.2172 191.587 45.3778 220.427 45.3778 256.002C45.3778 291.44 73.9948 320.194 109.381 320.416C109.518 320.415 109.655 320.415 109.793 320.415H176.288V191.587ZM207.666 256.002C207.666 291.577 236.505 320.417 272.081 320.417H274.161C309.737 320.417 338.576 291.577 338.576 256.002C338.576 220.427 309.737 191.587 274.161 191.587H272.081C236.505 191.587 207.666 220.427 207.666 256.002ZM109.793 351.795C109.655 351.795 109.518 351.794 109.381 351.794C73.9948 352.015 45.3778 380.769 45.3778 416.207C45.3778 451.652 74.6025 480.622 110.309 480.622C146.591 480.622 176.288 451.186 176.288 415.167V351.795H109.793ZM109.793 31.3778C74.2172 31.3778 45.3778 60.2173 45.3778 95.7924C45.3778 131.368 74.2172 160.207 109.793 160.207H176.288V31.3778H109.793ZM207.666 160.207H274.161C309.737 160.207 338.576 131.368 338.576 95.7924C338.576 60.2173 309.737 31.3778 274.161 31.3778H207.666V160.207Z"></path>
      </svg>
    ],
    skillLength: "2024",
  },
];
