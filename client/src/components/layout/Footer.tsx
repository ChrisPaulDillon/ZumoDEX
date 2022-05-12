import { Badge, Box, Container, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { CONNECTOR_TYPE, getConnectionStatusSelector } from "../../state/reducer";

const Footer = () => {
  const connectorStatus = getConnectionStatusSelector();
  return (
    <Flex as="footer" width="full">
      <Text colorScheme={"whiteAlpha.500"}>
        {new Date().getFullYear()} -{" "}
        <Link href="https://zumo.money/" isExternal rel="noopener noreferrer">
          Zumo
        </Link>
      </Text>
      <Box marginLeft="auto">
        <Badge colorScheme={connectorStatus === CONNECTOR_TYPE.NOT_CONNECTED ? "red" : "green"} variant="solid">
          Status: {connectorStatus}
        </Badge>
      </Box>
    </Flex>
  );
};

export default Footer;
