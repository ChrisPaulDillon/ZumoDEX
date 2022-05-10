import { IconButton, Button, Box, useColorModeValue, Heading, Stack, Text } from "@chakra-ui/react";
import { IoMdArrowDown } from "react-icons/io";
import { IDexInfo } from "../../contracts/hooks/useGetDexInfo";
import useBuyTokens from "../../contracts/hooks/useBuyTokens";
import React, { useEffect, useState } from "react";
import TokenInput from "./TokenInput";
import EthereumInput from "./EthereumInput";
import { getEtherBalanceSelector } from "state/reducer";

interface ISwapCard {
  dexInfo: IDexInfo;
}

const SwapCard: React.FC<ISwapCard> = ({ dexInfo }) => {
  const etherBalance = getEtherBalanceSelector();
  const [etherAmount, setEtherAmount] = useState<Number>(0);
  const [buttonLabel, setButtonLabel] = useState<string>("Buy");
  const [inputs, setInputs] = useState<Array<React.ReactNode>>([
    <EthereumInput etherAmount={etherAmount} setEtherAmount={setEtherAmount} />,
    <TokenInput />,
  ]);

  useEffect(() => {
    if (etherBalance !== 0) {
      setEtherAmount(etherBalance);
    }
  }, [etherBalance]);

  const { buyTokens } = useBuyTokens();

  return (
    <Box
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
        {inputs[0]}
        <IconButton
          as={IoMdArrowDown}
          aria-label="Swap Token"
          size="xs"
          onClick={() => {
            setInputs([...inputs].reverse());
            setButtonLabel(buttonLabel === "Buy" ? "Sell" : "Buy");
          }}
        />
        {inputs[1]}

        <Stack pt={10} spacing={10}>
          <Button onClick={async () => await buyTokens(etherAmount)}>{buttonLabel}</Button>
          <Text>{dexInfo.totalSales.toString()} Total Sales</Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SwapCard;
