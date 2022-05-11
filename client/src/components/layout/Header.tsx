import { Box, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import WalletConnectButton from "./WalletConnectButton";
import MotionBox from "components/motion/Box";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <MotionBox animate={{ y: 3 }} transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }} pr={2}>
        <Image src="/zumo-mobile-logo.svg" height={30} width={30} alt="Zumo" />
      </MotionBox>
      <Heading as="h1" size="md">
        <Link href="/">ZumoSwap!</Link>
      </Heading>
      <Box marginLeft="auto">
        <WalletConnectButton mx={2} />
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
