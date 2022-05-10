import { Badge, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { CONNECTOR_TYPE, getConnectionStatusSelector } from "../../state/reducer";

const Footer = () => {
  const connectorStatus = getConnectionStatusSelector();
  return (
    <Flex as="footer" width="full" align="center" justify="center">
      <HStack spacing={10}>
        <Text>
          {new Date().getFullYear()} -{" "}
          <Link href="https://zumo.money/" isExternal rel="noopener noreferrer">
            Zumo
          </Link>
        </Text>
        <Badge colorScheme={connectorStatus === CONNECTOR_TYPE.NOT_CONNECTED ? "red" : "green"}>
          Status: {connectorStatus}
        </Badge>
      </HStack>
    </Flex>
  );
};

export default Footer;
