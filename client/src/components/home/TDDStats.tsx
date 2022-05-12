import { useColorModeValue, Heading, Text, Skeleton, Stack, VStack, Box, HStack, Divider } from "@chakra-ui/react";
import { CONNECTOR_TYPE, getConnectionStatusSelector, getDexInfoSelector, getTokenInfoSelector } from "state/reducer";
import Image from "next/image";
import { FormatToReadableBalance } from "util/balanceHelper";
const TDDStats: React.FC = () => {
  const tokenInfo = getTokenInfoSelector();
  const connectorStatus = getConnectionStatusSelector();
  const dexInfo = getDexInfoSelector();

  return (
    <Skeleton isLoaded={connectorStatus !== CONNECTOR_TYPE.NOT_CONNECTED}>
      <Stack
        rounded="lg"
        minH={"125px"}
        maxW={[250, 750, 750]}
        bg={useColorModeValue("gray.400", "gray.700")}
        flexDir="column"
        w="100%"
        p={2}
        border="2px"
      >
        <VStack>
          <Heading textAlign={"center"} size="md">
            Exchange Information
          </Heading>
          <HStack>
            <Text textAlign={"center"} fontSize="sm">
              {tokenInfo?.name}
            </Text>

            <Box>
              <Image src={"/zumo-mobile-logo.svg"} height={15} width={15} />
            </Box>
            <Text textAlign={"center"} fontSize="sm">
              {tokenInfo?.symbol}
            </Text>
          </HStack>
          <Divider />
          <Text textAlign={"center"} fontSize="sm">
            {tokenInfo?.totalSupply.toString()} Max Supply
          </Text>
          <Text textAlign={"center"} fontSize="sm">
            {FormatToReadableBalance(dexInfo?.exchangeTokenBalance.toString())} Exchange TDD Balance
          </Text>
          <Text textAlign={"center"} fontSize="sm">
            {FormatToReadableBalance(dexInfo?.exchangeEtherBalance.toString())} Exchange Ether Balance
          </Text>
        </VStack>
      </Stack>
    </Skeleton>
  );
};

export default TDDStats;
