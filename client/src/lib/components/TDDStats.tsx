import { Box, useColorModeValue, Heading, Flex } from "@chakra-ui/react";

const TDDStats = () => {
  return (
    <Flex
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
    </Flex>
  );
};

export default TDDStats;
