import { Box, Flex, Heading } from "@chakra-ui/react";
import WalletConnectButton from "lib/components/WalletConnectButton";
import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
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
