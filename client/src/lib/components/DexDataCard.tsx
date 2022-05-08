import { useColorModeValue, Heading, Text, Skeleton, Stack } from "@chakra-ui/react";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { ITokenInfo } from "../../../contracts/hooks/useGetTokenInfo";

interface IDexDataCard {
  tokenInfo?: ITokenInfo;
  userBalance: Number;
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
      <Text textAlign={"center"}>{tokenInfo?.totalSupply?.toString()} Max Supply</Text>
      {account ? (
        <Text textAlign={"center"}>
          {userBalance.toString()} {tokenInfo?.symbol}
        </Text>
      ) : (
        <Skeleton w="25%">
          {" "}
          <Text textAlign={"center"}>
            {userBalance.toString()} {tokenInfo?.symbol}
          </Text>
        </Skeleton>
      )}
    </Stack>
  );
};

export default DexDataCard;
