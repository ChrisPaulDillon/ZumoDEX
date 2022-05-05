import {
  useColorModeValue,
  Heading,
  Text,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { getBalanceNumber } from "../../../util/balanceHelper";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { ITokenInfo } from "../../../hooks/useGetTokenInfo";

interface ITDDStats {
  tokenInfo?: ITokenInfo;
  userBalance: BigNumber;
}

const TDDStats: React.FC<ITDDStats> = ({ tokenInfo, userBalance }) => {
  const { account } = useActiveWeb3React();

  return (
    <Stack
      rounded="lg"
      minH={"250px"}
      minW={"250px"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"0 0 40px 20px #0ff"}
      flexDir="column"
    >
      <Heading textAlign={"center"} size="md">
        {tokenInfo?.name} - {tokenInfo?.symbol}
      </Heading>
      {account ? (
        <Text textAlign={"center"}>{getBalanceNumber(userBalance, 2)} TDD</Text>
      ) : (
        <Skeleton>
          {" "}
          <Text textAlign={"center"}>
            {getBalanceNumber(userBalance, 2)} TDD
          </Text>
        </Skeleton>
      )}
      <Text textAlign={"center"}>
        {getBalanceNumber(tokenInfo?.totalSupply!, 2)} Max Supply
      </Text>
    </Stack>
  );
};

export default TDDStats;
