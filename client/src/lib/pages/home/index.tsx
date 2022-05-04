import { Box } from "@chakra-ui/react";
import SwapCard from "../../components/SwapCard";

const Home = () => {
  return (
    <Box
      display={{ md: "flex" }}
      alignItems="center"
      minHeight="70vh"
      gap={8}
      mb={8}
      w="full"
    >
      <SwapCard />
    </Box>
  );
};

export default Home;
