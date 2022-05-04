import {
  IconButton,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Button,
} from "@chakra-ui/react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  NumberInput,
  NumberInputField,
  Stack,
} from "@chakra-ui/react";
import { IoMdArrowDown } from "react-icons/io";
import Image from "next/image";

const SwapCard: React.FC = () => {
  const coins = [
    { ticker: "TDD", imgSrc: "/zumo-mobile-logo.svg" },
    { ticker: "ETH", imgSrc: "/zumo-mobile-logo.svg" },
  ];
  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        minH={"400px"}
        minW="270px"
      >
        {" "}
        <Stack spacing={4} alignItems="center" p={2} justifyContent="center">
          <Heading textAlign={"center"} size="md">
            Swap
          </Heading>
          <Flex>
            <Image src="/zumo-mobile-logo.svg" height={20} width={20} /> TDD
            <Box ml={2}>
              <NumberInput
                size="sm"
                maxW="150px"
                variant={"filled"}
                defaultValue={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </Flex>
          <IconButton as={IoMdArrowDown} aria-label="Swap Token" size="sm" />
          <Flex>
            <Image src="/zumo-mobile-logo.svg" height={20} width={20} /> ETH
            <Box ml={2}>
              <NumberInput
                size="sm"
                variant={"filled"}
                maxW="150px"
                defaultValue={0}
              >
                <NumberInputField />{" "}
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </Flex>
          <Box pt={10}>
            <Button>Swap</Button>
          </Box>
        </Stack>
      </Box>
    </Center>
  );
};

export default SwapCard;
