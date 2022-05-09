import { useColorModeValue, Heading, Text, Skeleton, Stack, HStack, Grid } from "@chakra-ui/react";
import { ITokenInfo } from "../../../contracts/hooks/useGetTokenInfo";
import { useSelector } from "react-redux";
import { IAppState } from "../../../state";

interface ITDDStats {
  tokenInfo?: ITokenInfo;
  userBalance: Number;
}

const TDDStats: React.FC<ITDDStats> = ({ tokenInfo, userBalance }) => {
  const userAddress = useSelector((state: IAppState) => state.state.userAddress);

  return (
    <Stack
      rounded="lg"
      minH={"150px"}
      minW={"250px"}
      bg={useColorModeValue("blackAlpha.400", "gray.700")}
      boxShadow={"0 0 40px 20px #0ff"}
      flexDir="column"
      w="100%"
      p={2}
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
          {userBalance.toString()} {tokenInfo?.symbol} Balance
        </Text>
      ) : (
        <Skeleton w="100%">
          {" "}
          <Text textAlign={"center"} fontSize="sm">
            {userBalance.toString()} {tokenInfo?.symbol} Balance
          </Text>
        </Skeleton>
      )}
    </Stack>
  );
};

export default TDDStats;
