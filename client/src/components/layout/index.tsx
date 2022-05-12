import { Box, Container, Flex, useColorModeValue } from "@chakra-ui/react";
import type { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      margin="0 auto"
      transition="0.5s ease-out"
      backgroundImage={useColorModeValue('url("bg-light.svg")', 'url("/bg-dark.svg")')}
      backgroundPosition="bottom"
      backgroundSize="cover"
      minH={"1000px"}
      backgroundRepeat={"no-repeat"}
      height="100%"
    >
      <Container maxW="container.lg" pt={2}>
        <Header />
        <Flex as="main" my={22} justify="center" alignItems={"center"}>
          {children}
        </Flex>
        <Footer />
      </Container>
    </Box>
  );
};

export default Layout;
