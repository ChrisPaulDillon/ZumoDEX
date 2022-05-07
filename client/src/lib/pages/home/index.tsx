import { Box, Flex, Stack } from "@chakra-ui/react";
import TDDStats from "lib/components/TDDStats";
import SwapCard from "../../components/SwapCard";
import {
  CONTRACT_DEXSWAP,
  CONTRACT_ERC20,
} from "../../../../contracts/contracts";
import DexDataCard from "lib/components/DexDataCard";
import useBalanceOf from "../../../../contracts/hooks/useBalanceOf";
import useGetDexInfo from "../../../../contracts/hooks/useGetDexInfo";
import useGetEthBalance from "../../../../contracts/hooks/useGetEthBalance";
import useGetTokenInfo from "../../../../contracts/hooks/useGetTokenInfo";

const Home = () => {
  const balance = useBalanceOf(CONTRACT_ERC20);
  const tokenInfo = useGetTokenInfo(CONTRACT_ERC20);
  const dexInfo = useGetDexInfo(CONTRACT_DEXSWAP);
  const ethBalance = useGetEthBalance();

  console.log(ethBalance);

  return (
    <Box
      display={{ md: "flex" }}
      alignItems="center"
      justifyContent={"center"}
      minHeight="70vh"
      gap={14}
      mb={8}
      w="full"
    >
      <Stack spacing={12}>
        <TDDStats tokenInfo={tokenInfo} userBalance={balance} />
        <Stack direction={["column", "row"]} spacing={10}>
          {" "}
          <DexDataCard tokenInfo={tokenInfo} userBalance={balance} />
          <SwapCard dexInfo={dexInfo} ethBalance={ethBalance ?? 0} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Home;
