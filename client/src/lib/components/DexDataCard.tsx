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

interface IDexDataCard {
  tokenInfo?: ITokenInfo;
  userBalance: BigNumber;
}

const DexDataCard: React.FC<IDexDataCard> = ({ tokenInfo, userBalance }) => {
  const { account } = useActiveWeb3React();

  return (
    <Stack
      rounded="lg"
      minH={"150px"}
      minW={"250px"}
      bg={useColorModeValue("white", "gray.700")}
      flexDir="column"
      w="100%"
      alignItems={"center"}
      p={3}
    >
      <Heading textAlign={"center"} size="md">
        DEX Info
      </Heading>
      <Text textAlign={"center"}>
        {getBalanceNumber(tokenInfo?.totalSupply!, 2)} Max Supply
      </Text>
      {account ? (
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

export default DexDataCard;
