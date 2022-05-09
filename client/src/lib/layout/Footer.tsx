import { Badge, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { IAppState } from "../../../state";
import { CONNECTOR_TYPE } from "../../../state/reducer";

const Footer = () => {
  const connectorStatus = useSelector((state: IAppState) => state.state.connectorStatus);
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
