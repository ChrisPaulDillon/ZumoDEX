import { Box } from "@chakra-ui/react";
import TDDStats from "lib/components/TDDStats";
import SwapCard from "../../components/SwapCard";

const Home = () => {
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
      <TDDStats />
      <SwapCard />
    </Box>
  );
};

export default Home;
