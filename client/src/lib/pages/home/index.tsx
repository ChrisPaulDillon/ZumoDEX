import { Box, Flex, Stack } from "@chakra-ui/react";
import TDDStats from "lib/components/TDDStats";
import useBalanceOf from "../../../../hooks/useBalanceOf";
import SwapCard from "../../components/SwapCard";
import useGetTokenInfo from "../../../../hooks/useGetTokenInfo";
import {
  CONTRACT_DEXSWAP,
  CONTRACT_ERC20,
} from "../../../../contracts/contracts";
import useGetDexInfo from "../../../../hooks/useGetDexInfo";
import DexDataCard from "lib/components/DexDataCard";

const Home = () => {
  const balance = useBalanceOf(CONTRACT_ERC20);
  const tokenInfo = useGetTokenInfo(CONTRACT_ERC20);
  const dexInfo = useGetDexInfo(CONTRACT_DEXSWAP);

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
          <SwapCard dexInfo={dexInfo} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Home;
