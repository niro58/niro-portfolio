import Link from "next/link";
import Image from "next/image";
import { Text, useColorModeValue } from "@chakra-ui/react";
import styled from "@emotion/styled";
import BigLogoIcon from "./icons/bigLogo";
import { motion } from "framer-motion";
const BigLogoBox = styled.span`
  font-weight: bold;
  display: inline-flex;
  align-items: top;
  height: 1500px;
  line-height: 20px;
  padding: 10px;
`;
const PathAnimation = () => {
  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
    },
  };
  return (
    <Link href="/">
      <BigLogoBox>
        <motion.svg
          width="563"
          height="600"
          viewBox="0 0 563 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {}

          <motion.circle
            cx="281.72"
            cy="279.512"
            r="274.5"
            fill="#000210"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="280"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              delay: 0.5,
              duration: 0.5,
              ease: "easeInOut",
            }}
          />
          <motion.rect
            x="140.22"
            y="120.012"
            width="51"
            height="370"
            rx="23"
            stroke="#1FF8F9"
            strokeWidth="6"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              delay: 0.5,
              duration: 0.5,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </BigLogoBox>
    </Link>
  );
};
export default PathAnimation;
