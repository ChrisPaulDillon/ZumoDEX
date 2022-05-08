import {
  useColorModeValue,
  Heading,
  Text,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { getBalanceNumber } from "../../../util/balanceHelper";
import { ITokenInfo } from "../../../contracts/hooks/useGetTokenInfo";
import { useSelector } from "react-redux";
import { IAppState } from "../../../state";

interface ITDDStats {
  tokenInfo?: ITokenInfo;
  userBalance: BigNumber;
}

const TDDStats: React.FC<ITDDStats> = ({ tokenInfo, userBalance }) => {
  const userAddress = useSelector(
    (state: IAppState) => state.state.userAddress
  );

  return (
    <Stack
      rounded="lg"
      minH={"150px"}
      minW={"250px"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"0 0 40px 20px #0ff"}
      flexDir="column"
      w="100%"
      justify={"center"}
      alignItems={"center"}
    >
      <Heading textAlign={"center"} size="md">
        {tokenInfo?.name}
      </Heading>
      <Text textAlign={"center"}>Ticker - {tokenInfo?.symbol}</Text>
      <Text textAlign={"center"}>
        {getBalanceNumber(tokenInfo?.totalSupply!, 2)} Max Supply
      </Text>
      {userAddress ? (
        <Text textAlign={"center"}>
          {getBalanceNumber(userBalance, 2)} {tokenInfo?.symbol}
        </Text>
      ) : (
        <Skeleton w="25%">
          {" "}
          <Text textAlign={"center"}>
            {getBalanceNumber(userBalance, 2)} {tokenInfo?.symbol}
          </Text>
        </Skeleton>
      )}
    </Stack>
  );
};

export default TDDStats;
