import { BigNumber, ethers } from "ethers";
import web3 from "web3";

/**
 * Converts token amount to BigNumber value
 * @param tokenAmount
 * @returns
 */
export const ConvertTokenNoToBN = (tokenAmount: Number): BigNumber => ethers.utils.parseUnits(tokenAmount.toString(), 2);

/**
 * Converts token bignumber value back to a regular number
 * @param tokenAmount
 * @returns
 */
export const ConvertTokenBNToNo = (tokenAmount: BigNumber): number => tokenAmount.toNumber() / Math.pow(10, 2);

/**
 * Convert ethers to wei
 * @param tokenAmount
 * @returns
 */
export const ConvertEtherToWei = (etherAmount: BigNumber): number => Number(web3.utils.toWei(etherAmount.toString(), "wei"));
