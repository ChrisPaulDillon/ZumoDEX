import { Contract } from "ethers";
import erc20ABI from "./abi/ERC20.json";
import dexSwapABI from "./abi/DexSwap.json";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";

export const getContract = (abi: any, address: string, signer?: JsonRpcSigner | JsonRpcProvider): Contract => {
  return new Contract(address, abi, signer);
};

export const getERC20Contract = (address: string, signer?: JsonRpcSigner | JsonRpcProvider): Contract => {
  return getContract(erc20ABI, address, signer);
};

export const getDexSwapContract = (address: string, signer?: JsonRpcSigner | JsonRpcProvider): Contract => {
  return getContract(dexSwapABI, address, signer);
};
