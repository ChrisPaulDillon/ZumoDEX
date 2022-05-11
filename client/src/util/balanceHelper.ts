import { BigNumber, BigNumberish } from "ethers";
import { ethers } from "ethers";

export const ConvertTokenBalanceFromBN = (amount: BigNumberish, decimals = 2): Number => {
  const result = ethers.utils.formatUnits(amount, decimals);
  return Number(result);
};

export const ConvertTokenNoToBN = (tokenAmount: Number): BigNumber => {
  const result = ethers.utils.parseUnits(tokenAmount.toString(), 2);
  return result;
};

export const ConvertEtherToTTD = (etherAmount: string): string => {
  const weiAmount = ethers.utils.parseEther(etherAmount);
  const tokenAmount = Number(weiAmount) / 10000;
  return tokenAmount.toString();
};
