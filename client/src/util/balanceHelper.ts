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
  try {
    const weiAmount = ethers.utils.parseEther(etherAmount);
    const tokenAmount = Number(weiAmount) / 10000;
    return tokenAmount.toString();
  } catch (e) {
    return "0";
  }
};

export const CovertTDDToEther = (tddAmount: string): string => {
  try {
    const weiAmount = Number(tddAmount) * 5000;
    const ether = ethers.utils.formatEther(weiAmount);
    return ether.toString();
  } catch (e) {
    return "0";
  }
};

export const FormatToReadableBalance = (labelValue: string) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? Math.abs(Number(labelValue)) / 1.0e9 + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? Math.abs(Number(labelValue)) / 1.0e6 + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? Math.abs(Number(labelValue)) / 1.0e3 + "K"
    : Math.abs(Number(labelValue));
};
