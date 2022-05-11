import { IconButton, Button, Box, useColorModeValue, Heading, Stack, Text } from "@chakra-ui/react";
import { IoMdArrowDown } from "react-icons/io";
import React, { useEffect, useState } from "react";
import TokenInput from "./TokenInput";
import EthereumInput from "./EthereumInput";
import { getDexInfoSelector, getEtherBalanceSelector, getIsTokenSpendable, getUserTokenBalanceSelector } from "state/reducer";
import useBuyTokens from "contracts/hooks/useBuyTokens";
import useSellTokens from "contracts/hooks/useSellTokens";
import { useApprove } from "contracts/hooks/useApprove";

enum EXCHANGE_MODE {
  BUY = "Buy",
  SELL = "Sell",
  APPROVE = "Approve",
}
const SwapCard: React.FC = () => {
  const etherBalance = getEtherBalanceSelector();
  const userTokenBalance = getUserTokenBalanceSelector();
  const isTokenSpendable = getIsTokenSpendable();
  const dexInfo = getDexInfoSelector();
  const [etherAmount, setEtherAmount] = useState<Number>(0);
  const [exchangeMode, setExchangeMode] = useState<EXCHANGE_MODE>(EXCHANGE_MODE.BUY);
  const [inputs, setInputs] = useState<Array<React.ReactNode>>([
    <EthereumInput etherAmount={etherAmount} setEtherAmount={setEtherAmount} />,
    <TokenInput />,
  ]);

  const { buyTokens } = useBuyTokens();
  const { sellTokens } = useSellTokens();
  const { onApprove } = useApprove();

  useEffect(() => {
    if (!isTokenSpendable) {
      setExchangeMode(EXCHANGE_MODE.APPROVE);
    }
  }, [isTokenSpendable]);

  useEffect(() => {
    if (etherBalance !== 0) {
      setEtherAmount(etherBalance);
    }
  }, [etherBalance]);

  const handleButtonClick = async () => {
    if (exchangeMode === EXCHANGE_MODE.BUY) {
      return await buyTokens(etherAmount);
    } else if (exchangeMode === EXCHANGE_MODE.SELL) {
      return await sellTokens(userTokenBalance);
    }
    return await onApprove();
  };

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
          <Button onClick={handleButtonClick}>{exchangeMode}</Button>
          <Text>{dexInfo.totalSales.toString()} Total Sales</Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SwapCard;
