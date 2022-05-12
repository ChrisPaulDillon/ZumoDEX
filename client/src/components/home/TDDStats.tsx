import { useColorModeValue, Heading, Text, Skeleton, Stack } from "@chakra-ui/react";
import { getLoginStatusSelector, getTokenInfoSelector, getUserTokenBalanceSelector } from "state/reducer";

const TDDStats: React.FC = () => {
  const { userAddress } = getLoginStatusSelector();
  const tokenInfo = getTokenInfoSelector();
  const userTokenBalance = getUserTokenBalanceSelector();

  return (
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
      <Heading textAlign={"center"} size="md">
        {tokenInfo?.name}
      </Heading>
      <Text textAlign={"center"} fontSize="sm">
        Ticker - {tokenInfo?.symbol}
      </Text>
      <Text textAlign={"center"} fontSize="sm">
        {tokenInfo?.totalSupply.toString()!} Max Supply
      </Text>
      {userAddress ? (
        <Text textAlign={"center"} fontSize="sm">
          {userTokenBalance.toString()} {tokenInfo?.symbol} Balance
        </Text>
      ) : (
        <Skeleton w="100%">
          {" "}
          <Text textAlign={"center"} fontSize="sm">
            {userTokenBalance.toString()} {tokenInfo?.symbol} Balance
          </Text>
        </Skeleton>
      )}
    </Stack>
  );
};

export default TDDStats;
