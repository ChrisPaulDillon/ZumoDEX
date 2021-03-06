import { ethers } from "ethers";
import { useCallback, useEffect } from "react";
import { getLoginStatusSelector, getSignerSelector } from "../../state/reducer";
import { getDexSwapContract } from "../contractHelper";
import { CONTRACT_DEXSWAP } from "../contracts";

const useBuyTokens = () => {
  const signer = getSignerSelector();
  const { isLoggedIn } = getLoginStatusSelector();
  const contract = getDexSwapContract(CONTRACT_DEXSWAP, signer);
  const dexContract = getDexSwapContract(CONTRACT_DEXSWAP, signer);

  useEffect(() => {
    if (isLoggedIn) {
      dexContract?.on("TokensPurchased", () => {
        //handle event
      });
    }
  }, []);

  const buyTokens = useCallback(
    async (amount: string) => {
      try {
        const wei = ethers.utils.parseEther(amount);
        await contract.buyTokens({ value: wei });
      } catch (e) {
        console.error(e);
      }
    },
    [contract, signer]
  );

  return { buyTokens };
};

export default useBuyTokens;
