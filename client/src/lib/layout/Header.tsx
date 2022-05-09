import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import WalletConnectButton from "lib/components/WalletConnectButton";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";
import { IAppState } from "../../../state";
import { CONNECTOR_TYPE } from "../../../state/reducer";

const Header = () => {
  const connectorType = useSelector((state: IAppState) => state.state.connectorType);
  return (
    <Flex as="header" width="full" align="center">
      <Box pr={2}>
        <Image src="/zumo-mobile-logo.svg" height={30} width={30} alt="Zumo" />
      </Box>
      <Heading as="h1" size="md">
        <Link href="/">ZumoSwap!</Link>
      </Heading>
      <Text>{CONNECTOR_TYPE[connectorType]}</Text>
      <Box marginLeft="auto">
        <WalletConnectButton mx={2} />
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
