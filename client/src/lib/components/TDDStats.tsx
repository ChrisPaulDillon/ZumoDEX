import {
  useColorModeValue,
  Heading,
  Flex,
  Text,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { getBalanceNumber } from "../../../util/balanceHelper";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";

interface ITDDStats {
  userBalance: BigNumber;
}

const TDDStats: React.FC<ITDDStats> = ({ userBalance }) => {
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
        TDD Token
      </Heading>
      {account ? (
        <Text textAlign={"center"}>{getBalanceNumber(userBalance)} TDD</Text>
      ) : (
        <Skeleton>
          {" "}
          <Text textAlign={"center"}>{getBalanceNumber(userBalance)} TDD</Text>
        </Skeleton>
      )}
    </Stack>
  );
};

export default TDDStats;
