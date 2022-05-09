import {
  Flex,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";

const TokenInput = () => {
  return (
    <Flex>
      <Image src="/zumo-mobile-logo.svg" height={20} width={20} />
      <Text fontSize={"sm"} mt={1} ml={1} mr={4}>
        TDD
      </Text>
      <Box ml={2}>
        <NumberInput size="sm" maxW="150px" variant={"filled"} defaultValue={0} min={0} precision={2}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    </Flex>
  );
};

export default TokenInput;
