import { IconButton, Button, Box, useColorModeValue, Heading, Stack, Text } from "@chakra-ui/react";
import { IoMdArrowDown } from "react-icons/io";
import React, { useEffect, useState } from "react";
import TokenInput from "./TokenInput";
import EthereumInput from "./EthereumInput";
import { getDexInfoSelector, getEtherBalanceSelector, getUserTokenBalance } from "state/reducer";
import useBuyTokens from "contracts/hooks/useBuyTokens";
import useSellTokens from "contracts/hooks/useSellTokens";

enum EXCHANGE_MODE {
  BUY = "Buy",
  SELL = "Sell",
}
const SwapCard: React.FC = () => {
  const etherBalance = getEtherBalanceSelector();
  const userTokenBalance = getUserTokenBalance();

  const dexInfo = getDexInfoSelector();
  const [etherAmount, setEtherAmount] = useState<Number>(0);
  const [exchangeMode, setExchangeMode] = useState<EXCHANGE_MODE>(EXCHANGE_MODE.BUY);
  const [inputs, setInputs] = useState<Array<React.ReactNode>>([
    <EthereumInput etherAmount={etherAmount} setEtherAmount={setEtherAmount} />,
    <TokenInput />,
  ]);

  const { buyTokens } = useBuyTokens();
  const { sellTokens } = useSellTokens();

  useEffect(() => {
    if (etherBalance !== 0) {
      setEtherAmount(etherBalance);
    }
  }, [etherBalance]);

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
            setExchangeMode(exchangeMode === "Buy" ? EXCHANGE_MODE.SELL : EXCHANGE_MODE.BUY);
          }}
        />
        {inputs[1]}

        <Stack pt={10} spacing={10}>
          <Button onClick={async () => (exchangeMode === "Buy" ? await buyTokens(etherAmount) : await sellTokens(userTokenBalance))}>
            {exchangeMode}
          </Button>
          <Text>{dexInfo.totalSales.toString()} Total Sales</Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SwapCard;
