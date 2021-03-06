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
  FormControl,
  Skeleton,
} from "@chakra-ui/react";
import { MdOutlineSwapVert } from "react-icons/md";
import React, { useCallback, useEffect, useState } from "react";
import {
  CONNECTOR_TYPE,
  getConnectionStatusSelector,
  getDexInfoSelector,
  getEtherBalanceSelector,
  getIsTokenSpendable,
  getLoginStatusSelector,
  getUserTokenBalanceSelector,
} from "../../state/reducer";
import useBuyTokens from "../../contracts/hooks/useBuyTokens";
import useSellTokens from "../../contracts/hooks/useSellTokens";
import { useApprove } from "../../contracts/hooks/useApprove";
import { ConvertEtherToTTD, CovertTDDToEther, FormatToReadableBalance } from "../../util/balanceHelper";
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
  const userEtherBalance = getEtherBalanceSelector();
  const userTokenBalance = getUserTokenBalanceSelector();
  const isTokenSpendable = getIsTokenSpendable();
  const connectorStatus = getConnectionStatusSelector();
  const dexInfo = getDexInfoSelector();
  const [etherAmount, setEtherAmount] = useState<string>("0");
  const [tddAmount, setTddAmount] = useState<string>("0");
  const [exchangeMode, setExchangeMode] = useState<EXCHANGE_MODE>(isTokenSpendable ? EXCHANGE_MODE.BUY : EXCHANGE_MODE.APPROVE);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
    {
      ticker: "ETH",
      imgSource: "/eth.svg",
    },
    {
      ticker: "TDD",
      imgSource: "/zumo-mobile-logo.svg",
    },
  ]);

  useEffect(() => {
    if (Number(tddAmount) > userTokenBalance && exchangeMode === EXCHANGE_MODE.SELL) {
      setErrorMessage("You do not have this many tokens!");
    } else if (Number(etherAmount) > userEtherBalance && exchangeMode === EXCHANGE_MODE.BUY) {
      setErrorMessage("You do not have this much ether!");
    } else if (Number(etherAmount) > dexInfo.exchangeEtherBalance && exchangeMode === EXCHANGE_MODE.SELL) {
      setErrorMessage("Ether amount exceeds exchange reserves");
    } else if (Number(tddAmount) > dexInfo.exchangeTokenBalance && exchangeMode === EXCHANGE_MODE.BUY) {
      setErrorMessage("TDD amount exceeds exchange reserves");
    } else {
      setErrorMessage("");
    }
  }, [tddAmount, etherAmount]);

  useEffect(() => {
    if (isTokenSpendable) {
      setExchangeMode(EXCHANGE_MODE.BUY);
    } else {
      setExchangeMode(EXCHANGE_MODE.APPROVE);
    }
  }, [isTokenSpendable]);

  const { buyTokens } = useBuyTokens();
  const { sellTokens } = useSellTokens();
  const { onApprove } = useApprove();

  const onSubmit = async () => {
    if (exchangeMode === EXCHANGE_MODE.BUY) {
      return await buyTokens(etherAmount);
    } else if (exchangeMode === EXCHANGE_MODE.SELL) {
      return await sellTokens(tddAmount);
    }
    return await onApprove();
  };

  const { handleSubmit, formState } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Skeleton isLoaded={connectorStatus !== CONNECTOR_TYPE.NOT_CONNECTED}>
        <Box
          bg={useColorModeValue("gray.400", "gray.700")}
          rounded={"lg"}
          overflow={"hidden"}
          minH={"400px"}
          maxW={[400, 750, 750]}
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
                <FormControl isRequired key={idx}>
                  <HStack>
                    <Box p={4}>
                      <HStack>
                        <Image src={item.imgSource} height={20} width={20} />
                        <Text fontSize={"sm"}>{item.ticker}</Text>{" "}
                      </HStack>
                      <NumberInput
                        data-testid={`input-${item.ticker}`}
                        name={item.ticker}
                        size="sm"
                        // minW="200px"
                        w="auto"
                        variant={"filled"}
                        value={item.ticker === "ETH" ? etherAmount : tddAmount}
                        min={0}
                        onChange={(e) => (item.ticker === "ETH" ? handleEtherOnChange(e) : handleTDDOnChange(e))}
                        isDisabled={
                          (item.ticker === "ETH" && exchangeMode === EXCHANGE_MODE.SELL) ||
                          (item.ticker === "TDD" && exchangeMode === EXCHANGE_MODE.BUY)
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>{" "}
                      <Box pt={1} pl={1}>
                        <Text fontSize={"xs"} color={useColorModeValue("green.800", "green.200")}>
                          Available:{" "}
                          {item.ticker === "ETH"
                            ? FormatToReadableBalance(userEtherBalance.toString())
                            : FormatToReadableBalance(userTokenBalance.toString())}
                        </Text>
                      </Box>
                    </Box>
                  </HStack>
                </FormControl>
              ))}
            </Box>
            <Box mt={1}>
              {errorMessage !== "" && (
                <Text fontSize={"xs"} color="red">
                  {errorMessage}
                </Text>
              )}
            </Box>
            <IconButton
              data-testid="btn-swap"
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
                {exchangeMode === EXCHANGE_MODE.APPROVE &&
                  "You must approve the dex contract to spend your tokens before using the exchange"}
                {exchangeMode === EXCHANGE_MODE.BUY && `You are currently buying TDD at a rate of ${dexInfo.buyRate} wei to 1 TDD`}
                {exchangeMode === EXCHANGE_MODE.SELL && `You are currently selling TDD at a rate of ${dexInfo.sellRate} wei to 1 TDD`}
              </Text>
              <Text fontSize={"sm"} textAlign={"center"}>
                {exchangeMode === EXCHANGE_MODE.BUY && `Maxmimum Buy: ${dexInfo.exchangeTokenBalance} TDD`}
                {exchangeMode === EXCHANGE_MODE.SELL && `Maxmimum Sell: ${dexInfo.exchangeEtherBalance} ETH`}
              </Text>
              <Button
                data-testid="btn-submit"
                isLoading={formState.isSubmitting}
                type="submit"
                isDisabled={!isLoggedIn || errorMessage !== "" || Number(etherAmount) <= 0 || Number(tddAmount) <= 0}
              >
                {exchangeMode}
              </Button>
              <Text textAlign={"center"}>{dexInfo.totalSales.toString()} Total Sales</Text>
            </Stack>
          </Stack>
        </Box>
      </Skeleton>
    </form>
  );
};

export default SwapCard;
