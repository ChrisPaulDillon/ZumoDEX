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
  HStack,
  Badge,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { MdOutlineSwapVert } from "react-icons/md";
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
  errorMsg: string;
  isError: boolean;
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
    //don't attempt to convert as the ether amount is not valid anyway
    // if (!inputs[0].isError) {
    //   const ttdVal = ConvertEtherToTTD(value);
    //   setTddAmount(ttdVal);
    // }
  }, []);

  const handleTDDOnChange = useCallback((value: string) => {
    setTddAmount(value);
    const etherVal = CovertTDDToEther(value);
    setEtherAmount(etherVal);
  }, []);

  const [inputs, setInputs] = useState<Array<ITokenInput>>([
    { ticker: "ETH", imgSource: "/eth.svg", errorMsg: "You currently do not have this much ether!", isError: false },
    { ticker: "TDD", imgSource: "/zumo-mobile-logo.svg", errorMsg: "You do not have this many tokens!", isError: false },
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
    if (Number(tddAmount) > userTokenBalance && EXCHANGE_MODE.SELL) {
      setInputs(inputs.map((item) => (item.ticker === "TDD" ? { ...item, isError: true } : item)));
    } else {
      setInputs(inputs.map((item) => (item.ticker === "TDD" ? { ...item, isError: false } : item)));
    }
  }, [tddAmount]);

  useEffect(() => {
    if (Number(etherAmount) > etherBalance && EXCHANGE_MODE.BUY) {
      setInputs(inputs.map((item) => (item.ticker === "ETH" ? { ...item, isError: true } : item)));
    } else {
      setInputs(inputs.map((item) => (item.ticker === "ETH" ? { ...item, isError: false } : item)));
    }
  }, [etherAmount]);

  useEffect(() => {
    if (isTokenSpendable) {
      setExchangeMode(EXCHANGE_MODE.BUY);
    } else {
      setExchangeMode(EXCHANGE_MODE.APPROVE);
    }
  }, [isTokenSpendable]);

  const { handleSubmit, formState } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        bg={useColorModeValue("gray.400", "gray.700")}
        rounded={"lg"}
        overflow={"hidden"}
        minH={"400px"}
        maxW={[250, 750, 750]}
        p={3}
        justifyContent="center"
        alignItems={"center"}
        border="2px"
      >
        {" "}
        <Stack spacing={4} alignItems="center" justifyContent="center">
          <Heading textAlign={"center"} size="md">
            Swap
          </Heading>
          <Box>
            {inputs?.map((item, idx) => (
              <FormControl isRequired isInvalid={item.isError}>
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
                      minW="200px"
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
                    {item.isError && <FormErrorMessage>{item.errorMsg}</FormErrorMessage>}
                  </Box>
                </HStack>
              </FormControl>
            ))}
          </Box>
          <IconButton
            as={MdOutlineSwapVert}
            aria-label="Swap Token"
            size="xs"
            onClick={() => {
              setExchangeMode(inputs[0].ticker === "ETH" ? EXCHANGE_MODE.SELL : EXCHANGE_MODE.BUY);
              setInputs([...inputs].reverse());
              setEtherAmount("0");
              setTddAmount("0");
            }}
          />

          <Stack pt={5} spacing={10} maxW="300px">
            {" "}
            <Text textAlign={"center"} fontSize="sm">
              {exchangeMode === EXCHANGE_MODE.APPROVE && "You must approve the dex contract to spend your tokens before using the exchange"}
              {exchangeMode === EXCHANGE_MODE.BUY && `You are currently buying TDD at a rate of ${dexInfo.buyRate} wei to 1 TDD`}
              {exchangeMode === EXCHANGE_MODE.SELL && `You are currently selling TDD at a rate of ${dexInfo.sellRate} wei to 1 TDD`}
            </Text>
            <Badge colorScheme={"pink"}>Maxmimum Buy: {dexInfo.maximumBuy}</Badge>
            <Button isLoading={formState.isSubmitting} type="submit" isDisabled={!isLoggedIn}>
              {exchangeMode}
            </Button>
            <Text textAlign={"center"}>{dexInfo.totalSales.toString()} Total Sales</Text>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
};

export default SwapCard;
