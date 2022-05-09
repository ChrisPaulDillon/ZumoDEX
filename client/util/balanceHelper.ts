import { BigNumber, BigNumberish, ethers } from "ethers";

export const getTokenBalance = (amount: BigNumberish, decimals = 2): Number => {
  const result = ethers.utils.formatUnits(amount, decimals);
  return Number(result);
};

export const ConvertTokenNoToBN = (tokenAmount: Number): BigNumber => {
  const result = ethers.utils.parseUnits(tokenAmount.toString(), 2);
  return result;
};
