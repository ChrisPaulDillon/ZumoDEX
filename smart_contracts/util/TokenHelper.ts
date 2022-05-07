import { BigNumber, ethers } from "ethers";

/**
 * Converts token amount to BigNumber value
 * @param tokenAmount
 * @returns
 */
export const ConvertTokenNoToBN = (tokenAmount: Number): BigNumber =>
  ethers.utils.parseUnits(tokenAmount.toString(), 2);

/**
 * Converts token bignumber value back to a regular number
 * @param tokenAmount
 * @returns
 */
export const ConvertTokenBNToNo = (tokenAmount: BigNumber): Number =>
  tokenAmount.toNumber() / Math.pow(10, 2);
