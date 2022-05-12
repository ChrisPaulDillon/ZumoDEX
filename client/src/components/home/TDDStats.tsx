import { useColorModeValue, Heading, Text, Skeleton, Stack, Box } from "@chakra-ui/react";
import { CONNECTOR_TYPE, getConnectionStatusSelector, getDexInfoSelector, getTokenInfoSelector } from "state/reducer";

const TDDStats: React.FC = () => {
  const tokenInfo = getTokenInfoSelector();
  const connectorStatus = getConnectionStatusSelector();
  const dexInfo = getDexInfoSelector();

  return (
    <Skeleton isLoaded={connectorStatus !== CONNECTOR_TYPE.NOT_CONNECTED}>
      <Stack
        rounded="lg"
        minH={"150px"}
        maxW={[250, 750, 750]}
        bg={useColorModeValue("gray.400", "gray.700")}
        flexDir="column"
        w="100%"
        p={2}
        border="2px"
      >
        <Box>
          <Heading textAlign={"center"} size="md">
            {tokenInfo?.name}
          </Heading>
          <Text textAlign={"center"} fontSize="sm">
            Ticker - {tokenInfo?.symbol}
          </Text>
          <Text textAlign={"center"} fontSize="sm">
            {tokenInfo?.totalSupply.toString()} Max Supply
          </Text>
          <Text textAlign={"center"} fontSize="sm">
            {dexInfo?.exchangeTokenBalance.toString()} Exchange Balance
          </Text>
        </Box>
      </Stack>
    </Skeleton>
  );
};

export default TDDStats;
