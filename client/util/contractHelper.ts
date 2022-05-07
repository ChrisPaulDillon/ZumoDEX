import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import web3NoAccount from "./web3";
import web3 from "./web3";

import erc20ABI from "../contracts/abi/ERC20.json";
import dexSwapABI from "../contracts/abi/DexSwap.json";

export const getContract = (
  abi: any,
  address: string,
  signer?: Signer | Provider
) => {
  const _web3 = web3 ?? web3NoAccount;
  return new _web3.eth.Contract(abi, address);
};

export const getERC20Contract = (
  address: string,
  signer?: Signer | Provider
) => {
  return getContract(erc20ABI, address, signer);
};

export const getDexSwapContract = (
  address: string,
  signer?: Signer | Provider
) => {
  return getContract(dexSwapABI, address, signer);
};
