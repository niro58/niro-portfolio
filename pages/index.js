import { Container, Box, Heading } from "@chakra-ui/react";
const Page = () => {
  return (
    <Container>
      <Box borderRadius="lg" bg="red" p={3} mb={6} align="center">
        Hello, I&apos;m a box
      </Box>
      <Box display={{ md: "flex" }}>
        <Box flexGrow={1}></Box>
        <Heading as="h2" variant="page-title">
          Nichita Roilean
        </Heading>
        <p>Fullstack Developer ( Developer / Designer )</p>
      </Box>
    </Container>
  );
};

export default Page;
