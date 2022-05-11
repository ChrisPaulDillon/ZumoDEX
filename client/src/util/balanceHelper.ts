import { BigNumber, BigNumberish } from "ethers";
import { ethers } from "ethers";

export const ConvertTokenBalanceFromBN = (amount: BigNumberish, decimals = 2): number => {
  const result = ethers.utils.formatUnits(amount, decimals);
  return Number(result);
};

export const ConvertTokenNoToBN = (tokenAmount: number): BigNumber => {
  const result = ethers.utils.parseUnits(tokenAmount.toString(), 2);
  return result;
};

export const ConvertEtherToTTD = (etherAmount: string): string => {
  if (etherAmount == "") {
    return "0";
  }
  const weiAmount = ethers.utils.parseEther(etherAmount);
  const tokenAmount = Number(weiAmount) / 10000;
  return tokenAmount.toString();
};

export const CovertTDDToEther = (tddAmount: string): string => {
  const weiAmount = Number(tddAmount) * 5000;
  const ether = ethers.utils.formatEther(weiAmount);
  return ether.toString();
};
