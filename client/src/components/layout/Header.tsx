import { Box, Flex, Heading, HStack } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import WalletConnectButton from "./WalletConnectButton";
import MotionBox from "../motion/Box";
import TokenBalance from "./TokenBalance";

const Header = () => {
  return (
    <Box pt={2}>
      <Flex as="header" h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack>
          <MotionBox animate={{ y: 3 }} transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }} pr={2}>
            <Image src="/zumo-mobile-logo.svg" height={30} width={30} alt="Zumo" />{" "}
          </MotionBox>{" "}
          <Heading as="h1" size="md">
            <Link href="/">ZumoSwap!</Link>
          </Heading>
        </HStack>
        <HStack>
          <WalletConnectButton mr={1} />
          <ThemeToggle />
          <TokenBalance ml={1} />
        </HStack>
      </Flex>{" "}
    </Box>
  );
};

export default Header;
