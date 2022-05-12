import { ethers } from "ethers";
import { useCallback } from "react";
import { getSignerSelector } from "../../state/reducer";
import { getDexSwapContract } from "../contractHelper";
import { CONTRACT_DEXSWAP } from "../contracts";

const useBuyTokens = () => {
  const signer = getSignerSelector();
  const contract = getDexSwapContract(CONTRACT_DEXSWAP, signer);

  const buyTokens = useCallback(
    async (amount: number) => {
      try {
        const wei = ethers.utils.parseEther(amount.toString());
        const tx = await contract.buyTokens({ value: wei });
        console.log(tx);
      } catch (e) {
        console.error(e);
      }
    },
    [contract, signer]
  );

  return { buyTokens };
};

export default useBuyTokens;
