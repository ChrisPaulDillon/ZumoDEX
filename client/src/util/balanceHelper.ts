import { BigNumber, BigNumberish } from "ethers";
import { ethers } from "ethers";
import web3Instance from "./web3";

export const ConvertTokenBalanceFromBN = (amount: BigNumberish, decimals = 2): number => {
  const result = ethers.utils.formatUnits(amount, decimals);
  return Number(result);
};

export const ConvertTokenNoToBN = (tokenAmount: string): BigNumber | undefined => {
  try {
    const result = ethers.utils.parseUnits(tokenAmount, 2);
    return result;
  } catch (e) {
    console.log(e);
    return undefined;
  }
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
    const ether = web3Instance.utils.fromWei(weiAmount.toString());
    return ether;
  } catch (e) {
    return "0";
  }
};

export const FormatToReadableBalance = (labelValue: string) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? Number((Math.abs(Number(labelValue)) / 1.0e9).toFixed(2)) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? Number((Math.abs(Number(labelValue)) / 1.0e6).toFixed(2)) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? Number((Math.abs(Number(labelValue)) / 1.0e3).toFixed(2)) + "K"
    : Math.abs(Number(labelValue));
};
