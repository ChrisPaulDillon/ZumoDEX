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

interface IEthereumInput {
  etherAmount: Number;
  setEtherAmount: any;
}

const EthereumInput: React.FC<IEthereumInput> = ({ etherAmount, setEtherAmount }) => {
  return (
    <Flex>
      <Image src="/eth.svg" height={15} width={15} />{" "}
      <Text fontSize={"sm"} mt={1} ml={1} mr={4}>
        ETH
      </Text>
      <Box ml={2}>
        <NumberInput
          size="sm"
          variant={"filled"}
          maxW="150px"
          precision={18}
          value={etherAmount.toString()}
          step={0.01}
          min={0}
          onChange={(e) => setEtherAmount(Number(e.valueOf()))}
        >
          <NumberInputField />{" "}
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    </Flex>
  );
};

export default EthereumInput;
