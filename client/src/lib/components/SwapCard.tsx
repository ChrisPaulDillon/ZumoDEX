import {
  IconButton,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Button,
  Box,
  useColorModeValue,
  Heading,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IoMdArrowDown } from "react-icons/io";
import Image from "next/image";
import { IDexInfo } from "../../../contracts/hooks/useGetDexInfo";
import useBuyTokens from "../../../contracts/hooks/useBuyTokens";
import { useSelector } from "react-redux";
import { IAppState } from "../../../state";
import { useEffect, useState } from "react";

interface ISwapCard {
  dexInfo: IDexInfo;
}

const SwapCard: React.FC<ISwapCard> = ({ dexInfo }) => {
  const etherBalance = useSelector((state: IAppState) => state.state.etherBalance)
  const [etherAmount, setEtherAmount] = useState<Number>(0);

  const {buyTokens} = useBuyTokens();

  useEffect(() => {
    if(etherBalance !== 0) {
      setEtherAmount(etherBalance)
    }
 
  }, [etherBalance])
  
  return (
    <Box
      maxW={"270px"}
      bg={useColorModeValue("blackAlpha.400", "gray.700")}
      rounded={"lg"}
      overflow={"hidden"}
      boxShadow={"0 0 40px 20px #0ff"}
      minH={"400px"}
      minW="270px"
      p={3}
    >
      {" "}
      <Stack spacing={4} alignItems="center" justifyContent="center">
        <Heading textAlign={"center"} size="md">
          Swap
        </Heading>
        <Flex>
          <Image src="/zumo-mobile-logo.svg" height={20} width={20} />{" "}
          <Text fontSize={"sm"} mt={1} ml={1} mr={4}>
            ETH
          </Text>
          <Box ml={2}>
            <NumberInput size="sm" variant={"filled"} maxW="150px" precision={18}  value={etherAmount.toString()} step={0.01} min={0} onChange={(e) => setEtherAmount(Number(e.valueOf()))}>
              <NumberInputField />{" "}
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </Flex>
        <IconButton as={IoMdArrowDown} aria-label="Swap Token" size="xs" />
        <Flex>
          <Image src="/zumo-mobile-logo.svg" height={20} width={20} />
          <Text fontSize={"sm"} mt={1} ml={1} mr={4}>
            TDD
          </Text>
          <Box ml={2}>
            <NumberInput size="sm" maxW="150px" variant={"filled"} defaultValue={0} min={0} precision={2} >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </Flex>
 
        <Stack pt={10} spacing={10}>
          <Button onClick={async () => await buyTokens(etherAmount)}>Swap</Button>
          <Text>{dexInfo.totalSales.toString()} Total Sales</Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SwapCard;
