import { Box } from "@chakra-ui/react";
import TDDStats from "lib/components/TDDStats";
import useBalanceOf from "../../../../hooks/useBalanceOf";
import SwapCard from "../../components/SwapCard";
import useGetTokenInfo from "../../../../hooks/useGetTokenInfo";
import { CONTRACT_ERC20 } from "../../../../contracts/contracts";

const Home = () => {
  const balance = useBalanceOf(CONTRACT_ERC20);
  const tokenInfo = useGetTokenInfo(CONTRACT_ERC20);

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
      <TDDStats tokenInfo={tokenInfo} userBalance={balance} />
      <SwapCard />
    </Box>
  );
};

export default Home;
