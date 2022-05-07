import {
  IconButton,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Button,
  Box,
  Center,
  useColorModeValue,
  Heading,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IoMdArrowDown } from "react-icons/io";
import Image from "next/image";
import { IDexInfo } from "../../../hooks/useGetDexInfo";

interface ISwapCard {
  dexInfo: IDexInfo;
}

const SwapCard: React.FC<ISwapCard> = ({ dexInfo }) => {
  return (
    <Box
      maxW={"270px"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"2xl"}
      rounded={"lg"}
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
          <Image src="/zumo-mobile-logo.svg" height={20} width={20} />
          <Text fontSize={"sm"} mt={1} ml={1} mr={4}>
            TDD
          </Text>
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
        <IconButton as={IoMdArrowDown} aria-label="Swap Token" size="xs" />
        <Flex>
          <Image src="/zumo-mobile-logo.svg" height={20} width={20} />{" "}
          <Text fontSize={"sm"} mt={1} ml={1} mr={4}>
            ETH
          </Text>
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
        <Stack pt={10} spacing={10}>
          <Button>Swap</Button>
          <Text>{dexInfo.totalSales} Total Sales</Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SwapCard;
