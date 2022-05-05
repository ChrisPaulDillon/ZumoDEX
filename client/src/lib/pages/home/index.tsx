import { Box } from "@chakra-ui/react";
import TDDStats from "lib/components/TDDStats";
import useBalanceOf from "../../../../hooks/useBalanceOf";
import SwapCard from "../../components/SwapCard";

const Home = () => {
  const balance = useBalanceOf("0xAfDB5Bd0661283a6898c15c474B49373Db96B1AF");
  console.log(balance);

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
      <TDDStats userBalance={balance} />
      <SwapCard />
    </Box>
  );
};

export default Home;
