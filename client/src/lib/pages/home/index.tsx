import { Box } from "@chakra-ui/react";
import TDDStats from "lib/components/TDDStats";
import useBalanceOf from "../../../../hooks/useBalanceOf";
import SwapCard from "../../components/SwapCard";
import useGetTokenInfo from "../../../../hooks/useGetTokenInfo";

const Home = () => {
  const balance = useBalanceOf("0xAfDB5Bd0661283a6898c15c474B49373Db96B1AF");
  const tokenInfo = useGetTokenInfo(
    "0xAfDB5Bd0661283a6898c15c474B49373Db96B1AF"
  );

  return (
    <Box
      display={{ md: "flex" }}
      alignItems="center"
      justifyContent={"center"}
      minHeight="70vh"
      gap={14}
      mb={8}
      w="full"
      border="1px"
    >
      <TDDStats tokenInfo={tokenInfo} userBalance={balance} />
      <SwapCard />
    </Box>
  );
};

export default Home;