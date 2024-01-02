import NextLink from "next/link";
import {
  Container,
  Box,
  Heading,
  Image,
  useColorModeValue,
  Link,
  Button,
} from "@chakra-ui/react";
import Layout from "../components/layouts/article";
import Section from "../components/section";
import Paragraph from "../components/paragraph";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { BioSection, BioYear } from "../components/bio";
const Page = () => {
  return (
    <Layout>
      <Container>
        <Box
          borderRadius="lg"
          bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
          p={3}
          mb={6}
          align="center"
        >
          Hello, I&apos;m a box
        </Box>
        <Box display={{ md: "flex" }}>
          <Box flexGrow={1}></Box>
          <Heading as="h2" variant="page-title">
            Nichita Roilean
          </Heading>
          <p>Fullstack Developer ( Developer / Designer )</p>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            align="center"
          >
            <Image
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              maxWidth="100px"
              display="inline-block"
              borderRadius="full"
              src="/images/nichita.jpg"
              alt="Profile Image"
            />
          </Box>
        </Box>
        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            Work
          </Heading>
          <Paragraph>
            I am a fullstack developer with a passion for design. I have been
            working with web technologies for 2 years now, and I am constantly
            learning new things{" "}
            <Link as={NextLink} href="/works/inkdrop" passHref scroll={false}>
              Project
            </Link>
            .
          </Paragraph>
          <Box align="center" my={4}>
            <Button
              as={NextLink}
              href="/works"
              scroll={false}
              rightIcon={<ChevronRightIcon />}
              colorScheme="teal"
            >
              My portfolio
            </Button>
          </Box>
        </Section>
        <Section delay={0.4}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <BioSection>
            <BioYear>2002</BioYear>
            Born in Balti, Moldova.
          </BioSection>
          <BioSection>
            <BioYear>2022</BioYear>
            Started my first job as a developer.
          </BioSection>
          <BioSection>
            <BioYear>2023</BioYear>
            Started my first job as a developer. Started my first job as a
            developer.
          </BioSection>
          <BioSection>
            <BioYear>2024</BioYear>
            Started my first job as a developer.
          </BioSection>
        </Section>
        <Section delay={0.4}>
          <Heading as="h3" variant="section-title">
            I love
          </Heading>
          <Paragraph>
            Music, Art, Midjourney, Design, Programming, Playing piano
          </Paragraph>
        </Section>
      </Container>
    </Layout>
  );
};

export default Page;
