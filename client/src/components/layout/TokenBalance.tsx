import { Box, BoxProps, Skeleton, Stack, Text } from "@chakra-ui/react";
import { getUserTokenBalanceSelector } from "../../state/reducer";
import Image from "next/image";
import { FormatToReadableBalance } from "../../util/balanceHelper";

const TokenBalance: React.FC<BoxProps> = ({ ...rest }) => {
  const userTokenBalance = getUserTokenBalanceSelector();

  return (
    <Skeleton isLoaded={userTokenBalance > 0} data-testid="skeleton-tb">
      <Box {...rest} display={{ base: "none", xl: "inherit", md: "none" }}>
        <Stack isInline>
          {" "}
          <Image src="/zumo-mobile-logo.svg" alt="zumo logo" width={25} height={25} />
          <Text fontSize="lg" data-testid="text-tb">{`${FormatToReadableBalance(userTokenBalance.toString())}`}</Text>
        </Stack>
      </Box>
    </Skeleton>
  );
};

export default TokenBalance;
