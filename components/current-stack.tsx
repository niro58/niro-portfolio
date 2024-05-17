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
    width="100%"
    height="100%"
    viewBox="0 0 1888 1024"
    fill="none"
    className="absolute -z-0"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_233_6)">
      <mask
        id="mask0_233_6"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="-339"
        width="1920"
        height="1808"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1617 1183.06V1468.24H1616V1183.06H1516V1468.24H1515V1183.06H1415V1468.24H1414V1183.06H1314V1468.24H1313V1183.06H1213V1468.24H1212V1183.06H1112V1468.24H1111V1183.06H1011V1468.24H1010V1183.06H910V1468.24H909V1183.06H809V1468.24H808V1183.06H708V1468.24H707V1183.06H607V1468.24H606V1183.06H506V1468.24H505V1183.06H405V1468.24H404V1183.06H304V1468.24H303V1183.06H0V1182.12H303V1088H0V1087.06H303V992.941H0V992H303V897.882H0V896.941H303V802.823H0V801.882H303V707.765H0V706.823H303V612.706H0V611.765H303V517.647H0V516.706H303V422.588H0V421.647H303V327.529H0V326.588H303V232.47H0V231.529H303V137.412H0V136.47H303V42.3528H0V41.4117H303V-52.706H0V-53.6472H303V-338.824H304V-53.6472H404V-338.824H405V-53.6472H505V-338.824H506V-53.6472H606V-338.824H607V-53.6472H707V-338.824H708V-53.6472H808V-338.824H809V-53.6472H909V-338.824H910V-53.6472H1010V-338.824H1011V-53.6472H1111V-338.824H1112V-53.6472H1212V-338.824H1213V-53.6472H1313V-338.824H1314V-53.6472H1414V-338.824H1415V-53.6472H1515V-338.824H1516V-53.6472H1616V-338.824H1617V-53.6472H1920V-52.706H1617V41.4117H1920V42.3528H1617V136.47H1920V137.412H1617V231.529H1920V232.47H1617V326.588H1920V327.529H1617V421.647H1920V422.588H1617V516.706H1920V517.647H1617V611.765H1920V612.706H1617V706.823H1920V707.765H1617V801.882H1920V802.823H1617V896.941H1920V897.882H1617V992H1920V992.941H1617V1087.06H1920V1088H1617V1182.12H1920V1183.06H1617ZM1616 1182.12V1088H1516V1182.12H1616ZM1515 1182.12V1088H1415V1182.12H1515ZM1414 1182.12V1088H1314V1182.12H1414ZM1313 1182.12V1088H1213V1182.12H1313ZM1212 1182.12V1088H1112V1182.12H1212ZM1111 1182.12V1088H1011V1182.12H1111ZM1010 1182.12V1088H910V1182.12H1010ZM909 1182.12V1088H809V1182.12H909ZM808 1182.12V1088H708V1182.12H808ZM707 1182.12V1088H607V1182.12H707ZM606 1182.12V1088H506V1182.12H606ZM505 1182.12V1088H405V1182.12H505ZM404 1182.12V1088H304V1182.12H404ZM304 1087.06H404V992.941H304V1087.06ZM304 992H404V897.882H304V992ZM304 896.941H404V802.823H304V896.941ZM304 801.882H404V707.765H304V801.882ZM304 706.823H404V612.706H304V706.823ZM304 611.765H404V517.647H304V611.765ZM304 516.706H404V422.588H304V516.706ZM304 421.647H404V327.529H304V421.647ZM304 326.588H404V232.47H304V326.588ZM304 231.529H404V137.412H304V231.529ZM304 136.47H404V42.3528H304V136.47ZM304 41.4117H404V-52.706H304V41.4117ZM405 -52.706V41.4117H505V-52.706H405ZM506 -52.706V41.4117H606V-52.706H506ZM607 -52.706V41.4117H707V-52.706H607ZM708 -52.706V41.4117H808V-52.706H708ZM809 -52.706V41.4117H909V-52.706H809ZM910 -52.706V41.4117H1010V-52.706H910ZM1011 -52.706V41.4117H1111V-52.706H1011ZM1112 -52.706V41.4117H1212V-52.706H1112ZM1213 -52.706V41.4117H1313V-52.706H1213ZM1314 -52.706V41.4117H1414V-52.706H1314ZM1415 -52.706V41.4117H1515V-52.706H1415ZM1516 -52.706V41.4117H1616V-52.706H1516ZM1616 42.3528H1516V136.47H1616V42.3528ZM1616 137.412H1516V231.529H1616V137.412ZM1616 232.47H1516V326.588H1616V232.47ZM1616 327.529H1516V421.647H1616V327.529ZM1616 422.588H1516V516.706H1616V422.588ZM1616 517.647H1516V611.765H1616V517.647ZM1616 612.706H1516V706.823H1616V612.706ZM1616 707.765H1516V801.882H1616V707.765ZM1616 802.823H1516V896.941H1616V802.823ZM1616 897.882H1516V992H1616V897.882ZM1616 992.941H1516V1087.06H1616V992.941ZM1515 1087.06V992.941H1415V1087.06H1515ZM1414 1087.06V992.941H1314V1087.06H1414ZM1313 1087.06V992.941H1213V1087.06H1313ZM1212 1087.06V992.941H1112V1087.06H1212ZM1111 1087.06V992.941H1011V1087.06H1111ZM1010 1087.06V992.941H910V1087.06H1010ZM909 1087.06V992.941H809V1087.06H909ZM808 1087.06V992.941H708V1087.06H808ZM707 1087.06V992.941H607V1087.06H707ZM606 1087.06V992.941H506V1087.06H606ZM505 1087.06V992.941H405V1087.06H505ZM405 992H505V897.882H405V992ZM405 896.941H505V802.823H405V896.941ZM405 801.882H505V707.765H405V801.882ZM405 706.823H505V612.706H405V706.823ZM405 611.765H505V517.647H405V611.765ZM405 516.706H505V422.588H405V516.706ZM405 421.647H505V327.529H405V421.647ZM405 326.588H505V232.47H405V326.588ZM405 231.529H505V137.412H405V231.529ZM405 136.47H505V42.3528H405V136.47ZM506 42.3528V136.47H606V42.3528H506ZM607 42.3528V136.47H707V42.3528H607ZM708 42.3528V136.47H808V42.3528H708ZM809 42.3528V136.47H909V42.3528H809ZM910 42.3528V136.47H1010V42.3528H910ZM1011 42.3528V136.47H1111V42.3528H1011ZM1112 42.3528V136.47H1212V42.3528H1112ZM1213 42.3528V136.47H1313V42.3528H1213ZM1314 42.3528V136.47H1414V42.3528H1314ZM1415 42.3528V136.47H1515V42.3528H1415ZM1515 137.412H1415V231.529H1515V137.412ZM1515 232.47H1415V326.588H1515V232.47ZM1515 327.529H1415V421.647H1515V327.529ZM1515 422.588H1415V516.706H1515V422.588ZM1515 517.647H1415V611.765H1515V517.647ZM1515 612.706H1415V706.823H1515V612.706ZM1515 707.765H1415V801.882H1515V707.765ZM1515 802.823H1415V896.941H1515V802.823ZM1515 897.882H1415V992H1515V897.882ZM1414 992V897.882H1314V992H1414ZM1313 992V897.882H1213V992H1313ZM1212 992V897.882H1112V992H1212ZM1111 992V897.882H1011V992H1111ZM1010 992V897.882H910V992H1010ZM909 992V897.882H809V992H909ZM808 992V897.882H708V992H808ZM707 992V897.882H607V992H707ZM606 992V897.882H506V992H606ZM506 896.941H606V802.823H506V896.941ZM506 801.882H606V707.765H506V801.882ZM506 706.823H606V612.706H506V706.823ZM506 611.765H606V517.647H506V611.765ZM506 516.706H606V422.588H506V516.706ZM506 421.647H606V327.529H506V421.647ZM506 326.588H606V232.47H506V326.588ZM506 231.529H606V137.412H506V231.529ZM607 137.412V231.529H707V137.412H607ZM708 137.412V231.529H808V137.412H708ZM809 137.412V231.529H909V137.412H809ZM910 137.412V231.529H1010V137.412H910ZM1011 137.412V231.529H1111V137.412H1011ZM1112 137.412V231.529H1212V137.412H1112ZM1213 137.412V231.529H1313V137.412H1213ZM1314 137.412V231.529H1414V137.412H1314ZM1414 232.47H1314V326.588H1414V232.47ZM1414 327.529H1314V421.647H1414V327.529ZM1414 422.588H1314V516.706H1414V422.588ZM1414 517.647H1314V611.765H1414V517.647ZM1414 612.706H1314V706.823H1414V612.706ZM1414 707.765H1314V801.882H1414V707.765ZM1414 802.823H1314V896.941H1414V802.823ZM1313 896.941V802.823H1213V896.941H1313ZM1212 896.941V802.823H1112V896.941H1212ZM1111 896.941V802.823H1011V896.941H1111ZM1010 896.941V802.823H910V896.941H1010ZM909 896.941V802.823H809V896.941H909ZM808 896.941V802.823H708V896.941H808ZM707 896.941V802.823H607V896.941H707ZM607 801.882H707V707.765H607V801.882ZM607 706.823H707V612.706H607V706.823ZM607 611.765H707V517.647H607V611.765ZM607 516.706H707V422.588H607V516.706ZM607 421.647H707V327.529H607V421.647ZM607 326.588H707V232.47H607V326.588ZM708 232.47V326.588H808V232.47H708ZM809 232.47V326.588H909V232.47H809ZM910 232.47V326.588H1010V232.47H910ZM1011 232.47V326.588H1111V232.47H1011ZM1112 232.47V326.588H1212V232.47H1112ZM1213 232.47V326.588H1313V232.47H1213ZM1313 327.529H1213V421.647H1313V327.529ZM1313 422.588H1213V516.706H1313V422.588ZM1313 517.647H1213V611.765H1313V517.647ZM1313 612.706H1213V706.823H1313V612.706ZM1313 707.765H1213V801.882H1313V707.765ZM1212 801.882V707.765H1112V801.882H1212ZM1111 801.882V707.765H1011V801.882H1111ZM1010 801.882V707.765H910V801.882H1010ZM909 801.882V707.765H809V801.882H909ZM808 801.882V707.765H708V801.882H808ZM708 706.823H808V612.706H708V706.823ZM708 611.765H808V517.647H708V611.765ZM708 516.706H808V422.588H708V516.706ZM708 421.647H808V327.529H708V421.647ZM809 327.529V421.647H909V327.529H809ZM910 327.529V421.647H1010V327.529H910ZM1011 327.529V421.647H1111V327.529H1011ZM1112 327.529V421.647H1212V327.529H1112ZM1212 422.588H1112V516.706H1212V422.588ZM1212 517.647H1112V611.765H1212V517.647ZM1212 612.706H1112V706.823H1212V612.706ZM1111 706.823V612.706H1011V706.823H1111ZM1010 706.823V612.706H910V706.823H1010ZM909 706.823V612.706H809V706.823H909ZM809 611.765H909V517.647H809V611.765ZM809 516.706H909V422.588H809V516.706ZM910 422.588V516.706H1010V422.588H910ZM1011 422.588V516.706H1111V422.588H1011ZM1111 517.647H1011V611.765H1111V517.647ZM1010 611.765V517.647H910V611.765H1010Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_233_6)">
        <g filter="url(#filter0_f_233_6)">
          <path
            d="M809 254.117C844.899 254.117 874 244.215 874 231.999C874 219.784 844.899 209.882 809 209.882C773.101 209.882 744 219.784 744 231.999C744 244.215 773.101 254.117 809 254.117Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter1_f_233_6)">
          <path
            d="M809 241.882C844.899 241.882 874 237.037 874 231.059C874 225.081 844.899 220.235 809 220.235C773.101 220.235 744 225.081 744 231.059C744 237.037 773.101 241.882 809 241.882Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter2_f_233_6)">
          <path
            d="M1415 349.176C1450.9 349.176 1480 339.273 1480 327.058C1480 314.843 1450.9 304.94 1415 304.94C1379.1 304.94 1350 314.843 1350 327.058C1350 339.273 1379.1 349.176 1415 349.176Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter3_f_233_6)">
          <path
            d="M1415 336.941C1450.9 336.941 1480 332.095 1480 326.117C1480 320.14 1450.9 315.294 1415 315.294C1379.1 315.294 1350 320.14 1350 326.117C1350 332.095 1379.1 336.941 1415 336.941Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter4_f_233_6)">
          <path
            d="M1314 539.294C1349.9 539.294 1379 529.391 1379 517.176C1379 504.961 1349.9 495.059 1314 495.059C1278.1 495.059 1249 504.961 1249 517.176C1249 529.391 1278.1 539.294 1314 539.294Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter5_f_233_6)">
          <path
            d="M1314 527.058C1349.9 527.058 1379 522.212 1379 516.235C1379 510.257 1349.9 505.411 1314 505.411C1278.1 505.411 1249 510.257 1249 516.235C1249 522.212 1278.1 527.058 1314 527.058Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter6_f_233_6)">
          <path
            d="M910 634.352C945.899 634.352 975 624.45 975 612.235C975 600.02 945.899 590.117 910 590.117C874.101 590.117 845 600.02 845 612.235C845 624.45 874.101 634.352 910 634.352Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter7_f_233_6)">
          <path
            d="M910 622.118C945.899 622.118 975 617.272 975 611.294C975 605.317 945.899 600.471 910 600.471C874.101 600.471 845 605.317 845 611.294C845 617.272 874.101 622.118 910 622.118Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter8_f_233_6)">
          <path
            d="M506 538.352C541.899 538.352 571 528.45 571 516.235C571 504.02 541.899 494.117 506 494.117C470.101 494.117 441 504.02 441 516.235C441 528.45 470.101 538.352 506 538.352Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter9_f_233_6)">
          <path
            d="M506 526.118C541.899 526.118 571 521.272 571 515.294C571 509.317 541.899 504.471 506 504.471C470.101 504.471 441 509.317 441 515.294C441 521.272 470.101 526.118 506 526.118Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter10_f_233_6)">
          <path
            d="M506 538.352C541.899 538.352 571 528.45 571 516.235C571 504.02 541.899 494.117 506 494.117C470.101 494.117 441 504.02 441 516.235C441 528.45 470.101 538.352 506 538.352Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter11_f_233_6)">
          <path
            d="M506 526.118C541.899 526.118 571 521.272 571 515.294C571 509.317 541.899 504.471 506 504.471C470.101 504.471 441 509.317 441 515.294C441 521.272 470.101 526.118 506 526.118Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter12_f_233_6)">
          <path
            d="M407 636.235C442.899 636.235 472 626.333 472 614.118C472 601.902 442.899 592 407 592C371.101 592 342 601.902 342 614.118C342 626.333 371.101 636.235 407 636.235Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter13_f_233_6)">
          <path
            d="M407 624C442.899 624 472 619.154 472 613.176C472 607.198 442.899 602.353 407 602.353C371.101 602.353 342 607.198 342 613.176C342 619.154 371.101 624 407 624Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter14_f_233_6)">
          <path
            d="M1412 825.411C1447.9 825.411 1477 815.509 1477 803.293C1477 791.078 1447.9 781.176 1412 781.176C1376.1 781.176 1347 791.078 1347 803.293C1347 815.509 1376.1 825.411 1412 825.411Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter15_f_233_6)">
          <path
            d="M1412 813.176C1447.9 813.176 1477 808.33 1477 802.353C1477 796.375 1447.9 791.529 1412 791.529C1376.1 791.529 1347 796.375 1347 802.353C1347 808.33 1376.1 813.176 1412 813.176Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter16_f_233_6)">
          <path
            d="M1515 159.059C1550.9 159.059 1580 149.156 1580 136.941C1580 124.726 1550.9 114.823 1515 114.823C1479.1 114.823 1450 124.726 1450 136.941C1450 149.156 1479.1 159.059 1515 159.059Z"
            className="fill-primary"
          />
        </g>
        <g filter="url(#filter17_f_233_6)">
          <path
            d="M1515 146.823C1550.9 146.823 1580 141.977 1580 135.999C1580 130.022 1550.9 125.176 1515 125.176C1479.1 125.176 1450 130.022 1450 135.999C1450 141.977 1479.1 146.823 1515 146.823Z"
            className="fill-primary"
          />
        </g>
      </g>
      <path
        d="M909 231.529H809V232.47H909V231.529Z"
        fill="url(#paint0_linear_233_6)"
      />
      <path
        d="M1515 326.588H1415V327.529H1515V326.588Z"
        fill="url(#paint1_linear_233_6)"
      />
      <path
        d="M606 516.706H506V517.647H606V516.706Z"
        fill="url(#paint2_linear_233_6)"
      />
      <path
        d="M1010 611.765H910V612.706H1010V611.765Z"
        fill="url(#paint3_linear_233_6)"
      />
      <path
        d="M1414 516.706H1314V517.647H1414V516.706Z"
        fill="url(#paint4_linear_233_6)"
      />
      <path
        d="M810 232C810 231.22 809.328 230.588 808.5 230.588C807.672 230.588 807 231.22 807 232C807 232.779 807.672 233.411 808.5 233.411C809.328 233.411 810 232.779 810 232Z"
        className="fill-primary"
      />
      <path
        d="M507 517.176C507 516.397 506.328 515.765 505.5 515.765C504.672 515.765 504 516.397 504 517.176C504 517.956 504.672 518.588 505.5 518.588C506.328 518.588 507 517.956 507 517.176Z"
        className="fill-primary"
      />
      <path
        d="M406 612.235C406 611.455 405.328 610.823 404.5 610.823C403.672 610.823 403 611.455 403 612.235C403 613.015 403.672 613.647 404.5 613.647C405.328 613.647 406 613.015 406 612.235Z"
        className="fill-primary"
      />
      <path
        d="M1517 136.941C1517 136.161 1516.33 135.529 1515.5 135.529C1514.67 135.529 1514 136.161 1514 136.941C1514 137.721 1514.67 138.353 1515.5 138.353C1516.33 138.353 1517 137.721 1517 136.941Z"
        className="fill-primary"
      />
      <path
        d="M1416 802.353C1416 801.573 1415.33 800.941 1414.5 800.941C1413.67 800.941 1413 801.573 1413 802.353C1413 803.133 1413.67 803.765 1414.5 803.765C1415.33 803.765 1416 803.133 1416 802.353Z"
        className="fill-primary"
      />
      <path
        d="M911 612.235C911 611.455 910.328 610.823 909.5 610.823C908.672 610.823 908 611.455 908 612.235C908 613.015 908.672 613.647 909.5 613.647C910.328 613.647 911 613.015 911 612.235Z"
        className="fill-primary"
      />
      <path
        d="M1315 517.176C1315 516.397 1314.33 515.765 1313.5 515.765C1312.67 515.765 1312 516.397 1312 517.176C1312 517.956 1312.67 518.588 1313.5 518.588C1314.33 518.588 1315 517.956 1315 517.176Z"
        className="fill-primary"
      />
      <path
        d="M1416 327.059C1416 326.28 1415.33 325.647 1414.5 325.647C1413.67 325.647 1413 326.28 1413 327.059C1413 327.839 1413.67 328.471 1414.5 328.471C1415.33 328.471 1416 327.839 1416 327.059Z"
        className="fill-primary"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_233_6"
        x="644"
        y="109.882"
        width="330"
        height="244.235"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="50"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter1_f_233_6"
        x="684"
        y="160.235"
        width="250"
        height="141.647"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="30"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter2_f_233_6"
        x="1250"
        y="204.94"
        width="330"
        height="244.235"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="50"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter3_f_233_6"
        x="1290"
        y="255.294"
        width="250"
        height="141.647"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="30"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter4_f_233_6"
        x="1149"
        y="395.059"
        width="330"
        height="244.235"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="50"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter5_f_233_6"
        x="1189"
        y="445.411"
        width="250"
        height="141.647"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="30"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter6_f_233_6"
        x="745"
        y="490.117"
        width="330"
        height="244.235"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="50"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter7_f_233_6"
        x="785"
        y="540.471"
        width="250"
        height="141.647"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="30"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter8_f_233_6"
        x="341"
        y="394.117"
        width="330"
        height="244.235"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="50"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter9_f_233_6"
        x="381"
        y="444.471"
        width="250"
        height="141.647"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="30"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter10_f_233_6"
        x="341"
        y="394.117"
        width="330"
        height="244.235"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="50"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter11_f_233_6"
        x="381"
        y="444.471"
        width="250"
        height="141.647"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="30"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter12_f_233_6"
        x="242"
        y="492"
        width="330"
        height="244.235"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="50"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter13_f_233_6"
        x="282"
        y="542.353"
        width="250"
        height="141.647"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="30"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter14_f_233_6"
        x="1247"
        y="681.176"
        width="330"
        height="244.235"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="50"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter15_f_233_6"
        x="1287"
        y="731.529"
        width="250"
        height="141.647"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="30"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter16_f_233_6"
        x="1350"
        y="14.8232"
        width="330"
        height="244.235"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="50"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <filter
        id="filter17_f_233_6"
        x="1390"
        y="65.1758"
        width="250"
        height="141.647"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="30"
          result="effect1_foregroundBlur_233_6"
        />
      </filter>
      <linearGradient
        id="paint0_linear_233_6"
        x1="809"
        y1="232"
        x2="909"
        y2="232"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DC2626" />
        <stop offset="1" stopColor="#DC2626" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_233_6"
        x1="1415"
        y1="327.058"
        x2="1515"
        y2="327.058"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DC2626" />
        <stop offset="1" stopColor="#DC2626" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_233_6"
        x1="506"
        y1="517.177"
        x2="606"
        y2="517.177"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DC2626" />
        <stop offset="1" stopColor="#DC2626" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_233_6"
        x1="910"
        y1="612.235"
        x2="1010"
        y2="612.235"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DC2626" />
        <stop offset="1" stopColor="#DC2626" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_233_6"
        x1="1314"
        y1="517.177"
        x2="1414"
        y2="517.177"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DC2626" />
        <stop offset="1" stopColor="#DC2626" stopOpacity="0" />
      </linearGradient>
      <clipPath id="clip0_233_6">
        <rect width="1888" height="1024" fill="white" />
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
