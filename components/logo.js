import Link from "next/link";
import Image from "next/image";
import { Text, useColorModeValue } from "@chakra-ui/react";
import styled from "@emotion/styled";
import FootprintIcon from "./icons/footprint";
const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;
  &:hover img {
    transform: rotate(20deg);
  }
`;
const Logo = () => {
  return (
    <Link href="/">
      <LogoBox>
        <FootprintIcon />
      </LogoBox>
    </Link>
  );
};
export default Logo;
