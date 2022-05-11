import { Box, Stack } from "@chakra-ui/react";
import SwapCard from "components/home/SwapCard";
import TDDStats from "components/home/TDDStats";
import { CONTRACT_ERC20, CONTRACT_DEXSWAP } from "../contracts/contracts";
import useBalanceOf from "../contracts/hooks/useBalanceOf";
import useGetDexInfo from "../contracts/hooks/useGetDexInfo";
import useGetEthBalance from "../contracts/hooks/useGetEthBalance";
import useGetTokenInfo from "../contracts/hooks/useGetTokenInfo";
import useDetectWalletStatus from "../hooks/useDetectWalletStatus";

const Home = () => {
  useBalanceOf();
  useGetTokenInfo(CONTRACT_ERC20);
  useGetDexInfo(CONTRACT_DEXSWAP);
  useGetEthBalance();
  useDetectWalletStatus();

  return (
    <Box display={{ md: "flex" }} alignItems="center" justifyContent={"center"} minHeight="70vh" gap={14} mb={8} w="full">
      <Stack spacing={12}>
        <TDDStats />
        <SwapCard />
      </Stack>
    </Box>
  );
};

export default Home;
