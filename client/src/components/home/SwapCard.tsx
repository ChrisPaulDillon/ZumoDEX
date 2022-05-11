import {
  IconButton,
  Button,
  Box,
  useColorModeValue,
  Heading,
  Stack,
  Text,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { IoMdArrowDown } from "react-icons/io";
import React, { useCallback, useEffect, useState } from "react";
import {
  getDexInfoSelector,
  getEtherBalanceSelector,
  getIsTokenSpendable,
  getLoginStatusSelector,
  getUserTokenBalanceSelector,
} from "state/reducer";
import useBuyTokens from "contracts/hooks/useBuyTokens";
import useSellTokens from "contracts/hooks/useSellTokens";
import { useApprove } from "contracts/hooks/useApprove";
import { ConvertEtherToTTD, CovertTDDToEther } from "util/balanceHelper";
import { useForm } from "react-hook-form";
import Image from "next/image";

enum EXCHANGE_MODE {
  BUY = "Buy",
  SELL = "Sell",
  APPROVE = "Approve",
}

interface ITokenInput {
  ticker: string;
  imgSource: string;
}

const SwapCard: React.FC = () => {
  const { isLoggedIn } = getLoginStatusSelector();
  const etherBalance = getEtherBalanceSelector();
  const userTokenBalance = getUserTokenBalanceSelector();
  const isTokenSpendable = getIsTokenSpendable();
  const dexInfo = getDexInfoSelector();
  const [etherAmount, setEtherAmount] = useState<string>("0");
  const [tddAmount, setTddAmount] = useState<string>("0");
  const [exchangeMode, setExchangeMode] = useState<EXCHANGE_MODE>(isTokenSpendable ? EXCHANGE_MODE.BUY : EXCHANGE_MODE.APPROVE);

  const handleEtherOnChange = useCallback((value: string) => {
    setEtherAmount(value);
    const ttdVal = ConvertEtherToTTD(value);
    setTddAmount(ttdVal);
  }, []);

  const handleTDDOnChange = useCallback((value: string) => {
    setTddAmount(value);
    const etherVal = CovertTDDToEther(value);
    setEtherAmount(etherVal);
  }, []);

  const [inputs, setInputs] = useState<Array<ITokenInput>>([
    { ticker: "ETH", imgSource: "/eth.svg" },
    { ticker: "TDD", imgSource: "/zumo-mobile-logo.svg" },
  ]);

  const { buyTokens } = useBuyTokens();
  const { sellTokens } = useSellTokens();
  const { onApprove } = useApprove();

  const onSubmit = async () => {
    if (exchangeMode === EXCHANGE_MODE.BUY) {
      return await buyTokens(Number(etherAmount));
    } else if (exchangeMode === EXCHANGE_MODE.SELL) {
      return await sellTokens(Number(tddAmount));
    }
    return await onApprove();
  };

  useEffect(() => {
    if (isTokenSpendable) {
      setExchangeMode(EXCHANGE_MODE.BUY);
    } else {
      setExchangeMode(EXCHANGE_MODE.APPROVE);
    }
  }, [isTokenSpendable]);

  const { handleSubmit, formState, register } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <Box>
            {inputs?.map((item, idx) => (
              <HStack key={idx}>
                <Box p={4}>
                  {" "}
                  <HStack>
                    <Image src={item.imgSource} height={20} width={20} />
                    <Text fontSize={"sm"}>{item.ticker}</Text>
                  </HStack>
                  <NumberInput
                    name={item.ticker}
                    size="sm"
                    maxW="200px"
                    variant={"filled"}
                    value={item.ticker === "ETH" ? etherAmount : tddAmount}
                    min={0}
                    onChange={(e) => (item.ticker === "ETH" ? handleEtherOnChange(e) : handleTDDOnChange(e))}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </HStack>
            ))}
          </Box>
          <IconButton
            as={IoMdArrowDown}
            aria-label="Swap Token"
            size="xs"
            onClick={() => {
              setExchangeMode(inputs[0].ticker === "ETH" ? EXCHANGE_MODE.SELL : EXCHANGE_MODE.BUY);
              setInputs([...inputs].reverse());
              setEtherAmount("0");
              setTddAmount("0");
            }}
          />

          <Stack pt={10} spacing={10}>
            <Button isLoading={formState.isSubmitting} type="submit" isDisabled={!isLoggedIn}>
              {exchangeMode}
            </Button>
            <Text>{dexInfo.totalSales.toString()} Total Sales</Text>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
};

export default SwapCard;
